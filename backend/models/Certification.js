const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Certification title is required'],
    trim: true
  },
  issuer: {
    type: String,
    required: [true, 'Issuer is required'],
    trim: true
  },
  issueDate: {
    type: Date,
    required: [true, 'Issue date is required']
  },
  expiryDate: {
    type: Date,
    default: null
  },
  credentialId: {
    type: String,
    trim: true
  },
  verificationUrl: {
    type: String,
    trim: true
  },
  image: {
    url: String,
    publicId: String
  },
  pdfUrl: {
    url: String,
    publicId: String
  },
  category: {
    type: String,
    enum: ['technical', 'professional', 'academic', 'other'],
    default: 'technical'
  },
  skills: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'published'
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Virtual for checking if expired
certificationSchema.virtual('isExpired').get(function() {
  if (!this.expiryDate) return false;
  return this.expiryDate < new Date();
});

// Index for sorting
certificationSchema.index({ issueDate: -1, order: 1 });

certificationSchema.set('toJSON', { virtuals: true });
certificationSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Certification', certificationSchema);