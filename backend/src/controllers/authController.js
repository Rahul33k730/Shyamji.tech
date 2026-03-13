const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.adminUser.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    if (err.code === 'ECONNREFUSED') {
      return res.status(503).json({ message: 'Database connection failed. Please ensure your PostgreSQL server is running and the DATABASE_URL in .env is correct.' });
    }
    res.status(500).json({ message: 'Server error during authentication. Please check backend logs.' });
  }
};

const register = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const existingUser = await prisma.adminUser.findUnique({
      where: { username },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.adminUser.create({
      data: {
        username,
        password: hashedPassword,
        role: role || 'ADMIN',
      },
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { login, register };
