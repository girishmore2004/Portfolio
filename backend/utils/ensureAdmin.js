const User = require('../models/User');

const ensureAdmin = async () => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.warn('⚠️ ADMIN_EMAIL or ADMIN_PASSWORD not set. Skipping admin creation.');
    return;
  }

  const existingAdmin = await User.findOne({ email: adminEmail });

  if (existingAdmin) {
    console.log('✅ Admin user already exists');
    return;
  }

  console.log('👤 Creating admin user (first-time setup)...');

  await User.create({
    name: 'Admin User',
    email: adminEmail,
    password: adminPassword,
    role: 'admin',
  });

  console.log('✅ Admin user created successfully');
};

module.exports = ensureAdmin;
