
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, Download, Star, ArrowLeft, 
  Monitor, HardDrive, Info, Filter, ExternalLink,
  ChevronLeft, ChevronRight
} from "lucide-react";
import { PCGame, getAllPCGames } from "../data/pcGames";
import { GameDetailsModal } from "./GameDetailsModal";

interface PCGamesScreenProps {
  onBack: () => void;
  rawGames: any[];
  key?: string;
}

const ITEMS_PER_PAGE = 12;

export const PCGamesScreen = ({ onBack, rawGames }: PCGamesScreenProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGame, setSelectedGame] = useState<PCGame | null>(null);

  const allGames = useMemo(() => getAllPCGames(rawGames), [rawGames]);

  const genres = useMemo(() => {
    const allGenres = allGames.map(g => g.genre.split(" / ")[0]);
    return ["All", ...Array.from(new Set(allGenres))];
  }, [allGames]);

  const filteredGames = useMemo(() => {
    return allGames.filter(game => {
      const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = selectedGenre === "All" || game.genre.includes(selectedGenre);
      return matchesSearch && matchesGenre;
    });
  }, [allGames, searchQuery, selectedGenre]);

  const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);
  const paginatedGames = filteredGames.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#050505] text-white p-6 md:p-12"
    >
      {/* Header */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold tracking-tighter flex items-center gap-3">
              <Monitor className="text-purple-500" /> PC <span className="text-gray-500 font-light">REDUMP</span>
            </h1>
            <p className="text-sm text-gray-500 uppercase tracking-widest">Digital Preservation Library</p>
          </div>
        </div>

        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search PC games..." 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-purple-500/50 transition-all"
          />
        </div>
      </header>

      {/* Pagination & Filters Container */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {genres.map(genre => (
            <button
              key={genre}
              onClick={() => {
                setSelectedGenre(genre);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                selectedGenre === genre 
                ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]" 
                : "bg-white/5 text-gray-500 hover:text-white hover:bg-white/10"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button 
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 disabled:opacity-20 hover:bg-white/10 transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                if (totalPages > 5 && Math.abs(page - currentPage) > 1 && page !== 1 && page !== totalPages) {
                  if (page === 2 || page === totalPages - 1) return <span key={page} className="px-1 text-gray-600">...</span>;
                  return null;
                }
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                      currentPage === page 
                      ? "bg-purple-600 text-white" 
                      : "bg-white/5 text-gray-500 hover:text-white"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 disabled:opacity-20 hover:bg-white/10 transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Games Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {paginatedGames.map((game, index) => (
            <motion.div
              key={game.name + index}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedGame(game)}
              className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all cursor-pointer"
            >
              {/* Game Image or Placeholder */}
              <div className="aspect-[16/9] bg-gradient-to-br from-purple-900/20 to-black relative overflow-hidden">
                {game.image ? (
                  <img 
                    src={game.image} 
                    alt={game.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Monitor size={48} className="text-white/10" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-purple-600 text-[10px] font-bold rounded uppercase">PC</span>
                  <span className="px-2 py-0.5 bg-black/60 backdrop-blur-md text-[10px] font-bold rounded uppercase flex items-center gap-1">
                    <HardDrive size={10} /> {game.size}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-lg leading-tight group-hover:text-purple-400 transition-colors line-clamp-1">
                    {game.name}
                  </h3>
                  <div className="flex items-center gap-1 text-yellow-500 shrink-0">
                    <Star size={14} fill="currentColor" />
                    <span className="text-xs font-bold">{game.rating.toFixed(1)}</span>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 mb-6 font-medium uppercase tracking-wider">
                  {game.genre}
                </p>

                <div className="flex items-center gap-2">
                  <button 
                    className="flex-1 bg-white text-black py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-purple-500 hover:text-white transition-all shadow-lg"
                  >
                    <Download size={14} /> GET ZIP
                  </button>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                    <Info size={14} className="text-gray-400" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredGames.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 text-gray-600">
          <Search size={48} className="mb-4 opacity-20" />
          <p className="text-xl font-medium">No PC games found matching your criteria</p>
        </div>
      )}

      {/* Download Modal */}
      <GameDetailsModal 
        isOpen={!!selectedGame} 
        onClose={() => setSelectedGame(null)} 
        game={selectedGame}
        platformColor="from-purple-500 to-purple-700"
      />
    </motion.div>
  );
};
