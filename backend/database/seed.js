// require('dotenv').config();
// const mongoose = require('mongoose');
// const connectDB = require('../config/db');
// const User = require('../models/User');
// const Project = require('../models/Project');
// const Skill = require('../models/Skill');
// const Certification = require('../models/Certification');
// const Content = require('../models/Content');

// const seedDatabase = async () => {
//   try {
//     await connectDB();

//     console.log('🗑️  Clearing existing data...');
//     await User.deleteMany();
//     await Project.deleteMany();
//     await Skill.deleteMany();
//     await Certification.deleteMany();
//     await Content.deleteMany();

//     console.log('👤 Creating admin user...');
//     await User.create({
//       name: 'Admin User',
//       email: process.env.ADMIN_EMAIL || 'admin@portfolio.com',
//       password: process.env.ADMIN_PASSWORD || 'Admin123!',
//       role: 'admin'
//     });

//     console.log('🎨 Creating sample projects...');
//     const projects = [
//       {
//         title: 'E-Commerce Platform',
//         description: 'Full-stack e-commerce solution with payment integration',
//         longDescription: 'A complete e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, and Stripe payment integration.',
//         technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
//         category: 'web',
//         featured: true,
//         status: 'published',
//         order: 0,
//         liveUrl: 'https://example.com',
//         githubUrl: 'https://github.com/example/ecommerce'
//       },
//       {
//         title: 'Task Management App',
//         description: 'Collaborative task management with real-time updates',
//         longDescription: 'A real-time task management application with team collaboration features, built using React, Socket.io, and PostgreSQL.',
//         technologies: ['React', 'Socket.io', 'PostgreSQL', 'Node.js'],
//         category: 'web',
//         featured: true,
//         status: 'published',
//         order: 1,
//         liveUrl: 'https://example.com',
//         githubUrl: 'https://github.com/example/taskmanager'
//       },
//       {
//         title: 'Weather Dashboard',
//         description: 'Real-time weather data visualization dashboard',
//         longDescription: 'Interactive weather dashboard with maps, charts, and forecasts using OpenWeather API.',
//         technologies: ['Vue.js', 'Chart.js', 'Tailwind CSS'],
//         category: 'web',
//         status: 'published',
//         order: 2,
//         liveUrl: 'https://example.com'
//       }
//     ];
//     await Project.insertMany(projects);

//     console.log('💡 Creating sample skills...');
//     const skills = [
//       // Frontend
//       { name: 'React', category: 'frontend', proficiency: 90, icon: 'react', order: 0, yearsOfExperience: 3 },
//       { name: 'Vue.js', category: 'frontend', proficiency: 85, icon: 'vuejs', order: 1, yearsOfExperience: 2 },
//       { name: 'TypeScript', category: 'frontend', proficiency: 80, icon: 'typescript', order: 2, yearsOfExperience: 2 },
//       { name: 'Tailwind CSS', category: 'frontend', proficiency: 95, icon: 'tailwindcss', order: 3, yearsOfExperience: 3 },
//       { name: 'Next.js', category: 'frontend', proficiency: 88, icon: 'nextjs', order: 4, yearsOfExperience: 2 },
      
//       // Backend
//       { name: 'Node.js', category: 'backend', proficiency: 90, icon: 'nodejs', order: 0, yearsOfExperience: 4 },
//       { name: 'Express', category: 'backend', proficiency: 88, icon: 'express', order: 1, yearsOfExperience: 4 },
//       { name: 'Python', category: 'backend', proficiency: 75, icon: 'python', order: 2, yearsOfExperience: 2 },
//       { name: 'GraphQL', category: 'backend', proficiency: 70, icon: 'graphql', order: 3, yearsOfExperience: 1 },
      
//       // Database
//       { name: 'MongoDB', category: 'database', proficiency: 85, icon: 'mongodb', order: 0, yearsOfExperience: 3 },
//       { name: 'PostgreSQL', category: 'database', proficiency: 80, icon: 'postgresql', order: 1, yearsOfExperience: 2 },
//       { name: 'Redis', category: 'database', proficiency: 70, icon: 'redis', order: 2, yearsOfExperience: 1 },
      
//       // DevOps
//       { name: 'Docker', category: 'devops', proficiency: 75, icon: 'docker', order: 0, yearsOfExperience: 2 },
//       { name: 'AWS', category: 'devops', proficiency: 70, icon: 'aws', order: 1, yearsOfExperience: 2 },
//       { name: 'Git', category: 'devops', proficiency: 90, icon: 'git', order: 2, yearsOfExperience: 5 },
      
//       // Tools
//       { name: 'VS Code', category: 'tools', proficiency: 95, icon: 'vscode', order: 0, yearsOfExperience: 5 },
//       { name: 'Figma', category: 'tools', proficiency: 80, icon: 'figma', order: 1, yearsOfExperience: 2 },
//     ];
//     await Skill.insertMany(skills);

//     console.log('📜 Creating sample certifications...');
//     const certifications = [
//       {
//         title: 'AWS Certified Developer - Associate',
//         issuer: 'Amazon Web Services',
//         issueDate: new Date('2023-06-15'),
//         category: 'technical',
//         status: 'published',
//         order: 0,
//         skills: ['AWS', 'Cloud Computing', 'DevOps']
//       },
//       {
//         title: 'MongoDB Certified Developer',
//         issuer: 'MongoDB University',
//         issueDate: new Date('2023-03-20'),
//         category: 'technical',
//         status: 'published',
//         order: 1,
//         skills: ['MongoDB', 'Database', 'NoSQL']
//       }
//     ];
//     await Certification.insertMany(certifications);

//     console.log('📄 Initializing content sections...');
//     await Content.initializeDefaults();

//     console.log('\n✅ Database seeded successfully!');
//     console.log('\n📧 Admin credentials:');
//     console.log(`   Email: ${process.env.ADMIN_EMAIL || 'admin@portfolio.com'}`);
//     console.log(`   Password: ${process.env.ADMIN_PASSWORD || 'Admin123!'}`);
//     console.log('\n💡 You can now login at: http://localhost:5173/login\n');
    
//     process.exit(0);
//   } catch (error) {
//     console.error('❌ Seed error:', error);
//     process.exit(1);
//   }
// };

// seedDatabase();


require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Certification = require('../models/Certification');
const Content = require('../models/Content');

/* ===========================
   ✅ ADDITION: slug helper
=========================== */
const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('🗑️  Clearing existing data...');
    await User.deleteMany();
    await Project.deleteMany();
    await Skill.deleteMany();
    await Certification.deleteMany();
    await Content.deleteMany();

    console.log('👤 Creating admin user...');
    await User.create({
      name: 'Admin User',
      email: process.env.ADMIN_EMAIL || 'admin@portfolio.com',
      password: process.env.ADMIN_PASSWORD || 'Admin123!',
      role: 'admin'
    });

    console.log('🎨 Creating sample projects...');
    const projects = [
      {
        title: 'E-Commerce Platform',
        description: 'Full-stack e-commerce solution with payment integration',
        longDescription: 'A complete e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, and Stripe payment integration.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
        category: 'web',
        featured: true,
        status: 'published',
        order: 0,
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com/example/ecommerce'
      },
      {
        title: 'Task Management App',
        description: 'Collaborative task management with real-time updates',
        longDescription: 'A real-time task management application with team collaboration features, built using React, Socket.io, and PostgreSQL.',
        technologies: ['React', 'Socket.io', 'PostgreSQL', 'Node.js'],
        category: 'web',
        featured: true,
        status: 'published',
        order: 1,
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com/example/taskmanager'
      },
      {
        title: 'Weather Dashboard',
        description: 'Real-time weather data visualization dashboard',
        longDescription: 'Interactive weather dashboard with maps, charts, and forecasts using OpenWeather API.',
        technologies: ['Vue.js', 'Chart.js', 'Tailwind CSS'],
        category: 'web',
        status: 'published',
        order: 2,
        liveUrl: 'https://example.com'
      }
    ];

    /* ===========================
       ✅ ADDITION: attach slug
    =========================== */
    projects.forEach((project, index) => {
      project.slug = `${slugify(project.title)}-${index}`;
    });

    await Project.insertMany(projects);

    console.log('💡 Creating sample skills...');
    const skills = [
      { name: 'React', category: 'frontend', proficiency: 90, icon: 'react', order: 0, yearsOfExperience: 3 },
      { name: 'Vue.js', category: 'frontend', proficiency: 85, icon: 'vuejs', order: 1, yearsOfExperience: 2 },
      { name: 'TypeScript', category: 'frontend', proficiency: 80, icon: 'typescript', order: 2, yearsOfExperience: 2 },
      { name: 'Tailwind CSS', category: 'frontend', proficiency: 95, icon: 'tailwindcss', order: 3, yearsOfExperience: 3 },
      { name: 'Next.js', category: 'frontend', proficiency: 88, icon: 'nextjs', order: 4, yearsOfExperience: 2 },
      { name: 'Node.js', category: 'backend', proficiency: 90, icon: 'nodejs', order: 0, yearsOfExperience: 4 },
      { name: 'Express', category: 'backend', proficiency: 88, icon: 'express', order: 1, yearsOfExperience: 4 },
      { name: 'Python', category: 'backend', proficiency: 75, icon: 'python', order: 2, yearsOfExperience: 2 },
      { name: 'GraphQL', category: 'backend', proficiency: 70, icon: 'graphql', order: 3, yearsOfExperience: 1 },
      { name: 'MongoDB', category: 'database', proficiency: 85, icon: 'mongodb', order: 0, yearsOfExperience: 3 },
      { name: 'PostgreSQL', category: 'database', proficiency: 80, icon: 'postgresql', order: 1, yearsOfExperience: 2 },
      { name: 'Redis', category: 'database', proficiency: 70, icon: 'redis', order: 2, yearsOfExperience: 1 },
      { name: 'Docker', category: 'devops', proficiency: 75, icon: 'docker', order: 0, yearsOfExperience: 2 },
      { name: 'AWS', category: 'devops', proficiency: 70, icon: 'aws', order: 1, yearsOfExperience: 2 },
      { name: 'Git', category: 'devops', proficiency: 90, icon: 'git', order: 2, yearsOfExperience: 5 },
      { name: 'VS Code', category: 'tools', proficiency: 95, icon: 'vscode', order: 0, yearsOfExperience: 5 },
      { name: 'Figma', category: 'tools', proficiency: 80, icon: 'figma', order: 1, yearsOfExperience: 2 },
    ];
    await Skill.insertMany(skills);

    console.log('📜 Creating sample certifications...');
    const certifications = [
      {
        title: 'AWS Certified Developer - Associate',
        issuer: 'Amazon Web Services',
        issueDate: new Date('2023-06-15'),
        category: 'technical',
        status: 'published',
        order: 0,
        skills: ['AWS', 'Cloud Computing', 'DevOps']
      },
      {
        title: 'MongoDB Certified Developer',
        issuer: 'MongoDB University',
        issueDate: new Date('2023-03-20'),
        category: 'technical',
        status: 'published',
        order: 1,
        skills: ['MongoDB', 'Database', 'NoSQL']
      }
    ];
    await Certification.insertMany(certifications);

    console.log('📄 Initializing content sections...');
    await Content.initializeDefaults();

    console.log('\n✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedDatabase();
