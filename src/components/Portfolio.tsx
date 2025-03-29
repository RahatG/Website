"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

const Portfolio = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Removed filter state
  const [activeProject, setActiveProject] = useState<number | null>(null);

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

  // Removed filters array

  const projects = [
    {
      id: 1,
      title: "Project 1",
      description: "Building Management System implementation placeholder"
    },
    {
      id: 2,
      title: "Project 2",
      description: "Smart building automation placeholder"
    },
    {
      id: 3,
      title: "Project 3",
      description: "Energy management system placeholder"
    },
    {
      id: 4,
      title: "Project 4",
      description: "Security and access control placeholder"
    },
    {
      id: 5,
      title: "Project 5",
      description: "HVAC optimization placeholder"
    },
    {
      id: 6,
      title: "Project 6",
      description: "Integrated building solutions placeholder"
    },
  ];

  // Using all projects without filtering
  const filteredProjects = projects;

  const handleProjectClick = (id: number) => {
    setActiveProject(activeProject === id ? null : id);
  };

  return (
    <section id="portfolio" className="py-20 bg-muted/30" ref={ref}>
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
            Our <span className="text-primary">Projects</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-foreground/70 text-lg"
          >
            Explore our successful Building Management System projects
          </motion.p>
        </motion.div>

        {/* Removed filter buttons */}

        {/* Projects Grid - Simplified */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="bg-background rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-xl font-bold mb-3 text-primary">
                {project.title}
              </h3>
              <p className="text-foreground/70">
                {project.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Removed project modal */}
      </div>
    </section>
  );
};

export default Portfolio;
