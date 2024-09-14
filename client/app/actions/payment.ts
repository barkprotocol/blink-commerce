import { processPaymentInDatabase } from '../database/database';
import { logError } from '../utils/logger';

interface ProcessPaymentResponse {
  success: boolean;
  message: string;
}

export async function processPayment(orderId: string): Promise<ProcessPaymentResponse> {
  try {
    if (!orderId.trim()) {
      throw new Error('Order ID is required');
    }

    // Call the database function to process payment
    await processPaymentInDatabase(orderId);
    return { success: true, message: 'Payment processed successfully' };
  } catch (error) {
    logError(error);
    return { success: false, message: 'Failed to process payment' };
  }
}
