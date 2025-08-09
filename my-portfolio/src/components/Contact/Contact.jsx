import React from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";

function Contact() {
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm(
      'portfolio-service',      // Your Service ID
      'portfolio-template',     // Your Template ID
      e.target,
      'fnYFj6MM5DXSvACRX'      // Your Public API key
    )
      .then(
        () => {
          alert("Message sent successfully!");
        },
        (error) => {
          alert("Failed to send message. Please try again.");
          console.error(error);
        }
      );
    e.target.reset();
  };

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="pt-20 py-20 px-6 bg-gray-950 text-white"
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold mb-8 text-blue-400">Contact Me</h2>
        <form onSubmit={sendEmail} className="space-y-6">
          <div>
            <input
              type="text"
              name="from_name"
              placeholder="Your Name"
              required
              className="w-full bg-gray-800 text-white p-4 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <input
              type="email"
              name="from_email"
              placeholder="Your Email"
              required
              className="w-full bg-gray-800 text-white p-4 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              required
              className="w-full bg-gray-800 text-white p-4 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            ></textarea>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full font-semibold shadow-lg"
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>
    </motion.section>
  );
}
export default Contact;
