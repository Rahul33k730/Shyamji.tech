const express = require('express');
const router = express.Router();
const { getPortfolio, createPortfolio, updatePortfolio, deletePortfolio } = require('../controllers/portfolioController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', getPortfolio);
router.post('/', authMiddleware, createPortfolio);
router.put('/:id', authMiddleware, updatePortfolio);
router.delete('/:id', authMiddleware, deletePortfolio);

module.exports = router;
