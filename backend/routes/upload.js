// // const express = require('express');
// // const router = express.Router();
// // const { protect } = require('../middleware/auth');
// // const { uploadSingle, uploadMultiple, handleMulterError } = require('../middleware/upload');
// // const { uploadToCloudinary } = require('../config/cloudinary');

// // /**
// //  * @route   POST /api/upload/single
// //  * @desc    Upload single file
// //  * @access  Private
// //  */
// // router.post('/single', protect, uploadSingle, async (req, res, next) => {
// //   try {
// //     if (!req.file) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'No file uploaded'
// //       });
// //     }

// //     // Convert buffer to base64
// //     const b64 = Buffer.from(req.file.buffer).toString('base64');
// //     const dataURI = `data:${req.file.mimetype};base64,${b64}`;

// //     // Determine folder and resource type
// //     const folder = req.body.folder || 'portfolio';
// //     const resourceType = req.file.mimetype.startsWith('image/') ? 'image' : 'raw';

// //     // Upload to Cloudinary
// //     const result = await uploadToCloudinary(dataURI, folder, resourceType);

// //     res.json({
// //       success: true,
// //       message: 'File uploaded successfully',
// //       data: result
// //     });
// //   } catch (error) {
// //     next(error);
// //   }
// // });

// // /**
// //  * @route   POST /api/upload/multiple
// //  * @desc    Upload multiple files
// //  * @access  Private
// //  */
// // router.post('/multiple', protect, uploadMultiple, handleMulterError, async (req, res, next) => {
// //   try {
// //     if (!req.files || req.files.length === 0) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'No files uploaded'
// //       });
// //     }

// //     const folder = req.body.folder || 'portfolio';
// //     const uploadPromises = [];

// //     for (const file of req.files) {
// //       const b64 = Buffer.from(file.buffer).toString('base64');
// //       const dataURI = `data:${file.mimetype};base64,${b64}`;
// //       const resourceType = file.mimetype.startsWith('image/') ? 'image' : 'raw';

// //       uploadPromises.push(uploadToCloudinary(dataURI, folder, resourceType));
// //     }

// //     const results = await Promise.all(uploadPromises);

// //     res.json({
// //       success: true,
// //       message: `${results.length} files uploaded successfully`,
// //       data: results
// //     });
// //   } catch (error) {
// //     next(error);
// //   }
// // });

// // /**
// //  * @route   POST /api/upload/base64
// //  * @desc    Upload base64 encoded file
// //  * @access  Private
// //  */
// // router.post('/base64', protect, async (req, res, next) => {
// //   try {
// //     const { data, folder } = req.body;

// //     if (!data) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'No data provided'
// //       });
// //     }

// //     // Determine resource type from data URI
// //     const resourceType = data.startsWith('data:image') ? 'image' : 'raw';

// //     const result = await uploadToCloudinary(data, folder || 'portfolio', resourceType);

// //     res.json({
// //       success: true,
// //       message: 'File uploaded successfully',
// //       data: result
// //     });
// //   } catch (error) {
// //     next(error);
// //   }
// // });

// // module.exports = router;


// // // const express = require('express');
// // // const router = express.Router();
// // // const { protect } = require('../middleware/auth');
// // // const { uploadSingle, uploadMultiple, handleMulterError } = require('../middleware/upload');
// // // const {
// // //   uploadSingleFile,
// // //   uploadMultipleFiles,
// // //   uploadBase64File,
// // //   deleteFile
// // // } = require('../controllers/uploadController');

// // // /**
// // //  * @route   POST /api/upload/single
// // //  * @desc    Upload single file
// // //  * @access  Private
// // //  */
// // // router.post('/single', protect, uploadSingle, handleMulterError, uploadSingleFile);

// // // /**
// // //  * @route   POST /api/upload/multiple
// // //  * @desc    Upload multiple files
// // //  * @access  Private
// // //  */
// // // router.post('/multiple', protect, uploadMultiple, handleMulterError, uploadMultipleFiles);

// // // /**
// // //  * @route   POST /api/upload/base64
// // //  * @desc    Upload base64 encoded file
// // //  * @access  Private
// // //  */
// // // router.post('/base64', protect, uploadBase64File);

// // // /**
// // //  * @route   DELETE /api/upload
// // //  * @desc    Delete file from Cloudinary
// // //  * @access  Private
// // //  */
// // // router.delete('/', protect, deleteFile);

// // // module.exports = router;


// const express = require('express');
// const router = express.Router();
// const { protect } = require('../middleware/auth');
// const { uploadSingle, uploadMultiple, handleMulterError } = require('../middleware/upload');
// const { uploadToCloudinary } = require('../config/cloudinary');

// /**
//  * @route   POST /api/upload
//  * @desc    Upload single file (main endpoint for ContentManager)
//  * @access  Public (or add protect middleware if needed)
//  */
// router.post('/', uploadSingle, async (req, res, next) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: 'No file uploaded'
//       });
//     }

//     // Convert buffer to base64
//     const b64 = Buffer.from(req.file.buffer).toString('base64');
//     const dataURI = `data:${req.file.mimetype};base64,${b64}`;

//     // Determine folder and resource type
//     const folder = req.body.folder || 'portfolio';
//     const resourceType = req.file.mimetype.startsWith('image/') ? 'image' : 'raw';

//     // Upload to Cloudinary
//     const result = await uploadToCloudinary(dataURI, folder, resourceType);

//     // Return in the format ContentManager expects
//     res.json({
//       success: true,
//       message: 'File uploaded successfully',
//       url: result.secure_url || result.url, // ContentManager expects 'url' field
//       data: result,
//       filename: result.public_id,
//       originalname: req.file.originalname,
//       size: req.file.size,
//       mimetype: req.file.mimetype
//     });
//   } catch (error) {
//     console.error('Upload error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'File upload failed',
//       error: error.message
//     });
//   }
// });

// /**
//  * @route   POST /api/upload/single
//  * @desc    Upload single file (alternative endpoint)
//  * @access  Private
//  */
// router.post('/single', protect, uploadSingle, async (req, res, next) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: 'No file uploaded'
//       });
//     }

//     // Convert buffer to base64
//     const b64 = Buffer.from(req.file.buffer).toString('base64');
//     const dataURI = `data:${req.file.mimetype};base64,${b64}`;

//     // Determine folder and resource type
//     const folder = req.body.folder || 'portfolio';
//     const resourceType = req.file.mimetype.startsWith('image/') ? 'image' : 'raw';

//     // Upload to Cloudinary
//     const result = await uploadToCloudinary(dataURI, folder, resourceType);

//     res.json({
//       success: true,
//       message: 'File uploaded successfully',
//       data: result
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// /**
//  * @route   POST /api/upload/multiple
//  * @desc    Upload multiple files
//  * @access  Private
//  */
// router.post('/multiple', protect, uploadMultiple, handleMulterError, async (req, res, next) => {
//   try {
//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: 'No files uploaded'
//       });
//     }

//     const folder = req.body.folder || 'portfolio';
//     const uploadPromises = [];

//     for (const file of req.files) {
//       const b64 = Buffer.from(file.buffer).toString('base64');
//       const dataURI = `data:${file.mimetype};base64,${b64}`;
//       const resourceType = file.mimetype.startsWith('image/') ? 'image' : 'raw';

//       uploadPromises.push(uploadToCloudinary(dataURI, folder, resourceType));
//     }

//     const results = await Promise.all(uploadPromises);

//     res.json({
//       success: true,
//       message: `${results.length} files uploaded successfully`,
//       data: results
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// /**
//  * @route   POST /api/upload/base64
//  * @desc    Upload base64 encoded file
//  * @access  Private
//  */
// router.post('/base64', protect, async (req, res, next) => {
//   try {
//     const { data, folder } = req.body;

//     if (!data) {
//       return res.status(400).json({
//         success: false,
//         message: 'No data provided'
//       });
//     }

//     // Determine resource type from data URI
//     const resourceType = data.startsWith('data:image') ? 'image' : 'raw';

//     const result = await uploadToCloudinary(data, folder || 'portfolio', resourceType);

//     res.json({
//       success: true,
//       message: 'File uploaded successfully',
//       data: result
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// /**
//  * @route   DELETE /api/upload/:publicId
//  * @desc    Delete file from Cloudinary
//  * @access  Private
//  */
// router.delete('/:publicId', protect, async (req, res, next) => {
//   try {
//     const { publicId } = req.params;
    
//     if (!publicId) {
//       return res.status(400).json({
//         success: false,
//         message: 'Public ID is required'
//       });
//     }

//     // Import cloudinary if you have a delete function
//     // const { deleteFromCloudinary } = require('../config/cloudinary');
//     // await deleteFromCloudinary(publicId);

//     res.json({
//       success: true,
//       message: 'File deleted successfully'
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// /**
//  * Error handling middleware for multer errors
//  */
// router.use((error, req, res, next) => {
//   if (error.name === 'MulterError') {
//     if (error.code === 'LIMIT_FILE_SIZE') {
//       return res.status(400).json({
//         success: false,
//         message: 'File is too large. Maximum size is 10MB.'
//       });
//     }
//     if (error.code === 'LIMIT_FILE_COUNT') {
//       return res.status(400).json({
//         success: false,
//         message: 'Too many files. Maximum is 10 files.'
//       });
//     }
//     return res.status(400).json({
//       success: false,
//       message: error.message
//     });
//   }
  
//   res.status(500).json({
//     success: false,
//     message: error.message || 'Upload error occurred'
//   });
// });

// module.exports = router;



const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { uploadSingle, uploadMultiple } = require('../middleware/upload');
const { uploadToCloudinary } = require('../config/cloudinary');

/**
 * @route   POST /api/upload/single
 * @desc    Upload single file
 * @access  Private
 */
router.post('/single', protect, (req, res, next) => {
  uploadSingle(req, res, (err) => {
    if (err) {
      console.error('❌ Multer error:', err);
      return res.status(400).json({
        success: false,
        message: err.message || 'File upload failed'
      });
    }
    next();
  });
}, async (req, res) => {
  try {
    console.log('✅ Upload route hit');
    console.log('📁 File received:', req.file ? 'Yes' : 'No');
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    console.log('📄 File details:', {
      filename: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size
    });

    // Check Cloudinary config
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error('❌ Cloudinary credentials missing!');
      return res.status(500).json({
        success: false,
        message: 'Cloudinary is not configured. Please add credentials to .env file'
      });
    }

    // Convert buffer to base64
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    // Determine folder and resource type
    const folder = req.body.folder || 'portfolio';
    const resourceType = req.file.mimetype.startsWith('image/') ? 'image' : 'raw';

    console.log('☁️  Uploading to Cloudinary...');
    console.log('📂 Folder:', folder);
    console.log('🎨 Resource type:', resourceType);

    // Upload to Cloudinary
    const result = await uploadToCloudinary(dataURI, folder, resourceType);

    console.log('✅ Upload successful!');

    res.json({
      success: true,
      message: 'File uploaded successfully',
      data: result
    });
  } catch (error) {
    console.error('❌ Upload error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to upload file',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

/**
 * @route   POST /api/upload/multiple
 * @desc    Upload multiple files
 * @access  Private
 */
router.post('/multiple', protect, (req, res, next) => {
  uploadMultiple(req, res, (err) => {
    if (err) {
      console.error('❌ Multer error:', err);
      return res.status(400).json({
        success: false,
        message: err.message || 'File upload failed'
      });
    }
    next();
  });
}, async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      });
    }

    const folder = req.body.folder || 'portfolio';
    const uploadPromises = [];

    for (const file of req.files) {
      const b64 = Buffer.from(file.buffer).toString('base64');
      const dataURI = `data:${file.mimetype};base64,${b64}`;
      const resourceType = file.mimetype.startsWith('image/') ? 'image' : 'raw';

      uploadPromises.push(uploadToCloudinary(dataURI, folder, resourceType));
    }

    const results = await Promise.all(uploadPromises);

    res.json({
      success: true,
      message: `${results.length} files uploaded successfully`,
      data: results
    });
  } catch (error) {
    console.error('❌ Upload error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to upload files',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

/**
 * @route   POST /api/upload/base64
 * @desc    Upload base64 encoded file
 * @access  Private
 */
router.post('/base64', protect, async (req, res) => {
  try {
    const { data, folder } = req.body;

    if (!data) {
      return res.status(400).json({
        success: false,
        message: 'No data provided'
      });
    }

    // Determine resource type from data URI
    const resourceType = data.startsWith('data:image') ? 'image' : 'raw';

    const result = await uploadToCloudinary(data, folder || 'portfolio', resourceType);

    res.json({
      success: true,
      message: 'File uploaded successfully',
      data: result
    });
  } catch (error) {
    console.error('❌ Upload error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to upload file',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

module.exports = router;