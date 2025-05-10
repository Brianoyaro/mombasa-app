const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/connection');

exports.registerUser = async (req, res) => {
  const { username, email, password, phone_number } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.execute(
      'INSERT INTO users (username, email, password_hash, phone_number) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, phone_number]
    );
    res.status(201).json({ message: 'User registered', userId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];
    if (!user) return res.status(404).json({ error: 'User not found' });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.logoutUser = (req, res) => {
  // Frontend should discard token – stateless logout
  res.json({ message: 'Logged out successfully' });
};

exports.updateUserProfile = async (req, res) => {
  const { id, username, phone_number } = req.body;
  try {
    await db.execute('UPDATE users SET username = ?, phone_number = ? WHERE id = ?', [username, phone_number, id]);
    res.json({ message: 'Profile updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
