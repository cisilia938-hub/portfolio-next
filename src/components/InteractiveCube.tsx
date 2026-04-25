"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock } from "lucide-react";
import styles from "./components.module.css";
import GachaSystem from "./GachaSystem";
import WaifuArena from "./WaifuArena";
import WaifuGallery from "./WaifuGallery";
import "./GachaSystem.css";

const COLORS = [
  { name: "Miku", value: "#39C5BB", border: "#2B9B93", cost: 0, mult: 1, shape: "Square", form: "Cube" },
  { name: "Teto", value: "#D03254", border: "#A01E3C", cost: 20, mult: 2, shape: "Square", form: "Cube" },
  { name: "Neru", value: "#FCC800", border: "#D4A800", cost: 100, mult: 5, shape: "Square", form: "Cube" },
  { name: "Hitam", value: "#2C2C2C", border: "#111111", cost: 300, mult: 15, shape: "Square", form: "Cube" }
];

type TabType = "clicker" | "gacha" | "gallery" | "fight";

export default function InteractiveCube() {
  const [score, setScore] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [unlockedColors, setUnlockedColors] = useState<string[]>(["Miku"]);
  const [activeColor, setActiveColor] = useState(COLORS[0]);
  const [popups, setPopups] = useState<{ id: number; x: number; y: number; val: number }[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>("clicker");
  const [isMounted, setIsMounted] = useState(false);

  // Load score from localStorage
  useEffect(() => {
    try {
      const savedScore = localStorage.getItem("cube_score");
      const savedClicks = localStorage.getItem("cube_clicks");
      const savedUnlocked = localStorage.getItem("cube_unlocked");
      const savedColor = localStorage.getItem("cube_active_color");
      if (savedScore) setScore(parseInt(savedScore, 10));
      if (savedClicks) setTotalClicks(parseInt(savedClicks, 10));
      if (savedUnlocked) setUnlockedColors(JSON.parse(savedUnlocked));
      if (savedColor) {
        const found = COLORS.find(c => c.name === savedColor);
        if (found) setActiveColor(found);
      }
    } catch {
      // ignore
    }
    setIsMounted(true);
  }, []);

  // Save score to localStorage
  useEffect(() => {
    localStorage.setItem("cube_score", score.toString());
    localStorage.setItem("cube_clicks", totalClicks.toString());
    localStorage.setItem("cube_unlocked", JSON.stringify(unlockedColors));
    localStorage.setItem("cube_active_color", activeColor.name);
  }, [score, totalClicks, unlockedColors, activeColor]);

  // Spin duration: max 10s, min 1.5s based on total clicks
  const spinDuration = Math.max(1.5, 10 - Math.floor(totalClicks / 20));

  const handleFaceClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const gain = activeColor.mult;
    setScore((s) => s + gain);
    setTotalClicks((c) => c + 1);

    const newId = Date.now() + Math.random();
    setPopups((p) => [...p, { id: newId, x: e.clientX, y: e.clientY, val: gain }]);

    setTimeout(() => {
      setPopups((p) => p.filter((item) => item.id !== newId));
    }, 800);
  };

  const handleColorClick = (colorDef: typeof COLORS[0]) => {
    if (unlockedColors.includes(colorDef.name)) {
      setActiveColor(colorDef);
    } else {
      if (score >= colorDef.cost) {
        // Buy color
        setScore((s) => s - colorDef.cost);
        setUnlockedColors((prev) => [...prev, colorDef.name]);
        setActiveColor(colorDef);
      }
    }
  };

  const getFaceTransform = (form: string, i: number) => {
    switch (form) {
      case "Cube":
      default:
        if (i === 0) return "rotateY(0deg) translateZ(100px)";
        if (i === 1) return "rotateY(90deg) translateZ(100px)";
        if (i === 2) return "rotateY(180deg) translateZ(100px)";
        if (i === 3) return "rotateY(270deg) translateZ(100px)";
        if (i === 4) return "rotateX(90deg) translateZ(100px)";
        return "rotateX(-90deg) translateZ(100px)";
    }
  };

  const getFaceBrightness = (i: number) => {
    switch (i) {
      case 4: return 1.25;
      case 0: return 1.0;
      case 1: 
      case 3: return 0.85;
      case 2: return 0.7;
      case 5: return 0.55;
      default: return 1;
    }
  };

  if (!isMounted) {
    return (
      <section id="interactive-cube" className="section-container" style={{ position: "relative", minHeight: "600px" }}>
        {/* Skeleton to prevent layout shift during SSR */}
      </section>
    );
  }

  return (
    <section id="interactive-cube" className="section-container" style={{ position: "relative", paddingTop: "80px", paddingBottom: "80px" }}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
        viewport={{ once: true }}
        style={{ 
          fontSize: "2rem", 
          fontWeight: 600, 
          color: "var(--text-primary)", 
          textAlign: "center",
          marginBottom: "32px",
          fontFamily: "var(--font-playfair), serif",
          letterSpacing: "0.5px"
        }}
      >
        Cube Clicker
      </motion.h2>

      <div style={{ textAlign: "center" }}>
        <div className="cubeScoreCard">
          <span className="cubeScoreValue">{score.toLocaleString()}</span>
          <span className="cubeScoreLabel">CUBE POINTS</span>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="tabSwitcher">
        <button
          className={`tabBtn ${activeTab === "clicker" ? "active" : ""}`}
          onClick={() => setActiveTab("clicker")}
        >
          Clicker
        </button>
        <button
          className={`tabBtn ${activeTab === "gacha" ? "active" : ""}`}
          onClick={() => setActiveTab("gacha")}
        >
          Gacha
        </button>
        <button
          className={`tabBtn ${activeTab === "gallery" ? "active" : ""}`}
          onClick={() => setActiveTab("gallery")}
        >
          Gallery
        </button>
        <button
          className={`tabBtn ${activeTab === "fight" ? "active" : ""}`}
          onClick={() => setActiveTab("fight")}
        >
          Fight
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "clicker" ? (
          <motion.div
            key="clicker"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.cubeContainer}>
              <div className={styles.cube} style={{ animationDuration: `${spinDuration}s` }}>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={styles.cubeFace}
                    onClick={handleFaceClick}
                    style={{
                      transform: getFaceTransform(activeColor.form, i),
                      background: activeColor.value,
                      border: "none",
                      boxShadow: "none",
                      filter: `brightness(${getFaceBrightness(i)})`,
                      cursor: "pointer",
                      transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="cubeShopSection">
              <h3 className="cubeShopTitle">Color Shop</h3>
              <div style={{ display: "flex", justifyContent: "center", gap: "32px", flexWrap: "wrap", padding: "16px 0" }}>
                {COLORS.map((col) => {
                  const isUnlocked = unlockedColors.includes(col.name);
                  const isActive = activeColor.name === col.name;
                  const canAfford = score >= col.cost;

                  return (
                    <div key={col.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                      <button
                        className={`materialColorBtn ${isActive ? "active" : ""}`}
                        style={{ 
                          backgroundColor: isUnlocked ? col.border : "var(--bg-color)",
                          opacity: isUnlocked ? 1 : canAfford ? 0.8 : 0.4,
                          boxShadow: isActive ? `0 4px 16px ${col.border}66` : "0 2px 8px rgba(0,0,0,0.1)",
                          cursor: (isUnlocked || canAfford) ? "pointer" : "not-allowed",
                        }}
                        onClick={() => handleColorClick(col)}
                        disabled={!isUnlocked && !canAfford}
                        title={isUnlocked ? `Equip ${col.name} (${col.form})` : `Buy ${col.name} for ${col.cost} pts`}
                        aria-label={`Color ${col.name}`}
                      >
                        {!isUnlocked && <Lock size={20} color={canAfford ? col.border : "var(--text-secondary)"} />}
                      </button>
                      <div style={{ fontSize: "0.85rem", fontWeight: 600, color: isUnlocked ? "var(--text-primary)" : "var(--text-secondary)" }}>
                        {isUnlocked ? col.name : `${col.cost} pts`}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : activeTab === "gacha" ? (
          <motion.div
            key="gacha"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <GachaSystem score={score} setScore={setScore} />
          </motion.div>
        ) : activeTab === "gallery" ? (
          <motion.div
            key="gallery"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <WaifuGallery />
          </motion.div>
        ) : (
          <motion.div
            key="fight"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <WaifuArena score={score} setScore={setScore} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click Visual Feedback Popups */}
      <AnimatePresence>
        {popups.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, y: 0, scale: 0.5 }}
            animate={{ opacity: 0, y: -60, scale: 1.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              position: "fixed",
              left: p.x - 15,
              top: p.y - 15,
              color: "#FFFFFF",
              fontWeight: 900,
              fontSize: "2rem",
              fontFamily: "var(--font-montserrat), sans-serif",
              pointerEvents: "none",
              zIndex: 9999,
              WebkitTextStroke: "1px rgba(0,0,0,0.2)",
              textShadow: `0 0 12px ${activeColor.border}, 0 0 24px ${activeColor.border}, 0 4px 12px rgba(0,0,0,0.8)`
            }}
          >
            +{p.val}
          </motion.div>
        ))}
      </AnimatePresence>
    </section>
  );
}
