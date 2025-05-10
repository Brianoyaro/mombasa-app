const db = require('../db/connection');



// src/controllers/commentController.js
exports.getComments = async (req, res) => {
  const reportId = req.params.id;
  try {
    const [comments] = await db.execute('SELECT * FROM comments WHERE report_id = ?', [reportId]);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.postComment = async (req, res) => {
  const reportId = req.params.id;
  const { user_id, comment } = req.body;
  try {
    await db.execute('INSERT INTO comments (report_id, user_id, comment) VALUES (?, ?, ?)', [reportId, user_id, comment]);
    res.status(201).json({ message: 'Comment added' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
