// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Plus, Edit, Trash, Award, Upload, X, ExternalLink, FileText, Calendar } from 'lucide-react';
// import { certificationsAPI, uploadAPI } from '../../services/api';
// import Button from '../common/Button';
// import Card from '../common/Card';
// import Modal from '../common/Modal';
// import Loading from '../common/Loading';
// import toast from 'react-hot-toast';

// const CertificationsManager = () => {
//   const [certifications, setCertifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editingCert, setEditingCert] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [filter, setFilter] = useState('all');
//   const [formData, setFormData] = useState({
//     title: '',
//     issuer: '',
//     issueDate: '',
//     expiryDate: '',
//     credentialId: '',
//     verificationUrl: '',
//     category: 'technical',
//     skills: '',
//     status: 'published',
//     image: null,
//     pdfUrl: null
//   });

//   useEffect(() => {
//     loadCertifications();
//   }, []);

//   const loadCertifications = async () => {
//     try {
//       const response = await certificationsAPI.getAll();
//       setCertifications(response.data || []);
//     } catch (error) {
//       toast.error('Failed to load certifications');
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
//       const result = await uploadAPI.single(file, 'certifications');
//       setFormData({ ...formData, image: result.data });
//       toast.success('Image uploaded!');
//     } catch (error) {
//       toast.error('Failed to upload image');
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handlePdfUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (file.type !== 'application/pdf') {
//       toast.error('Only PDF files are allowed');
//       return;
//     }

//     if (file.size > 10 * 1024 * 1024) {
//       toast.error('PDF must be less than 10MB');
//       return;
//     }

//     setUploading(true);
//     try {
//       const result = await uploadAPI.single(file, 'certifications');
//       setFormData({ ...formData, pdfUrl: result.data });
//       toast.success('PDF uploaded!');
//     } catch (error) {
//       toast.error('Failed to upload PDF');
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const data = {
//       ...formData,
//       skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean)
//     };

//     try {
//       if (editingCert) {
//         await certificationsAPI.update(editingCert._id, data);
//         toast.success('Certification updated!');
//       } else {
//         await certificationsAPI.create(data);
//         toast.success('Certification added!');
//       }

//       setModalOpen(false);
//       resetForm();
//       loadCertifications();
//     } catch (error) {
//       toast.error(error.message || 'Failed to save certification');
//     }
//   };

//   const handleDelete = async (id, title) => {
//     if (!window.confirm(`Delete "${title}"?`)) return;
    
//     try {
//       await certificationsAPI.delete(id);
//       toast.success('Certification deleted!');
//       loadCertifications();
//     } catch (error) {
//       toast.error('Failed to delete certification');
//     }
//   };

//   const handleEdit = (cert) => {
//     setEditingCert(cert);
//     setFormData({
//       title: cert.title,
//       issuer: cert.issuer,
//       issueDate: cert.issueDate ? new Date(cert.issueDate).toISOString().split('T')[0] : '',
//       expiryDate: cert.expiryDate ? new Date(cert.expiryDate).toISOString().split('T')[0] : '',
//       credentialId: cert.credentialId || '',
//       verificationUrl: cert.verificationUrl || '',
//       category: cert.category || 'technical',
//       skills: cert.skills?.join(', ') || '',
//       status: cert.status,
//       image: cert.image || null,
//       pdfUrl: cert.pdfUrl || null
//     });
//     setModalOpen(true);
//   };

//   const resetForm = () => {
//     setEditingCert(null);
//     setFormData({
//       title: '',
//       issuer: '',
//       issueDate: '',
//       expiryDate: '',
//       credentialId: '',
//       verificationUrl: '',
//       category: 'technical',
//       skills: '',
//       status: 'published',
//       image: null,
//       pdfUrl: null
//     });
//   };

//   const filteredCerts = filter === 'all' 
//     ? certifications 
//     : certifications.filter(c => c.category === filter);

//   const categories = ['all', 'technical', 'professional', 'academic', 'other'];

//   const isExpired = (expiryDate) => {
//     if (!expiryDate) return false;
//     return new Date(expiryDate) < new Date();
//   };

//   if (loading) return <Loading fullScreen text="Loading certifications..." />;

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Certifications Manager</h1>
//           <p className="text-gray-600 dark:text-gray-400">
//             {certifications.length} certification{certifications.length !== 1 ? 's' : ''} total
//           </p>
//         </div>
//         <Button icon={Plus} onClick={() => { resetForm(); setModalOpen(true); }}>
//           Add Certification
//         </Button>
//       </div>

//       {/* Category Filter */}
//       <div className="flex gap-2 flex-wrap">
//         {categories.map(cat => (
//           <button
//             key={cat}
//             onClick={() => setFilter(cat)}
//             className={`px-4 py-2 rounded-lg font-medium transition-all ${
//               filter === cat
//                 ? 'bg-primary-600 text-white shadow-lg'
//                 : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
//             }`}
//           >
//             {cat.charAt(0).toUpperCase() + cat.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Certifications Grid */}
//       {filteredCerts.length === 0 ? (
//         <Card className="p-12 text-center">
//           <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//           <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
//             No certifications yet
//           </h3>
//           <p className="text-gray-600 dark:text-gray-400 mb-4">
//             Add your professional certifications and achievements
//           </p>
//           <Button icon={Plus} onClick={() => { resetForm(); setModalOpen(true); }}>
//             Add Your First Certification
//           </Button>
//         </Card>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredCerts.map((cert, index) => (
//             <motion.div
//               key={cert._id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.05 }}
//             >
//               <Card className="p-0 overflow-hidden">
//                 {/* Image */}
//                 <div className="relative h-40 bg-gradient-to-br from-primary-500 to-purple-600">
//                   {cert.image?.url ? (
//                     <img 
//                       src={cert.image.url} 
//                       alt={cert.title}
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <div className="flex items-center justify-center h-full">
//                       <Award className="w-16 h-16 text-white opacity-50" />
//                     </div>
//                   )}
                  
//                   {/* Status Badge */}
//                   {isExpired(cert.expiryDate) && (
//                     <div className="absolute top-3 right-3">
//                       <span className="badge bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 text-xs">
//                         Expired
//                       </span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Content */}
//                 <div className="p-5">
//                   <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-white line-clamp-2">
//                     {cert.title}
//                   </h3>
//                   <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
//                     {cert.issuer}
//                   </p>

//                   {/* Date */}
//                   <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
//                     <Calendar className="w-3 h-3" />
//                     <span>
//                       {new Date(cert.issueDate).toLocaleDateString('en-US', { 
//                         month: 'short', 
//                         year: 'numeric' 
//                       })}
//                     </span>
//                     {cert.expiryDate && (
//                       <span>
//                         - {new Date(cert.expiryDate).toLocaleDateString('en-US', { 
//                           month: 'short', 
//                           year: 'numeric' 
//                         })}
//                       </span>
//                     )}
//                   </div>

//                   {/* Skills */}
//                   {cert.skills?.length > 0 && (
//                     <div className="flex gap-2 mb-4 flex-wrap">
//                       {cert.skills.slice(0, 3).map((skill, i) => (
//                         <span key={i} className="badge badge-primary text-xs">
//                           {skill}
//                         </span>
//                       ))}
//                     </div>
//                   )}

//                   {/* Links */}
//                   <div className="flex gap-2 mb-4">
//                     {cert.verificationUrl && (
//                       <a
//                         href={cert.verificationUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-xs flex items-center gap-1 text-primary-600 hover:text-primary-700"
//                       >
//                         <ExternalLink className="w-3 h-3" />
//                         Verify
//                       </a>
//                     )}
//                     {cert.pdfUrl?.url && (
//                       <a
//                         href={cert.pdfUrl.url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-xs flex items-center gap-1 text-gray-600 hover:text-gray-700"
//                       >
//                         <FileText className="w-3 h-3" />
//                         View PDF
//                       </a>
//                     )}
//                   </div>

//                   {/* Actions */}
//                   <div className="flex gap-2">
//                     <Button 
//                       size="sm" 
//                       variant="secondary" 
//                       icon={Edit} 
//                       onClick={() => handleEdit(cert)}
//                       className="flex-1"
//                     >
//                       Edit
//                     </Button>
//                     <Button 
//                       size="sm" 
//                       variant="danger" 
//                       icon={Trash}
//                       onClick={() => handleDelete(cert._id, cert.title)}
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
//         title={editingCert ? 'Edit Certification' : 'Add New Certification'}
//         size="lg"
//       >
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Image Upload */}
//           <div>
//             <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
//               Certificate Image
//             </label>
//             <div className="relative">
//               {formData.image?.url ? (
//                 <div className="relative">
//                   <img 
//                     src={formData.image.url} 
//                     alt="Certificate" 
//                     className="w-full h-40 object-cover rounded-lg"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setFormData({ ...formData, image: null })}
//                     className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
//                 </div>
//               ) : (
//                 <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-primary-500">
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

//           {/* Title & Issuer */}
//           <div className="grid grid-cols-2 gap-4">
//             <div className="col-span-2">
//               <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
//                 Certificate Title *
//               </label>
//               <input
//                 type="text"
//                 className="input"
//                 value={formData.title}
//                 onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                 placeholder="AWS Certified Developer - Associate"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
//                 Issuing Organization *
//               </label>
//               <input
//                 type="text"
//                 className="input"
//                 value={formData.issuer}
//                 onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
//                 placeholder="Amazon Web Services"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
//                 Category *
//               </label>
//               <select
//                 className="input"
//                 value={formData.category}
//                 onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//               >
//                 <option value="technical">Technical</option>
//                 <option value="professional">Professional</option>
//                 <option value="academic">Academic</option>
//                 <option value="other">Other</option>
//               </select>
//             </div>
//           </div>

//           {/* Dates */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
//                 Issue Date *
//               </label>
//               <input
//                 type="date"
//                 className="input"
//                 value={formData.issueDate}
//                 onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
//                 Expiry Date
//               </label>
//               <input
//                 type="date"
//                 className="input"
//                 value={formData.expiryDate}
//                 onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
//               />
//             </div>
//           </div>

//           {/* Credential & Verification */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
//                 Credential ID
//               </label>
//               <input
//                 type="text"
//                 className="input"
//                 value={formData.credentialId}
//                 onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
//                 placeholder="ABC123XYZ"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
//                 Verification URL
//               </label>
//               <input
//                 type="url"
//                 className="input"
//                 value={formData.verificationUrl}
//                 onChange={(e) => setFormData({ ...formData, verificationUrl: e.target.value })}
//                 placeholder="https://verify.example.com"
//               />
//             </div>
//           </div>

//           {/* Skills */}
//           <div>
//             <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
//               Related Skills (comma-separated)
//             </label>
//             <input
//               type="text"
//               className="input"
//               placeholder="AWS, Cloud Computing, DevOps"
//               value={formData.skills}
//               onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
//             />
//           </div>

//           {/* PDF Upload */}
//           <div>
//             <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
//               Certificate PDF (Optional)
//             </label>
//             {formData.pdfUrl?.url ? (
//               <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
//                 <FileText className="w-8 h-8 text-red-500" />
//                 <div className="flex-1">
//                   <p className="text-sm font-medium text-gray-900 dark:text-white">PDF Uploaded</p>
//                   <a 
//                     href={formData.pdfUrl.url} 
//                     target="_blank" 
//                     rel="noopener noreferrer"
//                     className="text-xs text-primary-600 hover:text-primary-700"
//                   >
//                     View PDF
//                   </a>
//                 </div>
//                 <button
//                   type="button"
//                   onClick={() => setFormData({ ...formData, pdfUrl: null })}
//                   className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               </div>
//             ) : (
//               <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-primary-500">
//                 <FileText className="w-8 h-8 text-gray-400 mb-1" />
//                 <span className="text-sm text-gray-600 dark:text-gray-400">
//                   {uploading ? 'Uploading...' : 'Click to upload PDF'}
//                 </span>
//                 <input
//                   type="file"
//                   accept="application/pdf"
//                   className="hidden"
//                   onChange={handlePdfUpload}
//                   disabled={uploading}
//                 />
//               </label>
//             )}
//           </div>

//           {/* Status */}
//           <div>
//             <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
//               Status
//             </label>
//             <select
//               className="input"
//               value={formData.status}
//               onChange={(e) => setFormData({ ...formData, status: e.target.value })}
//             >
//               <option value="published">Published</option>
//               <option value="draft">Draft</option>
//             </select>
//           </div>

//           {/* Form Actions */}
//           <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
//             <Button type="submit" className="flex-1" disabled={uploading}>
//               {editingCert ? 'Update Certification' : 'Create Certification'}
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

// export default CertificationsManager;


import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash, Award, Upload, X, ExternalLink, FileText, Calendar } from 'lucide-react';
import { certificationsAPI, uploadAPI } from '../../services/api';
import Button from '../common/Button';
import Card from '../common/Card';
import Modal from '../common/Modal';
import Loading from '../common/Loading';
import toast from 'react-hot-toast';

const CertificationsManager = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    issueDate: '',
    expiryDate: '',
    credentialId: '',
    verificationUrl: '',
    category: 'technical',
    skills: '',
    status: 'published',
    image: null,
    pdfUrl: null
  });

  useEffect(() => {
    loadCertifications();
  }, []);

  const loadCertifications = async () => {
    try {
      const response = await certificationsAPI.getAll();
      setCertifications(response.data || []);
    } catch (error) {
      toast.error('Failed to load certifications');
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
      const result = await uploadAPI.single(file, 'certifications');
      setFormData({ ...formData, image: result.data });
      toast.success('Image uploaded!');
    } catch (error) {
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast.error('Only PDF files are allowed');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('PDF must be less than 10MB');
      return;
    }

    setUploading(true);
    try {
      const result = await uploadAPI.single(file, 'certifications');
      setFormData({ ...formData, pdfUrl: result.data });
      toast.success('PDF uploaded!');
    } catch (error) {
      toast.error('Failed to upload PDF');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = {
      ...formData,
      skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean)
    };

    try {
      if (editingCert) {
        await certificationsAPI.update(editingCert._id, data);
        toast.success('Certification updated!');
      } else {
        await certificationsAPI.create(data);
        toast.success('Certification added!');
      }

      setModalOpen(false);
      resetForm();
      loadCertifications();
    } catch (error) {
      toast.error(error.message || 'Failed to save certification');
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    
    try {
      await certificationsAPI.delete(id);
      toast.success('Certification deleted!');
      loadCertifications();
    } catch (error) {
      toast.error('Failed to delete certification');
    }
  };

  const handleEdit = (cert) => {
    setEditingCert(cert);
    setFormData({
      title: cert.title,
      issuer: cert.issuer,
      issueDate: cert.issueDate ? new Date(cert.issueDate).toISOString().split('T')[0] : '',
      expiryDate: cert.expiryDate ? new Date(cert.expiryDate).toISOString().split('T')[0] : '',
      credentialId: cert.credentialId || '',
      verificationUrl: cert.verificationUrl || '',
      category: cert.category || 'technical',
      skills: cert.skills?.join(', ') || '',
      status: cert.status,
      image: cert.image || null,
      pdfUrl: cert.pdfUrl || null
    });
    setModalOpen(true);
  };

  const resetForm = () => {
    setEditingCert(null);
    setFormData({
      title: '',
      issuer: '',
      issueDate: '',
      expiryDate: '',
      credentialId: '',
      verificationUrl: '',
      category: 'technical',
      skills: '',
      status: 'published',
      image: null,
      pdfUrl: null
    });
  };

  const filteredCerts = filter === 'all' 
    ? certifications 
    : certifications.filter(c => c.category === filter);

  const categories = ['all', 'technical', 'professional', 'academic', 'other'];

  const isExpired = (expiryDate) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  if (loading) return <Loading fullScreen text="Loading certifications..." />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Certifications Manager</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {certifications.length} certification{certifications.length !== 1 ? 's' : ''} total
          </p>
        </div>
        <Button icon={Plus} onClick={() => { resetForm(); setModalOpen(true); }}>
          Add Certification
        </Button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === cat
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Certifications Grid */}
      {filteredCerts.length === 0 ? (
        <Card className="p-12 text-center">
          <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No certifications yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Add your professional certifications and achievements
          </p>
          <Button icon={Plus} onClick={() => { resetForm(); setModalOpen(true); }}>
            Add Your First Certification
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert, index) => (
            <motion.div
              key={cert._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-0 overflow-hidden">
                {/* Image */}
                <div className="relative h-40 bg-gradient-to-br from-primary-500 to-purple-600">
                  {cert.image?.url ? (
                    <img 
                      src={cert.image.url} 
                      alt={cert.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Award className="w-16 h-16 text-white opacity-50" />
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  {isExpired(cert.expiryDate) && (
                    <div className="absolute top-3 right-3">
                      <span className="badge bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 text-xs">
                        Expired
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-white line-clamp-2">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {cert.issuer}
                  </p>

                  {/* Date */}
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {new Date(cert.issueDate).toLocaleDateString('en-US', { 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </span>
                    {cert.expiryDate && (
                      <span>
                        - {new Date(cert.expiryDate).toLocaleDateString('en-US', { 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </span>
                    )}
                  </div>

                  {/* Skills */}
                  {cert.skills?.length > 0 && (
                    <div className="flex gap-2 mb-4 flex-wrap">
                      {cert.skills.slice(0, 3).map((skill, i) => (
                        <span key={i} className="badge badge-primary text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Links */}
                  <div className="flex gap-2 mb-4">
                    {cert.verificationUrl && (
                      <a
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs flex items-center gap-1 text-primary-600 hover:text-primary-700"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Verify
                      </a>
                    )}
                    {cert.pdfUrl?.url && (
                      <a
                        href={cert.pdfUrl.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs flex items-center gap-1 text-gray-600 hover:text-gray-700"
                      >
                        <FileText className="w-3 h-3" />
                        View PDF
                      </a>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      icon={Edit} 
                      onClick={() => handleEdit(cert)}
                      className="flex-1"
                    >
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="danger" 
                      icon={Trash}
                      onClick={() => handleDelete(cert._id, cert.title)}
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
        title={editingCert ? 'Edit Certification' : 'Add New Certification'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-1">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Certificate Image
            </label>
            <div className="relative">
              {formData.image?.url ? (
                <div className="relative">
                  <img 
                    src={formData.image.url} 
                    alt="Certificate" 
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, image: null })}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-primary-500">
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

          {/* Title & Issuer */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Certificate Title *
              </label>
              <input
                type="text"
                className="input"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="AWS Certified Developer - Associate"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Issuing Organization *
              </label>
              <input
                type="text"
                className="input"
                value={formData.issuer}
                onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                placeholder="Amazon Web Services"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Category *
              </label>
              <select
                className="input"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="technical">Technical</option>
                <option value="professional">Professional</option>
                <option value="academic">Academic</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Issue Date *
              </label>
              <input
                type="date"
                className="input"
                value={formData.issueDate}
                onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Expiry Date
              </label>
              <input
                type="date"
                className="input"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
              />
            </div>
          </div>

          {/* Credential & Verification */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Credential ID
              </label>
              <input
                type="text"
                className="input"
                value={formData.credentialId}
                onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
                placeholder="ABC123XYZ"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Verification URL
              </label>
              <input
                type="url"
                className="input"
                value={formData.verificationUrl}
                onChange={(e) => setFormData({ ...formData, verificationUrl: e.target.value })}
                placeholder="https://verify.example.com"
              />
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Related Skills (comma-separated)
            </label>
            <input
              type="text"
              className="input"
              placeholder="AWS, Cloud Computing, DevOps"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
            />
          </div>

          {/* PDF Upload */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Certificate PDF (Optional)
            </label>
            {formData.pdfUrl?.url ? (
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <FileText className="w-8 h-8 text-red-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">PDF Uploaded</p>
                  <a 
                    href={formData.pdfUrl.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-primary-600 hover:text-primary-700"
                  >
                    View PDF
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, pdfUrl: null })}
                  className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-primary-500">
                <FileText className="w-8 h-8 text-gray-400 mb-1" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {uploading ? 'Uploading...' : 'Click to upload PDF'}
                </span>
                <input
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={handlePdfUpload}
                  disabled={uploading}
                />
              </label>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Status
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

          {/* Form Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button type="submit" className="flex-1" disabled={uploading}>
              {editingCert ? 'Update Certification' : 'Create Certification'}
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

export default CertificationsManager;