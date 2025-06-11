const db = require('../db/connection');


// src/controllers/imageController.js
exports.uploadReportImage = async (req, res) => {
  const reportId = req.params.id;
  const { image_url } = req.body;
  console.log('Received image URL:', req.body.images, 'for report ID:', reportId);
  console.log('req.body:', req.body);
  console.log("req.images:", req.images);
  console.log("entire req:", req);

  console.log('Uploading image for report ID:', reportId, 'with URL:', image_url);
  try {
    await db.execute('INSERT INTO mombasa_app_report_images (report_id, image_url) VALUES (?, ?)', [reportId, image_url]);
    res.status(201).json({ message: 'Image uploaded' });
  } catch (error) {
    console.error('Error uploading image from backend:', error);
    res.status(500).json({ error: error.message });
  }
};
