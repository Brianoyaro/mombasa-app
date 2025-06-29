const db = require('../db/connection');


// src/controllers/alertController.js
exports.getAlerts = async (req, res) => {
  const [alerts] = await db.execute('SELECT * FROM mombasa_app_alerts');
  res.json(alerts);
};

exports.getAlertById = async (req, res) => {
  const [alert] = await db.execute('SELECT * FROM mombasa_app_alerts WHERE id = ?', [req.params.id]);
  res.json(alert[0]);
};

exports.createAlert = async (req, res) => {
  const { title, description, location, severity, created_by } = req.body;
  await db.execute(
    'INSERT INTO mombasa_app_alerts (title, description, location, severity, created_by) VALUES (?, ?, ?, ?, ?)',
    [title, description, location, severity, created_by]
  );
  res.status(201).json({ message: 'Alert created' });
};

exports.updateAlert = async (req, res) => {
  const { title, description, location, severity } = req.body;
  await db.execute(
    'UPDATE mombasa_app_alerts SET title = ?, description = ?, location = ?, severity = ? WHERE id = ?',
    [title, description, location, severity, req.params.id]
  );
  res.json({ message: 'Alert updated' });
};

exports.deleteAlert = async (req, res) => {
  await db.execute('DELETE FROM mombasa_app_alerts WHERE id = ?', [req.params.id]);
  res.json({ message: 'Alert deleted' });
};
