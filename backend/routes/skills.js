const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');
const { protect } = require('../middleware/auth');

// GET all skills
router.get('/', async (req, res, next) => {
  try {
    const { category, visible } = req.query;
    
    let query = {};
    if (category) query.category = category;
    if (visible !== undefined) query.visible = visible === 'true';
    
    // If not authenticated, only show visible skills
    if (!req.user && visible === undefined) {
      query.visible = true;
    }

    const skills = await Skill.find(query).sort({ category: 1, order: 1 });

    res.json({ success: true, data: skills });
  } catch (error) {
    next(error);
  }
});

// GET single skill
router.get('/:id', async (req, res, next) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }
    res.json({ success: true, data: skill });
  } catch (error) {
    next(error);
  }
});

// CREATE skill
router.post('/', protect, async (req, res, next) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json({ success: true, data: skill });
  } catch (error) {
    next(error);
  }
});

// UPDATE skill
router.put('/:id', protect, async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }
    
    res.json({ success: true, data: skill });
  } catch (error) {
    next(error);
  }
});

// DELETE skill
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const skill = await Skill.findById(req.params.id);
    
    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }
    
    await skill.deleteOne();
    res.json({ success: true, message: 'Skill deleted' });
  } catch (error) {
    next(error);
  }
});

// REORDER skills
router.put('/reorder/batch', protect, async (req, res, next) => {
  try {
    const { skills } = req.body;
    
    const updatePromises = skills.map((item, index) =>
      Skill.findByIdAndUpdate(item.id, { order: index })
    );
    
    await Promise.all(updatePromises);
    res.json({ success: true, message: 'Skills reordered' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;