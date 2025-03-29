"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiSend,
  FiLinkedin,
  FiTwitter,
  FiFacebook,
  FiInstagram,
} from "react-icons/fi";

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Set loading state
      setFormStatus({
        type: null,
        message: "Sending your message...",
      });
      
      // Send the form data to the API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }
      
      // Show success message
      setFormStatus({
        type: "success",
        message: "Thank you for your message! We'll get back to you soon.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setFormStatus({ type: null, message: "" });
      }, 5000);
    } catch (error) {
      // Show error message
      setFormStatus({
        type: "error",
        message: error instanceof Error ? error.message : "An error occurred. Please try again later.",
      });
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setFormStatus({ type: null, message: "" });
      }, 5000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const contactInfo = [
    {
      icon: <FiPhone className="w-6 h-6 text-primary" />,
      title: "Phone Number",
      details: ["+44 7943 163650"],
    },
    {
      icon: <FiMail className="w-6 h-6 text-primary" />,
      title: "Email Address",
      details: ["info@naveedahmed.com", "support@naveedahmed.com"],
    },
    {
      icon: <FiClock className="w-6 h-6 text-primary" />,
      title: "Working Hours",
      details: ["Monday - Friday: 9am - 6pm", "Saturday: 10am - 2pm"],
    },
  ];

  const socialLinks = [
    {
      icon: <FiLinkedin className="w-5 h-5" />,
      url: "https://www.linkedin.com/in/naveed-ahmed-77ab8572/",
      label: "LinkedIn",
    },
    {
      icon: <FiTwitter className="w-5 h-5" />,
      url: "https://twitter.com",
      label: "Twitter",
    },
    {
      icon: <FiFacebook className="w-5 h-5" />,
      url: "https://facebook.com",
      label: "Facebook",
    },
    {
      icon: <FiInstagram className="w-5 h-5" />,
      url: "https://instagram.com",
      label: "Instagram",
    },
  ];

  return (
    <section id="contact" className="py-20 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Get in <span className="text-primary">Touch</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-foreground/70 text-lg"
          >
            Contact us to discuss your Building Management System needs
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="lg:col-span-1"
          >
            <div className="bg-background rounded-lg p-8 shadow-md h-full">
              <motion.h3
                variants={itemVariants}
                className="text-2xl font-bold mb-6"
              >
                Contact Information
              </motion.h3>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-start gap-4"
                  >
                    <div className="p-3 bg-primary/10 rounded-full">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                      {item.details.map((detail, i) => (
                        <p key={i} className="text-foreground/70">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                variants={itemVariants}
                className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700"
              >
                <h4 className="font-bold text-lg mb-4">Follow Us</h4>
                <div className="flex gap-4">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-muted rounded-full hover:bg-primary hover:text-white transition-colors duration-300"
                      aria-label={link.label}
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="lg:col-span-2"
          >
            <div className="bg-background rounded-lg p-8 shadow-md">
              <motion.h3
                variants={itemVariants}
                className="text-2xl font-bold mb-4"
              >
                Send Us a Message
              </motion.h3>
              <motion.p
                variants={itemVariants}
                className="text-foreground/70 mb-6"
              >
                Send us a message and we'll get back to you as soon as possible.
              </motion.p>

              {formStatus.type && (
                <div
                  className={`mb-6 p-4 rounded-lg ${
                    formStatus.type === "success"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                  }`}
                >
                  {formStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2"
                    >
                      Your Name <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Email Address <span className="text-primary">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium mb-2"
                    >
                      Subject <span className="text-primary">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="">Select a subject</option>
                      <option value="Building Automation">
                        Building Automation
                      </option>
                      <option value="Energy Management">
                        Energy Management
                      </option>
                      <option value="HVAC Control">HVAC Control</option>
                      <option value="Security Systems">Security Systems</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Other">Other</option>
                    </select>
                  </motion.div>
                </div>

                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Your Message <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  ></textarea>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-blue-500/20"
                  >
                    Send Message
                    <FiSend />
                  </button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Map section removed */}
      </div>
    </section>
  );
};

export default Contact;
