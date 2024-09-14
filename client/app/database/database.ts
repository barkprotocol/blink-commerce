import { PrismaClient } from '@prisma/client';
import { validateStoreData, validateProductData } from './validators';
import { logError, logInfo } from './logger';
import { isWithinLastDays } from './utils/dateUtils';
import { v4 as uuidv4 } from 'uuid';

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

// Create a store
export async function createStore(data: StoreData): Promise<ActionResponse> {
  try {
    const { storeName } = validateStoreData(data);
    const storeId = uuidv4(); // Generating a unique store ID

    await prisma.store.create({
      data: {
        storeId,
        name: storeName,
      },
    });

    logInfo('Store created successfully', { storeId, storeName });
    return { success: true, message: 'Store created successfully', data: { storeId } };
  } catch (error) {
    logError('createStore', error);
    return { success: false, message: `Error creating store: ${error.message}` };
  }
}

// Update store details
export async function updateStore(storeId: string, data: Partial<StoreData>): Promise<ActionResponse> {
  try {
    const { storeName } = validateStoreData(data as StoreData);

    const store = await prisma.store.update({
      where: { storeId },
      data: { name: storeName },
    });

    logInfo('Store updated successfully', { storeId, storeName });
    return { success: true, message: 'Store updated successfully', data: store };
  } catch (error) {
    logError('updateStore', error);
    return { success: false, message: `Error updating store: ${error.message}` };
  }
}

// List products
export async function listProducts(): Promise<ActionResponse> {
  try {
    const products = await prisma.product.findMany();

    logInfo('Products retrieved successfully');
    return { success: true, message: 'Products retrieved successfully', data: products };
  } catch (error) {
    logError('listProducts', error);
    return { success: false, message: `Error retrieving products: ${error.message}` };
  }
}

// List stores
export async function listStores(): Promise<ActionResponse> {
  try {
    const stores = await prisma.store.findMany();

    logInfo('Stores retrieved successfully');
    return { success: true, message: 'Stores retrieved successfully', data: stores };
  } catch (error) {
    logError('listStores', error);
    return { success: false, message: `Error retrieving stores: ${error.message}` };
  }
}

// List a product
export async function listProduct(data: ProductData): Promise<ActionResponse> {
  try {
    const { productName, productPrice, productDescription } = validateProductData(data);

    const product = await prisma.product.create({
      data: {
        name: productName,
        price: productPrice,
        description: productDescription || 'No description provided',
      },
    });

    logInfo('Product listed successfully', { productName, productPrice });
    return { success: true, message: 'Product listed successfully', data: { productId: product.id } };
  } catch (error) {
    logError('listProduct', error);
    return { success: false, message: `Error listing product: ${error.message}` };
  }
}

// Update product details
export async function updateProduct(productId: number, data: Partial<ProductData>): Promise<ActionResponse> {
  try {
    const { productName, productPrice, productDescription } = validateProductData(data as ProductData);

    const product = await prisma.product.update({
      where: { id: productId },
      data: {
        name: productName,
        price: productPrice,
        description: productDescription || 'No description provided',
      },
    });

    logInfo('Product updated successfully', { productId, productName });
    return { success: true, message: 'Product updated successfully', data: product };
  } catch (error) {
    logError('updateProduct', error);
    return { success: false, message: `Error updating product: ${error.message}` };
  }
}

// Delete a product
export async function deleteProduct(productId: number): Promise<ActionResponse> {
  try {
    await prisma.product.delete({
      where: { id: productId },
    });

    logInfo('Product deleted successfully', { productId });
    return { success: true, message: 'Product deleted successfully' };
  } catch (error) {
    logError('deleteProduct', error);
    return { success: false, message: `Error deleting product: ${error.message}` };
  }
}

// Upload a product image
export async function uploadProductImage(productId: number, imageUrl: string): Promise<ActionResponse> {
  try {
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

    logInfo('Product image uploaded successfully', { productId, imageUrl });
    return { success: true, message: 'Product image uploaded successfully' };
  } catch (error) {
    logError('uploadProductImage', error);
    return { success: false, message: `Error uploading product image: ${error.message}` };
  }
}

// Get product images
export async function getProductImages(productId: number): Promise<ActionResponse> {
  try {
    const images = await prisma.image.findMany({
      where: { productId },
    });

    logInfo('Product images retrieved successfully', { productId });
    return { success: true, message: 'Product images retrieved successfully', data: images };
  } catch (error) {
    logError('getProductImages', error);
    return { success: false, message: `Error retrieving product images: ${error.message}` };
  }
}

// Generate a store link
export async function generateStoreLink(storeId: string): Promise<ActionResponse> {
  try {
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
    logInfo('Store link generated successfully', { storeId });
    return { success: true, message: 'Store link generated successfully', data: storeLink };
  } catch (error) {
    logError('generateStoreLink', error);
    return { success: false, message: `Error generating store link: ${error.message}` };
  }
}

// Process payment
export async function processPayment(orderId: string): Promise<ActionResponse> {
  try {
    if (!orderId) {
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

    logInfo('Payment processed successfully', { orderId });
    return { success: true, message: 'Payment processed successfully' };
  } catch (error) {
    logError('processPayment', error);
    return { success: false, message: `Error processing payment: ${error.message}` };
  }
}

// Initiate a refund
export async function initiateRefund(orderId: string): Promise<ActionResponse> {
  try {
    if (!orderId) {
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

    logInfo('Refund initiated successfully', { orderId });
    return { success: true, message: 'Refund initiated successfully' };
  } catch (error) {
    logError('initiateRefund', error);
    return { success: false, message: `Error initiating refund: ${error.message}` };
  }
}
