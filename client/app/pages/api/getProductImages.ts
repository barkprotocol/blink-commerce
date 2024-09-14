import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { productId } = req.query;

  if (!productId || typeof productId !== 'string') {
    return res.status(400).json({ success: false, message: 'Invalid or missing Product ID' });
  }

  try {
    const images = await prisma.image.findMany({
      where: { productId },
    });

    if (images.length === 0) {
      return res.status(404).json({ success: false, message: 'No images found for the given Product ID' });
    }

    res.status(200).json({ success: true, data: images });
  } catch (error) {
    console.error(`Failed to fetch images for Product ID ${productId}: ${error.message}`);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
