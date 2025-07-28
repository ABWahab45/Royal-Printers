const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Media = require('../models/Media');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Authentication middleware
const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Determine the appropriate subdirectory based on file type
        let uploadDir = path.join(__dirname, '..', 'uploads');

        // Check file mimetype to determine type
        if (file.mimetype.startsWith('image/')) {
            uploadDir = path.join(__dirname, '..', 'uploads', 'images');
        } else if (file.mimetype.startsWith('video/')) {
            uploadDir = path.join(__dirname, '..', 'uploads', 'videos');
        } else {
            uploadDir = path.join(__dirname, '..', 'uploads', 'documents');
        }

        // Ensure directory exists
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ 
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    },
    fileFilter: (req, file, cb) => {
        // Allow images, videos, and documents
        const allowedTypes = /jpeg|jpg|png|gif|mp4|avi|mov|pdf|doc|docx|txt/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only images, videos, and documents are allowed.'));
        }
    }
});

router.post('/upload', authenticate, (req, res) => {
    upload.single('file')(req, res, async (err) => {
        if (err) {
            if (err instanceof multer.MulterError) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    return res.status(400).json({ error: 'File too large. Maximum size is 10MB.' });
                }
                return res.status(400).json({ error: err.message });
            }
            return res.status(400).json({ error: err.message });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        try {
            const { title, type } = req.body;

            if (!title || !type) {
                return res.status(400).json({ error: 'Title and type are required' });
            }

            // Determine the subdirectory based on file type
            let subdir = 'documents';
            if (type === 'image') {
                subdir = 'images';
            } else if (type === 'video') {
                subdir = 'videos';
            }

            const media = new Media({
                title,
                type,
                filePath: `/uploads/${subdir}/${req.file.filename}`
            });
            await media.save();
            res.status(201).json(media);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
});

router.get('/', async (req, res) => {
    try {
        const media = await Media.find();
        res.json(media);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete media by ID
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const media = await Media.findById(req.params.id);
        if (!media) {
            return res.status(404).json({ error: 'Media not found' });
        }

        // Remove the file from the filesystem
        const filePath = path.join(__dirname, '..', media.filePath);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        // Remove from database
        await Media.findByIdAndDelete(req.params.id);
        res.json({ message: 'Media deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
