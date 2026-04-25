"use client";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import styles from "./components.module.css";
import LogoLoop from "./LogoLoop";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiVite, SiFigma } from 'react-icons/si';

export default function Perkenalan() {
  const techLogos = [
    { node: <SiReact style={{ color: "var(--accent-color)" }} />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiTypescript style={{ color: "#3178C6" }} />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <SiTailwindcss style={{ color: "#06B6D4" }} />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
    { node: <SiVite style={{ color: "#646CFF" }} />, title: "Vite", href: "https://vitejs.dev" },
    { node: <SiFigma style={{ color: "#F24E1E" }} />, title: "Figma", href: "https://figma.com" },
  ];

  return (
    <section id="perkenalan" className="section-container">
      <div className={styles.introLayout}>
        <div className={styles.introLeft}>


          <div className={styles.introTextRaw}>
            <motion.h1
              className={styles.lusionHeroTitle}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <span><i>H</i><i>E</i><i>L</i><i>L</i><i>O</i></span><br />
              <span><i>P</i><i>U</i><i>T</i><i>R</i><i>A,</i></span>
            </motion.h1>

            <motion.p
              className={styles.lusionHeroDesc}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
              viewport={{ once: true }}
            >
              <span>Just an ordinary person who likes to play games and watching movie or anime, whatever.</span>
            </motion.p>
          </div>
        </div>

        <motion.div
          className={styles.introRight}
          initial={{ opacity: 0, scale: 0.95, x: 50 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', width: '100%', maxWidth: '320px', alignItems: 'center' }}>
            <div className={styles.photoPlaceholder} style={{ background: "transparent", border: "none", padding: 0, borderRadius: 0, width: '100%' }}>
              <img
                src="https://i0.wp.com/www.animefeminist.com/wp-content/uploads/2020/10/Wandering-Witch-The-journey-of-the-ashen-witch-begins.png?fit=810%2C456&ssl=1"
                alt="Elaina"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", borderRadius: 0 }}
              />
            </div>
            
            <div style={{ width: '100%', position: 'relative', overflow: 'hidden', padding: '10px 0' }}>
              <LogoLoop
                logos={techLogos}
                speed={35}
                direction="left"
                logoHeight={32}
                gap={48}
                hoverSpeed={0}
                scaleOnHover
                fadeOut
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Animated Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          color: "var(--accent-color)"
        }}
      >
        <span style={{ fontSize: "0.75rem", letterSpacing: "3px", fontWeight: 700, textTransform: "uppercase" }}>SCROLL</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown size={32} />
        </motion.div>
      </motion.div>
    </section>
  );
}
