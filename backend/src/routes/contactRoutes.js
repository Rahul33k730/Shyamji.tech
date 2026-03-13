const express = require('express');
const router = express.Router();
const { submitContactForm, getContactMessages, updateMessageStatus, subscribeNewsletter } = require('../controllers/contactController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', submitContactForm);
router.get('/', authMiddleware, getContactMessages);
router.put('/:id', authMiddleware, updateMessageStatus);
router.post('/subscribe', subscribeNewsletter);

module.exports = router;
