require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Shyamji Tech API' });
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/hero', require('./routes/heroRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/portfolio', require('./routes/portfolioRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/chatbot', require('./routes/chatbotRoutes'));
app.use('/api/logo', require('./routes/logoRoutes'));
app.use('/api/media', require('./routes/mediaRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));

// Serve Frontend Static Files in Production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../frontend', 'dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
