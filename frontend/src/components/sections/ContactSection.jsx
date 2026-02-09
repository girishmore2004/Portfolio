 
// // import { useState } from 'react';
// // import { motion } from 'framer-motion';
// // import { Send, Mail, MapPin } from 'lucide-react';
// // import { messagesAPI } from '../../services/api';
// // import toast from 'react-hot-toast';
// // import Button from '../common/Button';

// // const ContactSection = () => {
// //   const [formData, setFormData] = useState({ name: '', email: '', message: '' });
// //   const [loading, setLoading] = useState(false);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);

// //     try {
// //       await messagesAPI.create(formData);
// //       toast.success('Message sent successfully!');
// //       setFormData({ name: '', email: '', message: '' });
// //     } catch (error) {
// //       toast.error('Failed to send message');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <section id="contact" className="py-20 bg-white dark:bg-gray-800">
// //       <div className="container mx-auto px-4">
// //         <h2 className="text-5xl font-display font-bold text-center mb-16 text-gradient">
// //           Get In Touch
// //         </h2>

// //         <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
// //           <motion.div
// //             initial={{ opacity: 0, x: -50 }}
// //             whileInView={{ opacity: 1, x: 0 }}
// //             viewport={{ once: true }}
// //           >
// //             <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
// //               Let's Connect
// //             </h3>
// //             <p className="text-gray-600 dark:text-gray-400 mb-8">
// //               I'm always open to new opportunities and collaborations. Feel free to reach out!
// //             </p>

// //             <div className="space-y-4">
// //               <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
// //                 <Mail className="w-5 h-5 text-primary-600" />
// //                 <span>hello@example.com</span>
// //               </div>
// //               <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
// //                 <MapPin className="w-5 h-5 text-primary-600" />
// //                 <span>Your City, Country</span>
// //               </div>
// //             </div>
// //           </motion.div>

// //           <motion.form
// //             initial={{ opacity: 0, x: 50 }}
// //             whileInView={{ opacity: 1, x: 0 }}
// //             viewport={{ once: true }}
// //             onSubmit={handleSubmit}
// //             className="space-y-4"
// //           >
// //             <input
// //               type="text"
// //               placeholder="Your Name"
// //               value={formData.name}
// //               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// //               className="input"
// //               required
// //             />
// //             <input
// //               type="email"
// //               placeholder="Your Email"
// //               value={formData.email}
// //               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
// //               className="input"
// //               required
// //             />
// //             <textarea
// //               placeholder="Your Message (Minimum 10 character)"
// //               value={formData.message}
// //               onChange={(e) => setFormData({ ...formData, message: e.target.value })}
// //               className="input h-32 resize-none"
// //               required
// //             />
// //             <Button type="submit" icon={Send} className="w-full" disabled={loading}>
// //               {loading ? 'Sending...' : 'Send Message'}
// //             </Button>
// //           </motion.form>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default ContactSection;

// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Send, Mail, MapPin } from 'lucide-react';
// import { messagesAPI } from '../../services/api';
// import toast from 'react-hot-toast';
// import Button from '../common/Button';

// const ContactSection = () => {
//   const [formData, setFormData] = useState({ name: '', email: '', message: '' });
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await messagesAPI.create(formData);
//       toast.success('Message sent successfully!');
//       setFormData({ name: '', email: '', message: '' });
//     } catch (error) {
//       toast.error('Failed to send message');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section id="contact" className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-800 px-4 sm:px-6 lg:px-8">
//       <div className="container mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="max-w-5xl mx-auto"
//         >
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-center mb-10 sm:mb-12 md:mb-16 text-gradient">
//             Get In Touch
//           </h2>

//           <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
//             {/* Left Side - Contact Info */}
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//             >
//               <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
//                 Let's Connect
//               </h3>
//               <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 leading-relaxed">
//                 I'm always open to new opportunities and collaborations. Feel free to reach out!
//               </p>

//               <div className="space-y-3 sm:space-y-4">
//                 <motion.div
//                   initial={{ opacity: 0, x: -20 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: 0.2 }}
//                   className="flex items-center gap-3 text-sm sm:text-base text-gray-700 dark:text-gray-300 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//                 >
//                   <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center flex-shrink-0">
//                     <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 dark:text-primary-400" />
//                   </div>
//                   <div className="min-w-0">
//                     <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Email</p>
//                     <p className="font-medium truncate">hello@example.com</p>
//                   </div>
//                 </motion.div>

//                 <motion.div
//                   initial={{ opacity: 0, x: -20 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: 0.3 }}
//                   className="flex items-center gap-3 text-sm sm:text-base text-gray-700 dark:text-gray-300 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//                 >
//                   <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center flex-shrink-0">
//                     <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 dark:text-primary-400" />
//                   </div>
//                   <div className="min-w-0">
//                     <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Location</p>
//                     <p className="font-medium">Your City, Country</p>
//                   </div>
//                 </motion.div>
//               </div>

//               {/* Decorative Element */}
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: 0.4 }}
//                 className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-br from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 rounded-xl border border-primary-200 dark:border-primary-800"
//               >
//                 <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 italic">
//                   "Let's create something amazing together. Drop me a message and I'll get back to you as soon as possible!"
//                 </p>
//               </motion.div>
//             </motion.div>

//             {/* Right Side - Contact Form */}
//             <motion.form
//               initial={{ opacity: 0, x: 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//               onSubmit={handleSubmit}
//               className="space-y-4 sm:space-y-5"
//             >
//               {/* Name Input */}
//               <div>
//                 <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   Your Name
//                 </label>
//                 <input
//                   id="name"
//                   type="text"
//                   placeholder="John Doe"
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   className="input w-full text-sm sm:text-base"
//                   required
//                 />
//               </div>

//               {/* Email Input */}
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   Your Email
//                 </label>
//                 <input
//                   id="email"
//                   type="email"
//                   placeholder="john@example.com"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   className="input w-full text-sm sm:text-base"
//                   required
//                 />
//               </div>

//               {/* Message Textarea */}
//               <div>
//                 <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   Your Message
//                 </label>
//                 <textarea
//                   id="message"
//                   placeholder="Your Message (Minimum 10 characters)"
//                   value={formData.message}
//                   onChange={(e) => setFormData({ ...formData, message: e.target.value })}
//                   className="input w-full h-28 sm:h-32 resize-none text-sm sm:text-base"
//                   required
//                   minLength={10}
//                 />
//               </div>

//               {/* Submit Button */}
//               <Button 
//                 type="submit" 
//                 icon={Send} 
//                 className="w-full" 
//                 size="lg"
//                 disabled={loading}
//               >
//                 {loading ? 'Sending...' : 'Send Message'}
//               </Button>

//               {/* Form Info */}
//               <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
//                 Your message will be sent securely. I'll respond within 24-48 hours.
//               </p>
//             </motion.form>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default ContactSection;

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin } from 'lucide-react';
import { messagesAPI } from '../../services/api';
import api from '../../services/api';
import toast from 'react-hot-toast';
import Button from '../common/Button';

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  // 🔹 CMS contact data
  const [contactInfo, setContactInfo] = useState(null);

  // 🔹 Fetch contact info from CMS
  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const res = await api.get('/content/contact');
        if (res?.success) {
          setContactInfo(res.data);
        }
      } catch (error) {
        console.warn('Failed to load contact info, using defaults');
      }
    };

    fetchContactInfo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await messagesAPI.create(formData);
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-800 px-4 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-center mb-10 sm:mb-12 md:mb-16 text-gradient">
            Get In Touch
          </h2>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
            {/* LEFT SIDE */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
                Let's Connect
              </h3>

              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 leading-relaxed">
                I'm always open to new opportunities and collaborations. Feel free to reach out!
              </p>

              <div className="space-y-3 sm:space-y-4">
                {/* EMAIL */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3 text-sm sm:text-base text-gray-700 dark:text-gray-300 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                    <p className="font-medium truncate">
                      {contactInfo?.email || 'hello@example.com'}
                    </p>
                  </div>
                </motion.div>

                {/* LOCATION */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-3 text-sm sm:text-base text-gray-700 dark:text-gray-300 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Location</p>
                    <p className="font-medium">
                      {contactInfo?.address || 'Your City, Country'}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* RIGHT SIDE - FORM */}
            <motion.form
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onSubmit={handleSubmit}
              className="space-y-4 sm:space-y-5"
            >
              <div>
                <label className="block text-sm font-medium mb-2">Your Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Your Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Your Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="input w-full h-28 resize-none"
                  minLength={10}
                  required
                />
              </div>

              <Button type="submit" icon={Send} className="w-full" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
              </Button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
