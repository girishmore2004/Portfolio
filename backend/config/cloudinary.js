// // const cloudinary = require('cloudinary').v2;

// // cloudinary.config({
// //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// //   api_key: process.env.CLOUDINARY_API_KEY,
// //   api_secret: process.env.CLOUDINARY_API_SECRET
// // });

// // /**
// //  * Upload file to Cloudinary
// //  * @param {Buffer|String} file - File buffer or base64 string
// //  * @param {String} folder - Cloudinary folder name
// //  * @param {String} resourceType - 'image', 'video', 'raw', 'auto'
// //  * @returns {Promise<Object>} Upload result
// //  */
// // // const uploadToCloudinary = async (file, folder = 'portfolio', resourceType = 'auto') => {
// // //   try {
// // //     const result = await cloudinary.uploader.upload(file, {
// // //       folder: folder,
// // //       resource_type: resourceType,
// // //       transformation: resourceType === 'image' ? [
// // //         { width: 2000, crop: 'limit' },
// // //         { quality: 'auto:good' },
// // //         { fetch_format: 'auto' }
// // //       ] : undefined
// // //     });

// // //     return {
// // //       url: result.secure_url,
// // //       publicId: result.public_id,
// // //       width: result.width,
// // //       height: result.height,
// // //       format: result.format
// // //     };
// // //   } catch (error) {
// // //     console.error('Cloudinary upload error:', error);
// // //     throw new Error('Failed to upload file');
// // //   }
// // // };
// // const uploadToCloudinary = async (
// //   file,
// //   folder = 'portfolio',
// //   resourceType = 'auto'
// // ) => {
// //   try {
// //     const options = {
// //       folder,
// //       resource_type: 'auto'
// //     };

// //     // Only apply transformations for images
// //     if (resourceType === 'image') {
// //       options.transformation = 'c_limit,w_2000/q_auto:good/f_auto';
// //     }

// //     const result = await cloudinary.uploader.upload(file, options);

// //     return {
// //       url: result.secure_url,
// //       publicId: result.public_id,
// //       width: result.width || null,
// //       height: result.height || null,
// //       format: result.format
// //     };
// //   } catch (error) {
// //     console.error('Cloudinary upload error:', error);
// //     throw error; // IMPORTANT: don’t mask real Cloudinary error
// //   }
// // };

// // /**
// //  * Delete file from Cloudinary
// //  * @param {String} publicId - Cloudinary public ID
// //  * @param {String} resourceType - 'image', 'video', 'raw'
// //  * @returns {Promise<Object>} Deletion result
// //  */
// // const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
// //   try {
// //     const result = await cloudinary.uploader.destroy(publicId, {
// //       resource_type: resourceType
// //     });
// //     return result;
// //   } catch (error) {
// //     console.error('Cloudinary delete error:', error);
// //     throw new Error('Failed to delete file');
// //   }
// // };

// // module.exports = {
// //   cloudinary,
// //   uploadToCloudinary,
// //   deleteFromCloudinary
// // };



// const cloudinary = require('cloudinary').v2;

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.trim(),
//   api_key: process.env.CLOUDINARY_API_KEY?.trim(),
//   api_secret: process.env.CLOUDINARY_API_SECRET?.trim()
// });

// const uploadToCloudinary = async (
//   file,
//   folder = 'portfolio',
//   resourceType = 'auto'
// ) => {
//   try {
//     const options = {
//       folder,
//       resource_type: resourceType
//     };

//     // ❗ DO NOT apply transformations for base64 uploads
//     const result = await cloudinary.uploader.upload(file, options);

//     return {
//       url: result.secure_url,
//       publicId: result.public_id,
//       width: result.width,
//       height: result.height,
//       format: result.format
//     };
//   } catch (error) {
//     console.error('Cloudinary upload error:', error);
//     throw error;
//   }
// };

// module.exports = {
//   cloudinary,
//   uploadToCloudinary
// };


const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.trim(),
  api_key: process.env.CLOUDINARY_API_KEY?.trim(),
  api_secret: process.env.CLOUDINARY_API_SECRET?.trim()
});

/**
 * Upload file to Cloudinary
 * @param {String} file - Base64 string or file path
 * @param {String} folder - Cloudinary folder name
 * @param {String} resourceType - 'image', 'video', 'raw', 'auto'
 * @returns {Promise<Object>} Upload result
 */
const uploadToCloudinary = async (file, folder = 'portfolio', resourceType = 'auto') => {
  try {
    // Validate Cloudinary config
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      throw new Error('Cloudinary credentials not configured. Check your .env file.');
    }

    const options = {
      folder: folder,
      resource_type: resourceType,
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'pdf', 'doc', 'docx']
    };

    // Only apply image transformations for images
    if (resourceType === 'image') {
      options.transformation = [
        { width: 2000, crop: 'limit' },
        { quality: 'auto:good' },
        { fetch_format: 'auto' }
      ];
    }

    console.log('📤 Uploading to Cloudinary with options:', {
      folder,
      resourceType,
      hasTransformation: !!options.transformation
    });

    const result = await cloudinary.uploader.upload(file, options);

    console.log('✅ Cloudinary upload successful:', {
      publicId: result.public_id,
      url: result.secure_url
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width || null,
      height: result.height || null,
      format: result.format,
      resourceType: result.resource_type
    };
  } catch (error) {
    console.error('❌ Cloudinary upload error:', error);
    
    // Better error messages
    if (error.http_code === 401) {
      throw new Error('Invalid Cloudinary credentials. Please check CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in .env');
    }
    
    if (error.http_code === 420) {
      throw new Error('Cloudinary rate limit exceeded. Please try again later.');
    }
    
    throw new Error(error.message || 'Failed to upload file to Cloudinary');
  }
};

/**
 * Delete file from Cloudinary
 * @param {String} publicId - Cloudinary public ID
 * @param {String} resourceType - 'image', 'video', 'raw'
 * @returns {Promise<Object>} Deletion result
 */
const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
  try {
    if (!publicId) {
      throw new Error('Public ID is required for deletion');
    }

    console.log('🗑️  Deleting from Cloudinary:', publicId);

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType
    });

    console.log('✅ Deletion result:', result);

    return result;
  } catch (error) {
    console.error('❌ Cloudinary delete error:', error);
    throw new Error(error.message || 'Failed to delete file from Cloudinary');
  }
};

/**
 * Test Cloudinary connection
 * @returns {Promise<boolean>}
 */
const testCloudinaryConnection = async () => {
  try {
    await cloudinary.api.ping();
    return true;
  } catch (error) {
    console.error('❌ Cloudinary connection test failed:', error.message);
    return false;
  }
};

module.exports = {
  cloudinary,
  uploadToCloudinary,
  deleteFromCloudinary,
  testCloudinaryConnection
};