
export interface PCGame {
  name: string;
  url: string;
  genre: string;
  size: string;
  rating: number;
  image?: string;
}

export const PC_GAMES_ENRICHED: PCGame[] = [
  {
    name: "Grand Theft Auto - San Andreas",
    url: "https://archive.org/download/pc_redump/PC%20Redump/Grand%20Theft%20Auto%20-%20San%20Andreas%20%28USA%29.zip",
    genre: "Action / Open World",
    size: "4.2 GB",
    rating: 4.9,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1v99.jpg"
  },
  {
    name: "Grand Theft Auto - Vice City",
    url: "https://archive.org/download/pc_redump/PC%20Redump/Grand%20Theft%20Auto%20-%20Vice%20City%20%28USA%2C%20Europe%29%20%28En%2CFr%2CDe%2CEs%2CIt%29%20%28Play%29.zip",
    genre: "Action / Open World",
    size: "750 MB",
    rating: 4.8,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1v98.jpg"
  },
  {
    name: "BioShock",
    url: "https://archive.org/download/pc_redump/PC%20Redump/BioShock%20%28USA%29%20%28En%2CFr%2CDe%2CEs%2CIt%29.zip",
    genre: "FPS / RPG",
    size: "6.5 GB",
    rating: 4.9,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1v97.jpg"
  },
  {
    name: "Call of Duty 4 - Modern Warfare",
    url: "https://archive.org/download/pc_redump/PC%20Redump/Call%20of%20Duty%204%20-%20Modern%20Warfare%20%28USA%2C%20Europe%29%20%28Game%20of%20the%20Year%20Edition%29.zip",
    genre: "FPS",
    size: "7.0 GB",
    rating: 4.8,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1v96.jpg"
  },
  {
    name: "Half-Life (Game of the Year Edition)",
    url: "https://archive.org/download/pc_redump/PC%20Redump/Half-Life%20%28USA%29%20%28Game%20of%20the%20Year%20Edition%29.zip",
    genre: "FPS / Sci-Fi",
    size: "660 MB",
    rating: 4.9,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1v95.jpg"
  },
  {
    name: "Age of Empires II - The Age of Kings",
    url: "https://archive.org/download/pc_redump/PC%20Redump/Age%20of%20Empires%20II%20-%20The%20Age%20of%20Kings%20%28USA%29.zip",
    genre: "Strategy / RTS",
    size: "630 MB",
    rating: 4.7,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1v94.jpg"
  },
  {
    name: "Star Wars - Knights of the Old Republic",
    url: "https://archive.org/download/pc_redump/PC%20Redump/Star%20Wars%20-%20Knights%20of%20the%20Old%20Republic%20%28USA%29%20%28Disc%201%29%20%28Play%20Disc%29.zip",
    genre: "RPG",
    size: "3.0 GB",
    rating: 4.9,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1v93.jpg"
  },
  {
    name: "Max Payne",
    url: "https://archive.org/download/pc_redump/PC%20Redump/Max%20Payne%20%28USA%2C%20Europe%29.zip",
    genre: "Action / Shooter",
    size: "815 MB",
    rating: 4.7,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1v92.jpg"
  },
  {
    name: "Diablo II",
    url: "https://archive.org/download/pc_redump/PC%20Redump/Diablo%20II%20%28USA%29%20%28Play%20Disc%29.zip",
    genre: "Action RPG",
    size: "2.0 GB",
    rating: 4.8,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1v91.jpg"
  },
  {
    name: "Warcraft III - Reign of Chaos",
    url: "https://archive.org/download/pc_redump/PC%20Redump/WarCraft%20III%20-%20Reign%20of%20Chaos%20%28USA%29.zip",
    genre: "Strategy / RTS",
    size: "730 MB",
    rating: 4.8,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1v90.jpg"
  }
];

export const formatSize = (bytes: string): string => {
  const b = parseInt(bytes);
  if (isNaN(b)) return "Varies";
  if (b > 1024 * 1024 * 1024) return (b / (1024 * 1024 * 1024)).toFixed(1) + " GB";
  return (b / (1024 * 1024)).toFixed(0) + " MB";
};

export const getAllPCGames = (rawList: {name: string, download_url: string, size: string}[]): PCGame[] => {
  return rawList.map(raw => {
    // Clean up the name from the new format
    // Format: "[1] Game Name" or "Game Name"
    const cleanName = raw.name.replace(/^\[\d+\]\s*/, "");
    
    const enriched = PC_GAMES_ENRICHED.find(g => cleanName.toLowerCase().includes(g.name.toLowerCase()));
    
    if (enriched) return { ...enriched, url: raw.download_url, size: raw.size };
    
    // Determine genre based on keywords in name
    let genre = "PC Classic";
    const nameLower = cleanName.toLowerCase();
    if (nameLower.includes("doom") || nameLower.includes("quake") || nameLower.includes("wolfenstein")) genre = "FPS";
    else if (nameLower.includes("rpg") || nameLower.includes("quest")) genre = "RPG";
    else if (nameLower.includes("race") || nameLower.includes("rally") || nameLower.includes("driving")) genre = "Racing";
    else if (nameLower.includes("strategy") || nameLower.includes("empire")) genre = "Strategy";
    else if (nameLower.includes("magazine")) genre = "Media";
    
    return {
      name: cleanName,
      url: raw.download_url,
      genre: genre,
      size: raw.size,
      rating: 4.0 + (Math.random() * 0.9) // Randomize rating for variety
    };
  });
};
