
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Monitor, Cpu, HardDrive, Terminal, Zap, Lightbulb } from "lucide-react";

const PC_HINTS = [
  "The PC Master Race offers the highest frame rates and resolutions.",
  "Half-Life changed the FPS genre forever with its seamless storytelling.",
  "San Andreas is the best-selling game on the original PC Redump list.",
  "RTS games like Age of Empires II are best played with a mouse and keyboard.",
  "Modding is a core part of the PC gaming experience.",
  "Always check your system requirements before downloading large titles."
];

export const PCIntro = ({ onComplete }: { onComplete: () => void, key?: string }) => {
  const [hintIndex, setHintIndex] = useState(0);

  useEffect(() => {
    const hintTimer = setInterval(() => {
      setHintIndex((prev) => (prev + 1) % PC_HINTS.length);
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
      className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center p-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.1)_0%,transparent_70%)]" />
      
      {/* Matrix-like background effect */}
      <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -100 }}
            animate={{ y: window.innerHeight + 100 }}
            transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, ease: "linear", delay: Math.random() * 5 }}
            className="absolute text-[10px] font-mono text-purple-500 whitespace-nowrap"
            style={{ left: `${i * 10}%` }}
          >
            {Array(50).fill(0).map(() => Math.random() > 0.5 ? "1" : "0").join("")}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative mb-12"
      >
        <div className="w-24 h-24 rounded-2xl bg-purple-600 flex items-center justify-center shadow-[0_0_40px_rgba(147,51,234,0.4)]">
          <Monitor size={48} className="text-white" />
        </div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-6 border border-purple-500/20 rounded-full"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-2 border-2 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full"
        />
      </motion.div>

      <motion.h2 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-3xl font-bold tracking-tighter text-white mb-2"
      >
        PC <span className="text-purple-500 font-light">MASTER RACE</span>
      </motion.h2>
      <div className="flex items-center gap-2 text-gray-500 text-[10px] uppercase tracking-[0.4em] mb-16">
        <Cpu size={12} /> 
        <span>System Initialized</span>
        <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
      </div>

      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden">
        <div className="flex items-center gap-3 mb-4 text-purple-400">
          <Lightbulb size={20} />
          <span className="text-xs font-bold uppercase tracking-widest">PC Pro Tip</span>
        </div>
        
        <div className="h-16 flex items-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={hintIndex}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="text-gray-300 text-lg leading-tight font-medium"
            >
              {PC_HINTS[hintIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="mt-6 w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 6, ease: "linear" }}
            className="h-full bg-purple-500 shadow-[0_0_10px_#a855f7]"
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5.5 }}
        className="mt-12 flex items-center gap-3 text-[10px] text-gray-600 font-mono"
      >
        <Terminal size={12} />
        <span className="animate-pulse">MOUNTING REDUMP DATABASE...</span>
      </motion.div>
    </motion.div>
  );
};
