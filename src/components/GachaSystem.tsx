"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  WaifuCharacter,
  Rarity,
  RARITY_CONFIG,
  GACHA_CONFIG,
  WAIFU_POOL,
  pullGacha,
} from "./gachaData";

interface GachaSystemProps {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

interface CollectedWaifu {
  character: WaifuCharacter;
  count: number;
  isNew: boolean;
}

type FilterType = "all" | Rarity;

export default function GachaSystem({ score, setScore }: GachaSystemProps) {
  const [collection, setCollection] = useState<Map<string, CollectedWaifu>>(new Map());
  const [pityCounter, setPityCounter] = useState(0);
  const [totalPulls, setTotalPulls] = useState(0);
  const [revealCards, setRevealCards] = useState<{ character: WaifuCharacter; isNew: boolean }[]>([]);
  const [isRevealing, setIsRevealing] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const [imgErrors, setImgErrors] = useState<Set<string>>(new Set());
  const [selectedCard, setSelectedCard] = useState<CollectedWaifu | null>(null);
  const [filter, setFilter] = useState<FilterType>("all");
  const [showRates, setShowRates] = useState(false);

  // Load collection from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("gacha_collection_arknights");
      const savedPity = localStorage.getItem("gacha_pity");
      const savedPulls = localStorage.getItem("gacha_total_pulls");
      if (saved) {
        const parsed: [string, CollectedWaifu][] = JSON.parse(saved);
        const map = new Map<string, CollectedWaifu>();
        parsed.forEach(([key, val]) => {
          // Use fresh data from WAIFU_POOL to ensure updated URLs are applied
          const freshChar = WAIFU_POOL.find((w) => w.id === val.character.id) || val.character;
          map.set(key, { ...val, character: freshChar, isNew: false });
        });
        setCollection(map);
      }
      if (savedPity) setPityCounter(parseInt(savedPity, 10));
      if (savedPulls) setTotalPulls(parseInt(savedPulls, 10));
    } catch {
      // ignore
    }
  }, []);

  // Save collection
  useEffect(() => {
    if (collection.size > 0) {
      localStorage.setItem("gacha_collection_arknights", JSON.stringify(Array.from(collection.entries())));
      localStorage.setItem("gacha_pity", pityCounter.toString());
      localStorage.setItem("gacha_total_pulls", totalPulls.toString());
    }
  }, [collection, pityCounter, totalPulls]);

  const addToCollection = useCallback((characters: WaifuCharacter[]) => {
    setCollection((prev) => {
      const next = new Map(prev);
      characters.forEach((char) => {
        const existing = next.get(char.id);
        if (existing) {
          next.set(char.id, { ...existing, count: existing.count + 1, isNew: false });
        } else {
          next.set(char.id, { character: char, count: 1, isNew: true });
        }
      });
      return next;
    });
  }, []);

  const doPull = useCallback((count: number) => {
    const cost = count === 1 ? GACHA_CONFIG.singleCost : GACHA_CONFIG.multiCost;
    if (score < cost || isPulling) return;

    setIsPulling(true);
    setScore((s) => s - cost);

    const results: WaifuCharacter[] = [];
    let currentPity = pityCounter;

    for (let i = 0; i < count; i++) {
      const char = pullGacha(currentPity);
      results.push(char);
      if (char.rarity === "epic" || char.rarity === "legendary") {
        currentPity = 0;
      } else {
        currentPity++;
      }
    }

    setPityCounter(currentPity);
    setTotalPulls((p) => p + count);

    // Set up reveal
    setRevealCards(
      results.map((char) => ({
        character: char,
        isNew: !collection.has(char.id),
      }))
    );
    setIsRevealing(true);
    addToCollection(results);

    setTimeout(() => {
      setIsPulling(false);
    }, 500); // Quick unlock
  }, [score, pityCounter, collection, setScore, addToCollection, isPulling]);

  const handleImgError = (id: string) => {
    setImgErrors((prev) => new Set(prev).add(id));
  };

  const closeReveal = () => {
    setIsRevealing(false);
    setTimeout(() => setRevealCards([]), 300); // Wait for exit animation
  };

  const getInitial = (name: string) => name.substring(0, 2).toUpperCase();

  const canPullSingle = score >= GACHA_CONFIG.singleCost;
  const canPullMulti = score >= GACHA_CONFIG.multiCost;

  // Sorting and Stats
  const rarityOrder = { legendary: 0, epic: 1, rare: 2, common: 3 };
  const sortedCollection = Array.from(collection.values())
    .filter((entry) => filter === "all" || entry.character.rarity === filter)
    .sort(
      (a, b) =>
        rarityOrder[a.character.rarity] - rarityOrder[b.character.rarity] ||
        a.character.name.localeCompare(b.character.name)
    );

  const uniqueCount = collection.size;
  const totalCount = WAIFU_POOL.length;

  const countByRarity = (r: Rarity) => Array.from(collection.values()).filter((e) => e.character.rarity === r).length;
  const totalByRarity = (r: Rarity) => WAIFU_POOL.filter((w) => w.rarity === r).length;

  return (
    <div className="gachaDashboard">
      {/* Removed gachaHeader */}

      <div className="gachaBody">
        {/* Left/Top: Action Area */}
        <div className="gachaSummonArea">
          <div className="summonCard">
            <div className="summonInfo">
              <h3 className="summonTitle">Standard Banner</h3>
              <p className="summonDesc">Summon legendary anime waifus with your earned points.</p>
            </div>
            <div className="summonActions">
              <button
                className={`pullBtn pullBtnSingle ${isPulling ? "disabled" : ""}`}
                disabled={!canPullSingle || isPulling}
                onClick={() => doPull(1)}
              >
                <span className="pullBtnText">
                  Pull ×1
                  <span className="pullBtnCost">{GACHA_CONFIG.singleCost} pts</span>
                </span>
              </button>
              <button
                className={`pullBtn pullBtnMulti ${isPulling ? "disabled" : ""}`}
                disabled={!canPullMulti || isPulling}
                onClick={() => doPull(GACHA_CONFIG.multiCount)}
              >
                <span className="pullBtnText">
                  Pull ×10
                  <span className="pullBtnCost">{GACHA_CONFIG.multiCost} pts</span>
                </span>
              </button>
            </div>
            <button className="ratesTextBtn" onClick={() => setShowRates(!showRates)}>
              {showRates ? "Hide Drop Rates" : "View Drop Rates"}
            </button>
          </div>

          {/* Rates Expandable Panel */}
          <AnimatePresence>
            {showRates && (
              <motion.div
                className="ratesSheet"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
              >
                <div className="ratesSheetGrid">
                  <div className="rateRow" style={{ paddingBottom: "12px", borderBottom: "1px solid var(--border-color)", marginBottom: "8px" }}>
                    <div className="rateRowInfo">
                      <span className="rateRowLabel" style={{ fontWeight: 700, color: "var(--text-primary)" }}>🎯 Pity (Guaranteed Legendary)</span>
                    </div>
                    <div className="rateRowStats">
                      <span className="rateRowCollected" style={{ fontWeight: 600 }}>{pityCounter}/{GACHA_CONFIG.pityThreshold}</span>
                    </div>
                  </div>
                  {(["legendary", "epic", "rare", "common"] as Rarity[]).map((r) => (
                    <div key={r} className="rateRow">
                      <div className="rateRowInfo">
                        <div className="rateRowDot" style={{ background: RARITY_CONFIG[r].color }} />
                        <span className="rateRowLabel">{RARITY_CONFIG[r].label}</span>
                      </div>
                      <div className="rateRowStats">
                        <span className="rateRowPercent">{(RARITY_CONFIG[r].rate * 100).toFixed(0)}%</span>
                        <span className="rateRowCollected">{countByRarity(r)}/{totalByRarity(r)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right/Bottom: Collection Area */}
        <div className="gachaCollectionArea">
          <div className="collectionHeader">
            <h3 className="collectionHeading">Your Collection ({uniqueCount}/{totalCount})</h3>
            <div className="collectionFiltersScroll">
              <button className={`filterChip ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>All</button>
              {(["legendary", "epic", "rare", "common"] as Rarity[]).map((r) => (
                <button
                  key={r}
                  className={`filterChip ${filter === r ? "active" : ""}`}
                  style={filter === r ? { background: `${RARITY_CONFIG[r].color}1A`, color: RARITY_CONFIG[r].color, borderColor: RARITY_CONFIG[r].color } : {}}
                  onClick={() => setFilter(r)}
                >
                  {RARITY_CONFIG[r].label}
                </button>
              ))}
            </div>
          </div>

          <div className="collectionCarouselWrapper">
            {sortedCollection.length === 0 ? (
              <div className="emptyCollection">
                No characters found. Time to pull!
              </div>
            ) : (
              <div className="collectionCarousel">
                {sortedCollection.map((entry) => (
                  <motion.div
                    key={entry.character.id}
                    className="carouselCard"
                    layoutId={`card-${entry.character.id}`}
                    onClick={() => setSelectedCard(entry)}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="carouselCardImage" style={{ background: RARITY_CONFIG[entry.character.rarity].bgGradient }}>
                      {imgErrors.has(entry.character.id) ? (
                         <div className="waifuFallback">{getInitial(entry.character.name)}</div>
                      ) : (
                        <img src={entry.character.imageUrl} loading="lazy" referrerPolicy="no-referrer" alt={entry.character.name} onError={() => handleImgError(entry.character.id)} />
                      )}
                      <div 
                        className="cardRarityBadge"
                        style={{ backgroundColor: RARITY_CONFIG[entry.character.rarity].color }}
                      >
                        {RARITY_CONFIG[entry.character.rarity].label}
                      </div>
                      <div className="carouselCardOverlay">
                        <span className="carouselCardName">{entry.character.name}</span>
                      </div>
                    </div>
                    {entry.count > 1 && <div className="carouselBadge">×{entry.count}</div>}
                    {entry.isNew && <div className="newBadge">NEW</div>}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modern Bottom Sheet / Centered Modal for Reveals */}
      <AnimatePresence>
        {isRevealing && (
          <motion.div
            className="revealOverlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeReveal}
          >
            <motion.div
              className="revealSheet"
              initial={{ y: "100%", opacity: 0.5 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="revealDragHandle" onClick={closeReveal} />
              <h2 className="revealSheetTitle">Summon Results</h2>
              <div className="revealSheetGrid">
                {revealCards.map((c, idx) => (
                  <motion.div
                    key={idx}
                    className="revealItem"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: idx * 0.08, duration: 0.3 }}
                  >
                    <div className="revealItemImage" style={{ background: RARITY_CONFIG[c.character.rarity].bgGradient }}>
                      {imgErrors.has(c.character.id) ? (
                        <div className="waifuFallback">{getInitial(c.character.name)}</div>
                      ) : (
                        <img src={c.character.imageUrl} referrerPolicy="no-referrer" alt={c.character.name} onError={() => handleImgError(c.character.id)} />
                      )}
                      <div 
                        className="cardRarityBadge"
                        style={{ backgroundColor: RARITY_CONFIG[c.character.rarity].color }}
                      >
                        {RARITY_CONFIG[c.character.rarity].label}
                      </div>
                    </div>
                    {c.isNew && <div className="newPill">New</div>}
                  </motion.div>
                ))}
              </div>
              <button className="revealSheetDoneBtn" onClick={closeReveal}>Continue</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clean Dialog for Character Detail */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            className="dialogOverlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCard(null)}
          >
            <motion.div
              className="dialogContent"
              layoutId={`card-${selectedCard.character.id}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="dialogImage" style={{ background: RARITY_CONFIG[selectedCard.character.rarity].bgGradient }}>
                {imgErrors.has(selectedCard.character.id) ? (
                   <div className="waifuFallback large">{getInitial(selectedCard.character.name)}</div>
                ) : (
                   <img src={selectedCard.character.imageUrl} referrerPolicy="no-referrer" alt={selectedCard.character.name} />
                )}
              </div>
              <div className="dialogInfo">
                <div className="dialogTags">
                  <span className="dialogTag" style={{ background: `${RARITY_CONFIG[selectedCard.character.rarity].color}1A`, color: RARITY_CONFIG[selectedCard.character.rarity].color }}>
                    {RARITY_CONFIG[selectedCard.character.rarity].label}
                  </span>
                  <span className="dialogTag secondary">Owned: {selectedCard.count}</span>
                </div>
                <h3 className="dialogName">{selectedCard.character.name}</h3>
                <p className="dialogSeries">{selectedCard.character.series}</p>
                
                <div className="dialogActions">
                  <a href={`https://www.anime-planet.com/characters/${selectedCard.character.id}`} target="_blank" rel="noopener noreferrer" className="dialogLinkBtn">
                    View Anime-Planet Profile
                  </a>
                  <button className="dialogCloseBtn" onClick={() => setSelectedCard(null)}>Close</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
