// // const mongoose = require('mongoose');

// // const projectSchema = new mongoose.Schema({
// //   title: {
// //     type: String,
// //     required: [true, 'Project title is required'],
// //     trim: true
// //   },
// //   slug: {
// //     type: String,
// //     unique: true,
// //     lowercase: true
// //   },
// //   description: {
// //     type: String,
// //     required: [true, 'Short description is required'],
// //     maxlength: [200, 'Description must be less than 200 characters']
// //   },
// //   longDescription: {
// //     type: String,
// //     required: [true, 'Detailed description is required']
// //   },
// //   images: [{
// //     url: String,
// //     publicId: String,
// //     alt: String
// //   }],
// //   thumbnail: {
// //     url: String,
// //     publicId: String
// //   },
// //   technologies: [{
// //     type: String,
// //     trim: true
// //   }],
// //   category: {
// //     type: String,
// //     enum: ['web', 'mobile', 'desktop', 'other'],
// //     default: 'web'
// //   },
// //   liveUrl: {
// //     type: String,
// //     trim: true
// //   },
// //   githubUrl: {
// //     type: String,
// //     trim: true
// //   },
// //   featured: {
// //     type: Boolean,
// //     default: false
// //   },
// //   status: {
// //     type: String,
// //     enum: ['draft', 'published'],
// //     default: 'published'
// //   },
// //   order: {
// //     type: Number,
// //     default: 0
// //   },
// //   views: {
// //     type: Number,
// //     default: 0
// //   },
// //   likes: {
// //     type: Number,
// //     default: 0
// //   }
// // }, {
// //   timestamps: true
// // });

// // // Generate slug from title before saving
// // projectSchema.pre('save', function(next) {
// //   if (this.isModified('title')) {
// //     this.slug = this.title
// //       .toLowerCase()
// //       .replace(/[^a-z0-9]+/g, '-')
// //       .replace(/^-|-$/g, '');
// //   }
// //   next();
// // });

// // // Index for search and sorting
// // projectSchema.index({ title: 'text', description: 'text', technologies: 'text' });
// // projectSchema.index({ order: 1, createdAt: -1 });

// // module.exports = mongoose.model('Project', projectSchema);

// const mongoose = require('mongoose');

// /* ===========================
//    ✅ ADDITION: slug helper
// =========================== */
// const slugify = (text) =>
//   text
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, '-')
//     .replace(/^-|-$/g, '');

// const projectSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: [true, 'Project title is required'],
//     trim: true
//   },
//   slug: {
//     type: String,
//     unique: true,
//     lowercase: true,
//     required: true   // ✅ ADDITION (safe)
//   },
//   description: {
//     type: String,
//     required: [true, 'Short description is required'],
//     maxlength: [200, 'Description must be less than 200 characters']
//   },
//   longDescription: {
//     type: String,
//     required: [true, 'Detailed description is required']
//   },
//   images: [{
//     url: String,
//     publicId: String,
//     alt: String
//   }],
//   thumbnail: {
//     url: String,
//     publicId: String
//   },
//   technologies: [{
//     type: String,
//     trim: true
//   }],
//   category: {
//     type: String,
//     enum: ['web', 'mobile', 'desktop', 'other'],
//     default: 'web'
//   },
//   liveUrl: {
//     type: String,
//     trim: true
//   },
//   githubUrl: {
//     type: String,
//     trim: true
//   },
//   featured: {
//     type: Boolean,
//     default: false
//   },
//   status: {
//     type: String,
//     enum: ['draft', 'published'],
//     default: 'published'
//   },
//   order: {
//     type: Number,
//     default: 0
//   },
//   views: {
//     type: Number,
//     default: 0
//   },
//   likes: {
//     type: Number,
//     default: 0
//   }
// }, {
//   timestamps: true
// });

// /* ===========================
//    Existing save middleware
// =========================== */
// projectSchema.pre('save', function(next) {
//   if (this.isModified('title')) {
//     this.slug = slugify(this.title);
//   }
//   next();
// });

// /* ===========================
//    ✅ ADDITION: insertMany hook
// =========================== */
// projectSchema.pre('insertMany', function(next, docs) {
//   docs.forEach((doc, index) => {
//     if (!doc.slug && doc.title) {
//       doc.slug = `${slugify(doc.title)}-${index}`;
//     }
//   });
//   next();
// });

// /* ===========================
//    Indexes (optimized)
// =========================== */
// projectSchema.index(
//   { title: 'text', description: 'text', technologies: 'text' },
//   { background: true }
// );

// projectSchema.index(
//   { order: 1, createdAt: -1 },
//   { background: true }
// );

// module.exports = mongoose.model('Project', projectSchema);



const mongoose = require('mongoose');

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  description: {
    type: String,
    required: [true, 'Short description is required'],
    maxlength: [200, 'Description must be less than 200 characters']
  },
  longDescription: {
    type: String,
    required: [true, 'Detailed description is required']
  },
  images: [{
    url: String,
    publicId: String,
    alt: String
  }],
  thumbnail: {
    url: String,
    publicId: String
  },
  technologies: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    enum: ['web', 'mobile', 'desktop', 'other'],
    default: 'web'
  },
  liveUrl: String,
  githubUrl: String,
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'published'
  },
  order: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

/* ✅ FIX: generate slug BEFORE validation */
projectSchema.pre('validate', function(next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title);
  }
  next();
});

/* Indexes */
projectSchema.index(
  { title: 'text', description: 'text', technologies: 'text' }
);

projectSchema.index(
  { order: 1, createdAt: -1 }
);

module.exports = mongoose.model('Project', projectSchema);
