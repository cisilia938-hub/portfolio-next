"use client";
import { motion } from "framer-motion";
import styles from "./components.module.css";

export default function ProjectIT() {
  const projects = [
    {
      title: "Lorem Ipsum Dolor Sit",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
      year: "2023",
    },
    {
      title: "Consectetur Adipiscing",
      desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
      year: "2022",
    },
    {
      title: "Eiusmod Tempor Incididunt",
      desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop",
      year: "2021",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {},
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    },
  };

  return (
    <section id="project-it" className="section-container">
      <motion.h2
        className="heading-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
        viewport={{ once: true, margin: "-100px" }}
      >
        Recent Project
      </motion.h2>

      <div className={styles.timelineContainer}>
        {projects.map((project, i) => (
          <motion.div
            key={i}
            className={styles.timelineItem}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={itemVariants}
          >
            <div className={styles.timelineDot}></div>
            <div className={styles.timelineContent}>
              <span className={styles.timelineDate}>{project.year}</span>
              <div 
                className={`glass-panel ${styles.itemCard}`} 
                style={{ 
                  borderRadius: 0, 
                  overflow: "hidden", 
                  display: "flex", 
                  flexDirection: "column", 
                  width: "100%", 
                  maxWidth: "420px",
                  padding: 0,
                  border: "1px solid #2a2a36",
                  backgroundColor: "#111118"
                }}
              >
                <div style={{ position: "relative" }}>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: 0, display: "block", opacity: 0.9 }} 
                  />
                  <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "40%", background: "linear-gradient(to top, #111118, transparent)" }}></div>
                </div>
                <div style={{ padding: "20px 24px 28px", display: "flex", flexDirection: "column", gap: "12px", textAlign: "left", background: "#111118" }}>
                  <p style={{ margin: 0, color: '#2D879B', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase' }}>DATABASE ENTRY</p>
                  <h4 style={{ fontSize: '1.5rem', margin: 0, color: '#fff', letterSpacing: '0.5px' }}>{project.title}</h4>
                  <p style={{ margin: 0, color: '#94a3b8', lineHeight: '1.6' }}>{project.desc}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
