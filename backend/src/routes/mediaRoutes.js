const express = require('express');
const router = express.Router();
const { upload, uploadFile, deleteFile } = require('../controllers/mediaController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/upload', authMiddleware, upload.single('file'), uploadFile);
router.delete('/delete', authMiddleware, deleteFile);

module.exports = router;
