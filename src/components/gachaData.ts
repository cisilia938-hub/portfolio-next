export type Rarity = "common" | "rare" | "epic" | "legendary";

export interface WaifuCharacter {
  id: string;
  name: string;
  series: string;
  rarity: Rarity;
  imageUrl: string;
  color: string; // accent color for card glow
}

export interface FighterStats {
  maxHp: number;
  hp: number;
  atkMin: number;
  atkMax: number;
}

export const getBaseStats = (rarity: string): FighterStats => {
  switch (rarity) {
    case "legendary": return { maxHp: 400, hp: 400, atkMin: 60, atkMax: 100 };
    case "epic": return { maxHp: 250, hp: 250, atkMin: 35, atkMax: 60 };
    case "rare": return { maxHp: 150, hp: 150, atkMin: 20, atkMax: 35 };
    case "common": default: return { maxHp: 100, hp: 100, atkMin: 10, atkMax: 20 };
  }
};

export interface WaifuLore {
  description: string;
  age: string;
  height: string;
  weight: string;
  hobby: string;
}

const seededRandom = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const x = Math.sin(hash++) * 10000;
  return x - Math.floor(x);
};

export const getWaifuLore = (name: string, series: string, rarity: Rarity): WaifuLore => {
  const rand = seededRandom(name);
  
  let age = "Rahasia";
  let height = `${Math.floor(seededRandom(name + "h") * 35) + 145} cm`;
  let weight = "Rahasia";
  
  const hobbiesList = ["Berlatih", "Membaca", "Berpatroli", "Menyusun Strategi", "Istirahat", "Menyelidiki", "Merawat Perlengkapan"];
  let hobby = hobbiesList[Math.floor(seededRandom(name + "hb") * hobbiesList.length)];

  let desc = "";
  if (rarity === "legendary") desc = `${name} adalah operator Elite dari Rhodes Island. Memiliki rekam jejak pertempuran yang luar biasa dan dedikasi tinggi.`;
  else if (rarity === "epic") desc = `${name} adalah operator senior yang dapat diandalkan dalam berbagai misi kritis.`;
  else if (rarity === "rare") desc = `${name} adalah operator yang sedang berkembang dengan potensi besar di medan perang.`;
  else desc = `${name} adalah operator rekrutan baru yang siap membantu Rhodes Island.`;

  return {
    description: desc,
    age,
    height,
    weight,
    hobby
  };
};

export const RARITY_CONFIG: Record<
  Rarity,
  { label: string; stars: number; color: string; bgGradient: string; rate: number; glowColor: string }
> = {
  common: {
    label: "Common",
    stars: 1,
    color: "#9CA3AF",
    bgGradient: "linear-gradient(135deg, #374151, #1F2937)",
    rate: 0.50,
    glowColor: "rgba(156, 163, 175, 0.3)",
  },
  rare: {
    label: "Rare",
    stars: 2,
    color: "#60A5FA",
    bgGradient: "linear-gradient(135deg, #1E3A5F, #1E40AF)",
    rate: 0.30,
    glowColor: "rgba(96, 165, 250, 0.4)",
  },
  epic: {
    label: "Epic",
    stars: 3,
    color: "#A78BFA",
    bgGradient: "linear-gradient(135deg, #4C1D95, #7C3AED)",
    rate: 0.15,
    glowColor: "rgba(167, 139, 250, 0.5)",
  },
  legendary: {
    label: "Legendary",
    stars: 5,
    color: "#FBBF24",
    bgGradient: "linear-gradient(135deg, #92400E, #F59E0B)",
    rate: 0.05,
    glowColor: "rgba(251, 191, 36, 0.6)",
  },
};

// All characters sourced from https://www.anime-planet.com/characters/all
// Images use CDN URLs for reliable loading
export const WAIFU_POOL: WaifuCharacter[] = [
  {
    "id": "zima-the-raging-tide",
    "name": "Zima the Raging Tide",
    "series": "Arknights - Guard",
    "rarity": "legendary",
    "imageUrl": "/gacha/zima-the-raging-tide.webp",
    "color": "#FF9800"
  },
  {
    "id": "bellone",
    "name": "Bellone",
    "series": "Arknights - Guard",
    "rarity": "legendary",
    "imageUrl": "/gacha/bellone.webp",
    "color": "#FF9800"
  },
  {
    "id": "wang",
    "name": "Wang",
    "series": "Arknights - Specialist",
    "rarity": "legendary",
    "imageUrl": "/gacha/wang.webp",
    "color": "#FF9800"
  },
  {
    "id": "chen-the-dawnstreak",
    "name": "Ch'en the Dawnstreak",
    "series": "Arknights - Guard",
    "rarity": "legendary",
    "imageUrl": "/gacha/chen-the-dawnstreak.webp",
    "color": "#FF9800"
  },
  {
    "id": "titi",
    "name": "Titi",
    "series": "Arknights - Medic",
    "rarity": "legendary",
    "imageUrl": "/gacha/titi.webp",
    "color": "#FF9800"
  },
  {
    "id": "nasti",
    "name": "Nasti",
    "series": "Arknights - Supporter",
    "rarity": "legendary",
    "imageUrl": "/gacha/nasti.webp",
    "color": "#FF9800"
  },
  {
    "id": "silverash-the-reignfrost",
    "name": "SilverAsh the Reignfrost",
    "series": "Arknights - Vanguard",
    "rarity": "legendary",
    "imageUrl": "/gacha/silverash-the-reignfrost.webp",
    "color": "#FF9800"
  },
  {
    "id": "pramanix-the-prerita",
    "name": "Pramanix the Prerita",
    "series": "Arknights - Caster",
    "rarity": "legendary",
    "imageUrl": "/gacha/pramanix-the-prerita.webp",
    "color": "#FF9800"
  },
  {
    "id": "astgenne-the-lightchaser",
    "name": "Astgenne the Lightchaser",
    "series": "Arknights - Supporter",
    "rarity": "legendary",
    "imageUrl": "/gacha/astgenne-the-lightchaser.webp",
    "color": "#FF9800"
  },
  {
    "id": "mantra",
    "name": "Mantra",
    "series": "Arknights - Caster",
    "rarity": "legendary",
    "imageUrl": "/gacha/mantra.webp",
    "color": "#FF9800"
  },
  {
    "id": "sakiko-togawa",
    "name": "Sakiko Togawa",
    "series": "Arknights - Guard",
    "rarity": "legendary",
    "imageUrl": "/gacha/sakiko-togawa.webp",
    "color": "#FF9800"
  },
  {
    "id": "hoshiguma-the-breacher",
    "name": "Hoshiguma the Breacher",
    "series": "Arknights - Defender",
    "rarity": "legendary",
    "imageUrl": "/gacha/hoshiguma-the-breacher.webp",
    "color": "#FF9800"
  },
  {
    "id": "haruka",
    "name": "Haruka",
    "series": "Arknights - Supporter",
    "rarity": "legendary",
    "imageUrl": "/gacha/haruka.webp",
    "color": "#FF9800"
  },
  {
    "id": "raidian",
    "name": "Raidian",
    "series": "Arknights - Supporter",
    "rarity": "legendary",
    "imageUrl": "/gacha/raidian.webp",
    "color": "#FF9800"
  },
  {
    "id": "leizi-the-thunderbringer",
    "name": "Leizi the Thunderbringer",
    "series": "Arknights - Guard",
    "rarity": "legendary",
    "imageUrl": "/gacha/leizi-the-thunderbringer.webp",
    "color": "#FF9800"
  },
  {
    "id": "tragodia",
    "name": "Tragodia",
    "series": "Arknights - Supporter",
    "rarity": "legendary",
    "imageUrl": "/gacha/tragodia.webp",
    "color": "#FF9800"
  },
  {
    "id": "exusiai-the-new-covenant",
    "name": "Exusiai the New Covenant",
    "series": "Arknights - Specialist",
    "rarity": "legendary",
    "imageUrl": "/gacha/exusiai-the-new-covenant.webp",
    "color": "#FF9800"
  },
  {
    "id": "lemuen",
    "name": "Lemuen",
    "series": "Arknights - Sniper",
    "rarity": "legendary",
    "imageUrl": "/gacha/lemuen.webp",
    "color": "#FF9800"
  },
  {
    "id": "sankta-miksaparato",
    "name": "Sankta Miksaparato",
    "series": "Arknights - Defender",
    "rarity": "legendary",
    "imageUrl": "/gacha/sankta-miksaparato.webp",
    "color": "#FF9800"
  },
  {
    "id": "mon3tr",
    "name": "Mon3tr",
    "series": "Arknights - Medic",
    "rarity": "legendary",
    "imageUrl": "/gacha/mon3tr.webp",
    "color": "#FF9800"
  },
  {
    "id": "necrass",
    "name": "Necrass",
    "series": "Arknights - Caster",
    "rarity": "legendary",
    "imageUrl": "/gacha/necrass.webp",
    "color": "#FF9800"
  },
  {
    "id": "entelechia",
    "name": "Entelechia",
    "series": "Arknights - Guard",
    "rarity": "legendary",
    "imageUrl": "/gacha/entelechia.webp",
    "color": "#FF9800"
  },
  {
    "id": "yu",
    "name": "Yu",
    "series": "Arknights - Defender",
    "rarity": "legendary",
    "imageUrl": "/gacha/yu.webp",
    "color": "#FF9800"
  },
  {
    "id": "blaze-the-igniting-spark",
    "name": "Blaze the Igniting Spark",
    "series": "Arknights - Caster",
    "rarity": "legendary",
    "imageUrl": "/gacha/blaze-the-igniting-spark.webp",
    "color": "#FF9800"
  },
  {
    "id": "thorns-the-lodestar",
    "name": "Thorns the Lodestar",
    "series": "Arknights - Specialist",
    "rarity": "legendary",
    "imageUrl": "/gacha/thorns-the-lodestar.webp",
    "color": "#FF9800"
  },
  {
    "id": "lappland-the-decadenza",
    "name": "Lappland the Decadenza",
    "series": "Arknights - Caster",
    "rarity": "legendary",
    "imageUrl": "/gacha/lappland-the-decadenza.webp",
    "color": "#FF9800"
  },
  {
    "id": "vulpisfoglia",
    "name": "Vulpisfoglia",
    "series": "Arknights - Vanguard",
    "rarity": "legendary",
    "imageUrl": "/gacha/vulpisfoglia.webp",
    "color": "#FF9800"
  },
  {
    "id": "crownslayer",
    "name": "Crownslayer",
    "series": "Arknights - Specialist",
    "rarity": "legendary",
    "imageUrl": "/gacha/crownslayer.webp",
    "color": "#FF9800"
  },
  {
    "id": "vina-victoria",
    "name": "Vina Victoria",
    "series": "Arknights - Guard",
    "rarity": "legendary",
    "imageUrl": "/gacha/vina-victoria.webp",
    "color": "#FF9800"
  },
  {
    "id": "marcille",
    "name": "Marcille",
    "series": "Arknights - Caster",
    "rarity": "legendary",
    "imageUrl": "/gacha/marcille.webp",
    "color": "#FF9800"
  },
  {
    "id": "pepe",
    "name": "Pepe",
    "series": "Arknights - Guard",
    "rarity": "legendary",
    "imageUrl": "/gacha/pepe.webp",
    "color": "#FF9800"
  },
  {
    "id": "narantuya",
    "name": "Narantuya",
    "series": "Arknights - Sniper",
    "rarity": "legendary",
    "imageUrl": "/gacha/narantuya.webp",
    "color": "#FF9800"
  },
  {
    "id": "nymph",
    "name": "Nymph",
    "series": "Arknights - Caster",
    "rarity": "legendary",
    "imageUrl": "/gacha/nymph.webp",
    "color": "#FF9800"
  },
  {
    "id": "ulpianus",
    "name": "Ulpianus",
    "series": "Arknights - Guard",
    "rarity": "legendary",
    "imageUrl": "/gacha/ulpianus.webp",
    "color": "#FF9800"
  },
  {
    "id": "wisadel",
    "name": "Wi\u0161'adel",
    "series": "Arknights - Sniper",
    "rarity": "legendary",
    "imageUrl": "/gacha/wisadel.webp",
    "color": "#FF9800"
  },
  {
    "id": "logos",
    "name": "Logos",
    "series": "Arknights - Caster",
    "rarity": "legendary",
    "imageUrl": "/gacha/logos.webp",
    "color": "#FF9800"
  },
  {
    "id": "civilight-eterna",
    "name": "Civilight Eterna",
    "series": "Arknights - Supporter",
    "rarity": "legendary",
    "imageUrl": "/gacha/civilight-eterna.webp",
    "color": "#FF9800"
  },
  {
    "id": "ascalon",
    "name": "Ascalon",
    "series": "Arknights - Specialist",
    "rarity": "legendary",
    "imageUrl": "/gacha/ascalon.webp",
    "color": "#FF9800"
  },
  {
    "id": "ela",
    "name": "Ela",
    "series": "Arknights - Specialist",
    "rarity": "legendary",
    "imageUrl": "/gacha/ela.webp",
    "color": "#FF9800"
  },
  {
    "id": "shu",
    "name": "Shu",
    "series": "Arknights - Defender",
    "rarity": "legendary",
    "imageUrl": "/gacha/shu.webp",
    "color": "#FF9800"
  },
  {
    "id": "zuo-le",
    "name": "Zuo Le",
    "series": "Arknights - Guard",
    "rarity": "legendary",
    "imageUrl": "/gacha/zuo-le.webp",
    "color": "#FF9800"
  },
  {
    "id": "ray",
    "name": "Ray",
    "series": "Arknights - Sniper",
    "rarity": "legendary",
    "imageUrl": "/gacha/ray.webp",
    "color": "#FF9800"
  },
  {
    "id": "degenbrecher",
    "name": "Degenbrecher",
    "series": "Arknights - Guard",
    "rarity": "legendary",
    "imageUrl": "/gacha/degenbrecher.webp",
    "color": "#FF9800"
  },
  {
    "id": "virtuosa",
    "name": "Virtuosa",
    "series": "Arknights - Supporter",
    "rarity": "legendary",
    "imageUrl": "/gacha/virtuosa.webp",
    "color": "#FF9800"
  },
  {
    "id": "viviana",
    "name": "Viviana",
    "series": "Arknights - Guard",
    "rarity": "legendary",
    "imageUrl": "/gacha/viviana.webp",
    "color": "#FF9800"
  },
  {
    "id": "lessing",
    "name": "Lessing",
    "series": "Arknights - Guard",
    "rarity": "legendary",
    "imageUrl": "/gacha/lessing.webp",
    "color": "#FF9800"
  },
  {
    "id": "hoederer",
    "name": "Hoederer",
    "series": "Arknights - Guard",
    "rarity": "legendary",
    "imageUrl": "/gacha/hoederer.webp",
    "color": "#FF9800"
  },
  {
    "id": "jessica-the-liberated",
    "name": "Jessica the Liberated",
    "series": "Arknights - Defender",
    "rarity": "legendary",
    "imageUrl": "/gacha/jessica-the-liberated.webp",
    "color": "#FF9800"
  },
  {
    "id": "eyjafjalla-the-hvit-aska",
    "name": "Eyjafjalla the Hv\u00edt Aska",
    "series": "Arknights - Medic",
    "rarity": "legendary",
    "imageUrl": "/gacha/eyjafjalla-the-hvit-aska.webp",
    "color": "#FF9800"
  },
  {
    "id": "swire-the-elegant-wit",
    "name": "Swire the Elegant Wit",
    "series": "Arknights - Specialist",
    "rarity": "legendary",
    "imageUrl": "/gacha/swire-the-elegant-wit.webp",
    "color": "#FF9800"
  },
  {
    "id": "typhon",
    "name": "Typhon",
    "series": "Arknights - Sniper",
    "rarity": "legendary",
    "imageUrl": "/gacha/typhon.webp",
    "color": "#FF9800"
  },
  {
    "id": "executor-the-ex-foedere",
    "name": "Executor the Ex Foedere",
    "series": "Arknights - Guard",
    "rarity": "legendary",
    "imageUrl": "/gacha/executor-the-ex-foedere.webp",
    "color": "#FF9800"
  },
  {
    "id": "muelsyse",
    "name": "Muelsyse",
    "series": "Arknights - Vanguard",
    "rarity": "legendary",
    "imageUrl": "/gacha/muelsyse.webp",
    "color": "#FF9800"
  },
  {
    "id": "hoolheyak",
    "name": "Ho'olheyak",
    "series": "Arknights - Caster",
    "rarity": "legendary",
    "imageUrl": "/gacha/hoolheyak.webp",
    "color": "#FF9800"
  },
  {
    "id": "silence-the-paradigmatic",
    "name": "Silence the Paradigmatic",
    "series": "Arknights - Supporter",
    "rarity": "legendary",
    "imageUrl": "/gacha/silence-the-paradigmatic.webp",
    "color": "#FF9800"
  },
  {
    "id": "ines",
    "name": "Ines",
    "series": "Arknights - Vanguard",
    "rarity": "legendary",
    "imageUrl": "/gacha/ines.webp",
    "color": "#FF9800"
  },
  {
    "id": "kirin-r-yato",
    "name": "Kirin R Yato",
    "series": "Arknights - Specialist",
    "rarity": "legendary",
    "imageUrl": "/gacha/kirin-r-yato.webp",
    "color": "#FF9800"
  },
  {
    "id": "qiubai",
    "name": "Qiubai",
    "series": "Arknights - Guard",
    "rarity": "legendary",
    "imageUrl": "/gacha/qiubai.webp",
    "color": "#FF9800"
  },
  {
    "id": "chongyue",
    "name": "Chongyue",
    "series": "Arknights - Guard",
    "rarity": "legendary",
    "imageUrl": "/gacha/chongyue.webp",
    "color": "#FF9800"
  },
  {
    "id": "lin",
    "name": "Lin",
    "series": "Arknights - Caster",
    "rarity": "legendary",
    "imageUrl": "/gacha/lin.webp",
    "color": "#FF9800"
  },
  {
    "id": "reed-the-flame-shadow",
    "name": "Reed the Flame Shadow",
    "series": "Arknights - Medic",
    "rarity": "legendary",
    "imageUrl": "/gacha/reed-the-flame-shadow.webp",
    "color": "#FF9800"
  },
  {
    "id": "texas-the-omertosa",
    "name": "Texas the Omertosa",
    "series": "Arknights - Specialist",
    "rarity": "legendary",
    "imageUrl": "/gacha/texas-the-omertosa.webp",
    "color": "#FF9800"
  },
  {
    "id": "penance",
    "name": "Penance",
    "series": "Arknights - Defender",
    "rarity": "legendary",
    "imageUrl": "/gacha/penance.webp",
    "color": "#FF9800"
  },
  {
    "id": "vigil",
    "name": "Vigil",
    "series": "Arknights - Vanguard",
    "rarity": "legendary",
    "imageUrl": "/gacha/vigil.webp",
    "color": "#FF9800"
  },
  {
    "id": "stainless",
    "name": "Stainless",
    "series": "Arknights - Supporter",
    "rarity": "legendary",
    "imageUrl": "/gacha/stainless.webp",
    "color": "#FF9800"
  },
  {
    "id": "mlynar",
    "name": "M\u0142ynar",
    "series": "Arknights - Guard",
    "rarity": "legendary",
    "imageUrl": "/gacha/mlynar.webp",
    "color": "#FF9800"
  },
  {
    "id": "gavial-the-invincible",
    "name": "Gavial the Invincible",
    "series": "Arknights - Guard",
    "rarity": "legendary",
    "imageUrl": "/gacha/gavial-the-invincible.webp",
    "color": "#FF9800"
  },
  {
    "id": "pozyomka",
    "name": "Poz\u0451mka",
    "series": "Arknights - Sniper",
    "rarity": "legendary",
    "imageUrl": "/gacha/pozyomka.webp",
    "color": "#FF9800"
  },
  {
    "id": "dorothy",
    "name": "Dorothy",
    "series": "Arknights - Specialist",
    "rarity": "legendary",
    "imageUrl": "/gacha/dorothy.webp",
    "color": "#FF9800"
  },
  {
    "id": "ebenholz",
    "name": "Ebenholz",
    "series": "Arknights - Caster",
    "rarity": "legendary",
    "imageUrl": "/gacha/ebenholz.webp",
    "color": "#FF9800"
  },
  {
    "id": "specter-the-unchained",
    "name": "Specter the Unchained",
    "series": "Arknights - Specialist",
    "rarity": "legendary",
    "imageUrl": "/gacha/specter-the-unchained.webp",
    "color": "#FF9800"
  },
  {
    "id": "irene",
    "name": "Irene",
    "series": "Arknights - Guard",
    "rarity": "legendary",
    "imageUrl": "/gacha/irene.webp",
    "color": "#FF9800"
  },
  {
    "id": "lumen",
    "name": "Lumen",
    "series": "Arknights - Medic",
    "rarity": "legendary",
    "imageUrl": "/gacha/lumen.webp",
    "color": "#FF9800"
  },
  {
    "id": "horn",
    "name": "Horn",
    "series": "Arknights - Defender",
    "rarity": "legendary",
    "imageUrl": "/gacha/horn.webp",
    "color": "#FF9800"
  },
  {
    "id": "fiammetta",
    "name": "Fiammetta",
    "series": "Arknights - Sniper",
    "rarity": "legendary",
    "imageUrl": "/gacha/fiammetta.webp",
    "color": "#FF9800"
  },
  {
    "id": "goldenglow",
    "name": "Goldenglow",
    "series": "Arknights - Caster",
    "rarity": "legendary",
    "imageUrl": "/gacha/goldenglow.webp",
    "color": "#FF9800"
  },
  {
    "id": "ling",
    "name": "Ling",
    "series": "Arknights - Supporter",
    "rarity": "legendary",
    "imageUrl": "/gacha/ling.webp",
    "color": "#FF9800"
  },
  {
    "id": "lee",
    "name": "Lee",
    "series": "Arknights - Specialist",
    "rarity": "legendary",
    "imageUrl": "/gacha/lee.webp",
    "color": "#FF9800"
  },
  {
    "id": "gnosis",
    "name": "Gnosis",
    "series": "Arknights - Supporter",
    "rarity": "legendary",
    "imageUrl": "/gacha/gnosis.webp",
    "color": "#FF9800"
  },
  {
    "id": "nearl-the-radiant-knight",
    "name": "Nearl the Radiant Knight",
    "series": "Arknights - Guard",
    "rarity": "legendary",
    "imageUrl": "/gacha/nearl-the-radiant-knight.webp",
    "color": "#FF9800"
  },
  {
    "id": "flametail",
    "name": "Flametail",
    "series": "Arknights - Vanguard",
    "rarity": "legendary",
    "imageUrl": "/gacha/flametail.webp",
    "color": "#FF9800"
  },
  {
    "id": "fartooth",
    "name": "Fartooth",
    "series": "Arknights - Sniper",
    "rarity": "legendary",
    "imageUrl": "/gacha/fartooth.webp",
    "color": "#FF9800"
  },
  {
    "id": "saileach",
    "name": "Saileach",
    "series": "Arknights - Vanguard",
    "rarity": "legendary",
    "imageUrl": "/gacha/saileach.webp",
    "color": "#FF9800"
  },
  {
    "id": "chen-the-holungday",
    "name": "Ch'en the Holungday",
    "series": "Arknights - Sniper",
    "rarity": "legendary",
    "imageUrl": "/gacha/chen-the-holungday.webp",
    "color": "#FF9800"
  },
  {
    "id": "mizuki",
    "name": "Mizuki",
    "series": "Arknights - Specialist",
    "rarity": "legendary",
    "imageUrl": "/gacha/mizuki.webp",
    "color": "#FF9800"
  },
  {
    "id": "pallas",
    "name": "Pallas",
    "series": "Arknights - Guard",
    "rarity": "legendary",
    "imageUrl": "/gacha/pallas.webp",
    "color": "#FF9800"
  },
  {
    "id": "carnelian",
    "name": "Carnelian",
    "series": "Arknights - Caster",
    "rarity": "legendary",
    "imageUrl": "/gacha/carnelian.webp",
    "color": "#FF9800"
  },
  {
    "id": "skadi-the-corrupting-heart",
    "name": "Skadi the Corrupting Heart",
    "series": "Arknights - Supporter",
    "rarity": "legendary",
    "imageUrl": "/gacha/skadi-the-corrupting-heart.webp",
    "color": "#FF9800"
  },
  {
    "id": "kaltsit",
    "name": "Kal'tsit",
    "series": "Arknights - Medic",
    "rarity": "legendary",
    "imageUrl": "/gacha/kaltsit.webp",
    "color": "#FF9800"
  },
  {
    "id": "gladiia",
    "name": "Gladiia",
    "series": "Arknights - Specialist",
    "rarity": "legendary",
    "imageUrl": "/gacha/gladiia.webp",
    "color": "#FF9800"
  },
  {
    "id": "passenger",
    "name": "Passenger",
    "series": "Arknights - Caster",
    "rarity": "legendary",
    "imageUrl": "/gacha/passenger.webp",
    "color": "#FF9800"
  },
  {
    "id": "ash",
    "name": "Ash",
    "series": "Arknights - Sniper",
    "rarity": "legendary",
    "imageUrl": "/gacha/ash.webp",
    "color": "#FF9800"
  },
  {
    "id": "dusk",
    "name": "Dusk",
    "series": "Arknights - Caster",
    "rarity": "legendary",
    "imageUrl": "/gacha/dusk.webp",
    "color": "#FF9800"
  },
  {
    "id": "saga",
    "name": "Saga",
    "series": "Arknights - Vanguard",
    "rarity": "legendary",
    "imageUrl": "/gacha/saga.webp",
    "color": "#FF9800"
  },
  {
    "id": "archetto",
    "name": "Archetto",
    "series": "Arknights - Sniper",
    "rarity": "legendary",
    "imageUrl": "/gacha/archetto.webp",
    "color": "#FF9800"
  },
  {
    "id": "mountain",
    "name": "Mountain",
    "series": "Arknights - Guard",
    "rarity": "legendary",
    "imageUrl": "/gacha/mountain.webp",
    "color": "#FF9800"
  },
  {
    "id": "rosmontis",
    "name": "Rosmontis",
    "series": "Arknights - Sniper",
    "rarity": "legendary",
    "imageUrl": "/gacha/rosmontis.webp",
    "color": "#FF9800"
  },
  {
    "id": "mudrock",
    "name": "Mudrock",
    "series": "Arknights - Defender",
    "rarity": "legendary",
    "imageUrl": "/gacha/mudrock.webp",
    "color": "#FF9800"
  },
  {
    "id": "blemishine",
    "name": "Blemishine",
    "series": "Arknights - Defender",
    "rarity": "legendary",
    "imageUrl": "/gacha/blemishine.webp",
    "color": "#FF9800"
  },
  {
    "id": "surtr",
    "name": "Surtr",
    "series": "Arknights - Guard",
    "rarity": "legendary",
    "imageUrl": "/gacha/surtr.webp",
    "color": "#FF9800"
  },
  {
    "id": "eunectes",
    "name": "Eunectes",
    "series": "Arknights - Defender",
    "rarity": "legendary",
    "imageUrl": "/gacha/eunectes.webp",
    "color": "#FF9800"
  },
  {
    "id": "thorns",
    "name": "Thorns",
    "series": "Arknights - Guard",
    "rarity": "legendary",
    "imageUrl": "/gacha/thorns.webp",
    "color": "#FF9800"
  },
  {
    "id": "suzuran",
    "name": "Suzuran",
    "series": "Arknights - Supporter",
    "rarity": "legendary",
    "imageUrl": "/gacha/suzuran.webp",
    "color": "#FF9800"
  },
  {
    "id": "rosa",
    "name": "Rosa",
    "series": "Arknights - Sniper",
    "rarity": "legendary",
    "imageUrl": "/gacha/rosa.webp",
    "color": "#FF9800"
  },
  {
    "id": "w",
    "name": "W",
    "series": "Arknights - Sniper",
    "rarity": "legendary",
    "imageUrl": "/gacha/w.webp",
    "color": "#FF9800"
  },
  {
    "id": "weedy",
    "name": "Weedy",
    "series": "Arknights - Specialist",
    "rarity": "legendary",
    "imageUrl": "/gacha/weedy.webp",
    "color": "#FF9800"
  },
  {
    "id": "phantom",
    "name": "Phantom",
    "series": "Arknights - Specialist",
    "rarity": "legendary",
    "imageUrl": "/gacha/phantom.webp",
    "color": "#FF9800"
  },
  {
    "id": "bagpipe",
    "name": "Bagpipe",
    "series": "Arknights - Vanguard",
    "rarity": "legendary",
    "imageUrl": "/gacha/bagpipe.webp",
    "color": "#FF9800"
  },
  {
    "id": "ceobe",
    "name": "Ceobe",
    "series": "Arknights - Caster",
    "rarity": "legendary",
    "imageUrl": "/gacha/ceobe.webp",
    "color": "#FF9800"
  },
  {
    "id": "nian",
    "name": "Nian",
    "series": "Arknights - Defender",
    "rarity": "legendary",
    "imageUrl": "/gacha/nian.webp",
    "color": "#FF9800"
  },
  {
    "id": "aak",
    "name": "Aak",
    "series": "Arknights - Specialist",
    "rarity": "legendary",
    "imageUrl": "/gacha/aak.webp",
    "color": "#FF9800"
  },
  {
    "id": "blaze",
    "name": "Blaze",
    "series": "Arknights - Guard",
    "rarity": "legendary",
    "imageUrl": "/gacha/blaze.webp",
    "color": "#FF9800"
  },
  {
    "id": "mostima",
    "name": "Mostima",
    "series": "Arknights - Caster",
    "rarity": "legendary",
    "imageUrl": "/gacha/mostima.webp",
    "color": "#FF9800"
  },
  {
    "id": "magallan",
    "name": "Magallan",
    "series": "Arknights - Supporter",
    "rarity": "legendary",
    "imageUrl": "/gacha/magallan.webp",
    "color": "#FF9800"
  },
  {
    "id": "hellagur",
    "name": "Hellagur",
    "series": "Arknights - Guard",
    "rarity": "legendary",
    "imageUrl": "/gacha/hellagur.webp",
    "color": "#FF9800"
  },
  {
    "id": "schwarz",
    "name": "Schwarz",
    "series": "Arknights - Sniper",
    "rarity": "legendary",
    "imageUrl": "/gacha/schwarz.webp",
    "color": "#FF9800"
  },
  {
    "id": "chen",
    "name": "Ch'en",
    "series": "Arknights - Guard",
    "rarity": "legendary",
    "imageUrl": "/gacha/chen.webp",
    "color": "#FF9800"
  },
  {
    "id": "skadi",
    "name": "Skadi",
    "series": "Arknights - Guard",
    "rarity": "legendary",
    "imageUrl": "/gacha/skadi.webp",
    "color": "#FF9800"
  },
  {
    "id": "silverash",
    "name": "SilverAsh",
    "series": "Arknights - Guard",
    "rarity": "legendary",
    "imageUrl": "/gacha/silverash.webp",
    "color": "#FF9800"
  },
  {
    "id": "saria",
    "name": "Saria",
    "series": "Arknights - Defender",
    "rarity": "legendary",
    "imageUrl": "/gacha/saria.webp",
    "color": "#FF9800"
  },
  {
    "id": "hoshiguma",
    "name": "Hoshiguma",
    "series": "Arknights - Defender",
    "rarity": "legendary",
    "imageUrl": "/gacha/hoshiguma.webp",
    "color": "#FF9800"
  },
  {
    "id": "nightingale",
    "name": "Nightingale",
    "series": "Arknights - Medic",
    "rarity": "legendary",
    "imageUrl": "/gacha/nightingale.webp",
    "color": "#FF9800"
  },
  {
    "id": "shining",
    "name": "Shining",
    "series": "Arknights - Medic",
    "rarity": "legendary",
    "imageUrl": "/gacha/shining.webp",
    "color": "#FF9800"
  },
  {
    "id": "angelina",
    "name": "Angelina",
    "series": "Arknights - Supporter",
    "rarity": "legendary",
    "imageUrl": "/gacha/angelina.webp",
    "color": "#FF9800"
  },
  {
    "id": "eyjafjalla",
    "name": "Eyjafjalla",
    "series": "Arknights - Caster",
    "rarity": "legendary",
    "imageUrl": "/gacha/eyjafjalla.webp",
    "color": "#FF9800"
  },
  {
    "id": "ifrit",
    "name": "Ifrit",
    "series": "Arknights - Caster",
    "rarity": "legendary",
    "imageUrl": "/gacha/ifrit.webp",
    "color": "#FF9800"
  },
  {
    "id": "siege",
    "name": "Siege",
    "series": "Arknights - Vanguard",
    "rarity": "legendary",
    "imageUrl": "/gacha/siege.webp",
    "color": "#FF9800"
  },
  {
    "id": "exusiai",
    "name": "Exusiai",
    "series": "Arknights - Sniper",
    "rarity": "legendary",
    "imageUrl": "/gacha/exusiai.webp",
    "color": "#FF9800"
  },
  {
    "id": "ukusik",
    "name": "\u0423\u043a\u0443\u0441\u0438\u043a",
    "series": "Arknights - Medic",
    "rarity": "epic",
    "imageUrl": "/gacha/ukusik.webp",
    "color": "#9C27B0"
  },
  {
    "id": "botani",
    "name": "\u0411\u043e\u0442\u0430\u043d\u0438",
    "series": "Arknights - Supporter",
    "rarity": "epic",
    "imageUrl": "/gacha/botani.webp",
    "color": "#9C27B0"
  },
  {
    "id": "ripresa",
    "name": "Ripresa",
    "series": "Arknights - Caster",
    "rarity": "epic",
    "imageUrl": "/gacha/ripresa.webp",
    "color": "#9C27B0"
  },
  {
    "id": "taraxacum",
    "name": "Taraxacum",
    "series": "Arknights - Medic",
    "rarity": "epic",
    "imageUrl": "/gacha/taraxacum.webp",
    "color": "#9C27B0"
  },
  {
    "id": "ju",
    "name": "Ju",
    "series": "Arknights - Sniper",
    "rarity": "epic",
    "imageUrl": "/gacha/ju.webp",
    "color": "#9C27B0"
  },
  {
    "id": "perfumer-the-distilled",
    "name": "Perfumer the Distilled",
    "series": "Arknights - Supporter",
    "rarity": "epic",
    "imageUrl": "/gacha/perfumer-the-distilled.webp",
    "color": "#9C27B0"
  },
  {
    "id": "varkaris",
    "name": "Vark\u00e1ris",
    "series": "Arknights - Guard",
    "rarity": "epic",
    "imageUrl": "/gacha/varkaris.webp",
    "color": "#9C27B0"
  },
  {
    "id": "cairn",
    "name": "Cairn",
    "series": "Arknights - Defender",
    "rarity": "epic",
    "imageUrl": "/gacha/cairn.webp",
    "color": "#9C27B0"
  },
  {
    "id": "skybox",
    "name": "Skybox",
    "series": "Arknights - Sniper",
    "rarity": "epic",
    "imageUrl": "/gacha/skybox.webp",
    "color": "#9C27B0"
  },
  {
    "id": "snow-hunter",
    "name": "Snow Hunter",
    "series": "Arknights - Sniper",
    "rarity": "epic",
    "imageUrl": "/gacha/snow-hunter.webp",
    "color": "#9C27B0"
  },
  {
    "id": "hadiya",
    "name": "Hadiya",
    "series": "Arknights - Guard",
    "rarity": "epic",
    "imageUrl": "/gacha/hadiya.webp",
    "color": "#9C27B0"
  },
  {
    "id": "vetochki",
    "name": "Vetochki",
    "series": "Arknights - Defender",
    "rarity": "epic",
    "imageUrl": "/gacha/vetochki.webp",
    "color": "#9C27B0"
  },
  {
    "id": "uika-misumi",
    "name": "Uika Misumi",
    "series": "Arknights - Supporter",
    "rarity": "epic",
    "imageUrl": "/gacha/uika-misumi.webp",
    "color": "#9C27B0"
  },
  {
    "id": "mutsumi-wakaba",
    "name": "Mutsumi Wakaba",
    "series": "Arknights - Specialist",
    "rarity": "epic",
    "imageUrl": "/gacha/mutsumi-wakaba.webp",
    "color": "#9C27B0"
  },
  {
    "id": "umiri-yahata",
    "name": "Umiri Yahata",
    "series": "Arknights - Specialist",
    "rarity": "epic",
    "imageUrl": "/gacha/umiri-yahata.webp",
    "color": "#9C27B0"
  },
  {
    "id": "nyamu-yutenji",
    "name": "Nyamu Y\u016btenji",
    "series": "Arknights - Guard",
    "rarity": "epic",
    "imageUrl": "/gacha/nyamu-yutenji.webp",
    "color": "#9C27B0"
  },
  {
    "id": "kichisei",
    "name": "Kichisei",
    "series": "Arknights - Sniper",
    "rarity": "epic",
    "imageUrl": "/gacha/kichisei.webp",
    "color": "#9C27B0"
  },
  {
    "id": "matsukiri",
    "name": "Matsukiri",
    "series": "Arknights - Vanguard",
    "rarity": "epic",
    "imageUrl": "/gacha/matsukiri.webp",
    "color": "#9C27B0"
  },
  {
    "id": "record-keeper",
    "name": "Record Keeper",
    "series": "Arknights - Medic",
    "rarity": "epic",
    "imageUrl": "/gacha/record-keeper.webp",
    "color": "#9C27B0"
  },
  {
    "id": "tippi",
    "name": "Tippi",
    "series": "Arknights - Specialist",
    "rarity": "epic",
    "imageUrl": "/gacha/tippi.webp",
    "color": "#9C27B0"
  },
  {
    "id": "miss.christine",
    "name": "Miss.Christine",
    "series": "Arknights - Caster",
    "rarity": "epic",
    "imageUrl": "/gacha/miss.christine.webp",
    "color": "#9C27B0"
  },
  {
    "id": "gracebearer",
    "name": "Gracebearer",
    "series": "Arknights - Guard",
    "rarity": "epic",
    "imageUrl": "/gacha/gracebearer.webp",
    "color": "#9C27B0"
  },
  {
    "id": "alanna",
    "name": "Alanna",
    "series": "Arknights - Supporter",
    "rarity": "epic",
    "imageUrl": "/gacha/alanna.webp",
    "color": "#9C27B0"
  },
  {
    "id": "wulfenite",
    "name": "Wulfenite",
    "series": "Arknights - Specialist",
    "rarity": "epic",
    "imageUrl": "/gacha/wulfenite.webp",
    "color": "#9C27B0"
  },
  {
    "id": "brigid",
    "name": "Brigid",
    "series": "Arknights - Sniper",
    "rarity": "epic",
    "imageUrl": "/gacha/brigid.webp",
    "color": "#9C27B0"
  },
  {
    "id": "nowell",
    "name": "Nowell",
    "series": "Arknights - Medic",
    "rarity": "epic",
    "imageUrl": "/gacha/nowell.webp",
    "color": "#9C27B0"
  },
  {
    "id": "surfer",
    "name": "Surfer",
    "series": "Arknights - Vanguard",
    "rarity": "epic",
    "imageUrl": "/gacha/surfer.webp",
    "color": "#9C27B0"
  },
  {
    "id": "xingzhu",
    "name": "Xingzhu",
    "series": "Arknights - Supporter",
    "rarity": "epic",
    "imageUrl": "/gacha/xingzhu.webp",
    "color": "#9C27B0"
  },
  {
    "id": "tecno",
    "name": "Tecno",
    "series": "Arknights - Caster",
    "rarity": "epic",
    "imageUrl": "/gacha/tecno.webp",
    "color": "#9C27B0"
  },
  {
    "id": "rose-salt",
    "name": "Rose Salt",
    "series": "Arknights - Medic",
    "rarity": "epic",
    "imageUrl": "/gacha/rose-salt.webp",
    "color": "#9C27B0"
  },
  {
    "id": "figurino",
    "name": "Figurino",
    "series": "Arknights - Specialist",
    "rarity": "epic",
    "imageUrl": "/gacha/figurino.webp",
    "color": "#9C27B0"
  },
  {
    "id": "philae",
    "name": "Philae",
    "series": "Arknights - Defender",
    "rarity": "epic",
    "imageUrl": "/gacha/philae.webp",
    "color": "#9C27B0"
  },
  {
    "id": "bobbing",
    "name": "Bobbing",
    "series": "Arknights - Supporter",
    "rarity": "epic",
    "imageUrl": "/gacha/bobbing.webp",
    "color": "#9C27B0"
  },
  {
    "id": "catherine",
    "name": "Catherine",
    "series": "Arknights - Supporter",
    "rarity": "epic",
    "imageUrl": "/gacha/catherine.webp",
    "color": "#9C27B0"
  },
  {
    "id": "laios",
    "name": "Laios",
    "series": "Arknights - Guard",
    "rarity": "epic",
    "imageUrl": "/gacha/laios.webp",
    "color": "#9C27B0"
  },
  {
    "id": "chilchuck",
    "name": "Chilchuck",
    "series": "Arknights - Vanguard",
    "rarity": "epic",
    "imageUrl": "/gacha/chilchuck.webp",
    "color": "#9C27B0"
  },
  {
    "id": "senshi",
    "name": "Senshi",
    "series": "Arknights - Defender",
    "rarity": "epic",
    "imageUrl": "/gacha/senshi.webp",
    "color": "#9C27B0"
  },
  {
    "id": "sand-reckoner",
    "name": "Sand Reckoner",
    "series": "Arknights - Supporter",
    "rarity": "epic",
    "imageUrl": "/gacha/sand-reckoner.webp",
    "color": "#9C27B0"
  },
  {
    "id": "papyrus",
    "name": "Papyrus",
    "series": "Arknights - Medic",
    "rarity": "epic",
    "imageUrl": "/gacha/papyrus.webp",
    "color": "#9C27B0"
  },
  {
    "id": "tin-man",
    "name": "Tin Man",
    "series": "Arknights - Specialist",
    "rarity": "epic",
    "imageUrl": "/gacha/tin-man.webp",
    "color": "#9C27B0"
  },
  {
    "id": "mitm",
    "name": "Mitm",
    "series": "Arknights - Vanguard",
    "rarity": "epic",
    "imageUrl": "/gacha/mitm.webp",
    "color": "#9C27B0"
  },
  {
    "id": "lucilla",
    "name": "Lucilla",
    "series": "Arknights - Supporter",
    "rarity": "epic",
    "imageUrl": "/gacha/lucilla.webp",
    "color": "#9C27B0"
  },
  {
    "id": "underflow",
    "name": "Underflow",
    "series": "Arknights - Defender",
    "rarity": "epic",
    "imageUrl": "/gacha/underflow.webp",
    "color": "#9C27B0"
  },
  {
    "id": "fang-the-fire-sharpened",
    "name": "Fang the Fire-Sharpened",
    "series": "Arknights - Vanguard",
    "rarity": "epic",
    "imageUrl": "/gacha/fang-the-fire-sharpened.webp",
    "color": "#9C27B0"
  },
  {
    "id": "aroma",
    "name": "Aroma",
    "series": "Arknights - Caster",
    "rarity": "epic",
    "imageUrl": "/gacha/aroma.webp",
    "color": "#9C27B0"
  },
  {
    "id": "odda",
    "name": "Odda",
    "series": "Arknights - Guard",
    "rarity": "epic",
    "imageUrl": "/gacha/odda.webp",
    "color": "#9C27B0"
  },
  {
    "id": "doc",
    "name": "Doc",
    "series": "Arknights - Guard",
    "rarity": "epic",
    "imageUrl": "/gacha/doc.webp",
    "color": "#9C27B0"
  },
  {
    "id": "iana",
    "name": "Iana",
    "series": "Arknights - Specialist",
    "rarity": "epic",
    "imageUrl": "/gacha/iana.webp",
    "color": "#9C27B0"
  },
  {
    "id": "fuze",
    "name": "Fuze",
    "series": "Arknights - Guard",
    "rarity": "epic",
    "imageUrl": "/gacha/fuze.webp",
    "color": "#9C27B0"
  },
  {
    "id": "kestrel",
    "name": "Kestrel",
    "series": "Arknights - Vanguard",
    "rarity": "epic",
    "imageUrl": "/gacha/kestrel.webp",
    "color": "#9C27B0"
  },
  {
    "id": "grain-buds",
    "name": "Grain Buds",
    "series": "Arknights - Supporter",
    "rarity": "epic",
    "imageUrl": "/gacha/grain-buds.webp",
    "color": "#9C27B0"
  },
  {
    "id": "wanqing",
    "name": "Wanqing",
    "series": "Arknights - Vanguard",
    "rarity": "epic",
    "imageUrl": "/gacha/wanqing.webp",
    "color": "#9C27B0"
  },
  {
    "id": "warmy",
    "name": "Warmy",
    "series": "Arknights - Caster",
    "rarity": "epic",
    "imageUrl": "/gacha/warmy.webp",
    "color": "#9C27B0"
  },
  {
    "id": "leto",
    "name": "Leto",
    "series": "Arknights - Guard",
    "rarity": "epic",
    "imageUrl": "/gacha/leto.webp",
    "color": "#9C27B0"
  },
  {
    "id": "harold",
    "name": "Harold",
    "series": "Arknights - Medic",
    "rarity": "epic",
    "imageUrl": "/gacha/harold.webp",
    "color": "#9C27B0"
  },
  {
    "id": "bassline",
    "name": "Bassline",
    "series": "Arknights - Defender",
    "rarity": "epic",
    "imageUrl": "/gacha/bassline.webp",
    "color": "#9C27B0"
  },
  {
    "id": "diamante",
    "name": "Diamante",
    "series": "Arknights - Caster",
    "rarity": "epic",
    "imageUrl": "/gacha/diamante.webp",
    "color": "#9C27B0"
  },
  {
    "id": "vendela",
    "name": "Vendela",
    "series": "Arknights - Medic",
    "rarity": "epic",
    "imageUrl": "/gacha/vendela.webp",
    "color": "#9C27B0"
  },
  {
    "id": "delphine",
    "name": "Delphine",
    "series": "Arknights - Caster",
    "rarity": "epic",
    "imageUrl": "/gacha/delphine.webp",
    "color": "#9C27B0"
  },
  {
    "id": "almond",
    "name": "Almond",
    "series": "Arknights - Specialist",
    "rarity": "epic",
    "imageUrl": "/gacha/almond.webp",
    "color": "#9C27B0"
  },
  {
    "id": "coldshot",
    "name": "Coldshot",
    "series": "Arknights - Sniper",
    "rarity": "epic",
    "imageUrl": "/gacha/coldshot.webp",
    "color": "#9C27B0"
  },
  {
    "id": "poncirus",
    "name": "Poncirus",
    "series": "Arknights - Vanguard",
    "rarity": "epic",
    "imageUrl": "/gacha/poncirus.webp",
    "color": "#9C27B0"
  },
  {
    "id": "bryophyta",
    "name": "Bryophyta",
    "series": "Arknights - Guard",
    "rarity": "epic",
    "imageUrl": "/gacha/bryophyta.webp",
    "color": "#9C27B0"
  },
  {
    "id": "valarqvin",
    "name": "Valarqvin",
    "series": "Arknights - Supporter",
    "rarity": "epic",
    "imageUrl": "/gacha/valarqvin.webp",
    "color": "#9C27B0"
  },
  {
    "id": "santalla",
    "name": "Santalla",
    "series": "Arknights - Caster",
    "rarity": "epic",
    "imageUrl": "/gacha/santalla.webp",
    "color": "#9C27B0"
  },
  {
    "id": "spuria",
    "name": "Spuria",
    "series": "Arknights - Specialist",
    "rarity": "epic",
    "imageUrl": "/gacha/spuria.webp",
    "color": "#9C27B0"
  },
  {
    "id": "insider",
    "name": "Insider",
    "series": "Arknights - Sniper",
    "rarity": "epic",
    "imageUrl": "/gacha/insider.webp",
    "color": "#9C27B0"
  },
  {
    "id": "melanite",
    "name": "Melanite",
    "series": "Arknights - Sniper",
    "rarity": "epic",
    "imageUrl": "/gacha/melanite.webp",
    "color": "#9C27B0"
  },
  {
    "id": "cement",
    "name": "Cement",
    "series": "Arknights - Defender",
    "rarity": "epic",
    "imageUrl": "/gacha/cement.webp",
    "color": "#9C27B0"
  },
  {
    "id": "morgan",
    "name": "Morgan",
    "series": "Arknights - Guard",
    "rarity": "epic",
    "imageUrl": "/gacha/morgan.webp",
    "color": "#9C27B0"
  },
  {
    "id": "rathalos-s-noir-corne",
    "name": "Rathalos S Noir Corne",
    "series": "Arknights - Guard",
    "rarity": "epic",
    "imageUrl": "/gacha/rathalos-s-noir-corne.webp",
    "color": "#9C27B0"
  },
  {
    "id": "wind-chimes",
    "name": "Wind Chimes",
    "series": "Arknights - Guard",
    "rarity": "epic",
    "imageUrl": "/gacha/wind-chimes.webp",
    "color": "#9C27B0"
  },
  {
    "id": "firewhistle",
    "name": "Firewhistle",
    "series": "Arknights - Defender",
    "rarity": "epic",
    "imageUrl": "/gacha/firewhistle.webp",
    "color": "#9C27B0"
  },
  {
    "id": "jieyun",
    "name": "Jieyun",
    "series": "Arknights - Sniper",
    "rarity": "epic",
    "imageUrl": "/gacha/jieyun.webp",
    "color": "#9C27B0"
  },
  {
    "id": "harmonie",
    "name": "Harmonie",
    "series": "Arknights - Caster",
    "rarity": "epic",
    "imageUrl": "/gacha/harmonie.webp",
    "color": "#9C27B0"
  },
  {
    "id": "puzzle",
    "name": "Puzzle",
    "series": "Arknights - Vanguard",
    "rarity": "epic",
    "imageUrl": "/gacha/puzzle.webp",
    "color": "#9C27B0"
  },
  {
    "id": "lunacub",
    "name": "Lunacub",
    "series": "Arknights - Sniper",
    "rarity": "epic",
    "imageUrl": "/gacha/lunacub.webp",
    "color": "#9C27B0"
  },
  {
    "id": "qanipalaat",
    "name": "Qanipalaat",
    "series": "Arknights - Caster",
    "rarity": "epic",
    "imageUrl": "/gacha/qanipalaat.webp",
    "color": "#9C27B0"
  },
  {
    "id": "paprika",
    "name": "Paprika",
    "series": "Arknights - Medic",
    "rarity": "epic",
    "imageUrl": "/gacha/paprika.webp",
    "color": "#9C27B0"
  },
  {
    "id": "dagda",
    "name": "Dagda",
    "series": "Arknights - Guard",
    "rarity": "epic",
    "imageUrl": "/gacha/dagda.webp",
    "color": "#9C27B0"
  },
  {
    "id": "highmore",
    "name": "Highmore",
    "series": "Arknights - Guard",
    "rarity": "epic",
    "imageUrl": "/gacha/highmore.webp",
    "color": "#9C27B0"
  },
  {
    "id": "proviso",
    "name": "Proviso",
    "series": "Arknights - Supporter",
    "rarity": "epic",
    "imageUrl": "/gacha/proviso.webp",
    "color": "#9C27B0"
  },
  {
    "id": "cantabile",
    "name": "Cantabile",
    "series": "Arknights - Vanguard",
    "rarity": "epic",
    "imageUrl": "/gacha/cantabile.webp",
    "color": "#9C27B0"
  },
  {
    "id": "minimalist",
    "name": "Minimalist",
    "series": "Arknights - Caster",
    "rarity": "epic",
    "imageUrl": "/gacha/minimalist.webp",
    "color": "#9C27B0"
  },
  {
    "id": "greyy-the-lightningbearer",
    "name": "Greyy the Lightningbearer",
    "series": "Arknights - Sniper",
    "rarity": "epic",
    "imageUrl": "/gacha/greyy-the-lightningbearer.webp",
    "color": "#9C27B0"
  },
  {
    "id": "astgenne",
    "name": "Astgenne",
    "series": "Arknights - Caster",
    "rarity": "epic",
    "imageUrl": "/gacha/astgenne.webp",
    "color": "#9C27B0"
  },
  {
    "id": "hibiscus-the-purifier",
    "name": "Hibiscus the Purifier",
    "series": "Arknights - Medic",
    "rarity": "epic",
    "imageUrl": "/gacha/hibiscus-the-purifier.webp",
    "color": "#9C27B0"
  },
  {
    "id": "czerny",
    "name": "Czerny",
    "series": "Arknights - Defender",
    "rarity": "epic",
    "imageUrl": "/gacha/czerny.webp",
    "color": "#9C27B0"
  },
  {
    "id": "erato",
    "name": "Erato",
    "series": "Arknights - Sniper",
    "rarity": "epic",
    "imageUrl": "/gacha/erato.webp",
    "color": "#9C27B0"
  },
  {
    "id": "windflit",
    "name": "Windflit",
    "series": "Arknights - Supporter",
    "rarity": "epic",
    "imageUrl": "/gacha/windflit.webp",
    "color": "#9C27B0"
  },
  {
    "id": "rockrock",
    "name": "Rockrock",
    "series": "Arknights - Caster",
    "rarity": "epic",
    "imageUrl": "/gacha/rockrock.webp",
    "color": "#9C27B0"
  },
  {
    "id": "heidi",
    "name": "Heidi",
    "series": "Arknights - Supporter",
    "rarity": "epic",
    "imageUrl": "/gacha/heidi.webp",
    "color": "#9C27B0"
  },
  {
    "id": "kazemaru",
    "name": "Kazemaru",
    "series": "Arknights - Specialist",
    "rarity": "epic",
    "imageUrl": "/gacha/kazemaru.webp",
    "color": "#9C27B0"
  },
  {
    "id": "enforcer",
    "name": "Enforcer",
    "series": "Arknights - Specialist",
    "rarity": "epic",
    "imageUrl": "/gacha/enforcer.webp",
    "color": "#9C27B0"
  },
  {
    "id": "quercus",
    "name": "Quercus",
    "series": "Arknights - Supporter",
    "rarity": "epic",
    "imageUrl": "/gacha/quercus.webp",
    "color": "#9C27B0"
  },
  {
    "id": "blacknight",
    "name": "Blacknight",
    "series": "Arknights - Vanguard",
    "rarity": "epic",
    "imageUrl": "/gacha/blacknight.webp",
    "color": "#9C27B0"
  },
  {
    "id": "kroos-the-keen-glint",
    "name": "Kroos the Keen Glint",
    "series": "Arknights - Sniper",
    "rarity": "epic",
    "imageUrl": "/gacha/kroos-the-keen-glint.webp",
    "color": "#9C27B0"
  },
  {
    "id": "nine-colored-deer",
    "name": "Nine-Colored Deer",
    "series": "Arknights - Supporter",
    "rarity": "epic",
    "imageUrl": "/gacha/nine-colored-deer.webp",
    "color": "#9C27B0"
  },
  {
    "id": "shalem",
    "name": "Shalem",
    "series": "Arknights - Defender",
    "rarity": "epic",
    "imageUrl": "/gacha/shalem.webp",
    "color": "#9C27B0"
  },
  {
    "id": "aurora",
    "name": "Aurora",
    "series": "Arknights - Defender",
    "rarity": "epic",
    "imageUrl": "/gacha/aurora.webp",
    "color": "#9C27B0"
  },
  {
    "id": "kjera",
    "name": "Kjera",
    "series": "Arknights - Caster",
    "rarity": "epic",
    "imageUrl": "/gacha/kjera.webp",
    "color": "#9C27B0"
  },
  {
    "id": "corroserum",
    "name": "Corroserum",
    "series": "Arknights - Caster",
    "rarity": "epic",
    "imageUrl": "/gacha/corroserum.webp",
    "color": "#9C27B0"
  },
  {
    "id": "wild-mane",
    "name": "Wild Mane",
    "series": "Arknights - Vanguard",
    "rarity": "epic",
    "imageUrl": "/gacha/wild-mane.webp",
    "color": "#9C27B0"
  },
  {
    "id": "honeyberry",
    "name": "Honeyberry",
    "series": "Arknights - Medic",
    "rarity": "epic",
    "imageUrl": "/gacha/honeyberry.webp",
    "color": "#9C27B0"
  },
  {
    "id": "ashlock",
    "name": "Ashlock",
    "series": "Arknights - Defender",
    "rarity": "epic",
    "imageUrl": "/gacha/ashlock.webp",
    "color": "#9C27B0"
  },
  {
    "id": "mulberry",
    "name": "Mulberry",
    "series": "Arknights - Medic",
    "rarity": "epic",
    "imageUrl": "/gacha/mulberry.webp",
    "color": "#9C27B0"
  },
  {
    "id": "la-pluma",
    "name": "La Pluma",
    "series": "Arknights - Guard",
    "rarity": "epic",
    "imageUrl": "/gacha/la-pluma.webp",
    "color": "#9C27B0"
  },
  {
    "id": "tequila",
    "name": "Tequila",
    "series": "Arknights - Guard",
    "rarity": "epic",
    "imageUrl": "/gacha/tequila.webp",
    "color": "#9C27B0"
  },
  {
    "id": "kirara",
    "name": "Kirara",
    "series": "Arknights - Specialist",
    "rarity": "epic",
    "imageUrl": "/gacha/kirara.webp",
    "color": "#9C27B0"
  },
  {
    "id": "bena",
    "name": "Bena",
    "series": "Arknights - Specialist",
    "rarity": "epic",
    "imageUrl": "/gacha/bena.webp",
    "color": "#9C27B0"
  },
  {
    "id": "akafuyu",
    "name": "Akafuyu",
    "series": "Arknights - Guard",
    "rarity": "epic",
    "imageUrl": "/gacha/akafuyu.webp",
    "color": "#9C27B0"
  },
  {
    "id": "toddifons",
    "name": "Toddifons",
    "series": "Arknights - Sniper",
    "rarity": "epic",
    "imageUrl": "/gacha/toddifons.webp",
    "color": "#9C27B0"
  },
  {
    "id": "heavyrain",
    "name": "Heavyrain",
    "series": "Arknights - Defender",
    "rarity": "epic",
    "imageUrl": "/gacha/heavyrain.webp",
    "color": "#9C27B0"
  },
  {
    "id": "frost",
    "name": "Frost",
    "series": "Arknights - Specialist",
    "rarity": "epic",
    "imageUrl": "/gacha/frost.webp",
    "color": "#9C27B0"
  },
  {
    "id": "blitz",
    "name": "Blitz",
    "series": "Arknights - Defender",
    "rarity": "epic",
    "imageUrl": "/gacha/blitz.webp",
    "color": "#9C27B0"
  },
  {
    "id": "tachanka",
    "name": "Tachanka",
    "series": "Arknights - Guard",
    "rarity": "epic",
    "imageUrl": "/gacha/tachanka.webp",
    "color": "#9C27B0"
  },
  {
    "id": "mr.-nothing",
    "name": "Mr. Nothing",
    "series": "Arknights - Specialist",
    "rarity": "epic",
    "imageUrl": "/gacha/mr.-nothing.webp",
    "color": "#9C27B0"
  },
  {
    "id": "lava-the-purgatory",
    "name": "Lava the Purgatory",
    "series": "Arknights - Caster",
    "rarity": "epic",
    "imageUrl": "/gacha/lava-the-purgatory.webp",
    "color": "#9C27B0"
  },
  {
    "id": "tuye",
    "name": "Tuye",
    "series": "Arknights - Medic",
    "rarity": "epic",
    "imageUrl": "/gacha/tuye.webp",
    "color": "#9C27B0"
  },
  {
    "id": "iris",
    "name": "Iris",
    "series": "Arknights - Caster",
    "rarity": "epic",
    "imageUrl": "/gacha/iris.webp",
    "color": "#9C27B0"
  },
  {
    "id": "kafka",
    "name": "Kafka",
    "series": "Arknights - Specialist",
    "rarity": "epic",
    "imageUrl": "/gacha/kafka.webp",
    "color": "#9C27B0"
  },
  {
    "id": "robin",
    "name": "Robin",
    "series": "Arknights - Specialist",
    "rarity": "epic",
    "imageUrl": "/gacha/robin.webp",
    "color": "#9C27B0"
  },
  {
    "id": "whisperain",
    "name": "Whisperain",
    "series": "Arknights - Medic",
    "rarity": "epic",
    "imageUrl": "/gacha/whisperain.webp",
    "color": "#9C27B0"
  },
  {
    "id": "aosta",
    "name": "Aosta",
    "series": "Arknights - Sniper",
    "rarity": "epic",
    "imageUrl": "/gacha/aosta.webp",
    "color": "#9C27B0"
  },
  {
    "id": "whislash",
    "name": "Whislash",
    "series": "Arknights - Guard",
    "rarity": "epic",
    "imageUrl": "/gacha/whislash.webp",
    "color": "#9C27B0"
  },
  {
    "id": "april",
    "name": "April",
    "series": "Arknights - Sniper",
    "rarity": "epic",
    "imageUrl": "/gacha/april.webp",
    "color": "#9C27B0"
  },
  {
    "id": "mint",
    "name": "Mint",
    "series": "Arknights - Caster",
    "rarity": "epic",
    "imageUrl": "/gacha/mint.webp",
    "color": "#9C27B0"
  },
  {
    "id": "flint",
    "name": "Flint",
    "series": "Arknights - Guard",
    "rarity": "epic",
    "imageUrl": "/gacha/flint.webp",
    "color": "#9C27B0"
  },
  {
    "id": "tomimi",
    "name": "Tomimi",
    "series": "Arknights - Caster",
    "rarity": "epic",
    "imageUrl": "/gacha/tomimi.webp",
    "color": "#9C27B0"
  },
  {
    "id": "andreana",
    "name": "Andreana",
    "series": "Arknights - Sniper",
    "rarity": "epic",
    "imageUrl": "/gacha/andreana.webp",
    "color": "#9C27B0"
  },
  {
    "id": "chiave",
    "name": "Chiave",
    "series": "Arknights - Vanguard",
    "rarity": "epic",
    "imageUrl": "/gacha/chiave.webp",
    "color": "#9C27B0"
  },
  {
    "id": "beeswax",
    "name": "Beeswax",
    "series": "Arknights - Caster",
    "rarity": "epic",
    "imageUrl": "/gacha/beeswax.webp",
    "color": "#9C27B0"
  },
  {
    "id": "scene",
    "name": "Scene",
    "series": "Arknights - Supporter",
    "rarity": "epic",
    "imageUrl": "/gacha/scene.webp",
    "color": "#9C27B0"
  },
  {
    "id": "ayerscarpe",
    "name": "Ayerscarpe",
    "series": "Arknights - Guard",
    "rarity": "epic",
    "imageUrl": "/gacha/ayerscarpe.webp",
    "color": "#9C27B0"
  },
  {
    "id": "folinic",
    "name": "Folinic",
    "series": "Arknights - Medic",
    "rarity": "epic",
    "imageUrl": "/gacha/folinic.webp",
    "color": "#9C27B0"
  },
  {
    "id": "leonhardt",
    "name": "Leonhardt",
    "series": "Arknights - Caster",
    "rarity": "epic",
    "imageUrl": "/gacha/leonhardt.webp",
    "color": "#9C27B0"
  },
  {
    "id": "absinthe",
    "name": "Absinthe",
    "series": "Arknights - Caster",
    "rarity": "epic",
    "imageUrl": "/gacha/absinthe.webp",
    "color": "#9C27B0"
  },
  {
    "id": "tsukinogi",
    "name": "Tsukinogi",
    "series": "Arknights - Supporter",
    "rarity": "epic",
    "imageUrl": "/gacha/tsukinogi.webp",
    "color": "#9C27B0"
  },
  {
    "id": "asbestos",
    "name": "Asbestos",
    "series": "Arknights - Defender",
    "rarity": "epic",
    "imageUrl": "/gacha/asbestos.webp",
    "color": "#9C27B0"
  },
  {
    "id": "elysium",
    "name": "Elysium",
    "series": "Arknights - Vanguard",
    "rarity": "epic",
    "imageUrl": "/gacha/elysium.webp",
    "color": "#9C27B0"
  },
  {
    "id": "shamare",
    "name": "Shamare",
    "series": "Arknights - Supporter",
    "rarity": "epic",
    "imageUrl": "/gacha/shamare.webp",
    "color": "#9C27B0"
  },
  {
    "id": "sideroca",
    "name": "Sideroca",
    "series": "Arknights - Guard",
    "rarity": "epic",
    "imageUrl": "/gacha/sideroca.webp",
    "color": "#9C27B0"
  },
  {
    "id": "sesa",
    "name": "Sesa",
    "series": "Arknights - Sniper",
    "rarity": "epic",
    "imageUrl": "/gacha/sesa.webp",
    "color": "#9C27B0"
  },
  {
    "id": "bibeak",
    "name": "Bibeak",
    "series": "Arknights - Guard",
    "rarity": "epic",
    "imageUrl": "/gacha/bibeak.webp",
    "color": "#9C27B0"
  },
  {
    "id": "leizi",
    "name": "Leizi",
    "series": "Arknights - Caster",
    "rarity": "epic",
    "imageUrl": "/gacha/leizi.webp",
    "color": "#9C27B0"
  },
  {
    "id": "hung",
    "name": "Hung",
    "series": "Arknights - Defender",
    "rarity": "epic",
    "imageUrl": "/gacha/hung.webp",
    "color": "#9C27B0"
  },
  {
    "id": "snowsant",
    "name": "Snowsant",
    "series": "Arknights - Specialist",
    "rarity": "epic",
    "imageUrl": "/gacha/snowsant.webp",
    "color": "#9C27B0"
  },
  {
    "id": "greythroat",
    "name": "GreyThroat",
    "series": "Arknights - Sniper",
    "rarity": "epic",
    "imageUrl": "/gacha/greythroat.webp",
    "color": "#9C27B0"
  },
  {
    "id": "broca",
    "name": "Broca",
    "series": "Arknights - Guard",
    "rarity": "epic",
    "imageUrl": "/gacha/broca.webp",
    "color": "#9C27B0"
  },
  {
    "id": "reed",
    "name": "Reed",
    "series": "Arknights - Vanguard",
    "rarity": "epic",
    "imageUrl": "/gacha/reed.webp",
    "color": "#9C27B0"
  },
  {
    "id": "waai-fu",
    "name": "Waai Fu",
    "series": "Arknights - Specialist",
    "rarity": "epic",
    "imageUrl": "/gacha/waai-fu.webp",
    "color": "#9C27B0"
  },
  {
    "id": "bison",
    "name": "Bison",
    "series": "Arknights - Defender",
    "rarity": "epic",
    "imageUrl": "/gacha/bison.webp",
    "color": "#9C27B0"
  },
  {
    "id": "breeze",
    "name": "Breeze",
    "series": "Arknights - Medic",
    "rarity": "epic",
    "imageUrl": "/gacha/breeze.webp",
    "color": "#9C27B0"
  },
  {
    "id": "executor",
    "name": "Executor",
    "series": "Arknights - Sniper",
    "rarity": "epic",
    "imageUrl": "/gacha/executor.webp",
    "color": "#9C27B0"
  },
  {
    "id": "flamebringer",
    "name": "Flamebringer",
    "series": "Arknights - Guard",
    "rarity": "epic",
    "imageUrl": "/gacha/flamebringer.webp",
    "color": "#9C27B0"
  },
  {
    "id": "astesia",
    "name": "Astesia",
    "series": "Arknights - Guard",
    "rarity": "epic",
    "imageUrl": "/gacha/astesia.webp",
    "color": "#9C27B0"
  },
  {
    "id": "glaucus",
    "name": "Glaucus",
    "series": "Arknights - Supporter",
    "rarity": "epic",
    "imageUrl": "/gacha/glaucus.webp",
    "color": "#9C27B0"
  },
  {
    "id": "ceylon",
    "name": "Ceylon",
    "series": "Arknights - Medic",
    "rarity": "epic",
    "imageUrl": "/gacha/ceylon.webp",
    "color": "#9C27B0"
  },
  {
    "id": "swire",
    "name": "Swire",
    "series": "Arknights - Guard",
    "rarity": "epic",
    "imageUrl": "/gacha/swire.webp",
    "color": "#9C27B0"
  },
  {
    "id": "grani",
    "name": "Grani",
    "series": "Arknights - Vanguard",
    "rarity": "epic",
    "imageUrl": "/gacha/grani.webp",
    "color": "#9C27B0"
  },
  {
    "id": "nightmare",
    "name": "Nightmare",
    "series": "Arknights - Caster",
    "rarity": "epic",
    "imageUrl": "/gacha/nightmare.webp",
    "color": "#9C27B0"
  },
  {
    "id": "savage",
    "name": "Savage",
    "series": "Arknights - Guard",
    "rarity": "epic",
    "imageUrl": "/gacha/savage.webp",
    "color": "#9C27B0"
  },
  {
    "id": "feater",
    "name": "FEater",
    "series": "Arknights - Specialist",
    "rarity": "epic",
    "imageUrl": "/gacha/feater.webp",
    "color": "#9C27B0"
  },
  {
    "id": "manticore",
    "name": "Manticore",
    "series": "Arknights - Specialist",
    "rarity": "epic",
    "imageUrl": "/gacha/manticore.webp",
    "color": "#9C27B0"
  },
  {
    "id": "sora",
    "name": "Sora",
    "series": "Arknights - Supporter",
    "rarity": "epic",
    "imageUrl": "/gacha/sora.webp",
    "color": "#9C27B0"
  },
  {
    "id": "istina",
    "name": "Istina",
    "series": "Arknights - Supporter",
    "rarity": "epic",
    "imageUrl": "/gacha/istina.webp",
    "color": "#9C27B0"
  },
  {
    "id": "pramanix",
    "name": "Pramanix",
    "series": "Arknights - Supporter",
    "rarity": "epic",
    "imageUrl": "/gacha/pramanix.webp",
    "color": "#9C27B0"
  },
  {
    "id": "cliffheart",
    "name": "Cliffheart",
    "series": "Arknights - Specialist",
    "rarity": "epic",
    "imageUrl": "/gacha/cliffheart.webp",
    "color": "#9C27B0"
  },
  {
    "id": "firewatch",
    "name": "Firewatch",
    "series": "Arknights - Sniper",
    "rarity": "epic",
    "imageUrl": "/gacha/firewatch.webp",
    "color": "#9C27B0"
  },
  {
    "id": "provence",
    "name": "Provence",
    "series": "Arknights - Sniper",
    "rarity": "epic",
    "imageUrl": "/gacha/provence.webp",
    "color": "#9C27B0"
  },
  {
    "id": "vulcan",
    "name": "Vulcan",
    "series": "Arknights - Defender",
    "rarity": "epic",
    "imageUrl": "/gacha/vulcan.webp",
    "color": "#9C27B0"
  },
  {
    "id": "croissant",
    "name": "Croissant",
    "series": "Arknights - Defender",
    "rarity": "epic",
    "imageUrl": "/gacha/croissant.webp",
    "color": "#9C27B0"
  },
  {
    "id": "liskarm",
    "name": "Liskarm",
    "series": "Arknights - Defender",
    "rarity": "epic",
    "imageUrl": "/gacha/liskarm.webp",
    "color": "#9C27B0"
  },
  {
    "id": "projekt-red",
    "name": "Projekt Red",
    "series": "Arknights - Specialist",
    "rarity": "epic",
    "imageUrl": "/gacha/projekt-red.webp",
    "color": "#9C27B0"
  },
  {
    "id": "nearl",
    "name": "Nearl",
    "series": "Arknights - Defender",
    "rarity": "epic",
    "imageUrl": "/gacha/nearl.webp",
    "color": "#9C27B0"
  },
  {
    "id": "warfarin",
    "name": "Warfarin",
    "series": "Arknights - Medic",
    "rarity": "epic",
    "imageUrl": "/gacha/warfarin.webp",
    "color": "#9C27B0"
  },
  {
    "id": "silence",
    "name": "Silence",
    "series": "Arknights - Medic",
    "rarity": "epic",
    "imageUrl": "/gacha/silence.webp",
    "color": "#9C27B0"
  },
  {
    "id": "mayer",
    "name": "Mayer",
    "series": "Arknights - Supporter",
    "rarity": "epic",
    "imageUrl": "/gacha/mayer.webp",
    "color": "#9C27B0"
  },
  {
    "id": "skyfire",
    "name": "Skyfire",
    "series": "Arknights - Caster",
    "rarity": "epic",
    "imageUrl": "/gacha/skyfire.webp",
    "color": "#9C27B0"
  },
  {
    "id": "amiya",
    "name": "Amiya",
    "series": "Arknights - Caster",
    "rarity": "epic",
    "imageUrl": "/gacha/amiya.webp",
    "color": "#9C27B0"
  },
  {
    "id": "amiya-(guard)",
    "name": "Amiya (Guard)",
    "series": "Arknights - Guard",
    "rarity": "epic",
    "imageUrl": "/gacha/amiya-(guard).webp",
    "color": "#9C27B0"
  },
  {
    "id": "amiya-(medic)",
    "name": "Amiya (Medic)",
    "series": "Arknights - Medic",
    "rarity": "epic",
    "imageUrl": "/gacha/amiya-(medic).webp",
    "color": "#9C27B0"
  },
  {
    "id": "meteorite",
    "name": "Meteorite",
    "series": "Arknights - Sniper",
    "rarity": "epic",
    "imageUrl": "/gacha/meteorite.webp",
    "color": "#9C27B0"
  },
  {
    "id": "platinum",
    "name": "Platinum",
    "series": "Arknights - Sniper",
    "rarity": "epic",
    "imageUrl": "/gacha/platinum.webp",
    "color": "#9C27B0"
  },
  {
    "id": "blue-poison",
    "name": "Blue Poison",
    "series": "Arknights - Sniper",
    "rarity": "epic",
    "imageUrl": "/gacha/blue-poison.webp",
    "color": "#9C27B0"
  },
  {
    "id": "specter",
    "name": "Specter",
    "series": "Arknights - Guard",
    "rarity": "epic",
    "imageUrl": "/gacha/specter.webp",
    "color": "#9C27B0"
  },
  {
    "id": "lappland",
    "name": "Lappland",
    "series": "Arknights - Guard",
    "rarity": "epic",
    "imageUrl": "/gacha/lappland.webp",
    "color": "#9C27B0"
  },
  {
    "id": "indra",
    "name": "Indra",
    "series": "Arknights - Guard",
    "rarity": "epic",
    "imageUrl": "/gacha/indra.webp",
    "color": "#9C27B0"
  },
  {
    "id": "franka",
    "name": "Franka",
    "series": "Arknights - Guard",
    "rarity": "epic",
    "imageUrl": "/gacha/franka.webp",
    "color": "#9C27B0"
  },
  {
    "id": "texas",
    "name": "Texas",
    "series": "Arknights - Vanguard",
    "rarity": "epic",
    "imageUrl": "/gacha/texas.webp",
    "color": "#9C27B0"
  },
  {
    "id": "zima",
    "name": "Zima",
    "series": "Arknights - Vanguard",
    "rarity": "epic",
    "imageUrl": "/gacha/zima.webp",
    "color": "#9C27B0"
  },
  {
    "id": "ptilopsis",
    "name": "Ptilopsis",
    "series": "Arknights - Medic",
    "rarity": "epic",
    "imageUrl": "/gacha/ptilopsis.webp",
    "color": "#9C27B0"
  },
  {
    "id": "akkord",
    "name": "Akkord",
    "series": "Arknights - Caster",
    "rarity": "rare",
    "imageUrl": "/gacha/akkord.webp",
    "color": "#2196F3"
  },
  {
    "id": "snegurochka",
    "name": "Snegurochka",
    "series": "Arknights - Vanguard",
    "rarity": "rare",
    "imageUrl": "/gacha/snegurochka.webp",
    "color": "#2196F3"
  },
  {
    "id": "windscoot",
    "name": "Windscoot",
    "series": "Arknights - Guard",
    "rarity": "rare",
    "imageUrl": "/gacha/windscoot.webp",
    "color": "#2196F3"
  },
  {
    "id": "contrail",
    "name": "Contrail",
    "series": "Arknights - Specialist",
    "rarity": "rare",
    "imageUrl": "/gacha/contrail.webp",
    "color": "#2196F3"
  },
  {
    "id": "lutonada",
    "name": "Lutonada",
    "series": "Arknights - Defender",
    "rarity": "rare",
    "imageUrl": "/gacha/lutonada.webp",
    "color": "#2196F3"
  },
  {
    "id": "caper",
    "name": "Caper",
    "series": "Arknights - Sniper",
    "rarity": "rare",
    "imageUrl": "/gacha/caper.webp",
    "color": "#2196F3"
  },
  {
    "id": "verdant",
    "name": "Verdant",
    "series": "Arknights - Specialist",
    "rarity": "rare",
    "imageUrl": "/gacha/verdant.webp",
    "color": "#2196F3"
  },
  {
    "id": "humus",
    "name": "Humus",
    "series": "Arknights - Guard",
    "rarity": "rare",
    "imageUrl": "/gacha/humus.webp",
    "color": "#2196F3"
  },
  {
    "id": "quartz",
    "name": "Quartz",
    "series": "Arknights - Guard",
    "rarity": "rare",
    "imageUrl": "/gacha/quartz.webp",
    "color": "#2196F3"
  },
  {
    "id": "totter",
    "name": "Totter",
    "series": "Arknights - Sniper",
    "rarity": "rare",
    "imageUrl": "/gacha/totter.webp",
    "color": "#2196F3"
  },
  {
    "id": "luo-xiaohei",
    "name": "Luo Xiaohei",
    "series": "Arknights - Guard",
    "rarity": "rare",
    "imageUrl": "/gacha/luo-xiaohei.webp",
    "color": "#2196F3"
  },
  {
    "id": "chestnut",
    "name": "Chestnut",
    "series": "Arknights - Medic",
    "rarity": "rare",
    "imageUrl": "/gacha/chestnut.webp",
    "color": "#2196F3"
  },
  {
    "id": "pudding",
    "name": "Pudding",
    "series": "Arknights - Caster",
    "rarity": "rare",
    "imageUrl": "/gacha/pudding.webp",
    "color": "#2196F3"
  },
  {
    "id": "roberta",
    "name": "Roberta",
    "series": "Arknights - Supporter",
    "rarity": "rare",
    "imageUrl": "/gacha/roberta.webp",
    "color": "#2196F3"
  },
  {
    "id": "indigo",
    "name": "Indigo",
    "series": "Arknights - Caster",
    "rarity": "rare",
    "imageUrl": "/gacha/indigo.webp",
    "color": "#2196F3"
  },
  {
    "id": "beanstalk",
    "name": "Beanstalk",
    "series": "Arknights - Vanguard",
    "rarity": "rare",
    "imageUrl": "/gacha/beanstalk.webp",
    "color": "#2196F3"
  },
  {
    "id": "pinecone",
    "name": "Pinecone",
    "series": "Arknights - Sniper",
    "rarity": "rare",
    "imageUrl": "/gacha/pinecone.webp",
    "color": "#2196F3"
  },
  {
    "id": "jackie",
    "name": "Jackie",
    "series": "Arknights - Guard",
    "rarity": "rare",
    "imageUrl": "/gacha/jackie.webp",
    "color": "#2196F3"
  },
  {
    "id": "bubble",
    "name": "Bubble",
    "series": "Arknights - Defender",
    "rarity": "rare",
    "imageUrl": "/gacha/bubble.webp",
    "color": "#2196F3"
  },
  {
    "id": "arene",
    "name": "Arene",
    "series": "Arknights - Guard",
    "rarity": "rare",
    "imageUrl": "/gacha/arene.webp",
    "color": "#2196F3"
  },
  {
    "id": "aciddrop",
    "name": "Aciddrop",
    "series": "Arknights - Sniper",
    "rarity": "rare",
    "imageUrl": "/gacha/aciddrop.webp",
    "color": "#2196F3"
  },
  {
    "id": "jaye",
    "name": "Jaye",
    "series": "Arknights - Specialist",
    "rarity": "rare",
    "imageUrl": "/gacha/jaye.webp",
    "color": "#2196F3"
  },
  {
    "id": "click",
    "name": "Click",
    "series": "Arknights - Caster",
    "rarity": "rare",
    "imageUrl": "/gacha/click.webp",
    "color": "#2196F3"
  },
  {
    "id": "podenco",
    "name": "Podenco",
    "series": "Arknights - Supporter",
    "rarity": "rare",
    "imageUrl": "/gacha/podenco.webp",
    "color": "#2196F3"
  },
  {
    "id": "cutter",
    "name": "Cutter",
    "series": "Arknights - Guard",
    "rarity": "rare",
    "imageUrl": "/gacha/cutter.webp",
    "color": "#2196F3"
  },
  {
    "id": "conviction",
    "name": "Conviction",
    "series": "Arknights - Guard",
    "rarity": "rare",
    "imageUrl": "/gacha/conviction.webp",
    "color": "#2196F3"
  },
  {
    "id": "utage",
    "name": "Utage",
    "series": "Arknights - Guard",
    "rarity": "rare",
    "imageUrl": "/gacha/utage.webp",
    "color": "#2196F3"
  },
  {
    "id": "purestream",
    "name": "Purestream",
    "series": "Arknights - Medic",
    "rarity": "rare",
    "imageUrl": "/gacha/purestream.webp",
    "color": "#2196F3"
  },
  {
    "id": "ambriel",
    "name": "Ambriel",
    "series": "Arknights - Sniper",
    "rarity": "rare",
    "imageUrl": "/gacha/ambriel.webp",
    "color": "#2196F3"
  },
  {
    "id": "may",
    "name": "May",
    "series": "Arknights - Sniper",
    "rarity": "rare",
    "imageUrl": "/gacha/may.webp",
    "color": "#2196F3"
  },
  {
    "id": "ethan",
    "name": "Ethan",
    "series": "Arknights - Specialist",
    "rarity": "rare",
    "imageUrl": "/gacha/ethan.webp",
    "color": "#2196F3"
  },
  {
    "id": "vermeil",
    "name": "Vermeil",
    "series": "Arknights - Sniper",
    "rarity": "rare",
    "imageUrl": "/gacha/vermeil.webp",
    "color": "#2196F3"
  },
  {
    "id": "dur-nar",
    "name": "Dur-nar",
    "series": "Arknights - Defender",
    "rarity": "rare",
    "imageUrl": "/gacha/dur-nar.webp",
    "color": "#2196F3"
  },
  {
    "id": "myrtle",
    "name": "Myrtle",
    "series": "Arknights - Vanguard",
    "rarity": "rare",
    "imageUrl": "/gacha/myrtle.webp",
    "color": "#2196F3"
  },
  {
    "id": "sussurro",
    "name": "Sussurro",
    "series": "Arknights - Medic",
    "rarity": "rare",
    "imageUrl": "/gacha/sussurro.webp",
    "color": "#2196F3"
  },
  {
    "id": "greyy",
    "name": "Greyy",
    "series": "Arknights - Caster",
    "rarity": "rare",
    "imageUrl": "/gacha/greyy.webp",
    "color": "#2196F3"
  },
  {
    "id": "beehunter",
    "name": "Beehunter",
    "series": "Arknights - Guard",
    "rarity": "rare",
    "imageUrl": "/gacha/beehunter.webp",
    "color": "#2196F3"
  },
  {
    "id": "shaw",
    "name": "Shaw",
    "series": "Arknights - Specialist",
    "rarity": "rare",
    "imageUrl": "/gacha/shaw.webp",
    "color": "#2196F3"
  },
  {
    "id": "earthspirit",
    "name": "Earthspirit",
    "series": "Arknights - Supporter",
    "rarity": "rare",
    "imageUrl": "/gacha/earthspirit.webp",
    "color": "#2196F3"
  },
  {
    "id": "deepcolor",
    "name": "Deepcolor",
    "series": "Arknights - Supporter",
    "rarity": "rare",
    "imageUrl": "/gacha/deepcolor.webp",
    "color": "#2196F3"
  },
  {
    "id": "gummy",
    "name": "Gummy",
    "series": "Arknights - Defender",
    "rarity": "rare",
    "imageUrl": "/gacha/gummy.webp",
    "color": "#2196F3"
  },
  {
    "id": "cuora",
    "name": "Cuora",
    "series": "Arknights - Defender",
    "rarity": "rare",
    "imageUrl": "/gacha/cuora.webp",
    "color": "#2196F3"
  },
  {
    "id": "matterhorn",
    "name": "Matterhorn",
    "series": "Arknights - Defender",
    "rarity": "rare",
    "imageUrl": "/gacha/matterhorn.webp",
    "color": "#2196F3"
  },
  {
    "id": "perfumer",
    "name": "Perfumer",
    "series": "Arknights - Medic",
    "rarity": "rare",
    "imageUrl": "/gacha/perfumer.webp",
    "color": "#2196F3"
  },
  {
    "id": "gavial",
    "name": "Gavial",
    "series": "Arknights - Medic",
    "rarity": "rare",
    "imageUrl": "/gacha/gavial.webp",
    "color": "#2196F3"
  },
  {
    "id": "myrrh",
    "name": "Myrrh",
    "series": "Arknights - Medic",
    "rarity": "rare",
    "imageUrl": "/gacha/myrrh.webp",
    "color": "#2196F3"
  },
  {
    "id": "rope",
    "name": "Rope",
    "series": "Arknights - Specialist",
    "rarity": "rare",
    "imageUrl": "/gacha/rope.webp",
    "color": "#2196F3"
  },
  {
    "id": "gravel",
    "name": "Gravel",
    "series": "Arknights - Specialist",
    "rarity": "rare",
    "imageUrl": "/gacha/gravel.webp",
    "color": "#2196F3"
  },
  {
    "id": "mousse",
    "name": "Mousse",
    "series": "Arknights - Guard",
    "rarity": "rare",
    "imageUrl": "/gacha/mousse.webp",
    "color": "#2196F3"
  },
  {
    "id": "estelle",
    "name": "Estelle",
    "series": "Arknights - Guard",
    "rarity": "rare",
    "imageUrl": "/gacha/estelle.webp",
    "color": "#2196F3"
  },
  {
    "id": "frostleaf",
    "name": "Frostleaf",
    "series": "Arknights - Guard",
    "rarity": "rare",
    "imageUrl": "/gacha/frostleaf.webp",
    "color": "#2196F3"
  },
  {
    "id": "matoimaru",
    "name": "Matoimaru",
    "series": "Arknights - Guard",
    "rarity": "rare",
    "imageUrl": "/gacha/matoimaru.webp",
    "color": "#2196F3"
  },
  {
    "id": "dobermann",
    "name": "Dobermann",
    "series": "Arknights - Guard",
    "rarity": "rare",
    "imageUrl": "/gacha/dobermann.webp",
    "color": "#2196F3"
  },
  {
    "id": "vigna",
    "name": "Vigna",
    "series": "Arknights - Vanguard",
    "rarity": "rare",
    "imageUrl": "/gacha/vigna.webp",
    "color": "#2196F3"
  },
  {
    "id": "scavenger",
    "name": "Scavenger",
    "series": "Arknights - Vanguard",
    "rarity": "rare",
    "imageUrl": "/gacha/scavenger.webp",
    "color": "#2196F3"
  },
  {
    "id": "courier",
    "name": "Courier",
    "series": "Arknights - Vanguard",
    "rarity": "rare",
    "imageUrl": "/gacha/courier.webp",
    "color": "#2196F3"
  },
  {
    "id": "shirayuki",
    "name": "Shirayuki",
    "series": "Arknights - Sniper",
    "rarity": "rare",
    "imageUrl": "/gacha/shirayuki.webp",
    "color": "#2196F3"
  },
  {
    "id": "meteor",
    "name": "Meteor",
    "series": "Arknights - Sniper",
    "rarity": "rare",
    "imageUrl": "/gacha/meteor.webp",
    "color": "#2196F3"
  },
  {
    "id": "jessica",
    "name": "Jessica",
    "series": "Arknights - Sniper",
    "rarity": "rare",
    "imageUrl": "/gacha/jessica.webp",
    "color": "#2196F3"
  },
  {
    "id": "gitano",
    "name": "Gitano",
    "series": "Arknights - Caster",
    "rarity": "rare",
    "imageUrl": "/gacha/gitano.webp",
    "color": "#2196F3"
  },
  {
    "id": "haze",
    "name": "Haze",
    "series": "Arknights - Caster",
    "rarity": "rare",
    "imageUrl": "/gacha/haze.webp",
    "color": "#2196F3"
  },
  {
    "id": "spot",
    "name": "Spot",
    "series": "Arknights - Defender",
    "rarity": "common",
    "imageUrl": "/gacha/spot.webp",
    "color": "#9E9E9E"
  },
  {
    "id": "popukar",
    "name": "Popukar",
    "series": "Arknights - Guard",
    "rarity": "common",
    "imageUrl": "/gacha/popukar.webp",
    "color": "#9E9E9E"
  },
  {
    "id": "midnight",
    "name": "Midnight",
    "series": "Arknights - Guard",
    "rarity": "common",
    "imageUrl": "/gacha/midnight.webp",
    "color": "#9E9E9E"
  },
  {
    "id": "catapult",
    "name": "Catapult",
    "series": "Arknights - Sniper",
    "rarity": "common",
    "imageUrl": "/gacha/catapult.webp",
    "color": "#9E9E9E"
  },
  {
    "id": "orchid",
    "name": "Orchid",
    "series": "Arknights - Supporter",
    "rarity": "common",
    "imageUrl": "/gacha/orchid.webp",
    "color": "#9E9E9E"
  },
  {
    "id": "steward",
    "name": "Steward",
    "series": "Arknights - Caster",
    "rarity": "common",
    "imageUrl": "/gacha/steward.webp",
    "color": "#9E9E9E"
  },
  {
    "id": "ansel",
    "name": "Ansel",
    "series": "Arknights - Medic",
    "rarity": "common",
    "imageUrl": "/gacha/ansel.webp",
    "color": "#9E9E9E"
  },
  {
    "id": "hibiscus",
    "name": "Hibiscus",
    "series": "Arknights - Medic",
    "rarity": "common",
    "imageUrl": "/gacha/hibiscus.webp",
    "color": "#9E9E9E"
  },
  {
    "id": "lava",
    "name": "Lava",
    "series": "Arknights - Caster",
    "rarity": "common",
    "imageUrl": "/gacha/lava.webp",
    "color": "#9E9E9E"
  },
  {
    "id": "adnachiel",
    "name": "Adnachiel",
    "series": "Arknights - Sniper",
    "rarity": "common",
    "imageUrl": "/gacha/adnachiel.webp",
    "color": "#9E9E9E"
  },
  {
    "id": "kroos",
    "name": "Kroos",
    "series": "Arknights - Sniper",
    "rarity": "common",
    "imageUrl": "/gacha/kroos.webp",
    "color": "#9E9E9E"
  },
  {
    "id": "beagle",
    "name": "Beagle",
    "series": "Arknights - Defender",
    "rarity": "common",
    "imageUrl": "/gacha/beagle.webp",
    "color": "#9E9E9E"
  },
  {
    "id": "cardigan",
    "name": "Cardigan",
    "series": "Arknights - Defender",
    "rarity": "common",
    "imageUrl": "/gacha/cardigan.webp",
    "color": "#9E9E9E"
  },
  {
    "id": "melantha",
    "name": "Melantha",
    "series": "Arknights - Guard",
    "rarity": "common",
    "imageUrl": "/gacha/melantha.webp",
    "color": "#9E9E9E"
  },
  {
    "id": "plume",
    "name": "Plume",
    "series": "Arknights - Vanguard",
    "rarity": "common",
    "imageUrl": "/gacha/plume.webp",
    "color": "#9E9E9E"
  },
  {
    "id": "vanilla",
    "name": "Vanilla",
    "series": "Arknights - Vanguard",
    "rarity": "common",
    "imageUrl": "/gacha/vanilla.webp",
    "color": "#9E9E9E"
  },
  {
    "id": "fang",
    "name": "Fang",
    "series": "Arknights - Vanguard",
    "rarity": "common",
    "imageUrl": "/gacha/fang.webp",
    "color": "#9E9E9E"
  },
  {
    "id": "12f",
    "name": "12F",
    "series": "Arknights - Caster",
    "rarity": "common",
    "imageUrl": "/gacha/12f.webp",
    "color": "#9E9E9E"
  },
  {
    "id": "durin",
    "name": "Durin",
    "series": "Arknights - Caster",
    "rarity": "common",
    "imageUrl": "/gacha/durin.webp",
    "color": "#9E9E9E"
  },
  {
    "id": "rangers",
    "name": "Rangers",
    "series": "Arknights - Sniper",
    "rarity": "common",
    "imageUrl": "/gacha/rangers.webp",
    "color": "#9E9E9E"
  },
  {
    "id": "noir-corne",
    "name": "Noir Corne",
    "series": "Arknights - Defender",
    "rarity": "common",
    "imageUrl": "/gacha/noir-corne.webp",
    "color": "#9E9E9E"
  },
  {
    "id": "yato",
    "name": "Yato",
    "series": "Arknights - Vanguard",
    "rarity": "common",
    "imageUrl": "/gacha/yato.webp",
    "color": "#9E9E9E"
  },
  {
    "id": "confess-47",
    "name": "CONFESS-47",
    "series": "Arknights - Vanguard",
    "rarity": "common",
    "imageUrl": "/gacha/confess-47.webp",
    "color": "#9E9E9E"
  },
  {
    "id": "phonor-0",
    "name": "PhonoR-0",
    "series": "Arknights - Supporter",
    "rarity": "common",
    "imageUrl": "/gacha/phonor-0.webp",
    "color": "#9E9E9E"
  },
  {
    "id": "friston-3",
    "name": "Friston-3",
    "series": "Arknights - Defender",
    "rarity": "common",
    "imageUrl": "/gacha/friston-3.webp",
    "color": "#9E9E9E"
  },
  {
    "id": "u-official",
    "name": "U-Official",
    "series": "Arknights - Supporter",
    "rarity": "common",
    "imageUrl": "/gacha/u-official.webp",
    "color": "#9E9E9E"
  },
  {
    "id": "terra-research-commission",
    "name": "Terra Research Commission",
    "series": "Arknights - Sniper",
    "rarity": "common",
    "imageUrl": "/gacha/terra-research-commission.webp",
    "color": "#9E9E9E"
  },
  {
    "id": "justice-knight",
    "name": "'Justice Knight'",
    "series": "Arknights - Sniper",
    "rarity": "common",
    "imageUrl": "/gacha/justice-knight.webp",
    "color": "#9E9E9E"
  },
  {
    "id": "thrm-ex",
    "name": "THRM-EX",
    "series": "Arknights - Specialist",
    "rarity": "common",
    "imageUrl": "/gacha/thrm-ex.webp",
    "color": "#9E9E9E"
  },
  {
    "id": "castle-3",
    "name": "Castle-3",
    "series": "Arknights - Guard",
    "rarity": "common",
    "imageUrl": "/gacha/castle-3.webp",
    "color": "#9E9E9E"
  },
  {
    "id": "lancet-2",
    "name": "Lancet-2",
    "series": "Arknights - Medic",
    "rarity": "common",
    "imageUrl": "/gacha/lancet-2.webp",
    "color": "#9E9E9E"
  }
];

// Gacha config
export const GACHA_CONFIG = {
  singleCost: 50,
  multiCost: 450, // 10-pull with discount
  multiCount: 10,
  pityThreshold: 10, // guaranteed epic+ every 10 pulls without one
};

/**
 * Perform a gacha pull with weighted rarity.
 * pityCounter = number of pulls since last epic+ pull.
 */
export function pullGacha(pityCounter: number): WaifuCharacter {
  let roll = Math.random();

  // Pity: if pityCounter >= threshold, guarantee epic or legendary
  const isPity = pityCounter >= GACHA_CONFIG.pityThreshold;

  let selectedRarity: Rarity;

  if (isPity) {
    // 80% epic, 20% legendary on pity
    selectedRarity = roll < 0.2 ? "legendary" : "epic";
  } else {
    if (roll < RARITY_CONFIG.legendary.rate) {
      selectedRarity = "legendary";
    } else if (roll < RARITY_CONFIG.legendary.rate + RARITY_CONFIG.epic.rate) {
      selectedRarity = "epic";
    } else if (
      roll <
      RARITY_CONFIG.legendary.rate + RARITY_CONFIG.epic.rate + RARITY_CONFIG.rare.rate
    ) {
      selectedRarity = "rare";
    } else {
      selectedRarity = "common";
    }
  }

  const pool = WAIFU_POOL.filter((w) => w.rarity === selectedRarity);
  const picked = pool[Math.floor(Math.random() * pool.length)];
  return picked;
}