const db = require('../db/connection');

// exports.uploadReportImage = async (req, res) => {
//   const reportId = req.params.id;

//   try {
//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ error: 'No files uploaded' });
//     }
//     console.log('Files received:', req.files);
//     let image_url = [];
//     for (const file of req.files) {
//       if (file && file.filename) {
//         image_url.push('/uploads/' + file.filename);
//       } else {
//         console.error('File does not have a valid filename:', file);
//       }
//     }
//     console.log("About to insert image URL:", image_url, "for report ID:", reportId);
//     for (const url of image_url) {
//       console.log('Inserting image URL:', url);
//       await db.execute('INSERT INTO mombasa_app_report_images (report_id, image_url) VALUES (?, ?)', [reportId, url]);
//     }
//     console.log('All images inserted successfully');
//     return res.status(201).json({ message: 'Images uploaded successfully' });
//   } catch (error) {
//     console.error('Error uploading image from backend:', error);
//     res.status(500).json({ error: error.message });
//   }
// };

exports.uploadReportImage = async (req, res) => {
  const reportId = req.params.id;

  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const image_urls = req.files.map(file => file.path); // Cloudinary gives a full URL

    for (const url of image_urls) {
      await db.execute(
        'INSERT INTO mombasa_app_report_images (report_id, image_url) VALUES (?, ?)',
        [reportId, url]
      );
    }

    return res.status(201).json({ message: 'Images uploaded successfully', image_urls });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return res.status(500).json({ error: error.message });
  }
};
