// const mongoose = require('mongoose');

// const contentSchema = new mongoose.Schema({
//   section: {
//     type: String,
//     required: [true, 'Section name is required'],
//     enum: ['hero', 'about', 'contact', 'resume', 'footer', 'seo'],
//     unique: true
//   },
//   data: {
//     type: mongoose.Schema.Types.Mixed,
//     required: true
//   },
//   version: {
//     type: Number,
//     default: 1
//   },
//   draft: {
//     type: mongoose.Schema.Types.Mixed,
//     default: null
//   },
//   history: [{
//     version: Number,
//     data: mongoose.Schema.Types.Mixed,
//     updatedBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User'
//     },
//     updatedAt: Date
//   }]
// }, {
//   timestamps: true
// });

// // Method to save current version to history
// contentSchema.methods.saveToHistory = function(userId) {
//   this.history.push({
//     version: this.version,
//     data: this.data,
//     updatedBy: userId,
//     updatedAt: new Date()
//   });
  
//   // Keep only last 10 versions
//   if (this.history.length > 10) {
//     this.history = this.history.slice(-10);
//   }
  
//   this.version += 1;
// };

// // Static method to initialize default content
// contentSchema.statics.initializeDefaults = async function() {
//   const defaults = [
//     {
//       section: 'hero',
//       data: {
//         name: 'Your Name',
//         tagline: 'Full Stack Developer',
//         roles: ['Developer', 'Designer', 'Problem Solver'],
//         backgroundStyle: 'particles',
//         cta: {
//           primary: { text: 'View Projects', link: '#projects' },
//           secondary: { text: 'Download Resume', link: '#resume' }
//         }
//       }
//     },
//     {
//       section: 'about',
//       data: {
//         title: 'About Me',
//         whoIAm: 'Your story goes here...',
//         whatIDo: 'What you do professionally...',
//         whyIBuild: 'Your motivation and passion...',
//         image: { url: '', alt: 'Profile picture' },
//         achievements: []
//       }
//     },
//     {
//       section: 'contact',
//       data: {
//         email: 'your.email@example.com',
//         phone: '',
//         availability: 'Open to opportunities',
//         social: {
//           github: '',
//           linkedin: '',
//           twitter: '',
//           portfolio: ''
//         },
//         location: 'Your City, Country'
//       }
//     },
//     {
//       section: 'resume',
//       data: {
//         versions: [],
//         activeVersion: null,
//         lastUpdated: new Date()
//       }
//     },
//     {
//       section: 'seo',
//       data: {
//         title: 'Your Name - Portfolio',
//         description: 'Full stack developer portfolio',
//         keywords: ['developer', 'portfolio', 'web development'],
//         ogImage: ''
//       }
//     }
//   ];

//   for (const defaultContent of defaults) {
//     await this.findOneAndUpdate(
//       { section: defaultContent.section },
//       defaultContent,
//       { upsert: true, new: true }
//     );
//   }
// };

// module.exports = mongoose.model('Content', contentSchema);


const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  section: {
    type: String,
    required: [true, 'Section name is required'],
    enum: ['hero', 'about', 'contact', 'resume', 'footer', 'seo'],
    unique: true
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  version: {
    type: Number,
    default: 1
  },
  draft: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  history: [{
    version: Number,
    data: mongoose.Schema.Types.Mixed,
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    updatedAt: Date
  }]
}, {
  timestamps: true
});

// Method to save current version to history
contentSchema.methods.saveToHistory = function(userId) {
  this.history.push({
    version: this.version,
    data: this.data,
    updatedBy: userId,
    updatedAt: new Date()
  });
  
  // Keep only last 10 versions
  if (this.history.length > 10) {
    this.history = this.history.slice(-10);
  }
  
  this.version += 1;
};

// Static method to initialize default content
contentSchema.statics.initializeDefaults = async function() {
  const defaults = [
    {
      section: 'hero',
      data: {
        name: 'Your Name',
        tagline: 'Full Stack Developer',
        roles: ['Developer', 'Designer', 'Problem Solver'],
        photoUrl: '', // Added for profile photo
        backgroundStyle: 'particles',
        cta: {
          primary: { text: 'View Projects', link: '#projects' },
          secondary: { text: 'Download Resume', link: '#resume' }
        }
      }
    },
    {
      section: 'about',
      data: {
        title: 'About Me',
        whoIAm: 'Your story goes here...',
        whatIDo: 'What you do professionally...',
        whyIBuild: 'Your motivation and passion...',
        image: { url: '', alt: 'Profile picture' },
        achievements: []
      }
    },
    {
      section: 'contact',
      data: {
        email: 'your.email@example.com',
        phone: '',
        availability: 'Open to opportunities',
        social: {
          github: '',
          linkedin: '',
          twitter: '',
          portfolio: ''
        },
        location: 'Your City, Country'
      }
    },
    {
      section: 'resume',
      data: {
        versions: [],
        activeVersion: null,
        lastUpdated: new Date()
      }
    },
    {
      section: 'seo',
      data: {
        title: 'Your Name - Portfolio',
        description: 'Full stack developer portfolio',
        keywords: ['developer', 'portfolio', 'web development'],
        ogImage: ''
      }
    }
  ];

  for (const defaultContent of defaults) {
    await this.findOneAndUpdate(
      { section: defaultContent.section },
      defaultContent,
      { upsert: true, new: true }
    );
  }
};

module.exports = mongoose.model('Content', contentSchema);