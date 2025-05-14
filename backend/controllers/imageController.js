const db = require('../db/connection');


// src/controllers/imageController.js
exports.uploadReportImage = async (req, res) => {
  const reportId = req.params.id;
  const { image_url } = req.body;
  try {
    await db.execute('INSERT INTO mombasa_app_report_images (report_id, image_url) VALUES (?, ?)', [reportId, image_url]);
    res.status(201).json({ message: 'Image uploaded' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
