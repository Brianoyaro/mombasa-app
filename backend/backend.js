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


app.use('/api', router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;