const express = require('express');
const cors = require('cors');
const path = require('path');
const router = require('./src/routes');
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" })); // Allow all origins
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));


app.use('/api', router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;