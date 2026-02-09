// // const express = require('express');
// // const cors = require('cors');
// // const helmet = require('helmet');
// // const morgan = require('morgan');
// // const compression = require('compression');
// // const cookieParser = require('cookie-parser');
// // const dotenv = require('dotenv');
// // const connectDB = require('./config/db');
// // const errorHandler = require('./middleware/errorHandler');
// // const { handleMulterError } = require('./middleware/upload');



// // // Load environment variables
// // dotenv.config();

// // // Connect to MongoDB
// // connectDB();

// // const app = express();

// // // Middleware
// // app.use(helmet());
// // app.use(cors({
// //   origin: process.env.CLIENT_URL || 'http://localhost:5173',
// //   credentials: true
// // }));
// // app.use(compression());
// // app.use(morgan('dev'));
// // app.use(express.json({ limit: '10mb' }));
// // app.use(express.urlencoded({ extended: true, limit: '10mb' }));
// // app.use(cookieParser());

// // // Routes
// // app.use('/api/auth', require('./routes/auth'));
// // app.use('/api/projects', require('./routes/projects'));
// // app.use('/api/certifications', require('./routes/certifications'));
// // app.use('/api/skills', require('./routes/skills'));
// // app.use('/api/content', require('./routes/content'));
// // app.use('/api/messages', require('./routes/messages'));
// // app.use('/api/upload', require('./routes/upload'));
// // app.use(handleMulterError);

// // // Health check
// // app.get('/api/health', (req, res) => {
// //   res.json({ 
// //     status: 'ok', 
// //     timestamp: new Date().toISOString(),
// //     environment: process.env.NODE_ENV 
// //   });
// // });

// // // 404 handler
// // app.use((req, res) => {
// //   res.status(404).json({ message: 'Route not found' });
// // });

// // // Error handler (must be last)
// // app.use(errorHandler);

// // const PORT = process.env.PORT || 5000;

// // app.listen(PORT, () => {
// //   console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
// // });

// // module.exports = app;


// const express = require('express');
// const cors = require('cors');
// const helmet = require('helmet');
// const morgan = require('morgan');
// const compression = require('compression');
// const cookieParser = require('cookie-parser');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');
// const errorHandler = require('./middleware/errorHandler');
// const ensureAdmin = require('./utils/ensureAdmin');

// // Load environment variables
// dotenv.config();

// // Connect to MongoDB
// connectDB();

// const app = express();

// // Middleware
// app.use(helmet());
// app.use(cors({
//   origin: process.env.CLIENT_URL || 'http://localhost:5173',
//   credentials: true
// }));
// app.use(compression());
// app.use(morgan('dev'));
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));
// app.use(cookieParser());

// // Routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/projects', require('./routes/projects'));
// app.use('/api/certifications', require('./routes/certifications'));
// app.use('/api/skills', require('./routes/skills'));
// app.use('/api/content', require('./routes/content'));
// app.use('/api/messages', require('./routes/messages'));
// app.use('/api/upload', require('./routes/upload')); // ✅ Upload route
// const settingsRoutes = require('./routes/settings');

// app.use('/api/settings', settingsRoutes);

// // Health check
// app.get('/api/health', (req, res) => {
//   res.json({ 
//     status: 'ok', 
//     timestamp: new Date().toISOString(),
//     environment: process.env.NODE_ENV,
//     cloudinary: {
//       configured: !!(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET)
//     }
//   });
// });

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({ 
//     success: false,
//     message: 'Route not found',
//     path: req.path 
//   });
// });

// // Error handler (must be last)
// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
//   console.log(`📡 API available at http://localhost:${PORT}/api`);
  
//   // Check Cloudinary configuration
//   if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
//     console.log('☁️  Cloudinary configured');
//   } else {
//     console.warn('⚠️  Cloudinary NOT configured - uploads will fail!');
//     console.warn('   Add these to backend/.env:');
//     console.warn('   - CLOUDINARY_CLOUD_NAME');
//     console.warn('   - CLOUDINARY_API_KEY');
//     console.warn('   - CLOUDINARY_API_SECRET');
//   }
// });

// module.exports = app;


const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const ensureAdmin = require('./utils/ensureAdmin');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(compression());
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/certifications', require('./routes/certifications'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/content', require('./routes/content'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/settings', require('./routes/settings'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    cloudinary: {
      configured: !!(
        process.env.CLOUDINARY_CLOUD_NAME &&
        process.env.CLOUDINARY_API_KEY &&
        process.env.CLOUDINARY_API_SECRET
      ),
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path,
  });
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// 🔥 START SERVER AFTER DB + ADMIN CHECK
const startServer = async () => {
  try {
    await connectDB();          // ✅ Wait for MongoDB
    await ensureAdmin();        // ✅ Auto-create admin if missing

    app.listen(PORT, () => {
      console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
      console.log(`📡 API available at http://localhost:${PORT}/api`);

      if (
        process.env.CLOUDINARY_CLOUD_NAME &&
        process.env.CLOUDINARY_API_KEY &&
        process.env.CLOUDINARY_API_SECRET
      ) {
        console.log('☁️  Cloudinary configured');
      } else {
        console.warn('⚠️  Cloudinary NOT configured - uploads will fail!');
      }
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
