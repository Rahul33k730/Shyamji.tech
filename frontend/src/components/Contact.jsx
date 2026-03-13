import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import axios from 'axios';
import API_BASE_URL from '../config/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const servicesList = [
    'AI Chatbot Development',
    'AI Appointment Scheduling',
    'AI Virtual Agents',
    'AI Data Cleaning',
    'AI Model Training',
    'Web Development',
    'Mobile App Development',
    'AI Automation Solutions',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/contact`, formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    } catch (err) {
      console.error('Error submitting form:', err);
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden transition-colors">
      {/* Decorative Glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Side: Contact Info */}
          <div className="flex flex-col gap-12">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 text-cyan-500 font-bold tracking-widest uppercase text-sm mb-4"
              >
                <div className="w-12 h-1 bg-cyan-500" />
                Get in Touch
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight transition-colors">
                Ready to Build <br /> Something <span className="text-cyan-500">Legendary?</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mt-6 text-lg leading-relaxed max-w-lg transition-colors">
                We're always looking for new ideas and partners. Tell us about your project, and let's turn your vision into a reality.
              </p>
            </div>

            <div className="flex flex-col gap-8">
              <div className="flex items-start gap-6 group">
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 group-hover:border-cyan-500 transition-colors shadow-sm">
                  <Mail className="w-6 h-6 text-cyan-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Email Us</h4>
                  <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">shyamjitech33@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 group-hover:border-cyan-500 transition-colors shadow-sm">
                  <Phone className="w-6 h-6 text-cyan-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Call Us</h4>
                  <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">9580893230</p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 group-hover:border-cyan-500 transition-colors shadow-sm">
                  <MapPin className="w-6 h-6 text-cyan-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Visit Us</h4>
                  <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">Innovation Hub, Tech City, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-10 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900/40 backdrop-blur-2xl border border-slate-200 dark:border-slate-800/50 shadow-xl dark:shadow-2xl transition-colors"
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-20 text-center gap-6">
                  <div className="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center border border-cyan-500/20">
                    <CheckCircle className="w-10 h-10 text-cyan-500" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white">Message Sent!</h3>
                  <p className="text-slate-600 dark:text-slate-400 max-w-xs">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-cyan-500 font-bold hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-3">
                      <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">Full Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="p-5 bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 focus:outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700 shadow-sm dark:shadow-none"
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">Email Address</label>
                      <input 
                        required
                        type="email" 
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="p-5 bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 focus:outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700 shadow-sm dark:shadow-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-3">
                      <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">Phone Number</label>
                      <input 
                        required
                        type="tel" 
                        placeholder="+91 00000 00000"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="p-5 bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 focus:outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700 shadow-sm dark:shadow-none"
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">Interested Service</label>
                      <div className="relative">
                        <select 
                          required
                          value={formData.service}
                          onChange={(e) => setFormData({...formData, service: e.target.value})}
                          className="w-full p-5 bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 focus:outline-none transition-all appearance-none cursor-pointer shadow-sm dark:shadow-none"
                        >
                          <option value="" className="bg-white dark:bg-slate-900">Select a service</option>
                          {servicesList.map(s => <option key={s} value={s} className="bg-white dark:bg-slate-900">{s}</option>)}
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 dark:text-slate-500">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">Your Message</label>
                    <textarea 
                      required
                      rows="4" 
                      placeholder="Tell us about your project..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="p-5 bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 focus:outline-none transition-all resize-none placeholder:text-slate-300 dark:placeholder:text-slate-700 shadow-sm dark:shadow-none"
                    />
                  </div>

                  <button 
                    disabled={loading}
                    className="group relative mt-4 overflow-hidden p-5 bg-cyan-500 text-slate-950 rounded-2xl font-black text-xl hover:bg-cyan-400 transition-all shadow-[0_0_30px_rgba(6,182,212,0.4)] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      {loading ? 'Sending...' : 'Send Message'}
                      <Send className={`w-6 h-6 ${loading ? 'animate-pulse' : 'group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform'}`} />
                    </span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
