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

  const email = contactInfo?.email || 'hello@example.com';
  const address = contactInfo?.address || 'Your City, Country';

  const labelClass =
    'block font-mono text-xs uppercase tracking-wider text-[color:var(--text-secondary)] mb-2';

  return (
    <section id="contact">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
        >
          {/* <span className="section-eyebrow">// 06 — Contact</span> */}
          <h2 className="section-title">Get In Touch</h2>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mt-12">
            {/* LEFT SIDE */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5"
            >
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-[color:var(--text-primary)]">
                Let's Connect
              </h3>

              <p className="text-base text-[color:var(--text-secondary)] mb-8 leading-relaxed">
                I'm always open to new opportunities and collaborations. Feel free to reach out!
              </p>

              <div className="space-y-4">
                {/* EMAIL */}
                <a
                  href={`mailto:${email}`}
                  className="paper-card !p-4 flex items-center gap-4"
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 bg-primary-600/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-[0.65rem] uppercase tracking-wider text-[color:var(--text-secondary)]">Email</p>
                    <p className="font-medium text-[color:var(--text-primary)] truncate">
                      {email}
                    </p>
                  </div>
                </a>

                {/* LOCATION */}
                <div className="paper-card card-static !p-4 flex items-center gap-4">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 bg-primary-600/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-[0.65rem] uppercase tracking-wider text-[color:var(--text-secondary)]">Location</p>
                    <p className="font-medium text-[color:var(--text-primary)]">
                      {address}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT SIDE - FORM */}
            <motion.form
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onSubmit={handleSubmit}
              className="lg:col-span-7 paper-card card-static space-y-5 !p-6 sm:!p-8"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Your Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input w-full"
                    placeholder="Jane Doe"
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>Your Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input w-full"
                    placeholder="jane@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Your Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="input w-full h-36 sm:h-40 resize-none"
                  placeholder="Tell me about your project or idea..."
                  minLength={10}
                  required
                />
              </div>

              <Button type="submit" icon={Send} size="lg" className="w-full" disabled={loading}>
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
