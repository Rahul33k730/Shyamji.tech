const express = require('express');
const router = express.Router();
const { chat, getChatLogs } = require('../controllers/chatbotController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', chat);
router.get('/', authMiddleware, getChatLogs);

module.exports = router;
