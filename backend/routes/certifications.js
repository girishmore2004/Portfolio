const express = require('express');
const router = express.Router();
const Certification = require('../models/Certification');
const { protect } = require('../middleware/auth');
const { deleteFromCloudinary } = require('../config/cloudinary');

// GET all certifications
router.get('/', async (req, res, next) => {
  try {
    const { category, year, status } = req.query;
    
    let query = {};
    
    // If not authenticated, only show published
    if (!req.user) {
      query.status = 'published';
    } else if (status) {
      query.status = status;
    }
    
    if (category) query.category = category;
    
    if (year) {
      const startDate = new Date(year, 0, 1);
      const endDate = new Date(year, 11, 31, 23, 59, 59);
      query.issueDate = { $gte: startDate, $lte: endDate };
    }

    const certifications = await Certification.find(query)
      .sort({ issueDate: -1, order: 1 });

    res.json({ success: true, data: certifications });
  } catch (error) {
    next(error);
  }
});

// GET single certification
router.get('/:id', async (req, res, next) => {
  try {
    const certification = await Certification.findById(req.params.id);
    
    if (!certification) {
      return res.status(404).json({ success: false, message: 'Certification not found' });
    }
    
    res.json({ success: true, data: certification });
  } catch (error) {
    next(error);
  }
});

// CREATE certification
router.post('/', protect, async (req, res, next) => {
  try {
    const certification = await Certification.create(req.body);
    res.status(201).json({ success: true, data: certification });
  } catch (error) {
    next(error);
  }
});

// UPDATE certification
router.put('/:id', protect, async (req, res, next) => {
  try {
    const certification = await Certification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!certification) {
      return res.status(404).json({ success: false, message: 'Certification not found' });
    }
    
    res.json({ success: true, data: certification });
  } catch (error) {
    next(error);
  }
});

// DELETE certification
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const certification = await Certification.findById(req.params.id);
    
    if (!certification) {
      return res.status(404).json({ success: false, message: 'Certification not found' });
    }
    
    // Delete associated files from Cloudinary
    if (certification.image?.publicId) {
      await deleteFromCloudinary(certification.image.publicId);
    }
    
    if (certification.pdfUrl?.publicId) {
      await deleteFromCloudinary(certification.pdfUrl.publicId, 'raw');
    }
    
    await certification.deleteOne();
    res.json({ success: true, message: 'Certification deleted' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;