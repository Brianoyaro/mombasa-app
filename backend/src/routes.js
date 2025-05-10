// src/routes/index.js

const express = require('express');
const router = express.Router();

// Auth
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/profile', updateUserProfile);

// Reports
router.post('/reports', createReport);
router.get('/reports', getAllReportsWithVotesAndImages);
router.get('/reports/:id', getReportByIdWithVotesAndImages);
router.put('/reports/:id', updateReport);
router.delete('/reports/:id', deleteReport);

// Votes
router.post('/reports/:id/vote', voteOnReport);

// Comments
router.get('/reports/:id/comments', getComments);
router.post('/reports/:id/comments', postComment);

// Report Images
router.post('/reports/:id/images', uploadReportImage);

// Alerts
router.get('/alerts', getAlerts);
router.get('/alerts/:id', getAlertById);
router.post('/alerts', createAlert);
router.put('/alerts/:id', updateAlert);
router.delete('/alerts/:id', deleteAlert);

// Departments
router.get('/departments', getDepartments);
router.post('/departments', createDepartment);
router.put('/departments/:id', updateDepartment);
router.delete('/departments/:id', deleteDepartment);
router.post('/departments/:id/assign/:departmentId', assignDepartmentToReport);

// Admin
router.get('/admin/users', getAllUsers);
router.put('/admin/users/:id', updateUserRoleOrStatus);

module.exports = router;


/**
 * Note: You need to define the controller functions (e.g. registerUser, createReport, etc.)
 * inside separate controller files and import them above. Also, configure middleware for authentication,
 * validation, file uploads, etc., and wire up this router file in your `app.js` or `server.js` file.
 */

