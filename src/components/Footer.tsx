"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  FiLinkedin,
  FiTwitter,
  FiFacebook,
  FiInstagram,
  FiArrowUp,
} from "react-icons/fi";

const Footer = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false);
  const [newsletterStatus, setNewsletterStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newsletterEmail) return;
    
    try {
      setIsNewsletterSubmitting(true);
      
      // Send the email to the API
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe to newsletter');
      }
      
      // Show success message
      setNewsletterStatus({
        type: "success",
        message: "Thank you for subscribing to our newsletter!",
      });
      
      // Reset form
      setNewsletterEmail("");
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setNewsletterStatus({ type: null, message: "" });
      }, 5000);
    } catch (error) {
      // Show error message
      setNewsletterStatus({
        type: "error",
        message: error instanceof Error ? error.message : "An error occurred. Please try again later.",
      });
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setNewsletterStatus({ type: null, message: "" });
      }, 5000);
    } finally {
      setIsNewsletterSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Contact", href: "#contact" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
  ];

  const services = [
    { name: "Building Automation", href: "#services" },
    { name: "Energy Management", href: "#services" },
    { name: "HVAC Control", href: "#services" },
    { name: "Security & Access", href: "#services" },
    { name: "Maintenance", href: "#services" },
    { name: "Smart Integration", href: "#services" },
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
    <footer className="bg-muted/50 pt-16 pb-8" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
        >
          {/* Company Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4">Naveed Ahmed</h3>
            <p className="text-foreground/70 mb-4">
              Providing innovative Building Management System solutions for modern facilities.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-background rounded-full hover:bg-primary hover:text-white transition-colors duration-300"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-foreground/70 hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    href={service.href}
                    className="text-foreground/70 hover:text-primary transition-colors duration-200"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-foreground/70 mb-4">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            {newsletterStatus.message && (
              <div 
                className={`mb-4 p-3 rounded-lg text-sm ${
                  newsletterStatus.type === "success"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                }`}
              >
                {newsletterStatus.message}
              </div>
            )}
            <form onSubmit={handleNewsletterSubmit} className="flex">
              <input
                type="email"
                placeholder="Your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="px-4 py-2 rounded-l-lg border border-gray-200 dark:border-gray-700 bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 w-full"
              />
              <button
                type="submit"
                disabled={isNewsletterSubmitting}
                className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors duration-300 disabled:opacity-70"
              >
                {isNewsletterSubmitting ? "..." : "Subscribe"}
              </button>
            </form>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="border-t border-gray-200 dark:border-gray-700 border-opacity-50 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-foreground/70 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Naveed Ahmed. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <button
              onClick={scrollToTop}
              className="p-2 bg-primary/10 rounded-full hover:bg-primary hover:text-white transition-colors duration-300"
              aria-label="Scroll to top"
            >
              <FiArrowUp className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
