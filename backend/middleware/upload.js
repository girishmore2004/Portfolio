// const multer = require('multer');
// const path = require('path');

// // Configure memory storage (we'll upload to Cloudinary from memory)
// const storage = multer.memoryStorage();

// // File filter
// const fileFilter = (req, file, cb) => {
//   // Allowed image extensions
//   const imageTypes = /jpeg|jpg|png|gif|webp|svg/;
//   // Allowed document extensions
//   const docTypes = /pdf|doc|docx/;
  
//   const extname = path.extname(file.originalname).toLowerCase().substring(1);
//   const mimetype = file.mimetype;

//   // Check if file is image
//   if (imageTypes.test(extname) && mimetype.startsWith('image/')) {
//     return cb(null, true);
//   }
  
//   // Check if file is document
//   if (docTypes.test(extname) && mimetype === 'application/pdf' || mimetype.includes('word')) {
//   return cb(null, true);
//   }


//   cb(new Error(`Invalid file type. Only ${imageTypes.source} and ${docTypes.source} are allowed.`));
// };

// // Multer upload configuration
// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 10 * 1024 * 1024, // 10MB max file size
//   },
//   fileFilter: fileFilter
// });

// // Middleware for single image upload
// const uploadSingle = upload.single('file');

// // Middleware for multiple images upload
// const uploadMultiple = upload.array('files', 10); // Max 10 files

// // Error handler for multer
// const handleMulterError = (err, req, res, next) => {
//   if (err instanceof multer.MulterError) {
//     if (err.code === 'LIMIT_FILE_SIZE') {
//       return res.status(400).json({
//         success: false,
//         message: 'File size too large. Maximum size is 10MB.'
//       });
//     }
//     if (err.code === 'LIMIT_FILE_COUNT') {
//       return res.status(400).json({
//         success: false,
//         message: 'Too many files. Maximum is 10 files.'
//       });
//     }
//     return res.status(400).json({
//       success: false,
//       message: err.message
//     });
//   }
  
//   if (err) {
//     return res.status(400).json({
//       success: false,
//       message: err.message
//     });
//   }
  
//   next();
// };

// module.exports = {
//   uploadSingle,
//   uploadMultiple,
//   handleMulterError
// };



const multer = require('multer');
const path = require('path');

// Memory storage (Cloudinary upload)
const storage = multer.memoryStorage();

// File filter
// const fileFilter = (req, file, cb) => {
//   const imageTypes = /jpeg|jpg|png|gif|webp/;
//   const docTypes = /pdf|doc|docx/;

//   const extname = path.extname(file.originalname).toLowerCase().substring(1);
//   const mimetype = file.mimetype;

//   // Image validation
//   if (imageTypes.test(extname) && mimetype.startsWith('image/')) {
//     return cb(null, true);
//   }

//   // Document validation
//   if (
//     docTypes.test(extname) &&
//     (
//       mimetype === 'application/pdf' ||
//       mimetype === 'application/msword' ||
//       mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
//     )
//   ) {
//     return cb(null, true);
//   }

//   cb(new Error('Invalid file type. Only images and PDF/DOC/DOCX files are allowed.'));
// };
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    // Images
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/gif',
    'image/webp',

    // Documents
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  console.log('📁 Upload attempt:', {
    name: file.originalname,
    mimetype: file.mimetype
  });

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `Invalid file type (${file.mimetype}). Only images and PDF/DOC/DOCX files are allowed.`
      )
    );
  }
};

// Multer config
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  },
  fileFilter
});

// Upload handlers
const uploadSingle = upload.single('file');
const uploadMultiple = upload.array('files', 10);

// Multer error handler
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size too large. Maximum allowed is 10MB.'
      });
    }

    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Too many files. Maximum is 10.'
      });
    }

    return res.status(400).json({
      success: false,
      message: err.message
    });
  }

  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }

  next();
};

module.exports = {
  uploadSingle,
  uploadMultiple,
  handleMulterError
};
