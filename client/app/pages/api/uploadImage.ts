import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Configure multer for file storage
const upload = multer({
  storage: multer.diskStorage({
    destination: './public/images',
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      cb(null, `${Date.now()}-${basename}${ext}`);
    },
  }),
});

// Multer configuration for handling file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Handle file upload
  upload.single('image')(req, res, async (err) => {
    if (err) {
      console.error('Upload error:', err);
      return res.status(500).json({ success: false, message: 'Failed to upload image' });
    }

    // Validate if a file is uploaded
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    try {
      // Extract productId from body and image details
      const { productId } = req.body;
      const filePath = (req.file as Express.Multer.File).path;
      const imageUrl = `/images/${path.basename(filePath)}`;

      // Validate productId
      if (!productId || typeof productId !== 'string') {
        return res.status(400).json({ success: false, message: 'Invalid or missing productId' });
      }

      // Save image data to database
      await prisma.image.create({
        data: {
          url: imageUrl,
          productId,
        },
      });

      res.status(200).json({ success: true, message: 'Image uploaded successfully', data: imageUrl });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ success: false, message: `Failed to save image data: ${error.message}` });
    }
  });
};
