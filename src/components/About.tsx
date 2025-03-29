"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { FiTarget, FiEye, FiAward } from "react-icons/fi";

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const values = [
    {
      icon: <FiTarget className="w-6 h-6 text-primary" />,
      title: "Mission",
      description:
        "To deliver innovative digital solutions that empower businesses to thrive in the modern marketplace.",
    },
    {
      icon: <FiEye className="w-6 h-6 text-primary" />,
      title: "Vision",
      description:
        "To be the leading provider of transformative digital experiences that drive growth and success for our clients.",
    },
    {
      icon: <FiAward className="w-6 h-6 text-primary" />,
      title: "Values",
      description:
        "Excellence, innovation, integrity, and client-centricity are the core values that guide our work and relationships.",
    },
  ];

  const teamMembers = [
    {
      name: "Naveed Ahmed",
      role: "Founder & CEO",
      image: "/team-1.jpg",
    },
  ];

  return (
    <section
      id="about"
      className="py-20 bg-muted/30"
      ref={ref}
    >
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
            About <span className="text-primary">Us</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-foreground/70 text-lg"
          >
            Learn more about our story, mission, and the team behind our success
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl md:text-3xl font-bold mb-6"
            >
              Our Story
            </motion.h3>
            <motion.p
              variants={itemVariants}
              className="text-foreground/70 mb-4"
            >
              Founded in 2015, our company began with a simple yet powerful
              vision: to bridge the gap between technology and business needs.
              Naveed Ahmed, our founder, recognized that many businesses
              struggled to leverage digital tools effectively.
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-foreground/70 mb-4"
            >
              What started as a small consultancy has grown into a
              full-service digital agency with a team of passionate experts
              dedicated to delivering exceptional results for our clients.
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-foreground/70"
            >
              Today, we pride ourselves on our ability to combine technical
              expertise with creative thinking to develop solutions that not
              only meet but exceed our clients' expectations.
            </motion.p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative h-[400px] rounded-lg overflow-hidden shadow-xl"
          >
            <div className="absolute inset-0 bg-primary/20 z-10 rounded-lg" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full relative">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Our team working together"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-lg"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-background rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4 p-3 bg-primary/10 rounded-full w-fit">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{value.title}</h3>
              <p className="text-foreground/70">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center"
        >
          <motion.h3
            variants={itemVariants}
            className="text-2xl md:text-3xl font-bold mb-12"
          >
            Meet Our <span className="text-primary">Team</span>
          </motion.h3>

          <div className="grid md:grid-cols-1 gap-8 max-w-sm mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-background rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={`https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${index + 1}.jpg`}
                    alt={member.name}
                    fill
                    style={{ objectFit: "cover" }}
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold">{member.name}</h4>
                  <p className="text-primary">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
