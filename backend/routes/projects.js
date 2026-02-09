const express = require('express');
const router = express.Router();
const { body, param, query } = require('express-validator');
const { validationResult } = require('express-validator');
const Project = require('../models/Project');
const { protect } = require('../middleware/auth');
const { deleteFromCloudinary } = require('../config/cloudinary');

/**
 * @route   GET /api/projects
 * @desc    Get all projects (with filtering)
 * @access  Public
 */
router.get('/', async (req, res, next) => {
  try {
    const { status, featured, category, search, limit, page } = req.query;

    // Build query
    let query = {};

    // If not authenticated, only show published
    if (!req.user) {
      query.status = 'published';
    } else if (status) {
      query.status = status;
    }

    if (featured !== undefined) {
      query.featured = featured === 'true';
    }

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$text = { $search: search };
    }

    // Pagination
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 100;
    const skip = (pageNum - 1) * limitNum;

    // Execute query
    const projects = await Project.find(query)
      .sort({ order: 1, createdAt: -1 })
      .limit(limitNum)
      .skip(skip);

    const total = await Project.countDocuments(query);

    res.json({
      success: true,
      count: projects.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: projects
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/projects/:id
 * @desc    Get single project
 * @access  Public
 */
router.get('/:id', async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Increment views
    project.views += 1;
    await project.save();

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   POST /api/projects
 * @desc    Create new project
 * @access  Private
 */
// router.post('/',
//   protect,
//   [
//     body('title').trim().notEmpty(),
//     body('description').trim().notEmpty().isLength({ max: 200 }),
//     body('longDescription').trim().notEmpty()
//   ],
//   async (req, res, next) => {
//     try {
//       const project = await Project.create(req.body);

//       res.status(201).json({
//         success: true,
//         message: 'Project created successfully',
//         data: project
//       });
//     } catch (error) {
//       next(error);
//     }
//   }
// );

router.post('/',
  protect,
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description')
      .trim()
      .notEmpty()
      .isLength({ max: 200 })
      .withMessage('Description max 200 chars'),
    body('longDescription').trim().notEmpty().withMessage('Long description required')
  ],
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    try {
      const project = await Project.create(req.body);

      res.status(201).json({
        success: true,
        message: 'Project created successfully',
        data: project
      });
    } catch (error) {
      next(error);
    }
  }
);




/**
 * @route   DELETE /api/projects/:id
 * @desc    Delete project
 * @access  Private
 */
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Delete associated images from Cloudinary
    if (project.thumbnail?.publicId) {
      await deleteFromCloudinary(project.thumbnail.publicId);
    }

    for (const image of project.images) {
      if (image.publicId) {
        await deleteFromCloudinary(image.publicId);
      }
    }

    await project.deleteOne();

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   PUT /api/projects/reorder
 * @desc    Reorder projects
 * @access  Private
 */
router.put('/reorder/batch',
  protect,
  [
    body('projects').isArray()
  ],
  async (req, res, next) => {
    try {
      const { projects } = req.body;

      // Update order for each project
      const updatePromises = projects.map((item, index) =>
        Project.findByIdAndUpdate(item.id, { order: index })
      );

      await Promise.all(updatePromises);

      res.json({
        success: true,
        message: 'Projects reordered successfully'
      });
    } catch (error) {
      next(error);
    }
  }
);


/**
 * @route   PUT /api/projects/:id
 * @desc    Update project
 * @access  Private
 */
router.put('/:id',
  protect,
  async (req, res, next) => {
    try {
      let project = await Project.findById(req.params.id);

      if (!project) {
        return res.status(404).json({
          success: false,
          message: 'Project not found'
        });
      }

      project = await Project.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true
        }
      );

      res.json({
        success: true,
        message: 'Project updated successfully',
        data: project
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @route   PUT /api/projects/:id/like
 * @desc    Like a project
 * @access  Public
 */
router.put('/:id/like', async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    project.likes += 1;
    await project.save();

    res.json({
      success: true,
      data: { likes: project.likes }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;