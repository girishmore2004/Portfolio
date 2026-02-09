// // // frontend/src/components/admin/ProjectsManager.jsx
// // import { useState, useEffect } from 'react';
// // import { Plus, Edit, Trash } from 'lucide-react';
// // import { projectsAPI } from '../../services/api';
// // import Button from '../common/Button';
// // import Card from '../common/Card';
// // import Modal from '../common/Modal';
// // import toast from 'react-hot-toast';

// // const ProjectsManager = () => {
// //   const [projects, setProjects] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [modalOpen, setModalOpen] = useState(false);
// //   const [editingProject, setEditingProject] = useState(null);
// //   const [formData, setFormData] = useState({
// //     title: '',
// //     description: '',
// //     longDescription: '',
// //     technologies: '',
// //     liveUrl: '',
// //     githubUrl: '',
// //     status: 'published'
// //   });

// //   useEffect(() => {
// //     loadProjects();
// //   }, []);

// //   const loadProjects = async () => {
// //     try {
// //       const response = await projectsAPI.getAll();
// //       setProjects(response.data || []);
// //     } catch (error) {
// //       toast.error('Failed to load projects');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const data = {
// //         ...formData,
// //         technologies: formData.technologies.split(',').map(t => t.trim())
// //       };

// //       if (editingProject) {
// //         await projectsAPI.update(editingProject._id, data);
// //         toast.success('Project updated!');
// //       } else {
// //         await projectsAPI.create(data);
// //         toast.success('Project created!');
// //       }

// //       setModalOpen(false);
// //       resetForm();
// //       loadProjects();
// //     } catch (error) {
// //       toast.error(error.message || 'Failed to save project');
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     if (!confirm('Delete this project?')) return;
    
// //     try {
// //       await projectsAPI.delete(id);
// //       toast.success('Project deleted!');
// //       loadProjects();
// //     } catch (error) {
// //       toast.error('Failed to delete project');
// //     }
// //   };

// //   const handleEdit = (project) => {
// //     setEditingProject(project);
// //     setFormData({
// //       title: project.title,
// //       description: project.description,
// //       longDescription: project.longDescription,
// //       technologies: project.technologies.join(', '),
// //       liveUrl: project.liveUrl || '',
// //       githubUrl: project.githubUrl || '',
// //       status: project.status
// //     });
// //     setModalOpen(true);
// //   };

// //   const resetForm = () => {
// //     setEditingProject(null);
// //     setFormData({
// //       title: '',
// //       description: '',
// //       longDescription: '',
// //       technologies: '',
// //       liveUrl: '',
// //       githubUrl: '',
// //       status: 'published'
// //     });
// //   };

// //   return (
// //     <div className="space-y-6">
// //       {/* Header */}
// //       <div className="flex items-center justify-between">
// //         <div>
// //           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Projects</h1>
// //           <p className="text-gray-600 dark:text-gray-400">Manage your portfolio projects</p>
// //         </div>
// //         <Button icon={Plus} onClick={() => { resetForm(); setModalOpen(true); }}>
// //           Add Project
// //         </Button>
// //       </div>

// //       {/* Projects List */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {projects.map((project) => (
// //           <Card key={project._id} className="p-6">
// //             <h3 className="font-bold text-lg mb-2">{project.title}</h3>
// //             <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
// //               {project.description}
// //             </p>
// //             <div className="flex gap-2 mb-4 flex-wrap">
// //               {project.technologies.slice(0, 3).map((tech, i) => (
// //                 <span key={i} className="badge badge-primary text-xs">
// //                   {tech}
// //                 </span>
// //               ))}
// //             </div>
// //             <div className="flex gap-2">
// //               <Button size="sm" variant="secondary" icon={Edit} onClick={() => handleEdit(project)}>
// //                 Edit
// //               </Button>
// //               <Button size="sm" variant="danger" icon={Trash} onClick={() => handleDelete(project._id)}>
// //                 Delete
// //               </Button>
// //             </div>
// //           </Card>
// //         ))}
// //       </div>

// //       {/* Add/Edit Modal */}
// //       <Modal 
// //         isOpen={modalOpen} 
// //         onClose={() => { setModalOpen(false); resetForm(); }}
// //         title={editingProject ? 'Edit Project' : 'Add Project'}
// //       >
// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           <div>
// //             <label className="block text-sm font-medium mb-2">Title</label>
// //             <input
// //               type="text"
// //               className="input"
// //               value={formData.title}
// //               onChange={(e) => setFormData({ ...formData, title: e.target.value })}
// //               required
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium mb-2">Short Description</label>
// //             <input
// //               type="text"
// //               className="input"
// //               value={formData.description}
// //               onChange={(e) => setFormData({ ...formData, description: e.target.value })}
// //               maxLength={200}
// //               required
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium mb-2">Full Description</label>
// //             <textarea
// //               className="input h-32"
// //               value={formData.longDescription}
// //               onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
// //               required
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium mb-2">Technologies (comma-separated)</label>
// //             <input
// //               type="text"
// //               className="input"
// //               placeholder="React, Node.js, MongoDB"
// //               value={formData.technologies}
// //               onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
// //               required
// //             />
// //           </div>

// //           <div className="grid grid-cols-2 gap-4">
// //             <div>
// //               <label className="block text-sm font-medium mb-2">Live URL</label>
// //               <input
// //                 type="url"
// //                 className="input"
// //                 value={formData.liveUrl}
// //                 onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium mb-2">GitHub URL</label>
// //               <input
// //                 type="url"
// //                 className="input"
// //                 value={formData.githubUrl}
// //                 onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
// //               />
// //             </div>
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium mb-2">Status</label>
// //             <select
// //               className="input"
// //               value={formData.status}
// //               onChange={(e) => setFormData({ ...formData, status: e.target.value })}
// //             >
// //               <option value="published">Published</option>
// //               <option value="draft">Draft</option>
// //             </select>
// //           </div>

// //           <div className="flex gap-3 pt-4">
// //             <Button type="submit" className="flex-1">
// //               {editingProject ? 'Update' : 'Create'} Project
// //             </Button>
// //             <Button 
// //               type="button" 
// //               variant="secondary" 
// //               onClick={() => { setModalOpen(false); resetForm(); }}
// //             >
// //               Cancel
// //             </Button>
// //           </div>
// //         </form>
// //       </Modal>
// //     </div>
// //   );
// // };

// // export default ProjectsManager;

 
// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Plus, Edit, Trash, Eye, Star, Upload, X, ExternalLink, Github } from 'lucide-react';
// import { FolderKanban } from "lucide-react";
// import { projectsAPI, uploadAPI } from '../../services/api';
// import Button from '../common/Button';
// import Card from '../common/Card';
// import Modal from '../common/Modal';
// import Loading from '../common/Loading';
// import toast from 'react-hot-toast';

// const ProjectsManager = () => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editingProject, setEditingProject] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     longDescription: '',
//     technologies: '',
//     category: 'web',
//     liveUrl: '',
//     githubUrl: '',
//     status: 'published',
//     featured: false,
//     thumbnail: null
//   });

//   useEffect(() => {
//     loadProjects();
//   }, []);

//   const loadProjects = async () => {
//     try {
//       const response = await projectsAPI.getAll();
//       setProjects(response.data || []);
//     } catch (error) {
//       toast.error('Failed to load projects');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (file.size > 10 * 1024 * 1024) {
//       toast.error('Image must be less than 10MB');
//       return;
//     }

//     setUploading(true);
//     try {
//       const result = await uploadAPI.single(file, 'projects');
//       setFormData({...formData,thumbnail: {url: result.data.url,publicId: result.data.publicId}});
//       toast.success('Image uploaded!');
//     } catch (error) {
//       toast.error('Failed to upload image');
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // const data = {
//     //   ...formData,
//     //   technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean)
//     // };
//     const data = {
//       ...formData,
//       technologies: formData.technologies
//         .split(',')
//         .map(t => t.trim())
//         .filter(Boolean),
//       thumbnail: formData.thumbnail
//         ? {
//             url: formData.thumbnail.url,
//             publicId: formData.thumbnail.publicId
//           }
//         : null
//     };

//     try {
//       if (editingProject) {
//         await projectsAPI.update(editingProject._id, data);
//         toast.success('Project updated successfully!');
//       } else {
//         await projectsAPI.create(data);
//         toast.success('Project created successfully!');
//       }

//       setModalOpen(false);
//       resetForm();
//       loadProjects();
//     } catch (error) {
//       toast.error(error.message || 'Failed to save project');
//     }
//   };

//   const handleDelete = async (id, title) => {
//     if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    
//     try {
//       await projectsAPI.delete(id);
//       toast.success('Project deleted!');
//       loadProjects();
//     } catch (error) {
//       toast.error('Failed to delete project');
//     }
//   };

//   const handleEdit = (project) => {
//     setEditingProject(project);
//     setFormData({
//       title: project.title,
//       description: project.description,
//       longDescription: project.longDescription,
//       technologies: project.technologies.join(', '),
//       category: project.category || 'web',
//       liveUrl: project.liveUrl || '',
//       githubUrl: project.githubUrl || '',
//       status: project.status,
//       featured: project.featured || false,
//       thumbnail: project.thumbnail || null
//     });
//     setModalOpen(true);
//   };

//   const toggleFeatured = async (project) => {
//     try {
//       await projectsAPI.update(project._id, { featured: !project.featured });
//       toast.success(project.featured ? 'Removed from featured' : 'Added to featured');
//       loadProjects();
//     } catch (error) {
//       toast.error('Failed to update project');
//     }
//   };

//   const resetForm = () => {
//     setEditingProject(null);
//     setFormData({
//       title: '',
//       description: '',
//       longDescription: '',
//       technologies: '',
//       category: 'web',
//       liveUrl: '',
//       githubUrl: '',
//       status: 'published',
//       featured: false,
//       thumbnail: null
//     });
//   };

//   if (loading) return <Loading fullScreen text="Loading projects..." />;

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Projects Manager</h1>
//           <p className="text-gray-600 dark:text-gray-400">
//             {projects.length} project{projects.length !== 1 ? 's' : ''} total
//           </p>
//         </div>
//         <Button icon={Plus} onClick={() => { resetForm(); setModalOpen(true); }}>
//           Add Project
//         </Button>
//       </div>

//       {/* Projects Grid */}
//       {projects.length === 0 ? (
//         <Card className="p-12 text-center">
//           <FolderKanban className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//           <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
//             No projects yet
//           </h3>
//           <p className="text-gray-600 dark:text-gray-400 mb-4">
//             Get started by creating your first project
//           </p>
//           <Button icon={Plus} onClick={() => { resetForm(); setModalOpen(true); }}>
//             Add Your First Project
//           </Button>
//         </Card>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {projects.map((project, index) => (
//             <motion.div
//               key={project._id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.05 }}
//             >
//               <Card className="p-0 overflow-hidden group">
//                 {/* Thumbnail */}
//                 <div className="relative h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
//                   {project.thumbnail?.url ? (
//                     <img 
//                       src={project.thumbnail.url} 
//                       alt={project.title}
//                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//                     />
//                   ) : (
//                     <div className="flex items-center justify-center h-full">
//                       <FolderKanban className="w-16 h-16 text-gray-400" />
//                     </div>
//                   )}
                  
//                   {/* Status Badge */}
//                   <div className="absolute top-3 left-3">
//                     <span className={`badge text-xs ${
//                       project.status === 'published' 
//                         ? 'badge-success' 
//                         : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
//                     }`}>
//                       {project.status}
//                     </span>
//                   </div>

//                   {/* Featured Star */}
//                   {project.featured && (
//                     <div className="absolute top-3 right-3">
//                       <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
//                     </div>
//                   )}
//                 </div>

//                 {/* Content */}
//                 <div className="p-5">
//                   <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white line-clamp-1">
//                     {project.title}
//                   </h3>
//                   <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
//                     {project.description}
//                   </p>

//                   {/* Technologies */}
//                   <div className="flex gap-2 mb-4 flex-wrap">
//                     {project.technologies.slice(0, 3).map((tech, i) => (
//                       <span key={i} className="badge badge-primary text-xs">
//                         {tech}
//                       </span>
//                     ))}
//                     {project.technologies.length > 3 && (
//                       <span className="badge bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs">
//                         +{project.technologies.length - 3}
//                       </span>
//                     )}
//                   </div>

//                   {/* Links */}
//                   <div className="flex gap-2 mb-4">
//                     {project.liveUrl && (
//                       <a
//                         href={project.liveUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-xs flex items-center gap-1 text-primary-600 hover:text-primary-700"
//                       >
//                         <ExternalLink className="w-3 h-3" />
//                         Live
//                       </a>
//                     )}
//                     {project.githubUrl && (
//                       <a
//                         href={project.githubUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-xs flex items-center gap-1 text-gray-600 hover:text-gray-700"
//                       >
//                         <Github className="w-3 h-3" />
//                         Code
//                       </a>
//                     )}
//                   </div>

//                   {/* Actions */}
//                   <div className="flex gap-2">
//                     <Button 
//                       size="sm" 
//                       variant="secondary" 
//                       icon={Edit} 
//                       onClick={() => handleEdit(project)}
//                       className="flex-1"
//                     >
//                       Edit
//                     </Button>
//                     <Button 
//                       size="sm" 
//                       variant={project.featured ? "primary" : "ghost"}
//                       icon={Star}
//                       onClick={() => toggleFeatured(project)}
//                     />
//                     <Button 
//                       size="sm" 
//                       variant="danger" 
//                       icon={Trash}
//                       onClick={() => handleDelete(project._id, project.title)}
//                     />
//                   </div>
//                 </div>
//               </Card>
//             </motion.div>
//           ))}
//         </div>
//       )}

//       {/* Add/Edit Modal */}
//       <Modal 
//         isOpen={modalOpen} 
//         onClose={() => { setModalOpen(false); resetForm(); }}
//         title={editingProject ? 'Edit Project' : 'Add New Project'}
//         size="lg"
//       >
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Thumbnail Upload */}
//           <div>
//             <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
//               Project Thumbnail
//             </label>
//             <div className="relative">
//               {formData.thumbnail?.url ? (
//                 <div className="relative">
//                   <img 
//                     src={formData.thumbnail.url} 
//                     alt="Thumbnail" 
//                     className="w-full h-48 object-cover rounded-lg"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setFormData({ ...formData, thumbnail: null })}
//                     className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
//                 </div>
//               ) : (
//                 <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
//                   <Upload className="w-12 h-12 text-gray-400 mb-2" />
//                   <span className="text-sm text-gray-600 dark:text-gray-400">
//                     {uploading ? 'Uploading...' : 'Click to upload image'}
//                   </span>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     className="hidden"
//                     onChange={handleImageUpload}
//                     disabled={uploading}
//                   />
//                 </label>
//               )}
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             {/* Title */}
//             <div className="col-span-2">
//               <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
//                 Project Title *
//               </label>
//               <input
//                 type="text"
//                 className="input"
//                 value={formData.title}
//                 onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                 placeholder="E-Commerce Platform"
//                 required
//               />
//             </div>

//             {/* Category */}
//             <div>
//               <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
//                 Category *
//               </label>
//               <select
//                 className="input"
//                 value={formData.category}
//                 onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//               >
//                 <option value="web">Web Application</option>
//                 <option value="mobile">Mobile App</option>
//                 <option value="desktop">Desktop App</option>
//                 <option value="other">Other</option>
//               </select>
//             </div>

//             {/* Status */}
//             <div>
//               <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
//                 Status *
//               </label>
//               <select
//                 className="input"
//                 value={formData.status}
//                 onChange={(e) => setFormData({ ...formData, status: e.target.value })}
//               >
//                 <option value="published">Published</option>
//                 <option value="draft">Draft</option>
//               </select>
//             </div>
//           </div>

//           {/* Short Description */}
//           <div>
//             <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
//               Short Description * (max 200 characters)
//             </label>
//             <input
//               type="text"
//               className="input"
//               value={formData.description}
//               onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//               placeholder="Brief one-line description"
//               maxLength={200}
//               required
//             />
//             <p className="text-xs text-gray-500 mt-1">
//               {formData.description.length}/200 characters
//             </p>
//           </div>

//           {/* Full Description */}
//           <div>
//             <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
//               Full Description *
//             </label>
//             <textarea
//               className="input h-32 resize-none"
//               value={formData.longDescription}
//               onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
//               placeholder="Detailed description of the project, features, and technologies used..."
//               required
//             />
//           </div>

//           {/* Technologies */}
//           <div>
//             <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
//               Technologies * (comma-separated)
//             </label>
//             <input
//               type="text"
//               className="input"
//               placeholder="React, Node.js, MongoDB, Express, Tailwind CSS"
//               value={formData.technologies}
//               onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
//               required
//             />
//           </div>

//           {/* URLs */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
//                 Live URL
//               </label>
//               <input
//                 type="url"
//                 className="input"
//                 placeholder="https://example.com"
//                 value={formData.liveUrl}
//                 onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
//                 GitHub URL
//               </label>
//               <input
//                 type="url"
//                 className="input"
//                 placeholder="https://github.com/username/repo"
//                 value={formData.githubUrl}
//                 onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
//               />
//             </div>
//           </div>

//           {/* Featured Checkbox */}
//           <div className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               id="featured"
//               checked={formData.featured}
//               onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
//               className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
//             />
//             <label htmlFor="featured" className="text-sm text-gray-700 dark:text-gray-300">
//               Mark as featured project
//             </label>
//           </div>

//           {/* Form Actions */}
//           <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
//             <Button type="submit" className="flex-1" disabled={uploading}>
//               {editingProject ? 'Update Project' : 'Create Project'}
//             </Button>
//             <Button 
//               type="button" 
//               variant="secondary" 
//               onClick={() => { setModalOpen(false); resetForm(); }}
//             >
//               Cancel
//             </Button>
//           </div>
//         </form>
//       </Modal>
//     </div>
//   );
// };

// export default ProjectsManager;


// // frontend/src/components/admin/ProjectsManager.jsx
// import { useState, useEffect } from 'react';
// import { Plus, Edit, Trash } from 'lucide-react';
// import { projectsAPI } from '../../services/api';
// import Button from '../common/Button';
// import Card from '../common/Card';
// import Modal from '../common/Modal';
// import toast from 'react-hot-toast';

// const ProjectsManager = () => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editingProject, setEditingProject] = useState(null);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     longDescription: '',
//     technologies: '',
//     liveUrl: '',
//     githubUrl: '',
//     status: 'published'
//   });

//   useEffect(() => {
//     loadProjects();
//   }, []);

//   const loadProjects = async () => {
//     try {
//       const response = await projectsAPI.getAll();
//       setProjects(response.data || []);
//     } catch (error) {
//       toast.error('Failed to load projects');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const data = {
//         ...formData,
//         technologies: formData.technologies.split(',').map(t => t.trim())
//       };

//       if (editingProject) {
//         await projectsAPI.update(editingProject._id, data);
//         toast.success('Project updated!');
//       } else {
//         await projectsAPI.create(data);
//         toast.success('Project created!');
//       }

//       setModalOpen(false);
//       resetForm();
//       loadProjects();
//     } catch (error) {
//       toast.error(error.message || 'Failed to save project');
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!confirm('Delete this project?')) return;
    
//     try {
//       await projectsAPI.delete(id);
//       toast.success('Project deleted!');
//       loadProjects();
//     } catch (error) {
//       toast.error('Failed to delete project');
//     }
//   };

//   const handleEdit = (project) => {
//     setEditingProject(project);
//     setFormData({
//       title: project.title,
//       description: project.description,
//       longDescription: project.longDescription,
//       technologies: project.technologies.join(', '),
//       liveUrl: project.liveUrl || '',
//       githubUrl: project.githubUrl || '',
//       status: project.status
//     });
//     setModalOpen(true);
//   };

//   const resetForm = () => {
//     setEditingProject(null);
//     setFormData({
//       title: '',
//       description: '',
//       longDescription: '',
//       technologies: '',
//       liveUrl: '',
//       githubUrl: '',
//       status: 'published'
//     });
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Projects</h1>
//           <p className="text-gray-600 dark:text-gray-400">Manage your portfolio projects</p>
//         </div>
//         <Button icon={Plus} onClick={() => { resetForm(); setModalOpen(true); }}>
//           Add Project
//         </Button>
//       </div>

//       {/* Projects List */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {projects.map((project) => (
//           <Card key={project._id} className="p-6">
//             <h3 className="font-bold text-lg mb-2">{project.title}</h3>
//             <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
//               {project.description}
//             </p>
//             <div className="flex gap-2 mb-4 flex-wrap">
//               {project.technologies.slice(0, 3).map((tech, i) => (
//                 <span key={i} className="badge badge-primary text-xs">
//                   {tech}
//                 </span>
//               ))}
//             </div>
//             <div className="flex gap-2">
//               <Button size="sm" variant="secondary" icon={Edit} onClick={() => handleEdit(project)}>
//                 Edit
//               </Button>
//               <Button size="sm" variant="danger" icon={Trash} onClick={() => handleDelete(project._id)}>
//                 Delete
//               </Button>
//             </div>
//           </Card>
//         ))}
//       </div>

//       {/* Add/Edit Modal */}
//       <Modal 
//         isOpen={modalOpen} 
//         onClose={() => { setModalOpen(false); resetForm(); }}
//         title={editingProject ? 'Edit Project' : 'Add Project'}
//       >
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-2">Title</label>
//             <input
//               type="text"
//               className="input"
//               value={formData.title}
//               onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-2">Short Description</label>
//             <input
//               type="text"
//               className="input"
//               value={formData.description}
//               onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//               maxLength={200}
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-2">Full Description</label>
//             <textarea
//               className="input h-32"
//               value={formData.longDescription}
//               onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-2">Technologies (comma-separated)</label>
//             <input
//               type="text"
//               className="input"
//               placeholder="React, Node.js, MongoDB"
//               value={formData.technologies}
//               onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
//               required
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-2">Live URL</label>
//               <input
//                 type="url"
//                 className="input"
//                 value={formData.liveUrl}
//                 onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2">GitHub URL</label>
//               <input
//                 type="url"
//                 className="input"
//                 value={formData.githubUrl}
//                 onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-2">Status</label>
//             <select
//               className="input"
//               value={formData.status}
//               onChange={(e) => setFormData({ ...formData, status: e.target.value })}
//             >
//               <option value="published">Published</option>
//               <option value="draft">Draft</option>
//             </select>
//           </div>

//           <div className="flex gap-3 pt-4">
//             <Button type="submit" className="flex-1">
//               {editingProject ? 'Update' : 'Create'} Project
//             </Button>
//             <Button 
//               type="button" 
//               variant="secondary" 
//               onClick={() => { setModalOpen(false); resetForm(); }}
//             >
//               Cancel
//             </Button>
//           </div>
//         </form>
//       </Modal>
//     </div>
//   );
// };

// export default ProjectsManager;

 
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash, Eye, Star, Upload, X, ExternalLink, Github } from 'lucide-react';
import { FolderKanban } from "lucide-react";
import { projectsAPI, uploadAPI } from '../../services/api';
import Button from '../common/Button';
import Card from '../common/Card';
import Modal from '../common/Modal';
import Loading from '../common/Loading';
import toast from 'react-hot-toast';

const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    longDescription: '',
    technologies: '',
    category: 'web',
    liveUrl: '',
    githubUrl: '',
    status: 'published',
    featured: false,
    thumbnail: null
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await projectsAPI.getAll();
      setProjects(response.data || []);
    } catch (error) {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image must be less than 10MB');
      return;
    }

    setUploading(true);
    try {
      const result = await uploadAPI.single(file, 'projects');
      setFormData({...formData,thumbnail: {url: result.data.url,publicId: result.data.publicId}});
      toast.success('Image uploaded!');
    } catch (error) {
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // const data = {
    //   ...formData,
    //   technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean)
    // };
    const data = {
      ...formData,
      technologies: formData.technologies
        .split(',')
        .map(t => t.trim())
        .filter(Boolean),
      thumbnail: formData.thumbnail
        ? {
            url: formData.thumbnail.url,
            publicId: formData.thumbnail.publicId
          }
        : null
    };

    try {
      if (editingProject) {
        await projectsAPI.update(editingProject._id, data);
        toast.success('Project updated successfully!');
      } else {
        await projectsAPI.create(data);
        toast.success('Project created successfully!');
      }

      setModalOpen(false);
      resetForm();
      loadProjects();
    } catch (error) {
      toast.error(error.message || 'Failed to save project');
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    
    try {
      await projectsAPI.delete(id);
      toast.success('Project deleted!');
      loadProjects();
    } catch (error) {
      toast.error('Failed to delete project');
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      longDescription: project.longDescription,
      technologies: project.technologies.join(', '),
      category: project.category || 'web',
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      status: project.status,
      featured: project.featured || false,
      thumbnail: project.thumbnail || null
    });
    setModalOpen(true);
  };

  const toggleFeatured = async (project) => {
    try {
      await projectsAPI.update(project._id, { featured: !project.featured });
      toast.success(project.featured ? 'Removed from featured' : 'Added to featured');
      loadProjects();
    } catch (error) {
      toast.error('Failed to update project');
    }
  };

  const resetForm = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      longDescription: '',
      technologies: '',
      category: 'web',
      liveUrl: '',
      githubUrl: '',
      status: 'published',
      featured: false,
      thumbnail: null
    });
  };

  if (loading) return <Loading fullScreen text="Loading projects..." />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Projects Manager</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {projects.length} project{projects.length !== 1 ? 's' : ''} total
          </p>
        </div>
        <Button icon={Plus} onClick={() => { resetForm(); setModalOpen(true); }}>
          Add Project
        </Button>
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <Card className="p-12 text-center">
          <FolderKanban className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No projects yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Get started by creating your first project
          </p>
          <Button icon={Plus} onClick={() => { resetForm(); setModalOpen(true); }}>
            Add Your First Project
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-0 overflow-hidden group">
                {/* Thumbnail */}
                <div className="relative h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  {project.thumbnail?.url ? (
                    <img 
                      src={project.thumbnail.url} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <FolderKanban className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`badge text-xs ${
                      project.status === 'published' 
                        ? 'badge-success' 
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Featured Star */}
                  {project.featured && (
                    <div className="absolute top-3 right-3">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span key={i} className="badge badge-primary text-xs">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="badge bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex gap-2 mb-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs flex items-center gap-1 text-primary-600 hover:text-primary-700"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Live
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs flex items-center gap-1 text-gray-600 hover:text-gray-700"
                      >
                        <Github className="w-3 h-3" />
                        Code
                      </a>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      icon={Edit} 
                      onClick={() => handleEdit(project)}
                      className="flex-1"
                    >
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant={project.featured ? "primary" : "ghost"}
                      icon={Star}
                      onClick={() => toggleFeatured(project)}
                    />
                    <Button 
                      size="sm" 
                      variant="danger" 
                      icon={Trash}
                      onClick={() => handleDelete(project._id, project.title)}
                    />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal 
        isOpen={modalOpen} 
        onClose={() => { setModalOpen(false); resetForm(); }}
        title={editingProject ? 'Edit Project' : 'Add New Project'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-1">
          {/* Thumbnail Upload */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Project Thumbnail
            </label>
            <div className="relative">
              {formData.thumbnail?.url ? (
                <div className="relative">
                  <img 
                    src={formData.thumbnail.url} 
                    alt="Thumbnail" 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, thumbnail: null })}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {uploading ? 'Uploading...' : 'Click to upload image'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={uploading}
                  />
                </label>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Title */}
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Project Title *
              </label>
              <input
                type="text"
                className="input"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="E-Commerce Platform"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Category *
              </label>
              <select
                className="input"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="web">Web Application</option>
                <option value="mobile">Mobile App</option>
                <option value="desktop">Desktop App</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Status *
              </label>
              <select
                className="input"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Short Description * (max 200 characters)
            </label>
            <input
              type="text"
              className="input"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief one-line description"
              maxLength={200}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.description.length}/200 characters
            </p>
          </div>

          {/* Full Description */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Full Description *
            </label>
            <textarea
              className="input h-32 resize-none"
              value={formData.longDescription}
              onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
              placeholder="Detailed description of the project, features, and technologies used..."
              required
            />
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Technologies * (comma-separated)
            </label>
            <input
              type="text"
              className="input"
              placeholder="React, Node.js, MongoDB, Express, Tailwind CSS"
              value={formData.technologies}
              onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
              required
            />
          </div>

          {/* URLs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Live URL
              </label>
              <input
                type="url"
                className="input"
                placeholder="https://example.com"
                value={formData.liveUrl}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                GitHub URL
              </label>
              <input
                type="url"
                className="input"
                placeholder="https://github.com/username/repo"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              />
            </div>
          </div>

          {/* Featured Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
            />
            <label htmlFor="featured" className="text-sm text-gray-700 dark:text-gray-300">
              Mark as featured project
            </label>
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button type="submit" className="flex-1" disabled={uploading}>
              {editingProject ? 'Update Project' : 'Create Project'}
            </Button>
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => { setModalOpen(false); resetForm(); }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProjectsManager;