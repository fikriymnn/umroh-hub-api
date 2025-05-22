const multer = require('multer');
const path = require('path');

const storagePackageUmroh = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'package_images/'); // pastikan folder uploads/ tersedia
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});

const uploadPackage = multer({
    storagePackageUmroh,
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            return cb(new Error('Only images are allowed'));
        }
        cb(null, true);
    }
});

module.exports = uploadPackage;