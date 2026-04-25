"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WAIFU_POOL, RARITY_CONFIG, WaifuCharacter, getBaseStats, getWaifuLore } from "./gachaData";
import "./WaifuGallery.css";
import { X } from "lucide-react";

export default function WaifuGallery() {
  const [unlockedIds, setUnlockedIds] = useState<Set<string>>(new Set());
  const [selectedWiki, setSelectedWiki] = useState<WaifuCharacter | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("gacha_collection_arknights");
      if (saved) {
        const parsed = JSON.parse(saved);
        // It's a map array: [[id, val], ...]
        const ids = new Set<string>();
        parsed.forEach(([id]: [string, any]) => ids.add(id));
        setUnlockedIds(ids);
      }
    } catch {
      // ignore
    }
  }, []);

  const sortedPool = [...WAIFU_POOL].sort((a, b) => {
    // Sort by rarity first, then name
    const rarityOrder = { legendary: 4, epic: 3, rare: 2, common: 1 };
    const diff = rarityOrder[b.rarity] - rarityOrder[a.rarity];
    if (diff !== 0) return diff;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="galleryContainer">
      <div className="galleryHeader">
        <h2 className="galleryTitle">Gallery & Wiki</h2>
        <p className="galleryDesc">Koleksi seluruh karakter yang ada di alam semesta ini.</p>
        <div className="galleryProgress">
          Progres: {unlockedIds.size} / {WAIFU_POOL.length} Terkumpul
        </div>
      </div>

      <div className="galleryGrid">
        {sortedPool.map((w) => {
          const isUnlocked = unlockedIds.has(w.id);
          const rarityConf = RARITY_CONFIG[w.rarity];

          return (
            <motion.div
              key={w.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`galleryCard ${isUnlocked ? "unlocked" : "locked"}`}
              style={
                isUnlocked
                  ? ({ "--glow-color": rarityConf.glowColor } as React.CSSProperties)
                  : {}
              }
              onClick={() => {
                if (isUnlocked) setSelectedWiki(w);
              }}
            >
              <div className="galleryImgContainer">
                <img
                  src={w.imageUrl}
                  alt={w.name}
                  className="galleryImg"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/gacha/placeholder.png'; }}
                />
                {!isUnlocked && <div className="lockedText">?</div>}
                {isUnlocked && (
                  <div
                    className="cardRarityBadge"
                    style={{
                      backgroundColor: rarityConf.color,
                      zoom: 0.7,
                      top: 0,
                      left: 0,
                      borderTopLeftRadius: 0,
                      borderBottomRightRadius: "8px",
                    }}
                  >
                    {rarityConf.label}
                  </div>
                )}
              </div>
              <div className="galleryNameContainer">
                <span className="galleryName">{isUnlocked ? w.name : "???"}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Wiki Modal */}
      <AnimatePresence>
        {selectedWiki && (
          <div className="wikiOverlay" onClick={() => setSelectedWiki(null)}>
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="wikiModal"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="wikiCloseBtn" onClick={() => setSelectedWiki(null)}>
                <X size={24} />
              </button>

              <div className="wikiLeft">
                <img
                  src={selectedWiki.imageUrl}
                  alt={selectedWiki.name}
                  className="wikiPortrait"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/gacha/placeholder.png'; }}
                />
                <div
                  className="cardRarityBadge"
                  style={{
                    backgroundColor: RARITY_CONFIG[selectedWiki.rarity].color,
                    top: 16,
                    left: 16,
                    fontSize: "1.2rem",
                    padding: "8px 16px",
                  }}
                >
                  {RARITY_CONFIG[selectedWiki.rarity].label}
                </div>
              </div>

              <div className="wikiRight">
                <div className="wikiSeries">{selectedWiki.series}</div>
                <h3 className="wikiName">{selectedWiki.name}</h3>

                <div className="wikiLoreBox">
                  <p className="wikiLoreText">
                    {getWaifuLore(selectedWiki.name, selectedWiki.series, selectedWiki.rarity).description}
                  </p>
                  
                  <div className="wikiBioGrid">
                    <div className="wikiBioItem">
                      <span className="wikiBioLabel">Umur</span>
                      <span className="wikiBioValue">{getWaifuLore(selectedWiki.name, selectedWiki.series, selectedWiki.rarity).age}</span>
                    </div>
                    <div className="wikiBioItem">
                      <span className="wikiBioLabel">Tinggi Badan</span>
                      <span className="wikiBioValue">{getWaifuLore(selectedWiki.name, selectedWiki.series, selectedWiki.rarity).height}</span>
                    </div>
                    <div className="wikiBioItem">
                      <span className="wikiBioLabel">Berat Badan</span>
                      <span className="wikiBioValue">{getWaifuLore(selectedWiki.name, selectedWiki.series, selectedWiki.rarity).weight}</span>
                    </div>
                    <div className="wikiBioItem">
                      <span className="wikiBioLabel">Hobi Utama</span>
                      <span className="wikiBioValue">{getWaifuLore(selectedWiki.name, selectedWiki.series, selectedWiki.rarity).hobby}</span>
                    </div>
                  </div>
                </div>

                <div className="wikiStatsTitle">Combat Statistics</div>
                <div className="wikiStatsGrid">
                  <div className="statCard">
                    <div className="statLabel">Max Health (HP)</div>
                    <div className="statValue" style={{ color: "#22c55e" }}>
                      {getBaseStats(selectedWiki.rarity).maxHp}
                    </div>
                  </div>
                  <div className="statCard">
                    <div className="statLabel">Base Attack</div>
                    <div className="statValue" style={{ color: "#ef4444" }}>
                      {getBaseStats(selectedWiki.rarity).atkMin} - {getBaseStats(selectedWiki.rarity).atkMax}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
