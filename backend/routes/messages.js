// const express = require('express');
// const router = express.Router();
// const Message = require('../models/Message');
// const { protect } = require('../middleware/auth');
// const { body } = require('express-validator');

// // SUBMIT contact form (public)
// router.post('/',
//   [
//     body('name').trim().notEmpty(),
//     body('email').isEmail().normalizeEmail(),
//     body('message').trim().isLength({ min: 10 })
//   ],
//   async (req, res, next) => {
//     try {
//       const { name, email, subject, message } = req.body;
      
//       const newMessage = await Message.create({
//         name,
//         email,
//         subject: subject || 'Portfolio Contact',
//         message,
//         ipAddress: req.ip,
//         userAgent: req.headers['user-agent']
//       });
      
//       res.status(201).json({ 
//         success: true, 
//         message: 'Message sent successfully!' 
//       });
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// // GET all messages (admin)
// router.get('/', protect, async (req, res, next) => {
//   try {
//     const { read, starred } = req.query;
    
//     let query = {};
//     if (read !== undefined) query.read = read === 'true';
//     if (starred !== undefined) query.starred = starred === 'true';
    
//     const messages = await Message.find(query).sort({ createdAt: -1 });
    
//     res.json({ success: true, data: messages });
//   } catch (error) {
//     next(error);
//   }
// });

// // GET single message
// router.get('/:id', protect, async (req, res, next) => {
//   try {
//     const message = await Message.findById(req.params.id);
    
//     if (!message) {
//       return res.status(404).json({ success: false, message: 'Message not found' });
//     }
    
//     res.json({ success: true, data: message });
//   } catch (error) {
//     next(error);
//   }
// });

// // MARK as read
// router.put('/:id/read', protect, async (req, res, next) => {
//   try {
//     const message = await Message.findByIdAndUpdate(
//       req.params.id,
//       { read: true },
//       { new: true }
//     );
    
//     if (!message) {
//       return res.status(404).json({ success: false, message: 'Message not found' });
//     }
    
//     res.json({ success: true, data: message });
//   } catch (error) {
//     next(error);
//   }
// });

// // TOGGLE star
// router.put('/:id/star', protect, async (req, res, next) => {
//   try {
//     const message = await Message.findById(req.params.id);
    
//     if (!message) {
//       return res.status(404).json({ success: false, message: 'Message not found' });
//     }
    
//     message.starred = !message.starred;
//     await message.save();
    
//     res.json({ success: true, data: message });
//   } catch (error) {
//     next(error);
//   }
// });

// // DELETE message
// router.delete('/:id', protect, async (req, res, next) => {
//   try {
//     const message = await Message.findById(req.params.id);
    
//     if (!message) {
//       return res.status(404).json({ success: false, message: 'Message not found' });
//     }
    
//     await message.deleteOne();
//     res.json({ success: true, message: 'Message deleted' });
//   } catch (error) {
//     next(error);
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { protect } = require('../middleware/auth');
const { body } = require('express-validator');

const sendEmail = require('../utils/sendEmail');

router.post('/:id/reply', protect, async (req, res, next) => {
  try {
    const { replyMessage } = req.body;

    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    await sendEmail({
      to: message.email,              // RECEIVER EMAIL
      subject: 'Reply to your message',
      text: replyMessage
    });

    res.json({
      success: true,
      message: 'Reply sent successfully'
    });
  } catch (error) {
    next(error);
  }
});

/* CREATE MESSAGE (PUBLIC) */
router.post(
  '/',
  [
    body('name').notEmpty(),
    body('email').isEmail(),
    body('message').isLength({ min: 10 })
  ],
  async (req, res, next) => {
    try {
      const { name, email, subject, message } = req.body;

      await Message.create({
        name,
        email,
        subject,
        message,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent']
      });

      res.status(201).json({ success: true, message: 'Message sent' });
    } catch (err) {
      next(err);
    }
  }
);

/* GET ALL MESSAGES (ADMIN) */
router.get('/', protect, async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json({ success: true, data: messages });
  } catch (err) {
    next(err);
  }
});

/* GET SINGLE */
router.get('/:id', protect, async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ success: false });
    res.json({ success: true, data: message });
  } catch (err) {
    next(err);
  }
});

/* MARK READ */
router.put('/:id/read', protect, async (req, res, next) => {
  try {
    const msg = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    res.json({ success: true, data: msg });
  } catch (err) {
    next(err);
  }
});

/* TOGGLE STAR */
router.put('/:id/star', protect, async (req, res, next) => {
  try {
    const msg = await Message.findById(req.params.id);
    msg.starred = !msg.starred;
    await msg.save();
    res.json({ success: true, data: msg });
  } catch (err) {
    next(err);
  }
});

/* ARCHIVE */
router.put('/:id/archive', protect, async (req, res, next) => {
  try {
    const msg = await Message.findByIdAndUpdate(
      req.params.id,
      { archived: true },
      { new: true }
    );
    res.json({ success: true, data: msg });
  } catch (err) {
    next(err);
  }
});

/* DELETE */
router.delete('/:id', protect, async (req, res, next) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
