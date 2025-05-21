const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware'); // Middleware for authentication
const { upload } = require('../middleware/multerMiddleware'); // Middleware for file uploads


const { registerUser, loginUser, logoutUser, updateUserProfile } = require('../controllers/authController');
const { createReport, getAllReportsWithVotesAndImages, getReportByIdWithVotesAndImages, updateReport, deleteReport } = require('../controllers/reportController');
const { voteOnReport } = require('../controllers/voteController');
const { getComments, postComment } = require('../controllers/commentController');
const { uploadReportImage } = require('../controllers/imageController');
const { getAlerts, createAlert, updateAlert, deleteAlert, getAlertById } = require('../controllers/alertController');
const { getDepartments, createDepartment, updateDepartment, deleteDepartment, assignDepartmentToReport } = require('../controllers/departmentController');
const { getAllUsers, updateUserRoleOrStatus } = require('../controllers/userController');


// Auth
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', authenticateToken, logoutUser);
router.post('/profile', authenticateToken, updateUserProfile);

// Reports
router.post('/reports', authenticateToken, createReport);
router.get('/reports', authenticateToken, getAllReportsWithVotesAndImages);
router.get('/reports/:id', authenticateToken, getReportByIdWithVotesAndImages);
router.put('/reports/:id', authenticateToken, updateReport);
router.delete('/reports/:id', authenticateToken, deleteReport);

// Votes
router.post('/reports/:id/vote', authenticateToken, voteOnReport);

// Comments
router.get('/reports/:id/comments', authenticateToken, getComments);
router.post('/reports/:id/comments', authenticateToken, postComment);

// Report Images
router.post(
  '/reports/:id/images',
  authenticateToken,
  upload.array('images', 5), // handle multiple files named "images", max 5
  uploadReportImage
);

// Alerts
router.get('/alerts', authenticateToken, getAlerts);
router.get('/alerts/:id', authenticateToken, getAlertById);
router.post('/alerts', authenticateToken, createAlert);
router.put('/alerts/:id', authenticateToken, updateAlert);
router.delete('/alerts/:id', authenticateToken, deleteAlert);

// Departments
router.get('/departments', authenticateToken, getDepartments);
router.post('/departments', authenticateToken, createDepartment);
router.put('/departments/:id', authenticateToken, updateDepartment);
router.delete('/departments/:id', authenticateToken, deleteDepartment);
router.post('/departments/:id/assign/:departmentId', authenticateToken, assignDepartmentToReport);

// Admin
router.get('/admin/users', authenticateToken, getAllUsers);
router.put('/admin/users/:id', authenticateToken, updateUserRoleOrStatus);

// confirm a user is logged in
router.get('/isLoggedIn', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'User is logged in' });
});

module.exports = router;

// Backend API URL
//first
// 🔍  Inspect: https://vercel.com/brianoyaros-projects/mombasa-app-backend/5TtbQuF2JgxuRDnASoQPdPyBTpuV 
// ✅  Production: https://mombasa-app-backend-prjtmhoeu-brianoyaros-projects.vercel.app 

//second
// 🔍  Inspect: https://vercel.com/brianoyaros-projects/mombasa-app-backend/BZs1aay4erzHXyuDQNEkErJCtA9x [3s]
// ✅  Production: https://mombasa-app-backend-9dr3aopln-brianoyaros-projects.vercel.app [3s]