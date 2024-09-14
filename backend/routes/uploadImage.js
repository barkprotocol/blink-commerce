const express = require('express');
const multer = require('multer');
const path = require('path');
const { uploadImageToStorage } = require('../services/storage');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload-image', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    const imageUrl = await uploadImageToStorage(file); // Implement this service to upload image to cloud storage

    res.json({ imageUrl });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload image' });
  }
});

module.exports = router;
