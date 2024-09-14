import type { NextApiRequest, NextApiResponse } from 'next';
import { logError } from '../../utils/logger';

// Define a response type
interface TransactionStatusResponse {
  status: 'pending' | 'success' | 'error' | 'unknown';
  message?: string; // Optional field for additional messages
}

// Handler function for the API route
export default async function handler(req: NextApiRequest, res: NextApiResponse<TransactionStatusResponse>) {
  const { transactionId } = req.query;

  if (typeof transactionId !== 'string') {
    return res.status(400).json({ status: 'error', message: 'Invalid transaction ID' });
  }

  try {
    // Replace this with your actual transaction status checking logic
    const transactionStatus = await checkTransactionStatus(transactionId);

    res.status(200).json({ status: transactionStatus });
  } catch (error) {
    logError('Transaction Status Check Error', error);
    res.status(500).json({ status: 'error', message: 'Error retrieving transaction status' });
  }
}

// Example function to simulate checking transaction status
// Replace this with your actual implementation
const checkTransactionStatus = async (transactionId: string): Promise<'pending' | 'success' | 'error' | 'unknown'> => {
  try {
    // Ensure environment variable is available
    const apiUrl = process.env.TRANSACTION_API_URL;
    if (!apiUrl) {
      throw new Error('TRANSACTION_API_URL environment variable is not set');
    }

    // Simulate an API call or database query
    // Replace this with your actual logic to check the transaction status
    const response = await fetch(`${apiUrl}/status/${transactionId}`);
    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}`);
    }

    const data = await response.json();
    if (data.status && ['pending', 'success', 'error', 'unknown'].includes(data.status)) {
      return data.status;
    }

    return 'unknown'; // Default to 'unknown' if status is not recognized
  } catch (error) {
    logError('Check Transaction Status Error', error);
    return 'unknown'; // Return 'unknown' if there's an issue with checking the status
  }
};
