// const { uploadToCloudinary, deleteFromCloudinary } = require('../config/cloudinary');

// /**
//  * @desc    Upload single file to Cloudinary
//  * @param   {Object} req - Express request object
//  * @param   {Object} res - Express response object
//  * @returns {Object} JSON response with upload result
//  */
// const uploadSingleFile = async (req, res, next) => {
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

//     res.status(200).json({
//       success: true,
//       message: 'File uploaded successfully',
//       url: result.secure_url,
//       publicId: result.public_id,
//       data: {
//         url: result.secure_url,
//         publicId: result.public_id,
//         format: result.format,
//         width: result.width,
//         height: result.height,
//         size: result.bytes,
//         resourceType: result.resource_type,
//         createdAt: result.created_at
//       }
//     });
//   } catch (error) {
//     console.error('Upload error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to upload file',
//       error: error.message
//     });
//   }
// };

// /**
//  * @desc    Upload multiple files to Cloudinary
//  * @param   {Object} req - Express request object
//  * @param   {Object} res - Express response object
//  * @returns {Object} JSON response with upload results
//  */
// const uploadMultipleFiles = async (req, res, next) => {
//   try {
//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: 'No files uploaded'
//       });
//     }

//     const folder = req.body.folder || 'portfolio';
//     const uploadPromises = [];

//     // Process each file
//     for (const file of req.files) {
//       const b64 = Buffer.from(file.buffer).toString('base64');
//       const dataURI = `data:${file.mimetype};base64,${b64}`;
//       const resourceType = file.mimetype.startsWith('image/') ? 'image' : 'raw';

//       uploadPromises.push(uploadToCloudinary(dataURI, folder, resourceType));
//     }

//     // Upload all files
//     const results = await Promise.all(uploadPromises);

//     // Format response
//     const uploadedFiles = results.map(result => ({
//       url: result.secure_url,
//       publicId: result.public_id,
//       format: result.format,
//       width: result.width,
//       height: result.height,
//       size: result.bytes,
//       resourceType: result.resource_type,
//       createdAt: result.created_at
//     }));

//     res.status(200).json({
//       success: true,
//       message: `${results.length} file(s) uploaded successfully`,
//       count: results.length,
//       data: uploadedFiles
//     });
//   } catch (error) {
//     console.error('Multiple upload error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to upload files',
//       error: error.message
//     });
//   }
// };

// /**
//  * @desc    Upload base64 encoded file to Cloudinary
//  * @param   {Object} req - Express request object
//  * @param   {Object} res - Express response object
//  * @returns {Object} JSON response with upload result
//  */
// const uploadBase64File = async (req, res, next) => {
//   try {
//     const { data, folder, fileName } = req.body;

//     if (!data) {
//       return res.status(400).json({
//         success: false,
//         message: 'No data provided'
//       });
//     }

//     // Validate base64 format
//     if (!data.startsWith('data:')) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid base64 format. Must start with "data:"'
//       });
//     }

//     // Determine resource type from data URI
//     const resourceType = data.startsWith('data:image') ? 'image' : 'raw';

//     // Upload options
//     const uploadFolder = folder || 'portfolio';
//     const options = fileName ? { public_id: fileName } : {};

//     const result = await uploadToCloudinary(data, uploadFolder, resourceType, options);

//     res.status(200).json({
//       success: true,
//       message: 'File uploaded successfully',
//       url: result.secure_url,
//       publicId: result.public_id,
//       data: {
//         url: result.secure_url,
//         publicId: result.public_id,
//         format: result.format,
//         width: result.width,
//         height: result.height,
//         size: result.bytes,
//         resourceType: result.resource_type,
//         createdAt: result.created_at
//       }
//     });
//   } catch (error) {
//     console.error('Base64 upload error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to upload file',
//       error: error.message
//     });
//   }
// };

// /**
//  * @desc    Delete file from Cloudinary
//  * @param   {Object} req - Express request object
//  * @param   {Object} res - Express response object
//  * @returns {Object} JSON response
//  */
// const deleteFile = async (req, res, next) => {
//   try {
//     const { publicId, resourceType } = req.body;

//     if (!publicId) {
//       return res.status(400).json({
//         success: false,
//         message: 'Public ID is required'
//       });
//     }

//     // Delete from Cloudinary
//     const result = await deleteFromCloudinary(publicId, resourceType || 'image');

//     if (result.result === 'ok' || result.result === 'not found') {
//       return res.status(200).json({
//         success: true,
//         message: 'File deleted successfully',
//         data: result
//       });
//     }

//     res.status(400).json({
//       success: false,
//       message: 'Failed to delete file',
//       data: result
//     });
//   } catch (error) {
//     console.error('Delete error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to delete file',
//       error: error.message
//     });
//   }
// };

// /**
//  * @desc    Delete multiple files from Cloudinary
//  * @param   {Object} req - Express request object
//  * @param   {Object} res - Express response object
//  * @returns {Object} JSON response
//  */
// const deleteMultipleFiles = async (req, res, next) => {
//   try {
//     const { publicIds, resourceType } = req.body;

//     if (!publicIds || !Array.isArray(publicIds) || publicIds.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: 'Public IDs array is required'
//       });
//     }

//     // Delete all files
//     const deletePromises = publicIds.map(publicId =>
//       deleteFromCloudinary(publicId, resourceType || 'image')
//     );

//     const results = await Promise.all(deletePromises);

//     const successCount = results.filter(r => r.result === 'ok').length;

//     res.status(200).json({
//       success: true,
//       message: `${successCount} file(s) deleted successfully`,
//       count: successCount,
//       total: publicIds.length,
//       data: results
//     });
//   } catch (error) {
//     console.error('Multiple delete error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to delete files',
//       error: error.message
//     });
//   }
// };

// /**
//  * @desc    Get upload URL for direct client-side upload
//  * @param   {Object} req - Express request object
//  * @param   {Object} res - Express response object
//  * @returns {Object} JSON response with upload signature
//  */
// const getUploadSignature = async (req, res, next) => {
//   try {
//     const cloudinary = require('cloudinary').v2;
//     const { folder, resourceType } = req.body;

//     const timestamp = Math.round(new Date().getTime() / 1000);

//     const signature = cloudinary.utils.api_sign_request(
//       {
//         timestamp,
//         folder: folder || 'portfolio',
//         resource_type: resourceType || 'auto'
//       },
//       process.env.CLOUDINARY_API_SECRET
//     );

//     res.status(200).json({
//       success: true,
//       data: {
//         signature,
//         timestamp,
//         cloudName: process.env.CLOUDINARY_CLOUD_NAME,
//         apiKey: process.env.CLOUDINARY_API_KEY,
//         folder: folder || 'portfolio'
//       }
//     });
//   } catch (error) {
//     console.error('Signature error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to generate upload signature',
//       error: error.message
//     });
//   }
// };

// /**
//  * @desc    Upload image from URL
//  * @param   {Object} req - Express request object
//  * @param   {Object} res - Express response object
//  * @returns {Object} JSON response
//  */
// const uploadFromUrl = async (req, res, next) => {
//   try {
//     const { url, folder } = req.body;

//     if (!url) {
//       return res.status(400).json({
//         success: false,
//         message: 'URL is required'
//       });
//     }

//     // Validate URL format
//     try {
//       new URL(url);
//     } catch (e) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid URL format'
//       });
//     }

//     const cloudinary = require('cloudinary').v2;

//     const result = await cloudinary.uploader.upload(url, {
//       folder: folder || 'portfolio',
//       resource_type: 'auto'
//     });

//     res.status(200).json({
//       success: true,
//       message: 'File uploaded successfully',
//       url: result.secure_url,
//       publicId: result.public_id,
//       data: {
//         url: result.secure_url,
//         publicId: result.public_id,
//         format: result.format,
//         width: result.width,
//         height: result.height,
//         size: result.bytes,
//         resourceType: result.resource_type,
//         createdAt: result.created_at
//       }
//     });
//   } catch (error) {
//     console.error('URL upload error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to upload file from URL',
//       error: error.message
//     });
//   }
// };

// /**
//  * @desc    Transform/resize image
//  * @param   {Object} req - Express request object
//  * @param   {Object} res - Express response object
//  * @returns {Object} JSON response with transformed URL
//  */
// const transformImage = async (req, res, next) => {
//   try {
//     const { publicId, width, height, crop, quality, format } = req.body;

//     if (!publicId) {
//       return res.status(400).json({
//         success: false,
//         message: 'Public ID is required'
//       });
//     }

//     const cloudinary = require('cloudinary').v2;

//     const transformations = {};
//     if (width) transformations.width = width;
//     if (height) transformations.height = height;
//     if (crop) transformations.crop = crop;
//     if (quality) transformations.quality = quality;
//     if (format) transformations.format = format;

//     const transformedUrl = cloudinary.url(publicId, transformations);

//     res.status(200).json({
//       success: true,
//       message: 'Image transformed successfully',
//       url: transformedUrl,
//       transformations
//     });
//   } catch (error) {
//     console.error('Transform error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to transform image',
//       error: error.message
//     });
//   }
// };

// module.exports = {
//   uploadSingleFile,
//   uploadMultipleFiles,
//   uploadBase64File,
//   deleteFile,
//   deleteMultipleFiles,
//   getUploadSignature,
//   uploadFromUrl,
//   transformImage
// };


const { uploadToCloudinary, deleteFromCloudinary } = require('../config/cloudinary');

/**
 * @desc    Upload single file to Cloudinary
 * @route   POST /api/upload/single
 * @access  Private
 */
const uploadSingleFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    // Convert buffer to base64
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    // Determine folder and resource type
    const folder = req.body.folder || 'portfolio';
    const resourceType = req.file.mimetype.startsWith('image/') ? 'image' : 'raw';

    // Upload to Cloudinary
    const result = await uploadToCloudinary(dataURI, folder, resourceType);

    res.json({
      success: true,
      message: 'File uploaded successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Upload multiple files to Cloudinary
 * @route   POST /api/upload/multiple
 * @access  Private
 */
const uploadMultipleFiles = async (req, res, next) => {
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
    next(error);
  }
};

/**
 * @desc    Upload base64 encoded file to Cloudinary
 * @route   POST /api/upload/base64
 * @access  Private
 */
const uploadBase64File = async (req, res, next) => {
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
    next(error);
  }
};

/**
 * @desc    Delete file from Cloudinary
 * @route   DELETE /api/upload
 * @access  Private
 */
const deleteFile = async (req, res, next) => {
  try {
    const { publicId, resourceType } = req.body;

    if (!publicId) {
      return res.status(400).json({
        success: false,
        message: 'Public ID is required'
      });
    }

    const result = await deleteFromCloudinary(publicId, resourceType || 'image');

    res.json({
      success: true,
      message: 'File deleted successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadSingleFile,
  uploadMultipleFiles,
  uploadBase64File,
  deleteFile
};