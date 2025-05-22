// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // pastikan folder uploads/ tersedia
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = `${Date.now()}-${file.originalname}`;
//     cb(null, uniqueName);
//   }
// });

<<<<<<< HEAD
// const upload = multer({ 
//   storage,
//   fileFilter: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
//       return cb(new Error('Only images are allowed'));
//     }
//     cb(null, true);
//   }
// });
=======
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
      return cb(new Error('Only images are allowed'));
    }
    cb(null, true);
  }
});
>>>>>>> 01196bd9ef9a0fce9f934c687fa906fa061ce5e7

// module.exports = upload;
