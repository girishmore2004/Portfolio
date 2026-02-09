const express = require('express');
const router = express.Router();
const {
  updateSecuritySettings,
  updateNotificationSettings,
} = require('../controllers/settingsController');

const { protect } = require('../middleware/auth');

router.patch('/security', protect, updateSecuritySettings);
router.patch('/notifications', protect, updateNotificationSettings);

module.exports = router;
