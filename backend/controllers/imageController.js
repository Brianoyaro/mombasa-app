const db = require('../db/connection');

exports.uploadReportImage = async (req, res) => {
  const reportId = req.params.id;

  let image_url = [];
  for (const file of req.files) {
    if (file && file.filename) {
      image_url.push('/uploads/' + file.filename);
    } else {
      console.error('File does not have a valid filename:', file);
    }
  }
  // if (req.files) {
  //   image_url = '/uploads/' + req.files.filename;
  // }

  console.log('Uploading image for report ID:', reportId, 'with URL:', image_url);
  try {
    if (image_url.length === 0) {
      return res.status(400).json({ error: 'No images uploaded' });
    } else if (image_url.length > 1) {
      for (const url of image_url) {
        await db.execute('INSERT INTO mombasa_app_report_images (report_id, image_url) VALUES (?, ?)', [reportId, url]);
      }
      return res.status(201).json({ message: 'Images uploaded successfully' });
    }
    // Insert the image URL into the database
    // await db.execute('INSERT INTO mombasa_app_report_images (report_id, image_url) VALUES (?, ?)', [reportId, image_url]);
    // res.status(201).json({ message: 'Image uploaded' });
  } catch (error) {
    console.error('Error uploading image from backend:', error);
    res.status(500).json({ error: error.message });
  }
};
