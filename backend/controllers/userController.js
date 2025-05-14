const db = require('../db/connection');


// src/controllers/adminController.js
exports.getAllUsers = async (req, res) => {
  const [users] = await db.execute('SELECT id, username, email, role, phone_number, created_at FROM mombasa_app_users');
  res.json(users);
};

exports.updateUserRoleOrStatus = async (req, res) => {
  const { role } = req.body;
  await db.execute('UPDATE mombasa_app_users SET role = ? WHERE id = ?', [role, req.params.id]);
  res.json({ message: 'User role updated' });
};
