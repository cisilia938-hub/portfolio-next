"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import styles from "./components.module.css";

export default function FloatingNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Theme is checked by page.tsx on mount. Here we sync the state.
    if (document.body.classList.contains("dark")) {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const menuList = [
    { name: "Profil", link: "#perkenalan" },
    { name: "Project", link: "#project-it" },
    { name: "Cube", link: "#interactive-cube" },
  ];

  const smoothEase: [number, number, number, number] = [0.32, 0.72, 0, 1]; // Apple-like fluid curve

  return (
    <>
      {/* Theme Toggle Button */}
      <motion.button
        className={styles.themeToggleBtn}
        onClick={toggleTheme}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: smoothEase, delay: 0.4 }}
        aria-label="Toggle Dark Mode"
      >
        {mounted ? (isDark ? <Moon size={18} /> : <Sun size={18} />) : <span style={{ width: 18, height: 18 }} />}
      </motion.button>

      {/* Burger Button */}
      <motion.button
        className={styles.burgerButton}
        onClick={() => setIsOpen(!isOpen)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: smoothEase, delay: 0.5 }}
        aria-label="Toggle Menu"
      >
        <div className={styles.burgerLines}>
          {/* Top line */}
          <motion.span
            animate={isOpen ? { y: 8.5, rotate: 45 } : { y: 0, rotate: 0 }}
            transition={{ duration: 0.4, ease: smoothEase }}
          />
          {/* Middle line: fade in sync with the others */}
          <motion.span
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.4, ease: smoothEase }}
          />
          {/* Bottom line */}
          <motion.span
            animate={isOpen ? { y: -8.5, rotate: -45 } : { y: 0, rotate: 0 }}
            transition={{ duration: 0.4, ease: smoothEase }}
          />
        </div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.nav
            className={styles.burgerMenu}
            initial={{ opacity: 0, y: -16, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
            transition={{ duration: 0.45, ease: smoothEase }}
          >
            {menuList.map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                className={styles.burgerMenuItem}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{
                  duration: 0.4,
                  ease: smoothEase,
                  delay: 0.05 + index * 0.06,
                }}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
