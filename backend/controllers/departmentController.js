const db = require('../db/connection');



// src/controllers/departmentController.js
exports.getDepartments = async (req, res) => {
  const [departments] = await db.execute('SELECT * FROM mombasa_app_departments');
  res.json(departments);
};

exports.createDepartment = async (req, res) => {
  const { name, contact_info } = req.body;
  await db.execute('INSERT INTO mombasa_app_departments (name, contact_info) VALUES (?, ?)', [name, contact_info]);
  res.status(201).json({ message: 'Department created' });
};

exports.updateDepartment = async (req, res) => {
  const { name, contact_info } = req.body;
  await db.execute('UPDATE mombasa_app_departments SET name = ?, contact_info = ? WHERE id = ?', [name, contact_info, req.params.id]);
  res.json({ message: 'Department updated' });
};

exports.deleteDepartment = async (req, res) => {
  await db.execute('DELETE FROM mombasa_app_departments WHERE id = ?', [req.params.id]);
  res.json({ message: 'Department deleted' });
};

exports.assignDepartmentToReport = async (req, res) => {
  const { id: report_id, departmentId } = req.params;
  await db.execute('INSERT INTO mombasa_app_report_departments (report_id, department_id) VALUES (?, ?)', [report_id, departmentId]);
  res.status(201).json({ message: 'Department assigned to report' });
};
