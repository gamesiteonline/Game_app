
import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Download, Star, HardDrive, ShieldCheck, Zap } from "lucide-react";

interface GameDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  game: {
    name: string;
    url: string;
    genre: string;
    size: string;
    rating: number;
    image?: string;
  } | null;
  platformColor: string;
}

export const GameDetailsModal = ({ isOpen, onClose, game, platformColor }: GameDetailsModalProps) => {
  if (!game) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Header Image */}
            <div className="relative h-64 bg-gradient-to-br from-white/5 to-black">
              {game.image ? (
                <img 
                  src={game.image} 
                  alt={game.name} 
                  className="w-full h-full object-cover opacity-60"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center opacity-20">
                  <Zap size={80} className={platformColor.replace('from-', 'text-').split(' ')[0]} />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
              
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 -mt-12 relative z-10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-gradient-to-r ${platformColor} text-white`}>
                  Ready to Install
                </span>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star size={14} fill="currentColor" />
                  <span className="text-xs font-bold">{game.rating}</span>
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-2">{game.name}</h2>
              <p className="text-gray-400 text-sm uppercase tracking-widest mb-8">{game.genre}</p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-white/5 text-gray-400">
                    <HardDrive size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase font-bold">File Size</div>
                    <div className="text-sm font-bold text-white">{game.size}</div>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-white/5 text-green-500">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase font-bold">Security</div>
                    <div className="text-sm font-bold text-white">Verified Safe</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <a 
                  href={game.url}
                  className={`w-full py-4 rounded-2xl bg-gradient-to-r ${platformColor} text-white font-bold text-lg flex items-center justify-center gap-3 shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all`}
                >
                  <Download size={24} /> DOWNLOAD NOW
                </a>
                <button 
                  onClick={onClose}
                  className="w-full py-3 text-gray-500 hover:text-white text-sm font-bold transition-colors"
                >
                  CANCEL
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
