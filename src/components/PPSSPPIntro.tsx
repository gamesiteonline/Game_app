
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Gamepad2, Zap, Info, Lightbulb } from "lucide-react";

const HINTS = [
  "Use CSO format for better compression on your storage.",
  "God of War: Ghost of Sparta is widely considered the best looking PSP game.",
  "PPSSPP supports 4K upscaling for a modern look.",
  "Hold the 'Fast Forward' button to skip long loading screens.",
  "Save states allow you to save anywhere, anytime.",
  "Multiplayer is possible via Ad-hoc server settings."
];

export const PPSSPPIntro = ({ onComplete }: { onComplete: () => void, key?: string }) => {
  const [hintIndex, setHintIndex] = useState(0);

  useEffect(() => {
    const hintTimer = setInterval(() => {
      setHintIndex((prev) => (prev + 1) % HINTS.length);
    }, 2000);

    const completeTimer = setTimeout(onComplete, 6000);

    return () => {
      clearInterval(hintTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center p-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)]" />
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative mb-12"
      >
        <div className="w-24 h-24 rounded-2xl bg-blue-600 flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.4)]">
          <Gamepad2 size={48} className="text-white" />
        </div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-4 border border-dashed border-blue-500/30 rounded-full"
        />
      </motion.div>

      <motion.h2 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-3xl font-bold tracking-tighter text-white mb-2"
      >
        PPSSPP <span className="text-blue-500">EMULATOR</span>
      </motion.h2>
      <p className="text-gray-500 text-sm uppercase tracking-[0.3em] mb-16">Optimizing Library</p>

      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden">
        <div className="flex items-center gap-3 mb-4 text-blue-400">
          <Lightbulb size={20} />
          <span className="text-xs font-bold uppercase tracking-widest">Pro Tip</span>
        </div>
        
        <div className="h-16 flex items-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={hintIndex}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              className="text-gray-300 text-lg leading-tight"
            >
              {HINTS[hintIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="mt-6 w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 6, ease: "linear" }}
            className="h-full bg-blue-500 shadow-[0_0_10px_#3b82f6]"
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5.5 }}
        className="mt-12 text-[10px] text-gray-600 font-mono animate-pulse"
      >
        SYNCING DATABASE...
      </motion.div>
    </motion.div>
  );
};
