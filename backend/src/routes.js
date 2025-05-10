const express = require('express');
const router = express.Router();
const { authenticateToken } = require('./middleware/authMiddleware'); // Middleware for authentication


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
router.post('/reports/:id/images', authenticateToken, uploadReportImage);

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

module.exports = router;


/**
 * Note: You need to define the controller functions (e.g. registerUser, createReport, etc.)
 * inside separate controller files and import them above. Also, configure middleware for authentication,
 * validation, file uploads, etc., and wire up this router file in your `app.js` or `server.js` file.
 */

