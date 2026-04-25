"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WAIFU_POOL, RARITY_CONFIG, WaifuCharacter, getBaseStats, FighterStats } from "./gachaData";
import "./WaifuArena.css";

interface ArenaProps {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

interface CollectedWaifu {
  character: WaifuCharacter;
  count: number;
  isNew: boolean;
}

type BattleState = "select" | "fighting" | "victory" | "defeat";

const getReward = (rarity: string): number => {
  switch (rarity) {
    case "legendary": return 2500;
    case "epic": return 800;
    case "rare": return 250;
    case "common": default: return 100;
  }
};

export default function WaifuArena({ score, setScore }: ArenaProps) {
  const [collection, setCollection] = useState<CollectedWaifu[]>([]);
  const [selectedFighter, setSelectedFighter] = useState<CollectedWaifu | null>(null);
  const [opponent, setOpponent] = useState<WaifuCharacter | null>(null);
  const [battleState, setBattleState] = useState<BattleState>("select");
  
  // Fight states
  const [playerStats, setPlayerStats] = useState<FighterStats | null>(null);
  const [enemyStats, setEnemyStats] = useState<FighterStats | null>(null);
  const [animState, setAnimState] = useState<"idle" | "playerHit" | "enemyHit">("idle");
  const [dmgText, setDmgText] = useState<{ p?: number, e?: number }>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const filteredCollection = collection.filter(cw => cw.character.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const totalPages = Math.max(1, Math.ceil(filteredCollection.length / itemsPerPage));
  const displayedCollection = filteredCollection.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("gacha_collection_arknights");
      if (saved) {
        const parsed: [string, CollectedWaifu][] = JSON.parse(saved);
        const chars: CollectedWaifu[] = parsed.map(([_, val]) => {
          // fetch fresh data to avoid stale urls
          const charData = WAIFU_POOL.find((w) => w.id === val.character.id) || val.character;
          return { ...val, character: charData };
        });
        setCollection(chars);
      }
    } catch {
      // ignore
    }
  }, []);

  const startFight = () => {
    if (!selectedFighter) return;
    
    // Pick random opponent
    const randomIdx = Math.floor(Math.random() * WAIFU_POOL.length);
    const opp = WAIFU_POOL[randomIdx];
    setOpponent(opp);
    
    setPlayerStats(getBaseStats(selectedFighter.character.rarity));
    setEnemyStats(getBaseStats(opp.rarity));
    setBattleState("fighting");
    setDmgText({});

    // Deduct 1 from collection and localstorage
    setCollection((prev) => {
      const newCol = prev.map(cw => {
        if (cw.character.id === selectedFighter.character.id) {
          return { ...cw, count: cw.count - 1 };
        }
        return cw;
      }).filter(cw => cw.count > 0);
      
      const saved = localStorage.getItem("gacha_collection_arknights");
      if (saved) {
        try {
          const parsed: [string, CollectedWaifu][] = JSON.parse(saved);
          const map = new Map(parsed);
          const existing = map.get(selectedFighter.character.id);
          if (existing) {
            existing.count -= 1;
            if (existing.count <= 0) {
              map.delete(selectedFighter.character.id);
            }
            localStorage.setItem("gacha_collection_arknights", JSON.stringify(Array.from(map.entries())));
          }
        } catch(e){}
      }
      return newCol;
    });
  };

  const executeTurn = () => {
    if (battleState !== "fighting" || !playerStats || !enemyStats) return;

    // Player attacks first
    const pDmg = Math.floor(Math.random() * (playerStats.atkMax - playerStats.atkMin + 1)) + playerStats.atkMin;
    let newEnemyHp = Math.max(0, enemyStats.hp - pDmg);
    
    setEnemyStats({ ...enemyStats, hp: newEnemyHp });
    setAnimState("enemyHit");
    setDmgText({ e: pDmg });
    
    setTimeout(() => {
      setAnimState("idle");
      setDmgText({});
      
      if (newEnemyHp <= 0) {
        endBattle("victory");
        return;
      }
      
      // Enemy attacks
      const eDmg = Math.floor(Math.random() * (enemyStats.atkMax - enemyStats.atkMin + 1)) + enemyStats.atkMin;
      let newPlayerHp = Math.max(0, playerStats.hp - eDmg);
      
      setPlayerStats(prev => prev ? { ...prev, hp: newPlayerHp } : null);
      setAnimState("playerHit");
      setDmgText({ p: eDmg });
      
      setTimeout(() => {
        setAnimState("idle");
        setDmgText({});
        if (newPlayerHp <= 0) {
          endBattle("defeat");
        }
      }, 500);

    }, 500);
  };

  const endBattle = (result: "victory" | "defeat") => {
    setBattleState(result);
    if (result === "victory" && opponent) {
      const reward = getReward(opponent.rarity);
      setScore(prev => prev + reward);
    }
  };

  const resetArena = () => {
    setBattleState("select");
    setSelectedFighter(null);
    setOpponent(null);
    setPlayerStats(null);
    setEnemyStats(null);
  };

  if (collection.length === 0) {
    return (
      <div className="arenaContainer" style={{ textAlign: "center", padding: "64px 20px" }}>
        <h2 className="arenaSelectTitle">Arena Terkunci</h2>
        <p className="arenaSelectDesc">Anda belum memiliki Waifu satupun. Silakan melakukan Gacha terlebih dahulu!</p>
      </div>
    );
  }

  return (
    <div className="arenaContainer">
      {battleState === "select" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="arenaSelectHeader">
          <h2 className="arenaSelectTitle">Pilih Petarungmu</h2>
          <p className="arenaSelectDesc">Operator dengan Rarity lebih tinggi memiliki stat lebih kuat.</p>
          
          <div className="arenaControls" style={{ display: 'flex', gap: '10px', marginTop: '20px', alignItems: 'center', maxWidth: '500px', margin: '20px auto 0' }}>
            <input 
              type="text" 
              placeholder="Cari Operator..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white', flex: 1, outline: 'none' }}
            />
            <div className="pagination" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
                disabled={currentPage === 1}
                style={{ padding: '8px 14px', background: currentPage === 1 ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '6px', color: currentPage === 1 ? '#666' : 'white', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', fontWeight: 'bold', transition: 'all 0.2s' }}
              >
                &lt;
              </button>
              <span style={{ color: 'rgba(255,255,255,0.8)', minWidth: '40px', textAlign: 'center', fontSize: '0.9rem' }}>{currentPage} / {totalPages}</span>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
                disabled={currentPage === totalPages}
                style={{ padding: '8px 14px', background: currentPage === totalPages ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '6px', color: currentPage === totalPages ? '#666' : 'white', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', fontWeight: 'bold', transition: 'all 0.2s' }}
              >
                &gt;
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {battleState === "select" ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="arenaRoster">
          {displayedCollection.map((cw, idx) => {
            const w = cw.character;
            return (
            <div 
              key={idx} 
              className={`arenaFighterCard ${selectedFighter?.character.id === w.id ? 'selected' : selectedFighter ? 'unselected' : ''}`}
              style={{ '--glow-color': RARITY_CONFIG[w.rarity].glowColor } as React.CSSProperties}
              onClick={() => setSelectedFighter(cw)}
            >
              <img src={w.imageUrl} className="arenaFighterImg" alt={w.name} />
              <div 
                className="cardRarityBadge"
                style={{ backgroundColor: RARITY_CONFIG[w.rarity].color, zoom: 0.8, top: 0, left: 0, borderTopLeftRadius: 0, borderBottomRightRadius: "8px" }}
              >
                {RARITY_CONFIG[w.rarity].label}
              </div>
              <div style={{ position: "absolute", top: 0, right: 0, background: "rgba(0,0,0,0.8)", padding: "4px 8px", color: "white", fontSize: "0.8rem", fontWeight: "bold" }}>
                x{cw.count}
              </div>
              <div className="arenaFighterOverlay">
                <span className="arenaFighterName">{w.name}</span>
              </div>
            </div>
          )})}
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="battleStage">
          {/* Player Side */}
          <div className="fighterSide">
            <div className={`fighterPortrait ${animState === "playerHit" ? "hitAnimLeft" : ""}`}>
              <img src={selectedFighter?.character.imageUrl} alt={selectedFighter?.character.name} />
              <AnimatePresence>
                {dmgText.p && <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="dmgText">-{dmgText.p}</motion.span>}
              </AnimatePresence>
            </div>
            <div className="fighterInfo">
              <div className="fighterName">{selectedFighter?.character.name}</div>
              <div className="hpBarContainer">
                <div className={`hpBarFill ${(playerStats?.hp || 0) < (playerStats?.maxHp || 1) * 0.3 ? 'critical' : (playerStats?.hp || 0) < (playerStats?.maxHp || 1) * 0.6 ? 'low' : ''}`} style={{ width: `${((playerStats?.hp || 0) / (playerStats?.maxHp || 1)) * 100}%` }} />
              </div>
              <div className="hpText">{playerStats?.hp || 0} / {playerStats?.maxHp || 0} HP</div>
            </div>
          </div>

          <div className="vsBadge">VS</div>

          {/* Enemy Side */}
          <div className="fighterSide">
            <div className={`fighterPortrait ${animState === "enemyHit" ? "hitAnimRight" : ""}`}>
              <img src={opponent?.imageUrl} alt={opponent?.name} />
              <AnimatePresence>
                {dmgText.e && <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="dmgText">-{dmgText.e}</motion.span>}
              </AnimatePresence>
            </div>
            <div className="fighterInfo">
              <div className="fighterName">{opponent?.name}</div>
              <div className="hpBarContainer">
                <div className={`hpBarFill ${(enemyStats?.hp || 0) < (enemyStats?.maxHp || 1) * 0.3 ? 'critical' : (enemyStats?.hp || 0) < (enemyStats?.maxHp || 1) * 0.6 ? 'low' : ''}`} style={{ width: `${((enemyStats?.hp || 0) / (enemyStats?.maxHp || 1)) * 100}%` }} />
              </div>
              <div className="hpText">{enemyStats?.hp || 0} / {enemyStats?.maxHp || 0} HP</div>
            </div>
          </div>

          {/* Result Overlay */}
          <AnimatePresence>
            {(battleState === "victory" || battleState === "defeat") && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="battleResultOverlay">
                <h2 className={`resultTitle ${battleState}`}>{battleState === "victory" ? "VICTORY!" : "DEFEAT"}</h2>
                {battleState === "victory" && (
                  <div className="rewardBox">+{getReward(opponent!.rarity)} Pts</div>
                )}
                <button className="actionBtn" onClick={resetArena}>Kembali ke Menu</button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {battleState === "select" ? (
        <div className="battleControls">
          <button 
            className="actionBtn" 
            disabled={!selectedFighter}
            onClick={startFight}
          >
            FIGHT!
          </button>
        </div>
      ) : (
        <div className="battleControls">
          {battleState === "fighting" && (
            <button className="actionBtn" onClick={executeTurn} disabled={animState !== "idle"}>
              ATTACK
            </button>
          )}
        </div>
      )}
    </div>
  );
}
