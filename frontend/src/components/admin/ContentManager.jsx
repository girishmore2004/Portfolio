// // // import { useState, useEffect } from 'react';
// // // import { motion } from 'framer-motion';
// // // import {
// // //   Save,
// // //   X,
// // //   Upload,
// // //   Eye,
// // //   Image as ImageIcon,
// // //   FileText,
// // //   User,
// // //   Home,
// // //   Mail,
// // //   AlertCircle,
// // //   CheckCircle,
// // //   Loader,
// // //   RefreshCw,
// // //   Copy,
// // //   ExternalLink,
// // //   Download
// // // } from 'lucide-react';
// // // import api from '../../services/api';
// // // import Button from '../common/Button';
// // // import Input from '../common/Input';
// // // import Card from '../common/Card';
// // // import Modal from '../common/Modal';

// // // const ContentManager = () => {
// // //   const [activeTab, setActiveTab] = useState('hero');
// // //   const [loading, setLoading] = useState(true);
// // //   const [saving, setSaving] = useState(false);
// // //   const [previewMode, setPreviewMode] = useState(false);
// // //   const [showResetModal, setShowResetModal] = useState(false);
// // //   const [notification, setNotification] = useState(null);

// // //   // Content State
// // //   const [heroContent, setHeroContent] = useState({
// // //     title: '',
// // //     subtitle: '',
// // //     description: '',
// // //     roles: [],
// // //     ctaButtons: [],
// // //     backgroundImage: '',
// // //     stats: []
// // //   });

// // //   const [aboutContent, setAboutContent] = useState({
// // //     title: '',
// // //     description: '',
// // //     image: '',
// // //     highlights: [],
// // //     experience: '',
// // //     location: '',
// // //     availability: '',
// // //     bio: ''
// // //   });

// // //   const [contactContent, setContactContent] = useState({
// // //     email: '',
// // //     phone: '',
// // //     address: '',
// // //     socialLinks: [],
// // //     availability: '',
// // //     timezone: '',
// // //     preferredContact: ''
// // //   });

// // //   const [resumeContent, setResumeContent] = useState({
// // //     resumeUrl: '',
// // //     lastUpdated: '',
// // //     versions: []
// // //   });

// // //   // Fetch content on mount
// // //   useEffect(() => {
// // //     fetchContent();
// // //   }, []);

// // //   const fetchContent = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const response = await api.get('/content');
// // //       const data = response.data;

// // //       // Populate sections
// // //       const hero = data.find(item => item.section === 'hero');
// // //       const about = data.find(item => item.section === 'about');
// // //       const contact = data.find(item => item.section === 'contact');
// // //       const resume = data.find(item => item.section === 'resume');

// // //       if (hero) setHeroContent(hero.content);
// // //       if (about) setAboutContent(about.content);
// // //       if (contact) setContactContent(contact.content);
// // //       if (resume) setResumeContent(resume.content);

// // //     } catch (error) {
// // //       showNotification('Failed to load content', 'error');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const saveContent = async (section, content) => {
// // //     try {
// // //       setSaving(true);
// // //       await api.post('/content', {
// // //         section,
// // //         content,
// // //         published: true
// // //       });
// // //       showNotification(`${section} section updated successfully!`, 'success');
// // //     } catch (error) {
// // //       showNotification(`Failed to update ${section} section`, 'error');
// // //     } finally {
// // //       setSaving(false);
// // //     }
// // //   };

// // //   const handleImageUpload = async (e, section, field) => {
// // //     const file = e.target.files[0];
// // //     if (!file) return;

// // //     if (!file.type.startsWith('image/')) {
// // //       showNotification('Please upload an image file', 'error');
// // //       return;
// // //     }

// // //     try {
// // //       const formData = new FormData();
// // //       formData.append('file', file);

// // //       const response = await api.post('/upload', formData);
// // //       const imageUrl = response.data.url;

// // //       // Update content based on section
// // //       if (section === 'hero') {
// // //         setHeroContent(prev => ({ ...prev, [field]: imageUrl }));
// // //       } else if (section === 'about') {
// // //         setAboutContent(prev => ({ ...prev, [field]: imageUrl }));
// // //       }

// // //       showNotification('Image uploaded successfully!', 'success');
// // //     } catch (error) {
// // //       showNotification('Failed to upload image', 'error');
// // //     }
// // //   };

// // //   const handleResumeUpload = async (e) => {
// // //     const file = e.target.files[0];
// // //     if (!file) return;

// // //     if (file.type !== 'application/pdf') {
// // //       showNotification('Please upload a PDF file', 'error');
// // //       return;
// // //     }

// // //     try {
// // //       const formData = new FormData();
// // //       formData.append('file', file);

// // //       const response = await api.post('/upload', formData);
// // //       const resumeUrl = response.data.url;

// // //       const newVersion = {
// // //         url: resumeUrl,
// // //         uploadedAt: new Date().toISOString(),
// // //         name: file.name,
// // //         size: file.size
// // //       };

// // //       setResumeContent(prev => ({
// // //         ...prev,
// // //         resumeUrl,
// // //         lastUpdated: new Date().toISOString(),
// // //         versions: [...(prev.versions || []), newVersion]
// // //       }));

// // //       showNotification('Resume uploaded successfully!', 'success');
// // //     } catch (error) {
// // //       showNotification('Failed to upload resume', 'error');
// // //     }
// // //   };

// // //   const addArrayItem = (setter, field, defaultItem = '') => {
// // //     setter(prev => ({
// // //       ...prev,
// // //       [field]: [...(prev[field] || []), defaultItem]
// // //     }));
// // //   };

// // //   const updateArrayItem = (setter, field, index, value) => {
// // //     setter(prev => ({
// // //       ...prev,
// // //       [field]: prev[field].map((item, i) => i === index ? value : item)
// // //     }));
// // //   };

// // //   const removeArrayItem = (setter, field, index) => {
// // //     setter(prev => ({
// // //       ...prev,
// // //       [field]: prev[field].filter((_, i) => i !== index)
// // //     }));
// // //   };

// // //   const showNotification = (message, type = 'info') => {
// // //     setNotification({ message, type });
// // //     setTimeout(() => setNotification(null), 3000);
// // //   };

// // //   const resetSection = async (section) => {
// // //     try {
// // //       await api.delete(`/content/${section}`);
// // //       await fetchContent();
// // //       showNotification(`${section} section reset successfully`, 'success');
// // //       setShowResetModal(false);
// // //     } catch (error) {
// // //       showNotification(`Failed to reset ${section} section`, 'error');
// // //     }
// // //   };

// // //   const tabs = [
// // //     { id: 'hero', label: 'Hero Section', icon: Home },
// // //     { id: 'about', label: 'About Me', icon: User },
// // //     { id: 'contact', label: 'Contact Info', icon: Mail },
// // //     { id: 'resume', label: 'Resume', icon: FileText }
// // //   ];

// // //   if (loading) {
// // //     return (
// // //       <div className="flex items-center justify-center h-96">
// // //         <Loader className="w-8 h-8 animate-spin text-indigo-600" />
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="space-y-6">
// // //       {/* Header */}
// // //       <div className="flex items-center justify-between">
// // //         <div>
// // //           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
// // //             Content Manager
// // //           </h1>
// // //           <p className="text-gray-600 dark:text-gray-400 mt-1">
// // //             Edit your portfolio sections
// // //           </p>
// // //         </div>
// // //         <div className="flex gap-3">
// // //           <Button
// // //             variant="secondary"
// // //             onClick={() => setPreviewMode(!previewMode)}
// // //           >
// // //             <Eye className="w-4 h-4" />
// // //             {previewMode ? 'Edit Mode' : 'Preview'}
// // //           </Button>
// // //           <Button onClick={fetchContent}>
// // //             <RefreshCw className="w-4 h-4" />
// // //             Refresh
// // //           </Button>
// // //         </div>
// // //       </div>

// // //       {/* Notification */}
// // //       {notification && (
// // //         <motion.div
// // //           initial={{ opacity: 0, y: -20 }}
// // //           animate={{ opacity: 1, y: 0 }}
// // //           exit={{ opacity: 0, y: -20 }}
// // //           className={`p-4 rounded-lg flex items-center gap-3 ${
// // //             notification.type === 'success'
// // //               ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
// // //               : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
// // //           }`}
// // //         >
// // //           {notification.type === 'success' ? (
// // //             <CheckCircle className="w-5 h-5" />
// // //           ) : (
// // //             <AlertCircle className="w-5 h-5" />
// // //           )}
// // //           <span>{notification.message}</span>
// // //         </motion.div>
// // //       )}

// // //       {/* Tabs */}
// // //       <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
// // //         {tabs.map(tab => (
// // //           <button
// // //             key={tab.id}
// // //             onClick={() => setActiveTab(tab.id)}
// // //             className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors whitespace-nowrap ${
// // //               activeTab === tab.id
// // //                 ? 'text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400'
// // //                 : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
// // //             }`}
// // //           >
// // //             <tab.icon className="w-4 h-4" />
// // //             {tab.label}
// // //           </button>
// // //         ))}
// // //       </div>

// // //       {/* Content Sections */}
// // //       <Card>
// // //         {/* HERO SECTION */}
// // //         {activeTab === 'hero' && (
// // //           <div className="space-y-6">
// // //             <div className="flex items-center justify-between">
// // //               <h2 className="text-xl font-bold text-gray-900 dark:text-white">
// // //                 Hero Section
// // //               </h2>
// // //               <Button
// // //                 variant="secondary"
// // //                 size="sm"
// // //                 onClick={() => saveContent('hero', heroContent)}
// // //                 loading={saving}
// // //               >
// // //                 <Save className="w-4 h-4" />
// // //                 Save Changes
// // //               </Button>
// // //             </div>

// // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //               <Input
// // //                 label="Main Title"
// // //                 placeholder="Your Name"
// // //                 value={heroContent.title}
// // //                 onChange={(e) => setHeroContent({ ...heroContent, title: e.target.value })}
// // //               />
// // //               <Input
// // //                 label="Subtitle"
// // //                 placeholder="Full Stack Developer"
// // //                 value={heroContent.subtitle}
// // //                 onChange={(e) => setHeroContent({ ...heroContent, subtitle: e.target.value })}
// // //               />
// // //             </div>

// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// // //                 Description
// // //               </label>
// // //               <textarea
// // //                 rows={4}
// // //                 className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
// // //                 placeholder="Brief introduction..."
// // //                 value={heroContent.description}
// // //                 onChange={(e) => setHeroContent({ ...heroContent, description: e.target.value })}
// // //               />
// // //             </div>

// // //             {/* Roles */}
// // //             <div>
// // //               <div className="flex items-center justify-between mb-3">
// // //                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
// // //                   Rotating Roles
// // //                 </label>
// // //                 <Button
// // //                   size="sm"
// // //                   onClick={() => addArrayItem(setHeroContent, 'roles', '')}
// // //                 >
// // //                   Add Role
// // //                 </Button>
// // //               </div>
// // //               <div className="space-y-2">
// // //                 {(heroContent.roles || []).map((role, index) => (
// // //                   <div key={index} className="flex gap-2">
// // //                     <Input
// // //                       placeholder="e.g., Full Stack Developer"
// // //                       value={role}
// // //                       onChange={(e) => updateArrayItem(setHeroContent, 'roles', index, e.target.value)}
// // //                     />
// // //                     <Button
// // //                       variant="danger"
// // //                       size="sm"
// // //                       onClick={() => removeArrayItem(setHeroContent, 'roles', index)}
// // //                     >
// // //                       <X className="w-4 h-4" />
// // //                     </Button>
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             </div>

// // //             {/* CTA Buttons */}
// // //             <div>
// // //               <div className="flex items-center justify-between mb-3">
// // //                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
// // //                   Call-to-Action Buttons
// // //                 </label>
// // //                 <Button
// // //                   size="sm"
// // //                   onClick={() => addArrayItem(setHeroContent, 'ctaButtons', { text: '', link: '' })}
// // //                 >
// // //                   Add Button
// // //                 </Button>
// // //               </div>
// // //               <div className="space-y-3">
// // //                 {(heroContent.ctaButtons || []).map((btn, index) => (
// // //                   <div key={index} className="grid grid-cols-2 gap-3">
// // //                     <Input
// // //                       placeholder="Button Text"
// // //                       value={btn.text}
// // //                       onChange={(e) => updateArrayItem(
// // //                         setHeroContent,
// // //                         'ctaButtons',
// // //                         index,
// // //                         { ...btn, text: e.target.value }
// // //                       )}
// // //                     />
// // //                     <div className="flex gap-2">
// // //                       <Input
// // //                         placeholder="Link/URL"
// // //                         value={btn.link}
// // //                         onChange={(e) => updateArrayItem(
// // //                           setHeroContent,
// // //                           'ctaButtons',
// // //                           index,
// // //                           { ...btn, link: e.target.value }
// // //                         )}
// // //                       />
// // //                       <Button
// // //                         variant="danger"
// // //                         size="sm"
// // //                         onClick={() => removeArrayItem(setHeroContent, 'ctaButtons', index)}
// // //                       >
// // //                         <X className="w-4 h-4" />
// // //                       </Button>
// // //                     </div>
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             </div>

// // //             {/* Background Image */}
// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// // //                 Background Image
// // //               </label>
// // //               <div className="flex items-center gap-4">
// // //                 {heroContent.backgroundImage && (
// // //                   <img
// // //                     src={heroContent.backgroundImage}
// // //                     alt="Background"
// // //                     className="w-32 h-32 object-cover rounded-lg"
// // //                   />
// // //                 )}
// // //                 <label className="cursor-pointer">
// // //                   <input
// // //                     type="file"
// // //                     accept="image/*"
// // //                     className="hidden"
// // //                     onChange={(e) => handleImageUpload(e, 'hero', 'backgroundImage')}
// // //                   />
// // //                   <div className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
// // //                     <Upload className="w-4 h-4" />
// // //                     Upload Image
// // //                   </div>
// // //                 </label>
// // //               </div>
// // //             </div>

// // //             {/* Stats */}
// // //             <div>
// // //               <div className="flex items-center justify-between mb-3">
// // //                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
// // //                   Stats Counter
// // //                 </label>
// // //                 <Button
// // //                   size="sm"
// // //                   onClick={() => addArrayItem(setHeroContent, 'stats', { label: '', value: '' })}
// // //                 >
// // //                   Add Stat
// // //                 </Button>
// // //               </div>
// // //               <div className="space-y-3">
// // //                 {(heroContent.stats || []).map((stat, index) => (
// // //                   <div key={index} className="grid grid-cols-2 gap-3">
// // //                     <Input
// // //                       placeholder="Value (e.g., 50+)"
// // //                       value={stat.value}
// // //                       onChange={(e) => updateArrayItem(
// // //                         setHeroContent,
// // //                         'stats',
// // //                         index,
// // //                         { ...stat, value: e.target.value }
// // //                       )}
// // //                     />
// // //                     <div className="flex gap-2">
// // //                       <Input
// // //                         placeholder="Label (e.g., Projects)"
// // //                         value={stat.label}
// // //                         onChange={(e) => updateArrayItem(
// // //                           setHeroContent,
// // //                           'stats',
// // //                           index,
// // //                           { ...stat, label: e.target.value }
// // //                         )}
// // //                       />
// // //                       <Button
// // //                         variant="danger"
// // //                         size="sm"
// // //                         onClick={() => removeArrayItem(setHeroContent, 'stats', index)}
// // //                       >
// // //                         <X className="w-4 h-4" />
// // //                       </Button>
// // //                     </div>
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* ABOUT SECTION */}
// // //         {activeTab === 'about' && (
// // //           <div className="space-y-6">
// // //             <div className="flex items-center justify-between">
// // //               <h2 className="text-xl font-bold text-gray-900 dark:text-white">
// // //                 About Me Section
// // //               </h2>
// // //               <Button
// // //                 variant="secondary"
// // //                 size="sm"
// // //                 onClick={() => saveContent('about', aboutContent)}
// // //                 loading={saving}
// // //               >
// // //                 <Save className="w-4 h-4" />
// // //                 Save Changes
// // //               </Button>
// // //             </div>

// // //             <Input
// // //               label="Section Title"
// // //               placeholder="About Me"
// // //               value={aboutContent.title}
// // //               onChange={(e) => setAboutContent({ ...aboutContent, title: e.target.value })}
// // //             />

// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// // //                 Biography
// // //               </label>
// // //               <textarea
// // //                 rows={6}
// // //                 className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
// // //                 placeholder="Tell your story..."
// // //                 value={aboutContent.bio}
// // //                 onChange={(e) => setAboutContent({ ...aboutContent, bio: e.target.value })}
// // //               />
// // //             </div>

// // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //               <Input
// // //                 label="Years of Experience"
// // //                 placeholder="5+ years"
// // //                 value={aboutContent.experience}
// // //                 onChange={(e) => setAboutContent({ ...aboutContent, experience: e.target.value })}
// // //               />
// // //               <Input
// // //                 label="Location"
// // //                 placeholder="San Francisco, CA"
// // //                 value={aboutContent.location}
// // //                 onChange={(e) => setAboutContent({ ...aboutContent, location: e.target.value })}
// // //               />
// // //               <Input
// // //                 label="Availability"
// // //                 placeholder="Open to opportunities"
// // //                 value={aboutContent.availability}
// // //                 onChange={(e) => setAboutContent({ ...aboutContent, availability: e.target.value })}
// // //               />
// // //             </div>

// // //             {/* Profile Image */}
// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// // //                 Profile Image
// // //               </label>
// // //               <div className="flex items-center gap-4">
// // //                 {aboutContent.image && (
// // //                   <img
// // //                     src={aboutContent.image}
// // //                     alt="Profile"
// // //                     className="w-32 h-32 object-cover rounded-full"
// // //                   />
// // //                 )}
// // //                 <label className="cursor-pointer">
// // //                   <input
// // //                     type="file"
// // //                     accept="image/*"
// // //                     className="hidden"
// // //                     onChange={(e) => handleImageUpload(e, 'about', 'image')}
// // //                   />
// // //                   <div className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
// // //                     <Upload className="w-4 h-4" />
// // //                     Upload Photo
// // //                   </div>
// // //                 </label>
// // //               </div>
// // //             </div>

// // //             {/* Highlights */}
// // //             <div>
// // //               <div className="flex items-center justify-between mb-3">
// // //                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
// // //                   Key Highlights
// // //                 </label>
// // //                 <Button
// // //                   size="sm"
// // //                   onClick={() => addArrayItem(setAboutContent, 'highlights', '')}
// // //                 >
// // //                   Add Highlight
// // //                 </Button>
// // //               </div>
// // //               <div className="space-y-2">
// // //                 {(aboutContent.highlights || []).map((highlight, index) => (
// // //                   <div key={index} className="flex gap-2">
// // //                     <Input
// // //                       placeholder="e.g., Award-winning developer"
// // //                       value={highlight}
// // //                       onChange={(e) => updateArrayItem(setAboutContent, 'highlights', index, e.target.value)}
// // //                     />
// // //                     <Button
// // //                       variant="danger"
// // //                       size="sm"
// // //                       onClick={() => removeArrayItem(setAboutContent, 'highlights', index)}
// // //                     >
// // //                       <X className="w-4 h-4" />
// // //                     </Button>
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* CONTACT SECTION */}
// // //         {activeTab === 'contact' && (
// // //           <div className="space-y-6">
// // //             <div className="flex items-center justify-between">
// // //               <h2 className="text-xl font-bold text-gray-900 dark:text-white">
// // //                 Contact Information
// // //               </h2>
// // //               <Button
// // //                 variant="secondary"
// // //                 size="sm"
// // //                 onClick={() => saveContent('contact', contactContent)}
// // //                 loading={saving}
// // //               >
// // //                 <Save className="w-4 h-4" />
// // //                 Save Changes
// // //               </Button>
// // //             </div>

// // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //               <Input
// // //                 label="Email Address"
// // //                 type="email"
// // //                 placeholder="your@email.com"
// // //                 value={contactContent.email}
// // //                 onChange={(e) => setContactContent({ ...contactContent, email: e.target.value })}
// // //               />
// // //               <Input
// // //                 label="Phone Number"
// // //                 type="tel"
// // //                 placeholder="+1 (555) 123-4567"
// // //                 value={contactContent.phone}
// // //                 onChange={(e) => setContactContent({ ...contactContent, phone: e.target.value })}
// // //               />
// // //               <Input
// // //                 label="Address"
// // //                 placeholder="City, State, Country"
// // //                 value={contactContent.address}
// // //                 onChange={(e) => setContactContent({ ...contactContent, address: e.target.value })}
// // //               />
// // //               <Input
// // //                 label="Timezone"
// // //                 placeholder="PST (UTC-8)"
// // //                 value={contactContent.timezone}
// // //                 onChange={(e) => setContactContent({ ...contactContent, timezone: e.target.value })}
// // //               />
// // //               <Input
// // //                 label="Availability"
// // //                 placeholder="Available for projects"
// // //                 value={contactContent.availability}
// // //                 onChange={(e) => setContactContent({ ...contactContent, availability: e.target.value })}
// // //               />
// // //               <Input
// // //                 label="Preferred Contact Method"
// // //                 placeholder="Email or Phone"
// // //                 value={contactContent.preferredContact}
// // //                 onChange={(e) => setContactContent({ ...contactContent, preferredContact: e.target.value })}
// // //               />
// // //             </div>

// // //             {/* Social Links */}
// // //             <div>
// // //               <div className="flex items-center justify-between mb-3">
// // //                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
// // //                   Social Media Links
// // //                 </label>
// // //                 <Button
// // //                   size="sm"
// // //                   onClick={() => addArrayItem(setContactContent, 'socialLinks', { platform: '', url: '' })}
// // //                 >
// // //                   Add Social Link
// // //                 </Button>
// // //               </div>
// // //               <div className="space-y-3">
// // //                 {(contactContent.socialLinks || []).map((social, index) => (
// // //                   <div key={index} className="grid grid-cols-3 gap-3">
// // //                     <Input
// // //                       placeholder="Platform (e.g., LinkedIn)"
// // //                       value={social.platform}
// // //                       onChange={(e) => updateArrayItem(
// // //                         setContactContent,
// // //                         'socialLinks',
// // //                         index,
// // //                         { ...social, platform: e.target.value }
// // //                       )}
// // //                     />
// // //                     <div className="col-span-2 flex gap-2">
// // //                       <Input
// // //                         placeholder="URL"
// // //                         value={social.url}
// // //                         onChange={(e) => updateArrayItem(
// // //                           setContactContent,
// // //                           'socialLinks',
// // //                           index,
// // //                           { ...social, url: e.target.value }
// // //                         )}
// // //                       />
// // //                       <Button
// // //                         variant="secondary"
// // //                         size="sm"
// // //                         onClick={() => window.open(social.url, '_blank')}
// // //                       >
// // //                         <ExternalLink className="w-4 h-4" />
// // //                       </Button>
// // //                       <Button
// // //                         variant="danger"
// // //                         size="sm"
// // //                         onClick={() => removeArrayItem(setContactContent, 'socialLinks', index)}
// // //                       >
// // //                         <X className="w-4 h-4" />
// // //                       </Button>
// // //                     </div>
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* RESUME SECTION */}
// // //         {activeTab === 'resume' && (
// // //           <div className="space-y-6">
// // //             <div className="flex items-center justify-between">
// // //               <h2 className="text-xl font-bold text-gray-900 dark:text-white">
// // //                 Resume Management
// // //               </h2>
// // //               <Button
// // //                 variant="secondary"
// // //                 size="sm"
// // //                 onClick={() => saveContent('resume', resumeContent)}
// // //                 loading={saving}
// // //               >
// // //                 <Save className="w-4 h-4" />
// // //                 Save Changes
// // //               </Button>
// // //             </div>

// // //             {/* Current Resume */}
// // //             {resumeContent.resumeUrl && (
// // //               <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
// // //                 <div className="flex items-center justify-between">
// // //                   <div>
// // //                     <h3 className="font-medium text-gray-900 dark:text-white">
// // //                       Current Resume
// // //                     </h3>
// // //                     <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
// // //                       Last updated: {new Date(resumeContent.lastUpdated).toLocaleDateString()}
// // //                     </p>
// // //                   </div>
// // //                   <div className="flex gap-2">
// // //                     <Button
// // //                       variant="secondary"
// // //                       size="sm"
// // //                       onClick={() => window.open(resumeContent.resumeUrl, '_blank')}
// // //                     >
// // //                       <Eye className="w-4 h-4" />
// // //                       View
// // //                     </Button>
// // //                     <Button
// // //                       variant="secondary"
// // //                       size="sm"
// // //                       onClick={() => {
// // //                         const a = document.createElement('a');
// // //                         a.href = resumeContent.resumeUrl;
// // //                         a.download = 'resume.pdf';
// // //                         a.click();
// // //                       }}
// // //                     >
// // //                       <Download className="w-4 h-4" />
// // //                       Download
// // //                     </Button>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             )}

// // //             {/* Upload New Resume */}
// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// // //                 Upload New Resume
// // //               </label>
// // //               <label className="cursor-pointer">
// // //                 <input
// // //                   type="file"
// // //                   accept=".pdf"
// // //                   className="hidden"
// // //                   onChange={handleResumeUpload}
// // //                 />
// // //                 <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-indigo-500 transition-colors">
// // //                   <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
// // //                   <p className="text-gray-600 dark:text-gray-400">
// // //                     Click to upload or drag and drop
// // //                   </p>
// // //                   <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
// // //                     PDF files only, max 10MB
// // //                   </p>
// // //                 </div>
// // //               </label>
// // //             </div>

// // //             {/* Resume Versions */}
// // //             {resumeContent.versions && resumeContent.versions.length > 0 && (
// // //               <div>
// // //                 <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
// // //                   Previous Versions
// // //                 </h3>
// // //                 <div className="space-y-2">
// // //                   {resumeContent.versions.map((version, index) => (
// // //                     <div
// // //                       key={index}
// // //                       className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
// // //                     >
// // //                       <div>
// // //                         <p className="font-medium text-gray-900 dark:text-white">
// // //                           {version.name}
// // //                         </p>
// // //                         <p className="text-sm text-gray-600 dark:text-gray-400">
// // //                           {new Date(version.uploadedAt).toLocaleDateString()} • {(version.size / 1024).toFixed(2)} KB
// // //                         </p>
// // //                       </div>
// // //                       <div className="flex gap-2">
// // //                         <Button
// // //                           variant="secondary"
// // //                           size="sm"
// // //                           onClick={() => window.open(version.url, '_blank')}
// // //                         >
// // //                           <Eye className="w-4 h-4" />
// // //                         </Button>
// // //                         <Button
// // //                           variant="secondary"
// // //                           size="sm"
// // //                           onClick={() => {
// // //                             const a = document.createElement('a');
// // //                             a.href = version.url;
// // //                             a.download = version.name;
// // //                             a.click();
// // //                           }}
// // //                         >
// // //                           <Download className="w-4 h-4" />
// // //                         </Button>
// // //                       </div>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               </div>
// // //             )}
// // //           </div>
// // //         )}
// // //       </Card>

// // //       {/* Reset Modal */}
// // //       <Modal
// // //         isOpen={showResetModal}
// // //         onClose={() => setShowResetModal(false)}
// // //         title="Reset Section"
// // //       >
// // //         <div className="space-y-4">
// // //           <p className="text-gray-600 dark:text-gray-400">
// // //             Are you sure you want to reset this section? This action cannot be undone.
// // //           </p>
// // //           <div className="flex justify-end gap-3">
// // //             <Button
// // //               variant="secondary"
// // //               onClick={() => setShowResetModal(false)}
// // //             >
// // //               Cancel
// // //             </Button>
// // //             <Button
// // //               variant="danger"
// // //               onClick={() => resetSection(activeTab)}
// // //             >
// // //               Reset Section
// // //             </Button>
// // //           </div>
// // //         </div>
// // //       </Modal>
// // //     </div>
// // //   );
// // // };

// // // export default ContentManager;

// // import { useState, useEffect } from 'react';
// // import { motion } from 'framer-motion';
// // import {
// //   Save,
// //   X,
// //   Upload,
// //   Eye,
// //   Image as ImageIcon,
// //   FileText,
// //   User,
// //   Home,
// //   Mail,
// //   AlertCircle,
// //   CheckCircle,
// //   Loader,
// //   RefreshCw,
// //   Copy,
// //   ExternalLink,
// //   Download
// // } from 'lucide-react';
// // import api from '../../services/api';
// // import Button from '../common/Button';
// // import Input from '../common/Input';
// // import Card from '../common/Card';
// // import Modal from '../common/Modal';

// // const ContentManager = () => {
// //   const [activeTab, setActiveTab] = useState('hero');
// //   const [loading, setLoading] = useState(true);
// //   const [saving, setSaving] = useState(false);
// //   const [previewMode, setPreviewMode] = useState(false);
// //   const [showResetModal, setShowResetModal] = useState(false);
// //   const [notification, setNotification] = useState(null);

// //   // Content State
// //   const [heroContent, setHeroContent] = useState({
// //     title: '',
// //     subtitle: '',
// //     description: '',
// //     roles: [],
// //     ctaButtons: [],
// //     backgroundImage: '',
// //     photoUrl: '', // Added for profile photo
// //     stats: []
// //   });

// //   const [aboutContent, setAboutContent] = useState({
// //     title: '',
// //     description: '',
// //     image: '',
// //     highlights: [],
// //     experience: '',
// //     location: '',
// //     availability: '',
// //     bio: ''
// //   });

// //   const [contactContent, setContactContent] = useState({
// //     email: '',
// //     phone: '',
// //     address: '',
// //     socialLinks: [],
// //     availability: '',
// //     timezone: '',
// //     preferredContact: ''
// //   });

// //   const [resumeContent, setResumeContent] = useState({
// //     resumeUrl: '',
// //     lastUpdated: '',
// //     versions: []
// //   });

// //   // Fetch content on mount
// //   useEffect(() => {
// //     fetchContent();
// //   }, []);

// //   const fetchContent = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await api.get('/content');
// //       const data = response.data;

// //       // Populate sections
// //       const hero = data.find(item => item.section === 'hero');
// //       const about = data.find(item => item.section === 'about');
// //       const contact = data.find(item => item.section === 'contact');
// //       const resume = data.find(item => item.section === 'resume');

// //       if (hero) setHeroContent(hero.content);
// //       if (about) setAboutContent(about.content);
// //       if (contact) setContactContent(contact.content);
// //       if (resume) setResumeContent(resume.content);

// //     } catch (error) {
// //       showNotification('Failed to load content', 'error');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const saveContent = async (section, content) => {
// //     try {
// //       setSaving(true);
// //       await api.post('/content', {
// //         section,
// //         content,
// //         published: true
// //       });
// //       showNotification(`${section} section updated successfully!`, 'success');
// //     } catch (error) {
// //       showNotification(`Failed to update ${section} section`, 'error');
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   const handleImageUpload = async (e, section, field) => {
// //     const file = e.target.files[0];
// //     if (!file) return;

// //     if (!file.type.startsWith('image/')) {
// //       showNotification('Please upload an image file', 'error');
// //       return;
// //     }

// //     try {
// //       const formData = new FormData();
// //       formData.append('file', file);

// //       const response = await api.post('/upload', formData);
// //       const imageUrl = response.data.url;

// //       // Update content based on section
// //       if (section === 'hero') {
// //         setHeroContent(prev => ({ ...prev, [field]: imageUrl }));
// //       } else if (section === 'about') {
// //         setAboutContent(prev => ({ ...prev, [field]: imageUrl }));
// //       }

// //       showNotification('Image uploaded successfully!', 'success');
// //     } catch (error) {
// //       showNotification('Failed to upload image', 'error');
// //     }
// //   };

// //   const handleResumeUpload = async (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;

// //     if (file.type !== 'application/pdf') {
// //       showNotification('Please upload a PDF file', 'error');
// //       return;
// //     }

// //     try {
// //       const formData = new FormData();
// //       formData.append('file', file);

// //       const response = await api.post('/upload', formData);
// //       const resumeUrl = response.data.url;

// //       const newVersion = {
// //         url: resumeUrl,
// //         uploadedAt: new Date().toISOString(),
// //         name: file.name,
// //         size: file.size
// //       };

// //       setResumeContent(prev => ({
// //         ...prev,
// //         resumeUrl,
// //         lastUpdated: new Date().toISOString(),
// //         versions: [...(prev.versions || []), newVersion]
// //       }));

// //       showNotification('Resume uploaded successfully!', 'success');
// //     } catch (error) {
// //       showNotification('Failed to upload resume', 'error');
// //     }
// //   };

// //   const addArrayItem = (setter, field, defaultItem = '') => {
// //     setter(prev => ({
// //       ...prev,
// //       [field]: [...(prev[field] || []), defaultItem]
// //     }));
// //   };

// //   const updateArrayItem = (setter, field, index, value) => {
// //     setter(prev => ({
// //       ...prev,
// //       [field]: prev[field].map((item, i) => i === index ? value : item)
// //     }));
// //   };

// //   const removeArrayItem = (setter, field, index) => {
// //     setter(prev => ({
// //       ...prev,
// //       [field]: prev[field].filter((_, i) => i !== index)
// //     }));
// //   };

// //   const showNotification = (message, type = 'info') => {
// //     setNotification({ message, type });
// //     setTimeout(() => setNotification(null), 3000);
// //   };

// //   const resetSection = async (section) => {
// //     try {
// //       await api.delete(`/content/${section}`);
// //       await fetchContent();
// //       showNotification(`${section} section reset successfully`, 'success');
// //       setShowResetModal(false);
// //     } catch (error) {
// //       showNotification(`Failed to reset ${section} section`, 'error');
// //     }
// //   };

// //   const tabs = [
// //     { id: 'hero', label: 'Hero Section', icon: Home },
// //     { id: 'about', label: 'About Me', icon: User },
// //     { id: 'contact', label: 'Contact Info', icon: Mail },
// //     { id: 'resume', label: 'Resume', icon: FileText }
// //   ];

// //   if (loading) {
// //     return (
// //       <div className="flex items-center justify-center h-96">
// //         <Loader className="w-8 h-8 animate-spin text-indigo-600" />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="space-y-6">
// //       {/* Header */}
// //       <div className="flex items-center justify-between">
// //         <div>
// //           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
// //             Content Manager
// //           </h1>
// //           <p className="text-gray-600 dark:text-gray-400 mt-1">
// //             Edit your portfolio sections
// //           </p>
// //         </div>
// //         <div className="flex gap-3">
// //           <Button
// //             variant="secondary"
// //             onClick={() => setPreviewMode(!previewMode)}
// //           >
// //             <Eye className="w-4 h-4" />
// //             {previewMode ? 'Edit Mode' : 'Preview'}
// //           </Button>
// //           <Button onClick={fetchContent}>
// //             <RefreshCw className="w-4 h-4" />
// //             Refresh
// //           </Button>
// //         </div>
// //       </div>

// //       {/* Notification */}
// //       {notification && (
// //         <motion.div
// //           initial={{ opacity: 0, y: -20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           exit={{ opacity: 0, y: -20 }}
// //           className={`p-4 rounded-lg flex items-center gap-3 ${
// //             notification.type === 'success'
// //               ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
// //               : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
// //           }`}
// //         >
// //           {notification.type === 'success' ? (
// //             <CheckCircle className="w-5 h-5" />
// //           ) : (
// //             <AlertCircle className="w-5 h-5" />
// //           )}
// //           <span>{notification.message}</span>
// //         </motion.div>
// //       )}

// //       {/* Tabs */}
// //       <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
// //         {tabs.map(tab => (
// //           <button
// //             key={tab.id}
// //             onClick={() => setActiveTab(tab.id)}
// //             className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors whitespace-nowrap ${
// //               activeTab === tab.id
// //                 ? 'text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400'
// //                 : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
// //             }`}
// //           >
// //             <tab.icon className="w-4 h-4" />
// //             {tab.label}
// //           </button>
// //         ))}
// //       </div>

// //       {/* Content Sections */}
// //       <Card>
// //         {/* HERO SECTION */}
// //         {activeTab === 'hero' && (
// //           <div className="space-y-6">
// //             <div className="flex items-center justify-between">
// //               <h2 className="text-xl font-bold text-gray-900 dark:text-white">
// //                 Hero Section
// //               </h2>
// //               <Button
// //                 variant="secondary"
// //                 size="sm"
// //                 onClick={() => saveContent('hero', heroContent)}
// //                 loading={saving}
// //               >
// //                 <Save className="w-4 h-4" />
// //                 Save Changes
// //               </Button>
// //             </div>

// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //               <Input
// //                 label="Main Title"
// //                 placeholder="Your Name"
// //                 value={heroContent.title}
// //                 onChange={(e) => setHeroContent({ ...heroContent, title: e.target.value })}
// //               />
// //               <Input
// //                 label="Subtitle"
// //                 placeholder="Full Stack Developer"
// //                 value={heroContent.subtitle}
// //                 onChange={(e) => setHeroContent({ ...heroContent, subtitle: e.target.value })}
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// //                 Description
// //               </label>
// //               <textarea
// //                 rows={4}
// //                 className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
// //                 placeholder="Brief introduction..."
// //                 value={heroContent.description}
// //                 onChange={(e) => setHeroContent({ ...heroContent, description: e.target.value })}
// //               />
// //             </div>

// //             {/* Profile Photo Upload - NEW */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// //                 Profile Photo
// //               </label>
// //               <div className="flex items-center gap-4">
// //                 {heroContent.photoUrl && (
// //                   <div className="relative">
// //                     <img
// //                       src={heroContent.photoUrl}
// //                       alt="Profile"
// //                       className="w-32 h-32 object-cover rounded-full border-4 border-indigo-200 dark:border-indigo-700 shadow-lg"
// //                     />
// //                     <button
// //                       onClick={() => setHeroContent({ ...heroContent, photoUrl: '' })}
// //                       className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
// //                       title="Remove photo"
// //                     >
// //                       <X className="w-4 h-4" />
// //                     </button>
// //                   </div>
// //                 )}
// //                 <label className="cursor-pointer">
// //                   <input
// //                     type="file"
// //                     accept="image/*"
// //                     className="hidden"
// //                     onChange={(e) => handleImageUpload(e, 'hero', 'photoUrl')}
// //                   />
// //                   <div className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
// //                     <Upload className="w-4 h-4" />
// //                     {heroContent.photoUrl ? 'Change Photo' : 'Upload Photo'}
// //                   </div>
// //                 </label>
// //               </div>
// //               <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
// //                 Recommended: Square image (400x400px or larger) for best results
// //               </p>
// //             </div>

// //             {/* Roles */}
// //             <div>
// //               <div className="flex items-center justify-between mb-3">
// //                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
// //                   Rotating Roles
// //                 </label>
// //                 <Button
// //                   size="sm"
// //                   onClick={() => addArrayItem(setHeroContent, 'roles', '')}
// //                 >
// //                   Add Role
// //                 </Button>
// //               </div>
// //               <div className="space-y-2">
// //                 {(heroContent.roles || []).map((role, index) => (
// //                   <div key={index} className="flex gap-2">
// //                     <Input
// //                       placeholder="e.g., Full Stack Developer"
// //                       value={role}
// //                       onChange={(e) => updateArrayItem(setHeroContent, 'roles', index, e.target.value)}
// //                     />
// //                     <Button
// //                       variant="danger"
// //                       size="sm"
// //                       onClick={() => removeArrayItem(setHeroContent, 'roles', index)}
// //                     >
// //                       <X className="w-4 h-4" />
// //                     </Button>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* CTA Buttons */}
// //             <div>
// //               <div className="flex items-center justify-between mb-3">
// //                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
// //                   Call-to-Action Buttons
// //                 </label>
// //                 <Button
// //                   size="sm"
// //                   onClick={() => addArrayItem(setHeroContent, 'ctaButtons', { text: '', link: '' })}
// //                 >
// //                   Add Button
// //                 </Button>
// //               </div>
// //               <div className="space-y-3">
// //                 {(heroContent.ctaButtons || []).map((btn, index) => (
// //                   <div key={index} className="grid grid-cols-2 gap-3">
// //                     <Input
// //                       placeholder="Button Text"
// //                       value={btn.text}
// //                       onChange={(e) => updateArrayItem(
// //                         setHeroContent,
// //                         'ctaButtons',
// //                         index,
// //                         { ...btn, text: e.target.value }
// //                       )}
// //                     />
// //                     <div className="flex gap-2">
// //                       <Input
// //                         placeholder="Link/URL"
// //                         value={btn.link}
// //                         onChange={(e) => updateArrayItem(
// //                           setHeroContent,
// //                           'ctaButtons',
// //                           index,
// //                           { ...btn, link: e.target.value }
// //                         )}
// //                       />
// //                       <Button
// //                         variant="danger"
// //                         size="sm"
// //                         onClick={() => removeArrayItem(setHeroContent, 'ctaButtons', index)}
// //                       >
// //                         <X className="w-4 h-4" />
// //                       </Button>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* Background Image */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// //                 Background Image
// //               </label>
// //               <div className="flex items-center gap-4">
// //                 {heroContent.backgroundImage && (
// //                   <div className="relative">
// //                     <img
// //                       src={heroContent.backgroundImage}
// //                       alt="Background"
// //                       className="w-32 h-32 object-cover rounded-lg"
// //                     />
// //                     <button
// //                       onClick={() => setHeroContent({ ...heroContent, backgroundImage: '' })}
// //                       className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
// //                       title="Remove background"
// //                     >
// //                       <X className="w-4 h-4" />
// //                     </button>
// //                   </div>
// //                 )}
// //                 <label className="cursor-pointer">
// //                   <input
// //                     type="file"
// //                     accept="image/*"
// //                     className="hidden"
// //                     onChange={(e) => handleImageUpload(e, 'hero', 'backgroundImage')}
// //                   />
// //                   <div className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
// //                     <Upload className="w-4 h-4" />
// //                     {heroContent.backgroundImage ? 'Change Background' : 'Upload Background'}
// //                   </div>
// //                 </label>
// //               </div>
// //             </div>

// //             {/* Stats */}
// //             <div>
// //               <div className="flex items-center justify-between mb-3">
// //                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
// //                   Stats Counter
// //                 </label>
// //                 <Button
// //                   size="sm"
// //                   onClick={() => addArrayItem(setHeroContent, 'stats', { label: '', value: '' })}
// //                 >
// //                   Add Stat
// //                 </Button>
// //               </div>
// //               <div className="space-y-3">
// //                 {(heroContent.stats || []).map((stat, index) => (
// //                   <div key={index} className="grid grid-cols-2 gap-3">
// //                     <Input
// //                       placeholder="Value (e.g., 50+)"
// //                       value={stat.value}
// //                       onChange={(e) => updateArrayItem(
// //                         setHeroContent,
// //                         'stats',
// //                         index,
// //                         { ...stat, value: e.target.value }
// //                       )}
// //                     />
// //                     <div className="flex gap-2">
// //                       <Input
// //                         placeholder="Label (e.g., Projects)"
// //                         value={stat.label}
// //                         onChange={(e) => updateArrayItem(
// //                           setHeroContent,
// //                           'stats',
// //                           index,
// //                           { ...stat, label: e.target.value }
// //                         )}
// //                       />
// //                       <Button
// //                         variant="danger"
// //                         size="sm"
// //                         onClick={() => removeArrayItem(setHeroContent, 'stats', index)}
// //                       >
// //                         <X className="w-4 h-4" />
// //                       </Button>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {/* ABOUT SECTION */}
// //         {activeTab === 'about' && (
// //           <div className="space-y-6">
// //             <div className="flex items-center justify-between">
// //               <h2 className="text-xl font-bold text-gray-900 dark:text-white">
// //                 About Me Section
// //               </h2>
// //               <Button
// //                 variant="secondary"
// //                 size="sm"
// //                 onClick={() => saveContent('about', aboutContent)}
// //                 loading={saving}
// //               >
// //                 <Save className="w-4 h-4" />
// //                 Save Changes
// //               </Button>
// //             </div>

// //             <Input
// //               label="Section Title"
// //               placeholder="About Me"
// //               value={aboutContent.title}
// //               onChange={(e) => setAboutContent({ ...aboutContent, title: e.target.value })}
// //             />

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// //                 Biography
// //               </label>
// //               <textarea
// //                 rows={6}
// //                 className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
// //                 placeholder="Tell your story..."
// //                 value={aboutContent.bio}
// //                 onChange={(e) => setAboutContent({ ...aboutContent, bio: e.target.value })}
// //               />
// //             </div>

// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //               <Input
// //                 label="Years of Experience"
// //                 placeholder="5+ years"
// //                 value={aboutContent.experience}
// //                 onChange={(e) => setAboutContent({ ...aboutContent, experience: e.target.value })}
// //               />
// //               <Input
// //                 label="Location"
// //                 placeholder="San Francisco, CA"
// //                 value={aboutContent.location}
// //                 onChange={(e) => setAboutContent({ ...aboutContent, location: e.target.value })}
// //               />
// //               <Input
// //                 label="Availability"
// //                 placeholder="Open to opportunities"
// //                 value={aboutContent.availability}
// //                 onChange={(e) => setAboutContent({ ...aboutContent, availability: e.target.value })}
// //               />
// //             </div>

// //             {/* Profile Image */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// //                 Profile Image
// //               </label>
// //               <div className="flex items-center gap-4">
// //                 {aboutContent.image && (
// //                   <img
// //                     src={aboutContent.image}
// //                     alt="Profile"
// //                     className="w-32 h-32 object-cover rounded-full"
// //                   />
// //                 )}
// //                 <label className="cursor-pointer">
// //                   <input
// //                     type="file"
// //                     accept="image/*"
// //                     className="hidden"
// //                     onChange={(e) => handleImageUpload(e, 'about', 'image')}
// //                   />
// //                   <div className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
// //                     <Upload className="w-4 h-4" />
// //                     Upload Photo
// //                   </div>
// //                 </label>
// //               </div>
// //             </div>

// //             {/* Highlights */}
// //             <div>
// //               <div className="flex items-center justify-between mb-3">
// //                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
// //                   Key Highlights
// //                 </label>
// //                 <Button
// //                   size="sm"
// //                   onClick={() => addArrayItem(setAboutContent, 'highlights', '')}
// //                 >
// //                   Add Highlight
// //                 </Button>
// //               </div>
// //               <div className="space-y-2">
// //                 {(aboutContent.highlights || []).map((highlight, index) => (
// //                   <div key={index} className="flex gap-2">
// //                     <Input
// //                       placeholder="e.g., Award-winning developer"
// //                       value={highlight}
// //                       onChange={(e) => updateArrayItem(setAboutContent, 'highlights', index, e.target.value)}
// //                     />
// //                     <Button
// //                       variant="danger"
// //                       size="sm"
// //                       onClick={() => removeArrayItem(setAboutContent, 'highlights', index)}
// //                     >
// //                       <X className="w-4 h-4" />
// //                     </Button>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {/* CONTACT SECTION */}
// //         {activeTab === 'contact' && (
// //           <div className="space-y-6">
// //             <div className="flex items-center justify-between">
// //               <h2 className="text-xl font-bold text-gray-900 dark:text-white">
// //                 Contact Information
// //               </h2>
// //               <Button
// //                 variant="secondary"
// //                 size="sm"
// //                 onClick={() => saveContent('contact', contactContent)}
// //                 loading={saving}
// //               >
// //                 <Save className="w-4 h-4" />
// //                 Save Changes
// //               </Button>
// //             </div>

// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //               <Input
// //                 label="Email Address"
// //                 type="email"
// //                 placeholder="your@email.com"
// //                 value={contactContent.email}
// //                 onChange={(e) => setContactContent({ ...contactContent, email: e.target.value })}
// //               />
// //               <Input
// //                 label="Phone Number"
// //                 type="tel"
// //                 placeholder="+1 (555) 123-4567"
// //                 value={contactContent.phone}
// //                 onChange={(e) => setContactContent({ ...contactContent, phone: e.target.value })}
// //               />
// //               <Input
// //                 label="Address"
// //                 placeholder="City, State, Country"
// //                 value={contactContent.address}
// //                 onChange={(e) => setContactContent({ ...contactContent, address: e.target.value })}
// //               />
// //               <Input
// //                 label="Timezone"
// //                 placeholder="PST (UTC-8)"
// //                 value={contactContent.timezone}
// //                 onChange={(e) => setContactContent({ ...contactContent, timezone: e.target.value })}
// //               />
// //               <Input
// //                 label="Availability"
// //                 placeholder="Available for projects"
// //                 value={contactContent.availability}
// //                 onChange={(e) => setContactContent({ ...contactContent, availability: e.target.value })}
// //               />
// //               <Input
// //                 label="Preferred Contact Method"
// //                 placeholder="Email or Phone"
// //                 value={contactContent.preferredContact}
// //                 onChange={(e) => setContactContent({ ...contactContent, preferredContact: e.target.value })}
// //               />
// //             </div>

// //             {/* Social Links */}
// //             <div>
// //               <div className="flex items-center justify-between mb-3">
// //                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
// //                   Social Media Links
// //                 </label>
// //                 <Button
// //                   size="sm"
// //                   onClick={() => addArrayItem(setContactContent, 'socialLinks', { platform: '', url: '' })}
// //                 >
// //                   Add Social Link
// //                 </Button>
// //               </div>
// //               <div className="space-y-3">
// //                 {(contactContent.socialLinks || []).map((social, index) => (
// //                   <div key={index} className="grid grid-cols-3 gap-3">
// //                     <Input
// //                       placeholder="Platform (e.g., LinkedIn)"
// //                       value={social.platform}
// //                       onChange={(e) => updateArrayItem(
// //                         setContactContent,
// //                         'socialLinks',
// //                         index,
// //                         { ...social, platform: e.target.value }
// //                       )}
// //                     />
// //                     <div className="col-span-2 flex gap-2">
// //                       <Input
// //                         placeholder="URL"
// //                         value={social.url}
// //                         onChange={(e) => updateArrayItem(
// //                           setContactContent,
// //                           'socialLinks',
// //                           index,
// //                           { ...social, url: e.target.value }
// //                         )}
// //                       />
// //                       <Button
// //                         variant="secondary"
// //                         size="sm"
// //                         onClick={() => window.open(social.url, '_blank')}
// //                       >
// //                         <ExternalLink className="w-4 h-4" />
// //                       </Button>
// //                       <Button
// //                         variant="danger"
// //                         size="sm"
// //                         onClick={() => removeArrayItem(setContactContent, 'socialLinks', index)}
// //                       >
// //                         <X className="w-4 h-4" />
// //                       </Button>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {/* RESUME SECTION */}
// //         {activeTab === 'resume' && (
// //           <div className="space-y-6">
// //             <div className="flex items-center justify-between">
// //               <h2 className="text-xl font-bold text-gray-900 dark:text-white">
// //                 Resume Management
// //               </h2>
// //               <Button
// //                 variant="secondary"
// //                 size="sm"
// //                 onClick={() => saveContent('resume', resumeContent)}
// //                 loading={saving}
// //               >
// //                 <Save className="w-4 h-4" />
// //                 Save Changes
// //               </Button>
// //             </div>

// //             {/* Current Resume */}
// //             {resumeContent.resumeUrl && (
// //               <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
// //                 <div className="flex items-center justify-between">
// //                   <div>
// //                     <h3 className="font-medium text-gray-900 dark:text-white">
// //                       Current Resume
// //                     </h3>
// //                     <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
// //                       Last updated: {new Date(resumeContent.lastUpdated).toLocaleDateString()}
// //                     </p>
// //                   </div>
// //                   <div className="flex gap-2">
// //                     <Button
// //                       variant="secondary"
// //                       size="sm"
// //                       onClick={() => window.open(resumeContent.resumeUrl, '_blank')}
// //                     >
// //                       <Eye className="w-4 h-4" />
// //                       View
// //                     </Button>
// //                     <Button
// //                       variant="secondary"
// //                       size="sm"
// //                       onClick={() => {
// //                         const a = document.createElement('a');
// //                         a.href = resumeContent.resumeUrl;
// //                         a.download = 'resume.pdf';
// //                         a.click();
// //                       }}
// //                     >
// //                       <Download className="w-4 h-4" />
// //                       Download
// //                     </Button>
// //                   </div>
// //                 </div>
// //               </div>
// //             )}

// //             {/* Upload New Resume */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// //                 Upload New Resume
// //               </label>
// //               <label className="cursor-pointer">
// //                 <input
// //                   type="file"
// //                   accept=".pdf"
// //                   className="hidden"
// //                   onChange={handleResumeUpload}
// //                 />
// //                 <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-indigo-500 transition-colors">
// //                   <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
// //                   <p className="text-gray-600 dark:text-gray-400">
// //                     Click to upload or drag and drop
// //                   </p>
// //                   <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
// //                     PDF files only, max 10MB
// //                   </p>
// //                 </div>
// //               </label>
// //             </div>

// //             {/* Resume Versions */}
// //             {resumeContent.versions && resumeContent.versions.length > 0 && (
// //               <div>
// //                 <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
// //                   Previous Versions
// //                 </h3>
// //                 <div className="space-y-2">
// //                   {resumeContent.versions.map((version, index) => (
// //                     <div
// //                       key={index}
// //                       className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
// //                     >
// //                       <div>
// //                         <p className="font-medium text-gray-900 dark:text-white">
// //                           {version.name}
// //                         </p>
// //                         <p className="text-sm text-gray-600 dark:text-gray-400">
// //                           {new Date(version.uploadedAt).toLocaleDateString()} • {(version.size / 1024).toFixed(2)} KB
// //                         </p>
// //                       </div>
// //                       <div className="flex gap-2">
// //                         <Button
// //                           variant="secondary"
// //                           size="sm"
// //                           onClick={() => window.open(version.url, '_blank')}
// //                         >
// //                           <Eye className="w-4 h-4" />
// //                         </Button>
// //                         <Button
// //                           variant="secondary"
// //                           size="sm"
// //                           onClick={() => {
// //                             const a = document.createElement('a');
// //                             a.href = version.url;
// //                             a.download = version.name;
// //                             a.click();
// //                           }}
// //                         >
// //                           <Download className="w-4 h-4" />
// //                         </Button>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         )}
// //       </Card>

// //       {/* Reset Modal */}
// //       <Modal
// //         isOpen={showResetModal}
// //         onClose={() => setShowResetModal(false)}
// //         title="Reset Section"
// //       >
// //         <div className="space-y-4">
// //           <p className="text-gray-600 dark:text-gray-400">
// //             Are you sure you want to reset this section? This action cannot be undone.
// //           </p>
// //           <div className="flex justify-end gap-3">
// //             <Button
// //               variant="secondary"
// //               onClick={() => setShowResetModal(false)}
// //             >
// //               Cancel
// //             </Button>
// //             <Button
// //               variant="danger"
// //               onClick={() => resetSection(activeTab)}
// //             >
// //               Reset Section
// //             </Button>
// //           </div>
// //         </div>
// //       </Modal>
// //     </div>
// //   );
// // };

// // export default ContentManager;


// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import {
//   Save,
//   X,
//   Upload,
//   Eye,
//   Image as ImageIcon,
//   FileText,
//   User,
//   Home,
//   Mail,
//   AlertCircle,
//   CheckCircle,
//   Loader,
//   RefreshCw,
//   Copy,
//   ExternalLink,
//   Download
// } from 'lucide-react';
// import api from '../../services/api';
// import Button from '../common/Button';
// import Input from '../common/Input';
// import Card from '../common/Card';
// import Modal from '../common/Modal';

// // Default content structure
// const DEFAULT_CONTENT = {
//   hero: {
//     title: 'Your Name',
//     subtitle: 'Full Stack Developer',
//     description: 'Building digital experiences that inspire',
//     roles: ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast'],
//     photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
//     backgroundImage: '',
//     ctaButtons: [
//       { text: 'View Projects', link: '#projects' },
//       { text: 'Download Resume', link: '#resume' }
//     ],
//     stats: [
//       { value: '50+', label: 'Projects Completed' },
//       { value: '5+', label: 'Years Experience' },
//       { value: '100%', label: 'Client Satisfaction' }
//     ]
//   },
//   about: {
//     title: 'About Me',
//     bio: 'Your story goes here...',
//     image: '',
//     highlights: ['Award-winning developer', 'Open source contributor', 'Tech enthusiast'],
//     experience: '5+ years',
//     location: 'Your City, Country',
//     availability: 'Open to opportunities'
//   },
//   contact: {
//     email: 'your.email@example.com',
//     phone: '+1 (555) 123-4567',
//     address: 'City, State, Country',
//     timezone: 'PST (UTC-8)',
//     availability: 'Available for projects',
//     preferredContact: 'Email',
//     socialLinks: [
//       { platform: 'LinkedIn', url: 'https://linkedin.com/in/yourprofile' },
//       { platform: 'GitHub', url: 'https://github.com/yourusername' }
//     ]
//   },
//   resume: {
//     resumeUrl: '',
//     lastUpdated: new Date().toISOString(),
//     versions: []
//   }
// };

// const ContentManager = () => {
//   const [activeTab, setActiveTab] = useState('hero');
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [previewMode, setPreviewMode] = useState(false);
//   const [showResetModal, setShowResetModal] = useState(false);
//   const [notification, setNotification] = useState(null);

//   // Content State
//   const [heroContent, setHeroContent] = useState(DEFAULT_CONTENT.hero);
//   const [aboutContent, setAboutContent] = useState(DEFAULT_CONTENT.about);
//   const [contactContent, setContactContent] = useState(DEFAULT_CONTENT.contact);
//   const [resumeContent, setResumeContent] = useState(DEFAULT_CONTENT.resume);

//   // Fetch content on mount
//   useEffect(() => {
//     fetchContent();
//   }, []);

//   const fetchContent = async () => {
//     try {
//       setLoading(true);
      
//       // Try to fetch all content
//       const response = await api.get('/content');
      
//       if (response.data && response.data.success) {
//         const data = response.data.data;

//         // Populate sections from array response
//         const hero = data.find(item => item.section === 'hero');
//         const about = data.find(item => item.section === 'about');
//         const contact = data.find(item => item.section === 'contact');
//         const resume = data.find(item => item.section === 'resume');

//         setHeroContent(hero?.data || DEFAULT_CONTENT.hero);
//         setAboutContent(about?.data || DEFAULT_CONTENT.about);
//         setContactContent(contact?.data || DEFAULT_CONTENT.contact);
//         setResumeContent(resume?.data || DEFAULT_CONTENT.resume);
//       } else {
//         // Fallback to defaults
//         throw new Error('Invalid response format');
//       }

//     } catch (error) {
//       console.warn('Failed to load content from API, using defaults:', error);
      
//       // Try to fetch individual sections as fallback
//       try {
//         const [heroRes, aboutRes, contactRes, resumeRes] = await Promise.allSettled([
//           api.get('/content/hero'),
//           api.get('/content/about'),
//           api.get('/content/contact'),
//           api.get('/content/resume')
//         ]);

//         if (heroRes.status === 'fulfilled' && heroRes.value.data) {
//           setHeroContent(heroRes.value.data.data || DEFAULT_CONTENT.hero);
//         }
//         if (aboutRes.status === 'fulfilled' && aboutRes.value.data) {
//           setAboutContent(aboutRes.value.data.data || DEFAULT_CONTENT.about);
//         }
//         if (contactRes.status === 'fulfilled' && contactRes.value.data) {
//           setContactContent(contactRes.value.data.data || DEFAULT_CONTENT.contact);
//         }
//         if (resumeRes.status === 'fulfilled' && resumeRes.value.data) {
//           setResumeContent(resumeRes.value.data.data || DEFAULT_CONTENT.resume);
//         }

//         showNotification('Using default content. Save to persist changes.', 'info');
//       } catch (fallbackError) {
//         // Use defaults completely
//         console.error('All API calls failed, using default content');
//         showNotification('Using default content (offline mode)', 'info');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const saveContent = async (section, content) => {
//     try {
//       setSaving(true);
      
//       const response = await api.post('/content', {
//         section,
//         content,
//         published: true
//       });

//       if (response.data && response.data.success) {
//         showNotification(`${section} section updated successfully!`, 'success');
//       } else {
//         throw new Error('Save failed');
//       }
//     } catch (error) {
//       console.error('Save error:', error);
//       showNotification(`Failed to update ${section} section. Changes are local only.`, 'error');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleImageUpload = async (e, section, field) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (!file.type.startsWith('image/')) {
//       showNotification('Please upload an image file', 'error');
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append('file', file);

//       const response = await api.post('/upload/single', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
      
//       const imageUrl = response.data.url;

//       // Update content based on section
//       if (section === 'hero') {
//         setHeroContent(prev => ({ ...prev, [field]: imageUrl }));
//       } else if (section === 'about') {
//         setAboutContent(prev => ({ ...prev, [field]: imageUrl }));
//       }

//       showNotification('Image uploaded successfully!', 'success');
//     } catch (error) {
//       console.error('Upload error:', error);
      
//       // Fallback: Use file URL for preview (local only)
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         if (section === 'hero') {
//           setHeroContent(prev => ({ ...prev, [field]: reader.result }));
//         } else if (section === 'about') {
//           setAboutContent(prev => ({ ...prev, [field]: reader.result }));
//         }
//         showNotification('Image loaded locally (not uploaded to server)', 'info');
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleResumeUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (file.type !== 'application/pdf') {
//       showNotification('Please upload a PDF file', 'error');
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append('file', file);

//       const response = await api.post('/upload/single', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
      
//       const resumeUrl = response.data.url;

//       const newVersion = {
//         url: resumeUrl,
//         uploadedAt: new Date().toISOString(),
//         name: file.name,
//         size: file.size
//       };

//       setResumeContent(prev => ({
//         ...prev,
//         resumeUrl,
//         lastUpdated: new Date().toISOString(),
//         versions: [...(prev.versions || []), newVersion]
//       }));

//       showNotification('Resume uploaded successfully!', 'success');
//     } catch (error) {
//       console.error('Resume upload error:', error);
//       showNotification('Failed to upload resume. Please check server connection.', 'error');
//     }
//   };

//   const addArrayItem = (setter, field, defaultItem = '') => {
//     setter(prev => ({
//       ...prev,
//       [field]: [...(prev[field] || []), defaultItem]
//     }));
//   };

//   const updateArrayItem = (setter, field, index, value) => {
//     setter(prev => ({
//       ...prev,
//       [field]: prev[field].map((item, i) => i === index ? value : item)
//     }));
//   };

//   const removeArrayItem = (setter, field, index) => {
//     setter(prev => ({
//       ...prev,
//       [field]: prev[field].filter((_, i) => i !== index)
//     }));
//   };

//   const showNotification = (message, type = 'info') => {
//     setNotification({ message, type });
//     setTimeout(() => setNotification(null), 5000);
//   };

//   const resetSection = async (section) => {
//     try {
//       await api.delete(`/content/${section}`);
//       await fetchContent();
//       showNotification(`${section} section reset successfully`, 'success');
//       setShowResetModal(false);
//     } catch (error) {
//       console.error('Reset error:', error);
      
//       // Fallback: Reset locally
//       const setters = {
//         hero: setHeroContent,
//         about: setAboutContent,
//         contact: setContactContent,
//         resume: setResumeContent
//       };
      
//       setters[section]?.(DEFAULT_CONTENT[section]);
//       showNotification(`${section} section reset locally`, 'info');
//       setShowResetModal(false);
//     }
//   };

//   const tabs = [
//     { id: 'hero', label: 'Hero Section', icon: Home },
//     { id: 'about', label: 'About Me', icon: User },
//     { id: 'contact', label: 'Contact Info', icon: Mail },
//     { id: 'resume', label: 'Resume', icon: FileText }
//   ];

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-96">
//         <div className="text-center">
//           <Loader className="w-8 h-8 animate-spin text-indigo-600 mx-auto mb-4" />
//           <p className="text-gray-600 dark:text-gray-400">Loading content...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//             Content Manager
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400 mt-1">
//             Edit your portfolio sections
//           </p>
//         </div>
//         <div className="flex gap-3">
//           <Button
//             variant="secondary"
//             onClick={() => setPreviewMode(!previewMode)}
//           >
//             <Eye className="w-4 h-4" />
//             {previewMode ? 'Edit Mode' : 'Preview'}
//           </Button>
//           <Button onClick={fetchContent}>
//             <RefreshCw className="w-4 h-4" />
//             Refresh
//           </Button>
//         </div>
//       </div>

//       {/* Notification */}
//       {notification && (
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -20 }}
//           className={`p-4 rounded-lg flex items-center gap-3 ${
//             notification.type === 'success'
//               ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
//               : notification.type === 'error'
//               ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
//               : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
//           }`}
//         >
//           {notification.type === 'success' ? (
//             <CheckCircle className="w-5 h-5" />
//           ) : (
//             <AlertCircle className="w-5 h-5" />
//           )}
//           <span>{notification.message}</span>
//         </motion.div>
//       )}

//       {/* Tabs */}
//       <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
//         {tabs.map(tab => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors whitespace-nowrap ${
//               activeTab === tab.id
//                 ? 'text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400'
//                 : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
//             }`}
//           >
//             <tab.icon className="w-4 h-4" />
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Content Sections */}
//       <Card>
//         {/* HERO SECTION */}
//         {activeTab === 'hero' && (
//           <div className="space-y-6">
//             <div className="flex items-center justify-between">
//               <h2 className="text-xl font-bold text-gray-900 dark:text-white">
//                 Hero Section
//               </h2>
//               <Button
//                 variant="secondary"
//                 size="sm"
//                 onClick={() => saveContent('hero', heroContent)}
//                 loading={saving}
//               >
//                 <Save className="w-4 h-4" />
//                 Save Changes
//               </Button>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <Input
//                 label="Main Title"
//                 placeholder="Your Name"
//                 value={heroContent.title || ''}
//                 onChange={(e) => setHeroContent({ ...heroContent, title: e.target.value })}
//               />
//               <Input
//                 label="Subtitle"
//                 placeholder="Full Stack Developer"
//                 value={heroContent.subtitle || ''}
//                 onChange={(e) => setHeroContent({ ...heroContent, subtitle: e.target.value })}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Description
//               </label>
//               <textarea
//                 rows={4}
//                 className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
//                 placeholder="Brief introduction..."
//                 value={heroContent.description || ''}
//                 onChange={(e) => setHeroContent({ ...heroContent, description: e.target.value })}
//               />
//             </div>

//             {/* Profile Photo Upload */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Profile Photo
//               </label>
//               <div className="flex items-center gap-4">
//                 {heroContent.photoUrl && (
//                   <div className="relative">
//                     <img
//                       src={heroContent.photoUrl}
//                       alt="Profile"
//                       className="w-32 h-32 object-cover rounded-full border-4 border-indigo-200 dark:border-indigo-700 shadow-lg"
//                       onError={(e) => {
//                         e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop';
//                       }}
//                     />
//                     <button
//                       onClick={() => setHeroContent({ ...heroContent, photoUrl: '' })}
//                       className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
//                       title="Remove photo"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   </div>
//                 )}
//                 <label className="cursor-pointer">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     className="hidden"
//                     onChange={(e) => handleImageUpload(e, 'hero', 'photoUrl')}
//                   />
//                   <div className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
//                     <Upload className="w-4 h-4" />
//                     {heroContent.photoUrl ? 'Change Photo' : 'Upload Photo'}
//                   </div>
//                 </label>
//               </div>
//               <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
//                 Recommended: Square image (400x400px or larger) for best results
//               </p>
//             </div>

//             {/* Roles */}
//             <div>
//               <div className="flex items-center justify-between mb-3">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                   Rotating Roles
//                 </label>
//                 <Button
//                   size="sm"
//                   onClick={() => addArrayItem(setHeroContent, 'roles', '')}
//                 >
//                   Add Role
//                 </Button>
//               </div>
//               <div className="space-y-2">
//                 {(heroContent.roles || []).map((role, index) => (
//                   <div key={index} className="flex gap-2">
//                     <Input
//                       placeholder="e.g., Full Stack Developer"
//                       value={role}
//                       onChange={(e) => updateArrayItem(setHeroContent, 'roles', index, e.target.value)}
//                     />
//                     <Button
//                       variant="danger"
//                       size="sm"
//                       onClick={() => removeArrayItem(setHeroContent, 'roles', index)}
//                     >
//                       <X className="w-4 h-4" />
//                     </Button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* CTA Buttons */}
//             <div>
//               <div className="flex items-center justify-between mb-3">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                   Call-to-Action Buttons
//                 </label>
//                 <Button
//                   size="sm"
//                   onClick={() => addArrayItem(setHeroContent, 'ctaButtons', { text: '', link: '' })}
//                 >
//                   Add Button
//                 </Button>
//               </div>
//               <div className="space-y-3">
//                 {(heroContent.ctaButtons || []).map((btn, index) => (
//                   <div key={index} className="grid grid-cols-2 gap-3">
//                     <Input
//                       placeholder="Button Text"
//                       value={btn.text || ''}
//                       onChange={(e) => updateArrayItem(
//                         setHeroContent,
//                         'ctaButtons',
//                         index,
//                         { ...btn, text: e.target.value }
//                       )}
//                     />
//                     <div className="flex gap-2">
//                       <Input
//                         placeholder="Link/URL"
//                         value={btn.link || ''}
//                         onChange={(e) => updateArrayItem(
//                           setHeroContent,
//                           'ctaButtons',
//                           index,
//                           { ...btn, link: e.target.value }
//                         )}
//                       />
//                       <Button
//                         variant="danger"
//                         size="sm"
//                         onClick={() => removeArrayItem(setHeroContent, 'ctaButtons', index)}
//                       >
//                         <X className="w-4 h-4" />
//                       </Button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Background Image */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Background Image (Optional)
//               </label>
//               <div className="flex items-center gap-4">
//                 {heroContent.backgroundImage && (
//                   <div className="relative">
//                     <img
//                       src={heroContent.backgroundImage}
//                       alt="Background"
//                       className="w-32 h-32 object-cover rounded-lg"
//                     />
//                     <button
//                       onClick={() => setHeroContent({ ...heroContent, backgroundImage: '' })}
//                       className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
//                       title="Remove background"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   </div>
//                 )}
//                 <label className="cursor-pointer">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     className="hidden"
//                     onChange={(e) => handleImageUpload(e, 'hero', 'backgroundImage')}
//                   />
//                   <div className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
//                     <Upload className="w-4 h-4" />
//                     {heroContent.backgroundImage ? 'Change Background' : 'Upload Background'}
//                   </div>
//                 </label>
//               </div>
//             </div>

//             {/* Stats */}
//             <div>
//               <div className="flex items-center justify-between mb-3">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                   Stats Counter
//                 </label>
//                 <Button
//                   size="sm"
//                   onClick={() => addArrayItem(setHeroContent, 'stats', { label: '', value: '' })}
//                 >
//                   Add Stat
//                 </Button>
//               </div>
//               <div className="space-y-3">
//                 {(heroContent.stats || []).map((stat, index) => (
//                   <div key={index} className="grid grid-cols-2 gap-3">
//                     <Input
//                       placeholder="Value (e.g., 50+)"
//                       value={stat.value || ''}
//                       onChange={(e) => updateArrayItem(
//                         setHeroContent,
//                         'stats',
//                         index,
//                         { ...stat, value: e.target.value }
//                       )}
//                     />
//                     <div className="flex gap-2">
//                       <Input
//                         placeholder="Label (e.g., Projects)"
//                         value={stat.label || ''}
//                         onChange={(e) => updateArrayItem(
//                           setHeroContent,
//                           'stats',
//                           index,
//                           { ...stat, label: e.target.value }
//                         )}
//                       />
//                       <Button
//                         variant="danger"
//                         size="sm"
//                         onClick={() => removeArrayItem(setHeroContent, 'stats', index)}
//                       >
//                         <X className="w-4 h-4" />
//                       </Button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ABOUT SECTION */}
//         {activeTab === 'about' && (
//           <div className="space-y-6">
//             <div className="flex items-center justify-between">
//               <h2 className="text-xl font-bold text-gray-900 dark:text-white">
//                 About Me Section
//               </h2>
//               <Button
//                 variant="secondary"
//                 size="sm"
//                 onClick={() => saveContent('about', aboutContent)}
//                 loading={saving}
//               >
//                 <Save className="w-4 h-4" />
//                 Save Changes
//               </Button>
//             </div>

//             <Input
//               label="Section Title"
//               placeholder="About Me"
//               value={aboutContent.title || ''}
//               onChange={(e) => setAboutContent({ ...aboutContent, title: e.target.value })}
//             />

//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Biography
//               </label>
//               <textarea
//                 rows={6}
//                 className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
//                 placeholder="Tell your story..."
//                 value={aboutContent.bio || ''}
//                 onChange={(e) => setAboutContent({ ...aboutContent, bio: e.target.value })}
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <Input
//                 label="Years of Experience"
//                 placeholder="5+ years"
//                 value={aboutContent.experience || ''}
//                 onChange={(e) => setAboutContent({ ...aboutContent, experience: e.target.value })}
//               />
//               <Input
//                 label="Location"
//                 placeholder="San Francisco, CA"
//                 value={aboutContent.location || ''}
//                 onChange={(e) => setAboutContent({ ...aboutContent, location: e.target.value })}
//               />
//               <Input
//                 label="Availability"
//                 placeholder="Open to opportunities"
//                 value={aboutContent.availability || ''}
//                 onChange={(e) => setAboutContent({ ...aboutContent, availability: e.target.value })}
//               />
//             </div>

//             {/* Profile Image */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Profile Image
//               </label>
//               <div className="flex items-center gap-4">
//                 {aboutContent.image && (
//                   <div className="relative">
//                     <img
//                       src={aboutContent.image}
//                       alt="Profile"
//                       className="w-32 h-32 object-cover rounded-full"
//                       onError={(e) => {
//                         e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop';
//                       }}
//                     />
//                     <button
//                       onClick={() => setAboutContent({ ...aboutContent, image: '' })}
//                       className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   </div>
//                 )}
//                 <label className="cursor-pointer">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     className="hidden"
//                     onChange={(e) => handleImageUpload(e, 'about', 'image')}
//                   />
//                   <div className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
//                     <Upload className="w-4 h-4" />
//                     {aboutContent.image ? 'Change Photo' : 'Upload Photo'}
//                   </div>
//                 </label>
//               </div>
//             </div>

//             {/* Highlights */}
//             <div>
//               <div className="flex items-center justify-between mb-3">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                   Key Highlights
//                 </label>
//                 <Button
//                   size="sm"
//                   onClick={() => addArrayItem(setAboutContent, 'highlights', '')}
//                 >
//                   Add Highlight
//                 </Button>
//               </div>
//               <div className="space-y-2">
//                 {(aboutContent.highlights || []).map((highlight, index) => (
//                   <div key={index} className="flex gap-2">
//                     <Input
//                       placeholder="e.g., Award-winning developer"
//                       value={highlight}
//                       onChange={(e) => updateArrayItem(setAboutContent, 'highlights', index, e.target.value)}
//                     />
//                     <Button
//                       variant="danger"
//                       size="sm"
//                       onClick={() => removeArrayItem(setAboutContent, 'highlights', index)}
//                     >
//                       <X className="w-4 h-4" />
//                     </Button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* CONTACT SECTION */}
//         {activeTab === 'contact' && (
//           <div className="space-y-6">
//             <div className="flex items-center justify-between">
//               <h2 className="text-xl font-bold text-gray-900 dark:text-white">
//                 Contact Information
//               </h2>
//               <Button
//                 variant="secondary"
//                 size="sm"
//                 onClick={() => saveContent('contact', contactContent)}
//                 loading={saving}
//               >
//                 <Save className="w-4 h-4" />
//                 Save Changes
//               </Button>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <Input
//                 label="Email Address"
//                 type="email"
//                 placeholder="your@email.com"
//                 value={contactContent.email || ''}
//                 onChange={(e) => setContactContent({ ...contactContent, email: e.target.value })}
//               />
//               <Input
//                 label="Phone Number"
//                 type="tel"
//                 placeholder="+1 (555) 123-4567"
//                 value={contactContent.phone || ''}
//                 onChange={(e) => setContactContent({ ...contactContent, phone: e.target.value })}
//               />
//               <Input
//                 label="Address"
//                 placeholder="City, State, Country"
//                 value={contactContent.address || ''}
//                 onChange={(e) => setContactContent({ ...contactContent, address: e.target.value })}
//               />
//               <Input
//                 label="Timezone"
//                 placeholder="PST (UTC-8)"
//                 value={contactContent.timezone || ''}
//                 onChange={(e) => setContactContent({ ...contactContent, timezone: e.target.value })}
//               />
//               <Input
//                 label="Availability"
//                 placeholder="Available for projects"
//                 value={contactContent.availability || ''}
//                 onChange={(e) => setContactContent({ ...contactContent, availability: e.target.value })}
//               />
//               <Input
//                 label="Preferred Contact Method"
//                 placeholder="Email or Phone"
//                 value={contactContent.preferredContact || ''}
//                 onChange={(e) => setContactContent({ ...contactContent, preferredContact: e.target.value })}
//               />
//             </div>

//             {/* Social Links */}
//             <div>
//               <div className="flex items-center justify-between mb-3">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                   Social Media Links
//                 </label>
//                 <Button
//                   size="sm"
//                   onClick={() => addArrayItem(setContactContent, 'socialLinks', { platform: '', url: '' })}
//                 >
//                   Add Social Link
//                 </Button>
//               </div>
//               <div className="space-y-3">
//                 {(contactContent.socialLinks || []).map((social, index) => (
//                   <div key={index} className="grid grid-cols-3 gap-3">
//                     <Input
//                       placeholder="Platform (e.g., LinkedIn)"
//                       value={social.platform || ''}
//                       onChange={(e) => updateArrayItem(
//                         setContactContent,
//                         'socialLinks',
//                         index,
//                         { ...social, platform: e.target.value }
//                       )}
//                     />
//                     <div className="col-span-2 flex gap-2">
//                       <Input
//                         placeholder="URL"
//                         value={social.url || ''}
//                         onChange={(e) => updateArrayItem(
//                           setContactContent,
//                           'socialLinks',
//                           index,
//                           { ...social, url: e.target.value }
//                         )}
//                       />
//                       {social.url && (
//                         <Button
//                           variant="secondary"
//                           size="sm"
//                           onClick={() => window.open(social.url, '_blank')}
//                         >
//                           <ExternalLink className="w-4 h-4" />
//                         </Button>
//                       )}
//                       <Button
//                         variant="danger"
//                         size="sm"
//                         onClick={() => removeArrayItem(setContactContent, 'socialLinks', index)}
//                       >
//                         <X className="w-4 h-4" />
//                       </Button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* RESUME SECTION */}
//         {activeTab === 'resume' && (
//           <div className="space-y-6">
//             <div className="flex items-center justify-between">
//               <h2 className="text-xl font-bold text-gray-900 dark:text-white">
//                 Resume Management
//               </h2>
//               <Button
//                 variant="secondary"
//                 size="sm"
//                 onClick={() => saveContent('resume', resumeContent)}
//                 loading={saving}
//               >
//                 <Save className="w-4 h-4" />
//                 Save Changes
//               </Button>
//             </div>

//             {/* Current Resume */}
//             {resumeContent.resumeUrl && (
//               <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h3 className="font-medium text-gray-900 dark:text-white">
//                       Current Resume
//                     </h3>
//                     <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
//                       Last updated: {new Date(resumeContent.lastUpdated).toLocaleDateString()}
//                     </p>
//                   </div>
//                   <div className="flex gap-2">
//                     <Button
//                       variant="secondary"
//                       size="sm"
//                       onClick={() => window.open(resumeContent.resumeUrl, '_blank')}
//                     >
//                       <Eye className="w-4 h-4" />
//                       View
//                     </Button>
//                     <Button
//                       variant="secondary"
//                       size="sm"
//                       onClick={() => {
//                         const a = document.createElement('a');
//                         a.href = resumeContent.resumeUrl;
//                         a.download = 'resume.pdf';
//                         a.click();
//                       }}
//                     >
//                       <Download className="w-4 h-4" />
//                       Download
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Upload New Resume */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Upload New Resume
//               </label>
//               <label className="cursor-pointer">
//                 <input
//                   type="file"
//                   accept=".pdf"
//                   className="hidden"
//                   onChange={handleResumeUpload}
//                 />
//                 <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-indigo-500 transition-colors">
//                   <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
//                   <p className="text-gray-600 dark:text-gray-400">
//                     Click to upload or drag and drop
//                   </p>
//                   <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
//                     PDF files only, max 10MB
//                   </p>
//                 </div>
//               </label>
//             </div>

//             {/* Resume Versions */}
//             {resumeContent.versions && resumeContent.versions.length > 0 && (
//               <div>
//                 <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
//                   Previous Versions
//                 </h3>
//                 <div className="space-y-2">
//                   {resumeContent.versions.map((version, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
//                     >
//                       <div>
//                         <p className="font-medium text-gray-900 dark:text-white">
//                           {version.name}
//                         </p>
//                         <p className="text-sm text-gray-600 dark:text-gray-400">
//                           {new Date(version.uploadedAt).toLocaleDateString()} • {(version.size / 1024).toFixed(2)} KB
//                         </p>
//                       </div>
//                       <div className="flex gap-2">
//                         <Button
//                           variant="secondary"
//                           size="sm"
//                           onClick={() => window.open(version.url, '_blank')}
//                         >
//                           <Eye className="w-4 h-4" />
//                         </Button>
//                         <Button
//                           variant="secondary"
//                           size="sm"
//                           onClick={() => {
//                             const a = document.createElement('a');
//                             a.href = version.url;
//                             a.download = version.name;
//                             a.click();
//                           }}
//                         >
//                           <Download className="w-4 h-4" />
//                         </Button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </Card>

//       {/* Reset Modal */}
//       <Modal
//         isOpen={showResetModal}
//         onClose={() => setShowResetModal(false)}
//         title="Reset Section"
//       >
//         <div className="space-y-4">
//           <p className="text-gray-600 dark:text-gray-400">
//             Are you sure you want to reset this section? This action cannot be undone.
//           </p>
//           <div className="flex justify-end gap-3">
//             <Button
//               variant="secondary"
//               onClick={() => setShowResetModal(false)}
//             >
//               Cancel
//             </Button>
//             <Button
//               variant="danger"
//               onClick={() => resetSection(activeTab)}
//             >
//               Reset Section
//             </Button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default ContentManager;



import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Save,
  X,
  Upload,
  Eye,
  Image as ImageIcon,
  FileText,
  User,
  Home,
  Mail,
  AlertCircle,
  CheckCircle,
  Loader,
  RefreshCw,
  Copy,
  ExternalLink,
  Download
} from 'lucide-react';
import api from '../../services/api';
import Button from '../common/Button';
import Input from '../common/Input';
import Card from '../common/Card';
import Modal from '../common/Modal';

// Default content structure
const DEFAULT_CONTENT = {
  hero: {
    title: 'Your Name',
    subtitle: 'Full Stack Developer',
    description: 'Building digital experiences that inspire',
    roles: ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast'],
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    backgroundImage: '',
    ctaButtons: [
      { text: 'View Projects', link: '#projects' },
      { text: 'Download Resume', link: '#resume' }
    ],
    stats: [
      { value: '50+', label: 'Projects Completed' },
      { value: '5+', label: 'Years Experience' },
      { value: '100%', label: 'Client Satisfaction' }
    ]
  },
  about: {
    title: 'About Me',
    bio: 'Your story goes here...',
    image: '',
    highlights: ['Award-winning developer', 'Open source contributor', 'Tech enthusiast'],
    experience: '5+ years',
    location: 'Your City, Country',
    availability: 'Open to opportunities'
  },
  contact: {
    email: 'your.email@example.com',
    phone: '+1 (555) 123-4567',
    address: 'City, State, Country',
    timezone: 'PST (UTC-8)',
    availability: 'Available for projects',
    preferredContact: 'Email',
    socialLinks: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/yourprofile' },
      { platform: 'GitHub', url: 'https://github.com/yourusername' }
    ]
  },
  resume: {
    resumeUrl: '',
    lastUpdated: new Date().toISOString(),
    versions: []
  }
};

const ContentManager = () => {
  const [activeTab, setActiveTab] = useState('hero');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [notification, setNotification] = useState(null);

  // Content State
  const [heroContent, setHeroContent] = useState(DEFAULT_CONTENT.hero);
  const [aboutContent, setAboutContent] = useState(DEFAULT_CONTENT.about);
  const [contactContent, setContactContent] = useState(DEFAULT_CONTENT.contact);
  const [resumeContent, setResumeContent] = useState(DEFAULT_CONTENT.resume);

  // Fetch content on mount
  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      
      // Try to fetch all content
      const response = await api.get('/content');
      
      // Check if response has the expected structure
      if (response && response.success && Array.isArray(response.data)) {
        const data = response.data;

        // Populate sections from array response
        const hero = data.find(item => item.section === 'hero');
        const about = data.find(item => item.section === 'about');
        const contact = data.find(item => item.section === 'contact');
        const resume = data.find(item => item.section === 'resume');

        setHeroContent(hero?.data || DEFAULT_CONTENT.hero);
        setAboutContent(about?.data || DEFAULT_CONTENT.about);
        setContactContent(contact?.data || DEFAULT_CONTENT.contact);
        setResumeContent(resume?.data || DEFAULT_CONTENT.resume);
        
        showNotification('Content loaded successfully', 'success');
      } else {
        // Fallback to defaults
        console.warn('Unexpected response format, using defaults');
        showNotification('Using default content. Save to persist changes.', 'info');
      }

    } catch (error) {
      console.warn('Failed to load content from API, using defaults:', error);
      
      // Try to fetch individual sections as fallback
      try {
        const [heroRes, aboutRes, contactRes, resumeRes] = await Promise.allSettled([
          api.get('/content/hero'),
          api.get('/content/about'),
          api.get('/content/contact'),
          api.get('/content/resume')
        ]);

        if (heroRes.status === 'fulfilled' && heroRes.value?.success) {
          setHeroContent(heroRes.value.data || DEFAULT_CONTENT.hero);
        }
        if (aboutRes.status === 'fulfilled' && aboutRes.value?.success) {
          setAboutContent(aboutRes.value.data || DEFAULT_CONTENT.about);
        }
        if (contactRes.status === 'fulfilled' && contactRes.value?.success) {
          setContactContent(contactRes.value.data || DEFAULT_CONTENT.contact);
        }
        if (resumeRes.status === 'fulfilled' && resumeRes.value?.success) {
          setResumeContent(resumeRes.value.data || DEFAULT_CONTENT.resume);
        }

        showNotification('Using default content. Save to persist changes.', 'info');
      } catch (fallbackError) {
        // Use defaults completely
        console.error('All API calls failed, using default content');
        showNotification('Using default content (offline mode)', 'info');
      }
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async (section, content) => {
    try {
      setSaving(true);
      
      // Use the correct POST endpoint with body format
      const response = await api.post('/content', {
        section,
        content,
        published: true
      });

      if (response && response.success) {
        showNotification(`${section} section updated successfully!`, 'success');
      } else {
        throw new Error('Save failed - Invalid response');
      }
    } catch (error) {
      console.error('Save error:', error);
      const errorMessage = error?.message || 'Unknown error';
      showNotification(`Failed to update ${section} section: ${errorMessage}`, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e, section, field) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showNotification('Please upload an image file', 'error');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showNotification('Image size must be less than 5MB', 'error');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await api.post('/upload/single', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      const imageUrl = response?.url || response?.data?.url;

      if (!imageUrl) {
        throw new Error('No URL returned from upload');
      }

      // Update content based on section
      if (section === 'hero') {
        setHeroContent(prev => ({ ...prev, [field]: imageUrl }));
      } else if (section === 'about') {
        setAboutContent(prev => ({ ...prev, [field]: imageUrl }));
      }

      showNotification('Image uploaded successfully!', 'success');
    } catch (error) {
      console.error('Upload error:', error);
      
      // Fallback: Use file URL for preview (local only)
      const reader = new FileReader();
      reader.onloadend = () => {
        if (section === 'hero') {
          setHeroContent(prev => ({ ...prev, [field]: reader.result }));
        } else if (section === 'about') {
          setAboutContent(prev => ({ ...prev, [field]: reader.result }));
        }
        showNotification('Image loaded locally (not uploaded to server)', 'info');
      };
      reader.onerror = () => {
        showNotification('Failed to read image file', 'error');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      showNotification('Please upload a PDF file', 'error');
      return;
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      showNotification('Resume size must be less than 10MB', 'error');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await api.post('/upload/single', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      const resumeUrl = response?.url || response?.data?.url;

      if (!resumeUrl) {
        throw new Error('No URL returned from upload');
      }

      const newVersion = {
        url: resumeUrl,
        uploadedAt: new Date().toISOString(),
        name: file.name,
        size: file.size
      };

      setResumeContent(prev => ({
        ...prev,
        resumeUrl,
        lastUpdated: new Date().toISOString(),
        versions: [...(prev.versions || []), newVersion]
      }));

      showNotification('Resume uploaded successfully!', 'success');
    } catch (error) {
      console.error('Resume upload error:', error);
      const errorMessage = error?.message || 'Unknown error';
      showNotification(`Failed to upload resume: ${errorMessage}`, 'error');
    }
  };

  const addArrayItem = (setter, field, defaultItem = '') => {
    setter(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), defaultItem]
    }));
  };

  const updateArrayItem = (setter, field, index, value) => {
    setter(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const removeArrayItem = (setter, field, index) => {
    setter(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const resetSection = async (section) => {
    try {
      await api.delete(`/content/${section}`);
      await fetchContent();
      showNotification(`${section} section reset successfully`, 'success');
      setShowResetModal(false);
    } catch (error) {
      console.error('Reset error:', error);
      
      // Fallback: Reset locally
      const setters = {
        hero: setHeroContent,
        about: setAboutContent,
        contact: setContactContent,
        resume: setResumeContent
      };
      
      setters[section]?.(DEFAULT_CONTENT[section]);
      showNotification(`${section} section reset locally`, 'info');
      setShowResetModal(false);
    }
  };

  const tabs = [
    { id: 'hero', label: 'Hero Section', icon: Home },
    { id: 'about', label: 'About Me', icon: User },
    { id: 'contact', label: 'Contact Info', icon: Mail },
    { id: 'resume', label: 'Resume', icon: FileText }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Content Manager
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Edit your portfolio sections
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={() => setPreviewMode(!previewMode)}
          >
            <Eye className="w-4 h-4" />
            {previewMode ? 'Edit Mode' : 'Preview'}
          </Button>
          <Button onClick={fetchContent} disabled={loading}>
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`p-4 rounded-lg flex items-center gap-3 ${
            notification.type === 'success'
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : notification.type === 'error'
              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span>{notification.message}</span>
        </motion.div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Sections */}
      <Card>
        {/* HERO SECTION */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Hero Section
              </h2>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => saveContent('hero', heroContent)}
                loading={saving}
                disabled={saving}
              >
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Main Title"
                placeholder="Your Name"
                value={heroContent.title || ''}
                onChange={(e) => setHeroContent({ ...heroContent, title: e.target.value })}
              />
              <Input
                label="Subtitle"
                placeholder="Full Stack Developer"
                value={heroContent.subtitle || ''}
                onChange={(e) => setHeroContent({ ...heroContent, subtitle: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                placeholder="Brief introduction..."
                value={heroContent.description || ''}
                onChange={(e) => setHeroContent({ ...heroContent, description: e.target.value })}
              />
            </div>

            {/* Profile Photo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Profile Photo
              </label>
              <div className="flex items-center gap-4">
                {heroContent.photoUrl && (
                  <div className="relative">
                    <img
                      src={heroContent.photoUrl}
                      alt="Profile"
                      className="w-32 h-32 object-cover rounded-full border-4 border-indigo-200 dark:border-indigo-700 shadow-lg"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop';
                      }}
                    />
                    <button
                      onClick={() => setHeroContent({ ...heroContent, photoUrl: '' })}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                      title="Remove photo"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, 'hero', 'photoUrl')}
                  />
                  <div className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    {heroContent.photoUrl ? 'Change Photo' : 'Upload Photo'}
                  </div>
                </label>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Recommended: Square image (400x400px or larger), max 5MB
              </p>
            </div>

            {/* Roles */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Rotating Roles
                </label>
                <Button
                  size="sm"
                  onClick={() => addArrayItem(setHeroContent, 'roles', '')}
                >
                  Add Role
                </Button>
              </div>
              <div className="space-y-2">
                {(heroContent.roles || []).map((role, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="e.g., Full Stack Developer"
                      value={role}
                      onChange={(e) => updateArrayItem(setHeroContent, 'roles', index, e.target.value)}
                    />
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeArrayItem(setHeroContent, 'roles', index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Call-to-Action Buttons
                </label>
                <Button
                  size="sm"
                  onClick={() => addArrayItem(setHeroContent, 'ctaButtons', { text: '', link: '' })}
                >
                  Add Button
                </Button>
              </div>
              <div className="space-y-3">
                {(heroContent.ctaButtons || []).map((btn, index) => (
                  <div key={index} className="grid grid-cols-2 gap-3">
                    <Input
                      placeholder="Button Text"
                      value={btn.text || ''}
                      onChange={(e) => updateArrayItem(
                        setHeroContent,
                        'ctaButtons',
                        index,
                        { ...btn, text: e.target.value }
                      )}
                    />
                    <div className="flex gap-2">
                      <Input
                        placeholder="Link/URL"
                        value={btn.link || ''}
                        onChange={(e) => updateArrayItem(
                          setHeroContent,
                          'ctaButtons',
                          index,
                          { ...btn, link: e.target.value }
                        )}
                      />
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removeArrayItem(setHeroContent, 'ctaButtons', index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Background Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Background Image (Optional)
              </label>
              <div className="flex items-center gap-4">
                {heroContent.backgroundImage && (
                  <div className="relative">
                    <img
                      src={heroContent.backgroundImage}
                      alt="Background"
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => setHeroContent({ ...heroContent, backgroundImage: '' })}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                      title="Remove background"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, 'hero', 'backgroundImage')}
                  />
                  <div className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    {heroContent.backgroundImage ? 'Change Background' : 'Upload Background'}
                  </div>
                </label>
              </div>
            </div>

            {/* Stats */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Stats Counter
                </label>
                <Button
                  size="sm"
                  onClick={() => addArrayItem(setHeroContent, 'stats', { label: '', value: '' })}
                >
                  Add Stat
                </Button>
              </div>
              <div className="space-y-3">
                {(heroContent.stats || []).map((stat, index) => (
                  <div key={index} className="grid grid-cols-2 gap-3">
                    <Input
                      placeholder="Value (e.g., 50+)"
                      value={stat.value || ''}
                      onChange={(e) => updateArrayItem(
                        setHeroContent,
                        'stats',
                        index,
                        { ...stat, value: e.target.value }
                      )}
                    />
                    <div className="flex gap-2">
                      <Input
                        placeholder="Label (e.g., Projects)"
                        value={stat.label || ''}
                        onChange={(e) => updateArrayItem(
                          setHeroContent,
                          'stats',
                          index,
                          { ...stat, label: e.target.value }
                        )}
                      />
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removeArrayItem(setHeroContent, 'stats', index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ABOUT SECTION */}
        {activeTab === 'about' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                About Me Section
              </h2>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => saveContent('about', aboutContent)}
                loading={saving}
                disabled={saving}
              >
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>

            <Input
              label="Section Title"
              placeholder="About Me"
              value={aboutContent.title || ''}
              onChange={(e) => setAboutContent({ ...aboutContent, title: e.target.value })}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Biography
              </label>
              <textarea
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                placeholder="Tell your story..."
                value={aboutContent.bio || ''}
                onChange={(e) => setAboutContent({ ...aboutContent, bio: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Years of Experience"
                placeholder="5+ years"
                value={aboutContent.experience || ''}
                onChange={(e) => setAboutContent({ ...aboutContent, experience: e.target.value })}
              />
              <Input
                label="Location"
                placeholder="San Francisco, CA"
                value={aboutContent.location || ''}
                onChange={(e) => setAboutContent({ ...aboutContent, location: e.target.value })}
              />
              <Input
                label="Availability"
                placeholder="Open to opportunities"
                value={aboutContent.availability || ''}
                onChange={(e) => setAboutContent({ ...aboutContent, availability: e.target.value })}
              />
            </div>

            {/* Profile Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Profile Image
              </label>
              <div className="flex items-center gap-4">
                {aboutContent.image && (
                  <div className="relative">
                    <img
                      src={aboutContent.image}
                      alt="Profile"
                      className="w-32 h-32 object-cover rounded-full"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop';
                      }}
                    />
                    <button
                      onClick={() => setAboutContent({ ...aboutContent, image: '' })}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, 'about', 'image')}
                  />
                  <div className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    {aboutContent.image ? 'Change Photo' : 'Upload Photo'}
                  </div>
                </label>
              </div>
            </div>

            {/* Highlights */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Key Highlights
                </label>
                <Button
                  size="sm"
                  onClick={() => addArrayItem(setAboutContent, 'highlights', '')}
                >
                  Add Highlight
                </Button>
              </div>
              <div className="space-y-2">
                {(aboutContent.highlights || []).map((highlight, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="e.g., Award-winning developer"
                      value={highlight}
                      onChange={(e) => updateArrayItem(setAboutContent, 'highlights', index, e.target.value)}
                    />
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeArrayItem(setAboutContent, 'highlights', index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CONTACT SECTION */}
        {activeTab === 'contact' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Contact Information
              </h2>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => saveContent('contact', contactContent)}
                loading={saving}
                disabled={saving}
              >
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Email Address"
                type="email"
                placeholder="your@email.com"
                value={contactContent.email || ''}
                onChange={(e) => setContactContent({ ...contactContent, email: e.target.value })}
              />
              <Input
                label="Phone Number"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={contactContent.phone || ''}
                onChange={(e) => setContactContent({ ...contactContent, phone: e.target.value })}
              />
              <Input
                label="Address"
                placeholder="City, State, Country"
                value={contactContent.address || ''}
                onChange={(e) => setContactContent({ ...contactContent, address: e.target.value })}
              />
              <Input
                label="Timezone"
                placeholder="PST (UTC-8)"
                value={contactContent.timezone || ''}
                onChange={(e) => setContactContent({ ...contactContent, timezone: e.target.value })}
              />
              <Input
                label="Availability"
                placeholder="Available for projects"
                value={contactContent.availability || ''}
                onChange={(e) => setContactContent({ ...contactContent, availability: e.target.value })}
              />
              <Input
                label="Preferred Contact Method"
                placeholder="Email or Phone"
                value={contactContent.preferredContact || ''}
                onChange={(e) => setContactContent({ ...contactContent, preferredContact: e.target.value })}
              />
            </div>

            {/* Social Links */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Social Media Links
                </label>
                <Button
                  size="sm"
                  onClick={() => addArrayItem(setContactContent, 'socialLinks', { platform: '', url: '' })}
                >
                  Add Social Link
                </Button>
              </div>
              <div className="space-y-3">
                {(contactContent.socialLinks || []).map((social, index) => (
                  <div key={index} className="grid grid-cols-3 gap-3">
                    <Input
                      placeholder="Platform (e.g., LinkedIn)"
                      value={social.platform || ''}
                      onChange={(e) => updateArrayItem(
                        setContactContent,
                        'socialLinks',
                        index,
                        { ...social, platform: e.target.value }
                      )}
                    />
                    <div className="col-span-2 flex gap-2">
                      <Input
                        placeholder="URL"
                        value={social.url || ''}
                        onChange={(e) => updateArrayItem(
                          setContactContent,
                          'socialLinks',
                          index,
                          { ...social, url: e.target.value }
                        )}
                      />
                      {social.url && (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => window.open(social.url, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removeArrayItem(setContactContent, 'socialLinks', index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* RESUME SECTION */}
        {activeTab === 'resume' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Resume Management
              </h2>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => saveContent('resume', resumeContent)}
                loading={saving}
                disabled={saving}
              >
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>

            {/* Current Resume */}
            {resumeContent.resumeUrl && (
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Current Resume
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Last updated: {new Date(resumeContent.lastUpdated).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => window.open(resumeContent.resumeUrl, '_blank')}
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        const a = document.createElement('a');
                        a.href = resumeContent.resumeUrl;
                        a.download = 'resume.pdf';
                        a.click();
                      }}
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Upload New Resume */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Upload New Resume
              </label>
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleResumeUpload}
                />
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-indigo-500 transition-colors">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                    PDF files only, max 10MB
                  </p>
                </div>
              </label>
            </div>

            {/* Resume Versions */}
            {resumeContent.versions && resumeContent.versions.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Previous Versions
                </h3>
                <div className="space-y-2">
                  {resumeContent.versions.map((version, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {version.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(version.uploadedAt).toLocaleDateString()} • {(version.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => window.open(version.url, '_blank')}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            const a = document.createElement('a');
                            a.href = version.url;
                            a.download = version.name;
                            a.click();
                          }}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Reset Modal */}
      <Modal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        title="Reset Section"
      >
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            Are you sure you want to reset this section? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => setShowResetModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => resetSection(activeTab)}
            >
              Reset Section
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ContentManager;