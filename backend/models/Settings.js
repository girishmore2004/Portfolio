const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },

    notifications: {
      emailNotifications: { type: Boolean, default: true },
      newMessages: { type: Boolean, default: true },
      projectUpdates: { type: Boolean, default: false },
      weeklyDigest: { type: Boolean, default: true },
      marketingEmails: { type: Boolean, default: false },
    },

    security: {
      twoFactorAuth: { type: Boolean, default: false },
      sessionTimeout: { type: String, default: '30' },
      loginAlerts: { type: Boolean, default: true },
      allowedIPs: [{ type: String }],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Settings', settingsSchema);
