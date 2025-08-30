import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { FiCheckCircle, FiAlertCircle, FiSend } from "react-icons/fi";
import { fadeInUp, viewport as viewportSettings } from '../../utils/animations';

function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formState.name.trim()) {
      setStatus({ type: 'error', message: 'Name is required' });
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email' });
      return false;
    }
    if (!formState.message.trim()) {
      setStatus({ type: 'error', message: 'Message is required' });
      return false;
    }
    return true;
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setStatus({ type: 'sending', message: 'Sending message...' });

    try {
      // Create a form data object to ensure proper field names for emailjs
      const formData = new FormData(e.target);
      formData.set('from_name', formState.name);
      formData.set('from_email', formState.email);
      formData.set('message', formState.message);
      
      await emailjs.sendForm(
        'portfolio-service',
        'portfolio-template',
        formData,
        'fnYFj6MM5DXSvACRX'
      );
      
      setStatus({ 
        type: 'success', 
        message: 'Message sent successfully! I\'ll get back to you soon.' 
      });
      setFormState({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Email sending failed:', error);
      setStatus({ 
        type: 'error', 
        message: 'Failed to send message. Please try again later.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      id="contact"
      initial={fadeInUp.initial}
      whileInView={fadeInUp.animate}
      transition={fadeInUp.transition}
      viewport={viewportSettings}
      className="pt-20 py-20 px-6 bg-transparent text-gray-900 dark:text-white"
    >
      <motion.div
        initial={{ ...fadeInUp.initial, y: 60 }}
        whileInView={{ ...fadeInUp.animate, y: 0 }}
        transition={fadeInUp.transition}
        viewport={viewportSettings}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold mb-8 accent-text-gradient">Contact Me</h2>
        <form onSubmit={sendEmail} className="space-y-6">
          <div className="space-y-1">
            <input
              type="text"
              name="name"
              value={formState.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white p-4 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--accent-from)] focus:border-transparent transition-all duration-200"
              disabled={isSubmitting}
            />
          </div>
          <div className="space-y-1">
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white p-4 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--accent-from)] focus:border-transparent transition-all duration-200"
              disabled={isSubmitting}
            />
          </div>
          <div className="space-y-1">
            <textarea
              name="message"
              value={formState.message}
              onChange={handleChange}
              rows="5"
              placeholder="Your Message"
              className="w-full bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white p-4 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--accent-from)] focus:border-transparent transition-all duration-200 resize-none"
              disabled={isSubmitting}
            />
          </div>
          
          {/* Status Message */}
          {status.message && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-center gap-2 p-3 rounded-lg text-sm ${
                status.type === 'error' 
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' 
                  : status.type === 'success'
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                    : 'bg-white/70 dark:bg-gray-800/50 text-gray-700 dark:text-gray-200'
              }`}
            >
              {status.type === 'error' ? (
                <FiAlertCircle className="flex-shrink-0" size={18} />
              ) : status.type === 'success' ? (
                <FiCheckCircle className="flex-shrink-0" size={18} />
              ) : (
                <FiSend className="flex-shrink-0" size={18} />
              )}
              <span>{status.message}</span>
            </motion.div>
          )}
          
          <motion.button
            whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-200 text-white ${
              isSubmitting 
                ? 'accent-gradient opacity-70 cursor-not-allowed' 
                : 'accent-gradient hover:opacity-95'
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </motion.button>
        </form>
      </motion.div>
    </motion.section>
  );
}
export default Contact;
