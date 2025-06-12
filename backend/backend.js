const express = require('express');
const cors = require('cors');
const path = require('path');
const router = require('./src/routes');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({ 
  origin: "https://mombasa-app-frontend.onrender.com", //http://localhost:3000", // Replace with your frontend URL
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
 })); // Allow all origins
 
 // create uploads directory if it doesn't exist
 const fs = require('fs');
 const uploadPath = path.join(__dirname, 'public/uploads');
 
 if (!fs.existsSync(uploadPath)) {
   fs.mkdirSync(uploadPath, { recursive: true });
  }
  
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));


console.log("Serving static files from:", path.join(__dirname, 'public/uploads'));
fs.readdir(path.join(__dirname, 'public/uploads') , (err, files) => {
  if (err) return console.error('❌ Failed to list files:', err);
  console.log('📂 Files in /public/uploads:', files);
});
// app.use('/api', router);


app.use('/api', router);

//----------------------------------------------------------
// 👇 Global error handler (must be after all routes)
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.error('Multer error:', err);
    return res.status(400).json({ error: err.message });
  }

  if (err) {
    console.error('Unhandled error:', err);
    return res.status(500).json({ error: err.message });
  }
});
// ---------------------------------------------------------

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;