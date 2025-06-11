// src/controllers/reportController.js
const db = require('../db/connection');

exports.createReport = async (req, res) => {
  console.log('Creating report with body:', req.body);
  const { user_id, title, description, location, department_id } = req.body;
  try {
    const [result] = await db.execute(
      'INSERT INTO mombasa_app_reports (user_id, title, description, location) VALUES (?, ?, ?, ?)',
      [user_id, title, description, location]
    );
    res.status(201).json({ message: 'Report created', reportId: result.insertId });
  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getAllReportsWithVotesAndImages = async (req, res) => {
  try {
    const [reports] = await db.execute(
      `SELECT r.*, 
        (SELECT COUNT(*) FROM mombasa_app_votes WHERE report_id = r.id AND vote_type = 'up') as upvotes,
        (SELECT COUNT(*) FROM mombasa_app_votes WHERE report_id = r.id AND vote_type = 'down') as downvotes,
        (SELECT JSON_ARRAYAGG(image_url) FROM mombasa_app_report_images WHERE report_id = r.id) as images
      FROM mombasa_app_reports r`
    );
    res.json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getReportByIdWithVotesAndImages = async (req, res) => {
  try {
    const reportId = req.params.id;
    const [[report]] = await db.execute(
      `SELECT r.*, 
        (SELECT COUNT(*) FROM mombasa_app_votes WHERE report_id = r.id AND vote_type = 'up') as upvotes,
        (SELECT COUNT(*) FROM mombasa_app_votes WHERE report_id = r.id AND vote_type = 'down') as downvotes,
        (SELECT JSON_ARRAYAGG(image_url) FROM mombasa_app_report_images WHERE report_id = r.id) as images
      FROM mombasa_app_reports r WHERE r.id = ?`,
      [reportId]
    );
    if (!report) return res.status(404).json({ error: 'Report not found' });
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateReport = async (req, res) => {
  const reportId = req.params.id;
  const { title, description, location, status } = req.body;
  try {
    await db.execute(
      'UPDATE mombasa_app_reports SET title = ?, description = ?, location = ?, status = ? WHERE id = ?',
      [title, description, location, status, reportId]
    );
    res.json({ message: 'Report updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteReport = async (req, res) => {
  const reportId = req.params.id;
  try {
    await db.execute('DELETE FROM mombasa_app_reports WHERE id = ?', [reportId]);
    res.json({ message: 'Report deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
