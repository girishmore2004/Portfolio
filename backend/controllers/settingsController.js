const Settings = require('../models/Settings');

/**
 * Get or create settings for user
 */
const getOrCreateSettings = async (userId) => {
  let settings = await Settings.findOne({ user: userId });

  if (!settings) {
    settings = await Settings.create({ user: userId });
  }

  return settings;
};

// PATCH /api/settings/security
exports.updateSecuritySettings = async (req, res) => {
  try {
    const settings = await getOrCreateSettings(req.user.id);

    settings.security = {
      ...settings.security.toObject(),
      ...req.body,
    };

    await settings.save();

    res.json({
      success: true,
      message: 'Security settings updated',
      data: settings.security,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update security settings',
    });
  }
};

// PATCH /api/settings/notifications
exports.updateNotificationSettings = async (req, res) => {
  try {
    const settings = await getOrCreateSettings(req.user.id);

    settings.notifications = {
      ...settings.notifications.toObject(),
      ...req.body,
    };

    await settings.save();

    res.json({
      success: true,
      message: 'Notification settings updated',
      data: settings.notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update notification settings',
    });
  }
};
