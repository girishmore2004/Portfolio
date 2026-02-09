// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// // Create axios instance
// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true,
// });

// // Request interceptor
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response interceptor
// api.interceptors.response.use(
//   (response) => response.data,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem('token');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error.response?.data || error.message);
//   }
// );

// // Auth API
// export const authAPI = {
//   login: (credentials) => api.post('/auth/login', credentials),
//   logout: () => api.post('/auth/logout'),
//   me: () => api.get('/auth/me'),
//   updatePassword: (passwords) => api.put('/auth/updatepassword', passwords),
// };

// // Projects API
// export const projectsAPI = {
//   getAll: (params) => api.get('/projects', { params }),
//   getOne: (id) => api.get(`/projects/${id}`),
//   create: (data) => api.post('/projects', data),
//   update: (id, data) => api.put(`/projects/${id}`, data),
//   delete: (id) => api.delete(`/projects/${id}`),
//   reorder: (projects) => api.put('/projects/reorder/batch', { projects }),
//   like: (id) => api.put(`/projects/${id}/like`),
// };

// // Skills API
// export const skillsAPI = {
//   getAll: (params) => api.get('/skills', { params }),
//   getOne: (id) => api.get(`/skills/${id}`),
//   create: (data) => api.post('/skills', data),
//   update: (id, data) => api.put(`/skills/${id}`, data),
//   delete: (id) => api.delete(`/skills/${id}`),
//   reorder: (skills) => api.put('/skills/reorder/batch', { skills }),
// };

// // Certifications API
// export const certificationsAPI = {
//   getAll: (params) => api.get('/certifications', { params }),
//   getOne: (id) => api.get(`/certifications/${id}`),
//   create: (data) => api.post('/certifications', data),
//   update: (id, data) => api.put(`/certifications/${id}`, data),
//   delete: (id) => api.delete(`/certifications/${id}`),
// };

// // Content API
// export const contentAPI = {
//   get: (section) => api.get(`/content/${section}`),
//   update: (section, data) => api.put(`/content/${section}`, { data }),
//   saveDraft: (section, data) => api.put(`/content/${section}/draft`, { data }),
//   getHistory: (section) => api.get(`/content/${section}/history`),
// };

// // Messages API
// export const messagesAPI = {
//   getAll: (params) => api.get('/messages', { params }),
//   getOne: (id) => api.get(`/messages/${id}`),
//   create: (data) => api.post('/messages', data),
//   markRead: (id) => api.put(`/messages/${id}/read`),
//   toggleStar: (id) => api.put(`/messages/${id}/star`),
//   delete: (id) => api.delete(`/messages/${id}`),
// };

// // Upload API
// export const uploadAPI = {
//   single: (file, folder = 'portfolio') => {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('folder', folder);
//     return api.post('/upload/single', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     });
//   },
//   multiple: (files, folder = 'portfolio') => {
//     const formData = new FormData();
//     files.forEach((file) => formData.append('files', file));
//     formData.append('folder', folder);
//     return api.post('/upload/multiple', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     });
//   },
//   base64: (data, folder = 'portfolio') => api.post('/upload/base64', { data, folder }),
// };

// export default api;

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 10000, // 10 second timeout
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Return the full response data (which already contains success, data, etc.)
    return response.data;
  },
  (error) => {
    // Enhanced error handling
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const data = error.response.data;
      
      if (status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      
      // Return structured error
      return Promise.reject({
        status,
        message: data?.message || error.message || 'An error occurred',
        data: data
      });
    } else if (error.request) {
      // Request made but no response received
      return Promise.reject({
        status: 0,
        message: 'No response from server. Please check your connection.',
        data: null
      });
    } else {
      // Error in request setup
      return Promise.reject({
        status: -1,
        message: error.message || 'Request failed',
        data: null
      });
    }
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  me: () => api.get('/auth/me'),
  updatePassword: (passwords) => api.put('/auth/updatepassword', passwords),
};

// Projects API
export const projectsAPI = {
  getAll: (params) => api.get('/projects', { params }),
  getOne: (id) => api.get(`/projects/${id}`),
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
  reorder: (projects) => api.put('/projects/reorder/batch', { projects }),
  like: (id) => api.put(`/projects/${id}/like`),
};

// Skills API
export const skillsAPI = {
  getAll: (params) => api.get('/skills', { params }),
  getOne: (id) => api.get(`/skills/${id}`),
  create: (data) => api.post('/skills', data),
  update: (id, data) => api.put(`/skills/${id}`, data),
  delete: (id) => api.delete(`/skills/${id}`),
  reorder: (skills) => api.put('/skills/reorder/batch', { skills }),
};

// Certifications API
export const certificationsAPI = {
  getAll: (params) => api.get('/certifications', { params }),
  getOne: (id) => api.get(`/certifications/${id}`),
  create: (data) => api.post('/certifications', data),
  update: (id, data) => api.put(`/certifications/${id}`, data),
  delete: (id) => api.delete(`/certifications/${id}`),
};

// Content API - UPDATED
export const contentAPI = {
  getAll: () => api.get('/content'),
  get: (section) => api.get(`/content/${section}`),
  save: (section, content) => api.post('/content', { section, content, published: true }),
  update: (section, data) => api.put(`/content/${section}`, { data }),
  saveDraft: (section, data) => api.put(`/content/${section}/draft`, { data }),
  getHistory: (section) => api.get(`/content/${section}/history`),
  delete: (section) => api.delete(`/content/${section}`),
};

// Messages API
export const messagesAPI = {
  getAll: (params) => api.get('/messages', { params }),
  getOne: (id) => api.get(`/messages/${id}`),
  create: (data) => api.post('/messages', data),
  markRead: (id) => api.put(`/messages/${id}/read`),
  toggleStar: (id) => api.put(`/messages/${id}/star`),
  delete: (id) => api.delete(`/messages/${id}`),
};

// Upload API - ENHANCED
export const uploadAPI = {
  single: (file, folder = 'portfolio') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    return api.post('/upload/single', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 30000, // 30 second timeout for file uploads
    });
  },
  multiple: (files, folder = 'portfolio') => {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    formData.append('folder', folder);
    return api.post('/upload/multiple', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 60000, // 60 second timeout for multiple files
    });
  },
  base64: (data, folder = 'portfolio') => api.post('/upload/base64', { data, folder }),
};

export default api;