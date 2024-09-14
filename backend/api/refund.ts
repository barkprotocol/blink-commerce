import express from 'express';
import { verifyToken } from '../utils/verifyToken';
import { findOrderById, processRefund } from '../services/refund';

const router = express.Router();

router.post('/refund', async (req, res) => {
  const { orderId } = req.body;
  const authHeader = req.headers.authorization;

  // Validate orderId
  if (!orderId) {
    return res.status(400).json({ success: false, message: 'Order ID is required.' });
  }

  // Validate JWT token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Authorization token is required.' });
  }

  const token = authHeader.split(' ')[1];
  const user = verifyToken(token);

  if (!user) {
    return res.status(403).json({ success: false, message: 'Unauthorized.' });
  }

  try {
    // Check if the order exists
    const order = await findOrderById(orderId);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    // Check if the user is authorized to refund this order
    if (order.userId !== user.id) {
      return res.status(403).json({ success: false, message: 'Unauthorized to refund this order.' });
    }

    // Process the refund
    const result = await processRefund(orderId);

    if (result.success) {
      return res.json({ success: true, message: 'Refund initiated successfully.' });
    } else {
      return res.status(500).json({ success: false, message: 'Failed to process refund.' });
    }
  } catch (error) {
    console.error('Error processing refund:', error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

export default router;
