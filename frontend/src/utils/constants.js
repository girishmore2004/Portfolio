/**
 * API Endpoints
 */
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Application Routes
 */
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  ADMIN: '/admin',
  ADMIN_DASHBOARD: '/admin',
  ADMIN_PROJECTS: '/admin/projects',
  ADMIN_SKILLS: '/admin/skills',
  ADMIN_CERTIFICATIONS: '/admin/certifications',
  ADMIN_MESSAGES: '/admin/messages',
  ADMIN_SETTINGS: '/admin/settings',
};

/**
 * Local Storage Keys
 */
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'token',
  THEME: 'theme',
  USER: 'user',
};

/**
 * Skill Categories
 */
export const SKILL_CATEGORIES = {
  FRONTEND: 'frontend',
  BACKEND: 'backend',
  DATABASE: 'database',
  DEVOPS: 'devops',
  TOOLS: 'tools',
  OTHER: 'other',
};

export const SKILL_CATEGORY_LABELS = {
  [SKILL_CATEGORIES.FRONTEND]: 'Frontend',
  [SKILL_CATEGORIES.BACKEND]: 'Backend',
  [SKILL_CATEGORIES.DATABASE]: 'Database',
  [SKILL_CATEGORIES.DEVOPS]: 'DevOps',
  [SKILL_CATEGORIES.TOOLS]: 'Tools',
  [SKILL_CATEGORIES.OTHER]: 'Other',
};

/**
 * Project Categories
 */
export const PROJECT_CATEGORIES = {
  WEB: 'web',
  MOBILE: 'mobile',
  DESKTOP: 'desktop',
  OTHER: 'other',
};

/**
 * Content Status
 */
export const CONTENT_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
};

/**
 * Certification Categories
 */
export const CERT_CATEGORIES = {
  TECHNICAL: 'technical',
  PROFESSIONAL: 'professional',
  ACADEMIC: 'academic',
  OTHER: 'other',
};

/**
 * File Upload Limits
 */
export const UPLOAD_LIMITS = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_FILES: 10,
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
};

/**
 * Animation Variants
 */
export const ANIMATION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  slideDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
};

/**
 * Validation Rules
 */
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 8,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 20,
  DESCRIPTION_MAX_LENGTH: 200,
};

/**
 * Date Formats
 */
export const DATE_FORMATS = {
  SHORT: 'short', // Jan 1, 2024
  LONG: 'long',   // January 1, 2024
  RELATIVE: 'relative', // 2 days ago
};

/**
 * Theme Options
 */
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
};

/**
 * Pagination
 */
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
  PAGE_SIZE_OPTIONS: [12, 24, 48, 96],
};

/**
 * Toast Duration
 */
export const TOAST_DURATION = {
  SHORT: 2000,
  MEDIUM: 3000,
  LONG: 5000,
};

/**
 * Social Media Platforms
 */
export const SOCIAL_PLATFORMS = {
  GITHUB: 'github',
  LINKEDIN: 'linkedin',
  TWITTER: 'twitter',
  INSTAGRAM: 'instagram',
  FACEBOOK: 'facebook',
  YOUTUBE: 'youtube',
  PORTFOLIO: 'portfolio',
  EMAIL: 'email',
};

/**
 * Navigation Sections
 */
export const NAV_SECTIONS = [
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'certifications', label: 'Certifications', href: '#certifications' },
  { id: 'resume', label: 'Resume', href: '#resume' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

/**
 * Error Messages
 */
export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION: 'Please check your input and try again.',
  FILE_TOO_LARGE: 'File size exceeds the maximum limit.',
  INVALID_FILE_TYPE: 'Invalid file type.',
};

/**
 * Success Messages
 */
export const SUCCESS_MESSAGES = {
  CREATED: 'Created successfully!',
  UPDATED: 'Updated successfully!',
  DELETED: 'Deleted successfully!',
  SAVED: 'Saved successfully!',
  UPLOADED: 'Uploaded successfully!',
  SENT: 'Sent successfully!',
};