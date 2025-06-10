const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/connection');

exports.registerUser = async (req, res) => {
  const { username, email, password, phone_number } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword)
    const [result] = await db.execute(
      'INSERT INTO mombasa_app_users (username, email, password_hash, phone_number) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, phone_number]
    );
    res.status(201).json({ message: 'User registered', userId: result.insertId });
  } catch (error) {
    console.log('Registration error:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await db.execute('SELECT * FROM mombasa_app_users WHERE email = ?', [email]);
    const user = rows[0];
    if (!user) return res.status(404).json({ error: 'User not found' });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: 'Invalid password' });

    // const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h' // or '7d', '30m', etc.
    });
    // res.json({ token });
    
    // Optionally, you can set the token in a cookie
    res.cookie('token', token,
      { 
        httpOnly: true,
        secure: true, // Set to true if using HTTPS
        sameSite: 'None',
        maxAge: 3600000 // 1 hour
      });
    res.status(200).json({ message: 'Login successful' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.logoutUser = (req, res) => {
  // Frontend should discard token – stateless logout
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
};

exports.updateUserProfile = async (req, res) => {
  const { id, username, phone_number } = req.body;
  try {
    await db.execute('UPDATE mombasa_app_users SET username = ?, phone_number = ? WHERE id = ?', [username, phone_number, id]);
    res.json({ message: 'Profile updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
