const express = require('express');
const router = express.Router();
const { getLogo, updateLogo } = require('../controllers/logoController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', getLogo);
router.put('/', authMiddleware, updateLogo);

module.exports = router;
