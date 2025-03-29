"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiBriefcase,
  FiZap,
  FiThermometer,
  FiShield,
  FiTool,
  FiHome,
} from "react-icons/fi";

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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

  const services = [
    {
      icon: <FiBriefcase className="w-8 h-8" />,
      title: "Building Automation Systems",
      description:
        "Comprehensive automation solutions that integrate and control building systems through a centralized platform for improved efficiency and management.",
    },
    {
      icon: <FiZap className="w-8 h-8" />,
      title: "Energy Management",
      description:
        "Smart energy monitoring and optimization systems that reduce consumption, lower operational costs, and promote sustainability.",
    },
    {
      icon: <FiThermometer className="w-8 h-8" />,
      title: "HVAC Control & Optimization",
      description:
        "Advanced heating, ventilation, and air conditioning control systems that maintain optimal comfort while maximizing energy efficiency.",
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: "Security & Access Control",
      description:
        "Integrated security solutions including access control, surveillance systems, and alarm management for comprehensive building protection.",
    },
    {
      icon: <FiTool className="w-8 h-8" />,
      title: "Maintenance & Monitoring",
      description:
        "Proactive maintenance services with real-time monitoring, predictive analytics, and rapid response to prevent system failures.",
    },
    {
      icon: <FiHome className="w-8 h-8" />,
      title: "Smart Building Integration",
      description:
        "Seamless integration of IoT devices and systems to create intelligent buildings that adapt to occupants' needs and optimize performance.",
    },
  ];

  return (
    <section id="services" className="py-20" ref={ref}>
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
            Our <span className="text-primary">Services</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-foreground/70 text-lg"
          >
            Comprehensive Building Management Solutions for Modern Facilities
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-background rounded-lg p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 border-opacity-50 group"
            >
              <div className="mb-6 p-4 bg-primary/10 rounded-full w-fit group-hover:bg-primary/20 transition-colors duration-300">
                <div className="text-primary">{service.icon}</div>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-foreground/70">{service.description}</p>
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 border-opacity-30">
                <a
                  href="#contact"
                  className="text-primary font-medium flex items-center group-hover:underline"
                >
                  Learn more
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
