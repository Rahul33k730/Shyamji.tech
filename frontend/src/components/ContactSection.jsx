import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import axios from 'axios';
import API_BASE_URL from '../config/api';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const servicesList = [
    "AI Development",
    "Web & Mobile Apps",
    "Automation Solutions",
    "Cloud Infrastructure",
    "UI/UX Design",
    "Tech Consulting"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await axios.post(`${API_BASE_URL}/contact`, formData);
      setSubmitted(true);
      setStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully.' });
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    } catch (err) {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden transition-colors duration-500">
      {/* Decorative Blur */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary-blue/5 blur-[150px] pointer-events-none" />
      
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Side: Information */}
          <div className="lg:col-span-5 flex flex-col gap-12">
            <div>
              <h2 className="mb-6 leading-tight">
                Ready to Build <br /> Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-blue to-secondary-blue">Legendary?</span>
              </h2>
              <p className="max-w-md text-slate-blue dark:text-slate-400">
                We're always looking for new ideas and partners. Tell us about your project, and let's turn your vision into a reality.
              </p>
            </div>

            <div className="space-y-8">
              {[
                { icon: Mail, label: 'Email Us', value: 'shyamjitech33@gmail.com' },
                { icon: Phone, label: 'Call Us', value: '9580893230' },
                { icon: MapPin, label: 'Visit Us', value: 'Innovation Hub, Tech City, India' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-5 group">
                  <div className="w-12 h-12 card-premium p-0 flex items-center justify-center text-primary-blue group-hover:scale-110 transition-transform">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-blue/60 dark:text-slate-500 uppercase tracking-widest mb-1">{item.label}</span>
                    <p className="text-lg font-semibold text-navy-900 dark:text-white group-hover:text-primary-blue transition-colors">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-7">
            <div className="card-premium p-8 md:p-10 shadow-2xl relative transition-colors duration-300">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="w-20 h-20 bg-primary-blue/10 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="text-primary-blue" size={40} />
                  </div>
                  <h3 className="mb-2 text-navy-900 dark:text-white">Message Sent!</h3>
                  <p className="mb-8 text-slate-blue dark:text-slate-400">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  <button onClick={() => setSubmitted(false)} className="btn-secondary">Send Another Message</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="label-text">Full Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="John Doe"
                        className="input-field"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="label-text">Email Address</label>
                      <input 
                        required
                        type="email" 
                        placeholder="john@example.com"
                        className="input-field"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="label-text">Phone Number</label>
                      <input 
                        required
                        type="tel" 
                        placeholder="+91 00000 00000"
                        className="input-field"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="label-text">Interested Service</label>
                      <select 
                        required
                        className="input-field appearance-none cursor-pointer"
                        value={formData.service}
                        onChange={(e) => setFormData({...formData, service: e.target.value})}
                      >
                        <option value="" className="bg-bg-primary dark:bg-navy-900">Select a service</option>
                        {servicesList.map(s => <option key={s} value={s} className="bg-bg-primary dark:bg-navy-900">{s}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="label-text">Your Message</label>
                    <textarea 
                      required
                      rows="4" 
                      placeholder="Tell us about your project..."
                      className="input-field resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                  </div>

                  <button 
                    disabled={loading}
                    className="btn-primary w-full py-4 flex items-center justify-center gap-3 text-lg"
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                    <Send size={20} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
