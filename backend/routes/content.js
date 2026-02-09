// // const express = require('express');
// // const router = express.Router();
// // const Content = require('../models/Content');
// // const { protect } = require('../middleware/auth');

// // // GET content by section
// // router.get('/:section', async (req, res, next) => {
// //   try {
// //     const content = await Content.findOne({ section: req.params.section });
    
// //     if (!content) {
// //       return res.status(404).json({ 
// //         success: false, 
// //         message: 'Content section not found' 
// //       });
// //     }
    
// //     res.json({ success: true, data: content.data });
// //   } catch (error) {
// //     next(error);
// //   }
// // });

// // // UPDATE content section
// // router.put('/:section', protect, async (req, res, next) => {
// //   try {
// //     let content = await Content.findOne({ section: req.params.section });
    
// //     if (!content) {
// //       // Create if doesn't exist
// //       content = await Content.create({
// //         section: req.params.section,
// //         data: req.body.data
// //       });
// //     } else {
// //       // Save to history before updating
// //       content.saveToHistory(req.user._id);
// //       content.data = req.body.data;
// //       await content.save();
// //     }
    
// //     res.json({ 
// //       success: true, 
// //       message: 'Content updated successfully',
// //       data: content.data 
// //     });
// //   } catch (error) {
// //     next(error);
// //   }
// // });

// // // SAVE draft
// // router.put('/:section/draft', protect, async (req, res, next) => {
// //   try {
// //     const content = await Content.findOne({ section: req.params.section });
    
// //     if (!content) {
// //       return res.status(404).json({ success: false, message: 'Content not found' });
// //     }
    
// //     content.draft = req.body.data;
// //     await content.save();
    
// //     res.json({ success: true, message: 'Draft saved' });
// //   } catch (error) {
// //     next(error);
// //   }
// // });

// // // GET history
// // router.get('/:section/history', protect, async (req, res, next) => {
// //   try {
// //     const content = await Content.findOne({ section: req.params.section })
// //       .populate('history.updatedBy', 'name email');
    
// //     if (!content) {
// //       return res.status(404).json({ success: false, message: 'Content not found' });
// //     }
    
// //     res.json({ success: true, data: content.history });
// //   } catch (error) {
// //     next(error);
// //   }
// // });

// // module.exports = router;

// const express = require('express');
// const router = express.Router();
// const Content = require('../models/Content');
// const { protect } = require('../middleware/auth');

// // GET all content sections
// router.get('/', async (req, res, next) => {
//   try {
//     const allContent = await Content.find({});
    
//     // If no content exists, initialize defaults
//     if (allContent.length === 0) {
//       await Content.initializeDefaults();
//       const initializedContent = await Content.find({});
//       return res.json({ success: true, data: initializedContent });
//     }
    
//     res.json({ success: true, data: allContent });
//   } catch (error) {
//     next(error);
//   }
// });

// // GET content by section
// router.get('/:section', async (req, res, next) => {
//   try {
//     const content = await Content.findOne({ section: req.params.section });
    
//     if (!content) {
//       // Initialize this section with defaults
//       const defaults = {
//         hero: {
//           name: 'Your Name',
//           tagline: 'Building digital experiences that inspire',
//           roles: ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver'],
//           photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
//           backgroundStyle: 'particles',
//           cta: {
//             primary: { text: 'View Projects', link: '#projects' },
//             secondary: { text: 'Download Resume', link: '#resume' }
//           },
//           stats: [
//             { value: '50+', label: 'Projects Completed' },
//             { value: '5+', label: 'Years Experience' },
//             { value: '100%', label: 'Client Satisfaction' }
//           ]
//         },
//         about: {
//           title: 'About Me',
//           bio: 'Your story goes here...',
//           image: '',
//           highlights: [],
//           experience: '5+ years',
//           location: 'Your City, Country',
//           availability: 'Open to opportunities'
//         },
//         contact: {
//           email: 'your.email@example.com',
//           phone: '',
//           address: '',
//           timezone: '',
//           availability: 'Available for projects',
//           preferredContact: 'Email',
//           socialLinks: []
//         },
//         resume: {
//           resumeUrl: '',
//           lastUpdated: new Date().toISOString(),
//           versions: []
//         }
//       };

//       const newContent = await Content.create({
//         section: req.params.section,
//         data: defaults[req.params.section] || {}
//       });

//       return res.json({ success: true, data: newContent.data });
//     }
    
//     res.json({ success: true, data: content.data });
//   } catch (error) {
//     next(error);
//   }
// });

// // CREATE or UPDATE content section
// router.post('/:section', async (req, res, next) => {
//   try {
//     const { section } = req.body;
//     const content = req.body.content || req.body.data;
//     if (!section || !content) {
//       return res.status(400).json({
//         success: false,
//         message: 'Section and content are required'
//       });
//     }


//     let contentDoc = await Content.findOne({ section });
    
//     if (!contentDoc) {
//       // Create new
//       contentDoc = await Content.create({
//         section,
//         data: content
//       });
//     } else {
//       // Save to history before updating (if user is authenticated)
//       if (req.user) {
//         contentDoc.saveToHistory(req.user._id);
//       }
//       contentDoc.data = content;
//       await contentDoc.save();
//     }
    
//     res.json({ 
//       success: true, 
//       message: `${section} section updated successfully`,
//       data: contentDoc.data 
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// // UPDATE content section (alternative PUT endpoint)
// router.put('/:section', async (req, res, next) => {
//   try {
//     let content = await Content.findOne({ section: req.params.section });
    
//     if (!content) {
//       // Create if doesn't exist
//       content = await Content.create({
//         section: req.params.section,
//         data: req.body.data || req.body.content
//       });
//     } else {
//       // Save to history before updating (if user is authenticated)
//       if (req.user) {
//         content.saveToHistory(req.user._id);
//       }
//       content.data = req.body.data || req.body.content;
//       await content.save();
//     }
    
//     res.json({ 
//       success: true, 
//       message: 'Content updated successfully',
//       data: content.data 
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// // DELETE content section
// router.delete('/:section', protect, async (req, res, next) => {
//   try {
//     const content = await Content.findOneAndDelete({ section: req.params.section });
    
//     if (!content) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'Content section not found' 
//       });
//     }
    
//     res.json({ 
//       success: true, 
//       message: 'Content section deleted successfully' 
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// // SAVE draft
// router.put('/:section/draft', protect, async (req, res, next) => {
//   try {
//     const content = await Content.findOne({ section: req.params.section });
    
//     if (!content) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'Content not found' 
//       });
//     }
    
//     content.draft = req.body.data;
//     await content.save();
    
//     res.json({ 
//       success: true, 
//       message: 'Draft saved' 
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// // GET history
// router.get('/:section/history', protect, async (req, res, next) => {
//   try {
//     const content = await Content.findOne({ section: req.params.section })
//       .populate('history.updatedBy', 'name email');
    
//     if (!content) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'Content not found' 
//       });
//     }
    
//     res.json({ 
//       success: true, 
//       data: content.history 
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// // RESTORE from history
// router.post('/:section/restore/:version', protect, async (req, res, next) => {
//   try {
//     const content = await Content.findOne({ section: req.params.section });
    
//     if (!content) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'Content not found' 
//       });
//     }

//     const version = content.history.find(h => h.version === parseInt(req.params.version));
    
//     if (!version) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'Version not found' 
//       });
//     }

//     // Save current to history before restoring
//     content.saveToHistory(req.user._id);
//     content.data = version.data;
//     await content.save();
    
//     res.json({ 
//       success: true, 
//       message: 'Content restored successfully',
//       data: content.data 
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const Content = require('../models/Content');
const { protect } = require('../middleware/auth');

// GET all content sections
router.get('/', async (req, res, next) => {
  try {
    const allContent = await Content.find({});
    
    // If no content exists, initialize defaults
    if (allContent.length === 0) {
      await Content.initializeDefaults();
      const initializedContent = await Content.find({});
      return res.json({ success: true, data: initializedContent });
    }
    
    res.json({ success: true, data: allContent });
  } catch (error) {
    next(error);
  }
});

// GET content by section
router.get('/:section', async (req, res, next) => {
  try {
    const content = await Content.findOne({ section: req.params.section });
    
    if (!content) {
      // Initialize this section with defaults
      const defaults = {
        hero: {
          title: 'Your Name',
          subtitle: 'Full Stack Developer',
          description: 'Building digital experiences that inspire',
          roles: ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast'],
          photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
          backgroundImage: '',
          ctaButtons: [
            { text: 'View Projects', link: '#projects' },
            { text: 'Download Resume', link: '#resume' }
          ],
          stats: [
            { value: '50+', label: 'Projects Completed' },
            { value: '5+', label: 'Years Experience' },
            { value: '100%', label: 'Client Satisfaction' }
          ]
        },
        about: {
          title: 'About Me',
          bio: 'Your story goes here...',
          image: '',
          highlights: ['Award-winning developer', 'Open source contributor', 'Tech enthusiast'],
          experience: '5+ years',
          location: 'Your City, Country',
          availability: 'Open to opportunities'
        },
        contact: {
          email: 'your.email@example.com',
          phone: '+1 (555) 123-4567',
          address: 'City, State, Country',
          timezone: 'PST (UTC-8)',
          availability: 'Available for projects',
          preferredContact: 'Email',
          socialLinks: [
            { platform: 'LinkedIn', url: 'https://linkedin.com/in/yourprofile' },
            { platform: 'GitHub', url: 'https://github.com/yourusername' }
          ]
        },
        resume: {
          resumeUrl: '',
          lastUpdated: new Date().toISOString(),
          versions: []
        }
      };

      const newContent = await Content.create({
        section: req.params.section,
        data: defaults[req.params.section] || {}
      });

      return res.json({ success: true, data: newContent.data });
    }
    
    res.json({ success: true, data: content.data });
  } catch (error) {
    next(error);
  }
});

// CREATE or UPDATE content section - PRIMARY ENDPOINT FOR SAVING
router.post('/', async (req, res, next) => {
  try {
    const { section, content, published } = req.body;
    
    if (!section || !content) {
      return res.status(400).json({
        success: false,
        message: 'Section and content are required'
      });
    }

    let contentDoc = await Content.findOne({ section });
    
    if (!contentDoc) {
      // Create new
      contentDoc = await Content.create({
        section,
        data: content
      });
    } else {
      // Save to history before updating (if user is authenticated)
      if (req.user) {
        contentDoc.saveToHistory(req.user._id);
      }
      contentDoc.data = content;
      await contentDoc.save();
    }
    
    res.json({ 
      success: true, 
      message: `${section} section updated successfully`,
      data: contentDoc.data 
    });
  } catch (error) {
    console.error('Content save error:', error);
    next(error);
  }
});

// UPDATE content section by section param
router.post('/:section', async (req, res, next) => {
  try {
    const section = req.params.section;
    const content = req.body.content || req.body.data;
    
    if (!content) {
      return res.status(400).json({
        success: false,
        message: 'Content is required'
      });
    }

    let contentDoc = await Content.findOne({ section });
    
    if (!contentDoc) {
      // Create new
      contentDoc = await Content.create({
        section,
        data: content
      });
    } else {
      // Save to history before updating (if user is authenticated)
      if (req.user) {
        contentDoc.saveToHistory(req.user._id);
      }
      contentDoc.data = content;
      await contentDoc.save();
    }
    
    res.json({ 
      success: true, 
      message: `${section} section updated successfully`,
      data: contentDoc.data 
    });
  } catch (error) {
    console.error('Content save error:', error);
    next(error);
  }
});

// UPDATE content section (alternative PUT endpoint)
router.put('/:section', async (req, res, next) => {
  try {
    let content = await Content.findOne({ section: req.params.section });
    
    if (!content) {
      // Create if doesn't exist
      content = await Content.create({
        section: req.params.section,
        data: req.body.data || req.body.content
      });
    } else {
      // Save to history before updating (if user is authenticated)
      if (req.user) {
        content.saveToHistory(req.user._id);
      }
      content.data = req.body.data || req.body.content;
      await content.save();
    }
    
    res.json({ 
      success: true, 
      message: 'Content updated successfully',
      data: content.data 
    });
  } catch (error) {
    next(error);
  }
});

// DELETE content section
router.delete('/:section', protect, async (req, res, next) => {
  try {
    const content = await Content.findOneAndDelete({ section: req.params.section });
    
    if (!content) {
      return res.status(404).json({ 
        success: false, 
        message: 'Content section not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Content section deleted successfully' 
    });
  } catch (error) {
    next(error);
  }
});

// SAVE draft
router.put('/:section/draft', protect, async (req, res, next) => {
  try {
    const content = await Content.findOne({ section: req.params.section });
    
    if (!content) {
      return res.status(404).json({ 
        success: false, 
        message: 'Content not found' 
      });
    }
    
    content.draft = req.body.data;
    await content.save();
    
    res.json({ 
      success: true, 
      message: 'Draft saved' 
    });
  } catch (error) {
    next(error);
  }
});

// GET history
router.get('/:section/history', protect, async (req, res, next) => {
  try {
    const content = await Content.findOne({ section: req.params.section })
      .populate('history.updatedBy', 'name email');
    
    if (!content) {
      return res.status(404).json({ 
        success: false, 
        message: 'Content not found' 
      });
    }
    
    res.json({ 
      success: true, 
      data: content.history 
    });
  } catch (error) {
    next(error);
  }
});

// RESTORE from history
router.post('/:section/restore/:version', protect, async (req, res, next) => {
  try {
    const content = await Content.findOne({ section: req.params.section });
    
    if (!content) {
      return res.status(404).json({ 
        success: false, 
        message: 'Content not found' 
      });
    }

    const version = content.history.find(h => h.version === parseInt(req.params.version));
    
    if (!version) {
      return res.status(404).json({ 
        success: false, 
        message: 'Version not found' 
      });
    }

    // Save current to history before restoring
    content.saveToHistory(req.user._id);
    content.data = version.data;
    await content.save();
    
    res.json({ 
      success: true, 
      message: 'Content restored successfully',
      data: content.data 
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;