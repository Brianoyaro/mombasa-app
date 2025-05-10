const db = require('../db/connection');


// src/controllers/voteController.js
exports.voteOnReport = async (req, res) => {
  const reportId = req.params.id;
  const { user_id, vote_type } = req.body;
  try {
    await db.execute(
      'INSERT INTO votes (report_id, user_id, vote_type) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE vote_type = ?',
      [reportId, user_id, vote_type, vote_type]
    );
    res.json({ message: 'Vote recorded' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

