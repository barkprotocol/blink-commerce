"use server";

import { v4 as uuidv4 } from 'uuid';
import { revalidatePath } from 'next/cache';
import { validateStoreData, validateProductData } from './validators';
import { logError, logInfo } from './logger';
import { PrismaClient } from '@prisma/client';
import { isWithinLastDays } from './utils/dateUtils';

const prisma = new PrismaClient();

interface StoreData {
  storeName: string;
}

interface ProductData {
  productName: string;
  productPrice: number;
  productDescription?: string;
}

interface ActionResponse {
  success: boolean;
  message: string;
  data?: any;
}

async function handleDatabaseOperation<T>(
  operation: () => Promise<T>,
  successMessage: string,
  errorMessage: string
): Promise<ActionResponse> {
  try {
    const result = await operation();
    logInfo(successMessage);
    return { success: true, message: successMessage, data: result };
  } catch (error) {
    logError(errorMessage, error);
    return { success: false, message: `${errorMessage}: ${error.message}` };
  }
}

export async function createStore(data: StoreData): Promise<ActionResponse> {
  return handleDatabaseOperation(
    async () => {
      const { storeName } = validateStoreData(data);
      const storeId = uuidv4(); // Generating a unique store ID

      await prisma.store.create({
        data: {
          storeId,
          name: storeName,
        },
      });

      revalidatePath('/merchant/stores');

      return { storeId };
    },
    'Store created successfully',
    'Error creating store'
  );
}

export async function listProduct(data: ProductData): Promise<ActionResponse> {
  return handleDatabaseOperation(
    async () => {
      const { productName, productPrice, productDescription } = validateProductData(data);

      const product = await prisma.product.create({
        data: {
          name: productName,
          price: productPrice,
          description: productDescription || 'No description provided',
        },
      });

      revalidatePath('/merchant/products');

      return product;
    },
    'Product listed successfully',
    'Error listing product'
  );
}

export async function uploadProductImage(productId: number, imageUrl: string): Promise<ActionResponse> {
  return handleDatabaseOperation(
    async () => {
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        throw new Error('Product not found');
      }

      await prisma.image.create({
        data: {
          url: imageUrl,
          productId,
        },
      });

      return {};
    },
    'Product image uploaded successfully',
    'Error uploading product image'
  );
}

export async function getProductImages(productId: number): Promise<ActionResponse> {
  return handleDatabaseOperation(
    async () => {
      const images = await prisma.image.findMany({
        where: { productId },
      });

      return images;
    },
    'Product images retrieved successfully',
    'Error retrieving product images'
  );
}

export async function generateStoreLink(storeId: string): Promise<ActionResponse> {
  return handleDatabaseOperation(
    async () => {
      if (!storeId) {
        throw new Error('Store ID is required');
      }

      const store = await prisma.store.findUnique({
        where: { storeId },
      });

      if (!store) {
        throw new Error('Store not found');
      }

      const storeLink = `https://blinkcommerce.app/store/${storeId}`;
      return storeLink;
    },
    'Store link generated successfully',
    'Error generating store link'
  );
}

export async function processPayment(orderId: string): Promise<ActionResponse> {
  return handleDatabaseOperation(
    async () => {
      if (!orderId.trim()) {
        throw new Error('Order ID is required');
      }

      const order = await prisma.order.findUnique({
        where: { id: orderId },
      });

      if (!order) {
        throw new Error('Order not found');
      }

      await prisma.order.update({
        where: { id: orderId },
        data: { status: 'paid' },
      });

      return {};
    },
    'Payment processed successfully',
    'Error processing payment'
  );
}

export async function initiateRefund(orderId: string): Promise<ActionResponse> {
  return handleDatabaseOperation(
    async () => {
      if (!orderId.trim()) {
        throw new Error('Order ID is required');
      }

      const order = await prisma.order.findUnique({
        where: { id: orderId },
        select: { createdAt: true },
      });

      if (!order) {
        return { success: false, message: 'Order not found' };
      }

      if (!isWithinLastDays(order.createdAt, 14)) {
        return { success: false, message: 'Refund period has expired' };
      }

      await prisma.order.update({
        where: { id: orderId },
        data: { status: 'refunded' },
      });

      return {};
    },
    'Refund initiated successfully',
    'Error initiating refund'
  );
}
