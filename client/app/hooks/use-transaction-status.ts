import { validateStoreData, validateProductData } from './validators';
import { logError } from './logger';
import { DatabaseService } from './database';

const dbService = new DatabaseService();

export async function createStore(formData: FormData) {
  try {
    const storeName = formData.get('storeName') as string;
    const validatedData = validateStoreData({ storeName });

    const storeId = validatedData.storeName.toLowerCase().replace(/\s+/g, '-');
    console.log('Creating store:', { storeName, storeId });

    await dbService.createStore({ storeId, storeName: validatedData.storeName });

    return { success: true, message: 'Store created successfully', storeId };
  } catch (error) {
    logError('createStore error', error);
    return { success: false, message: 'Failed to create store', error: error.message };
  }
}

export async function listProduct(formData: FormData) {
  try {
    const productName = formData.get('productName') as string;
    const productPrice = parseFloat(formData.get('productPrice') as string);
    const productDescription = formData.get('productDescription') as string | undefined;

    const validatedData = validateProductData({ productName, productPrice, productDescription });

    console.log('Listing product:', validatedData);

    await dbService.listProduct(validatedData);

    return { success: true, message: 'Product listed successfully' };
  } catch (error) {
    logError('listProduct error', error);
    return { success: false, message: 'Failed to list product', error: error.message };
  }
}

export async function processPayment(orderId: string) {
  try {
    console.log('Processing payment for order:', orderId);

    // Implement actual payment processing logic
    await dbService.processPayment(orderId);

    return { success: true, message: 'Payment processed successfully' };
  } catch (error) {
    logError('processPayment error', error);
    return { success: false, message: 'Failed to process payment', error: error.message };
  }
}

export async function initiateRefund(orderId: string) {
  try {
    console.log('Initiating refund for order:', orderId);

    // Implement actual refund initiation logic
    await dbService.initiateRefund(orderId);

    return { success: true, message: 'Refund initiated successfully' };
  } catch (error) {
    logError('initiateRefund error', error);
    return { success: false, message: 'Failed to initiate refund', error: error.message };
  }
}
