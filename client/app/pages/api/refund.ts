import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from '../../utils/auth';
import { processRefund } from '../../utils/refund';

const refundHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { orderId } = req.body;

    if (!orderId || typeof orderId !== 'string') {
      return res.status(400).json({ success: false, message: 'Invalid order ID' });
    }

    // Verify authorization token (optional, based on your setup)
    const token = req.headers.authorization?.split(' ')[1];
    if (!token || !verifyToken(token)) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    // Process the refund (implement the logic in your utility function)
    const refundResult = await processRefund(orderId);

    if (refundResult.success) {
      return res.status(200).json({ success: true, message: 'Refund processed successfully' });
    } else {
      return res.status(400).json({ success: false, message: refundResult.message });
    }
  } catch (error) {
    console.error('Error processing refund:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export default refundHandler;
