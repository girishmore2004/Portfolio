const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Skill name is required'],
    trim: true,
    unique: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['frontend', 'backend', 'database', 'devops', 'tools', 'other'],
    default: 'other'
  },
  proficiency: {
    type: Number,
    required: [true, 'Proficiency level is required'],
    min: [0, 'Proficiency must be at least 0'],
    max: [100, 'Proficiency cannot exceed 100'],
    default: 50
  },
  icon: {
    type: String,
    trim: true,
    default: null // Can be icon name from icon library or URL
  },
  color: {
    type: String,
    default: '#6366f1' // Default color
  },
  yearsOfExperience: {
    type: Number,
    min: 0,
    default: 0
  },
  order: {
    type: Number,
    default: 0
  },
  visible: {
    type: Boolean,
    default: true
  },
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

// Index for category filtering and ordering
skillSchema.index({ category: 1, order: 1 });
skillSchema.index({ visible: 1, proficiency: -1 });

module.exports = mongoose.model('Skill', skillSchema);