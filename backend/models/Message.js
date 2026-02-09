// const mongoose = require('mongoose');

// const messageSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'Name is required'],
//     trim: true
//   },
//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//     trim: true,
//     lowercase: true,
//     match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
//   },
//   subject: {
//     type: String,
//     trim: true,
//     default: 'Portfolio Contact'
//   },
//   message: {
//     type: String,
//     required: [true, 'Message is required'],
//     minlength: [10, 'Message must be at least 10 characters']
//   },
//   read: {
//     type: Boolean,
//     default: false
//   },
//   starred: {
//     type: Boolean,
//     default: false
//   },
//   replied: {
//     type: Boolean,
//     default: false
//   },
//   ipAddress: {
//     type: String
//   },
//   userAgent: {
//     type: String
//   }
// }, {
//   timestamps: true
// });

// // Index for admin dashboard filtering
// messageSchema.index({ read: 1, createdAt: -1 });
// messageSchema.index({ starred: 1 });

// module.exports = mongoose.model('Message', messageSchema);

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  subject: {
    type: String,
    default: 'Portfolio Contact'
  },
  message: {
    type: String,
    required: true,
    minlength: 10
  },
  read: {
    type: Boolean,
    default: false
  },
  starred: {
    type: Boolean,
    default: false
  },
  archived: {                 // ✅ ADDED
    type: Boolean,
    default: false
  },
  ipAddress: String,
  userAgent: String
}, {
  timestamps: true
});

messageSchema.index({ read: 1, createdAt: -1 });
messageSchema.index({ starred: 1 });
messageSchema.index({ archived: 1 });

module.exports = mongoose.model('Message', messageSchema);
