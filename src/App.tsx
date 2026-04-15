/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import { 
  Gamepad2, Download, Zap, Layers, ChevronRight, Share2, Trophy, Users, 
  Settings, LayoutDashboard, Monitor, Smartphone, Cpu, History, 
  Search, Bell, User, Filter, Star, Clock, Flame, Play, ArrowLeft
} from "lucide-react";
import { PPSSPPIntro } from "./components/PPSSPPIntro";
import { PPSSPPGamesScreen } from "./components/PPSSPPGamesScreen";
import { PCIntro } from "./components/PCIntro";
import { PCGamesScreen } from "./components/PCGamesScreen";
import { PC_RAW_GAMES } from "./data/pcRawData";

// --- Types ---
type ScreenState = "start" | "intro" | "dashboard" | "ppsspp-intro" | "ppsspp-games" | "pc-intro" | "pc-games";

interface Platform {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

interface Genre {
  id: string;
  name: string;
  count: string;
}

// --- Constants ---
const PLATFORMS: Platform[] = [
  { id: "ppsspp", name: "PPSSPP", icon: <Smartphone size={20} />, color: "from-blue-500 to-blue-700" },
  { id: "ps5", name: "PlayStation 5", icon: <Gamepad2 size={20} />, color: "from-blue-600 to-indigo-800" },
  { id: "xbox", name: "Xbox Series X", icon: <Gamepad2 size={20} />, color: "from-green-500 to-green-700" },
  { id: "pc", name: "PC Master Race", icon: <Monitor size={20} />, color: "from-gray-700 to-black" },
  { id: "switch", name: "Switch", icon: <Smartphone size={20} />, color: "from-red-500 to-red-600" },
  { id: "retro", name: "Retro Classics", icon: <History size={20} />, color: "from-yellow-600 to-orange-700" },
];

const GENRES: Genre[] = [
  { id: "action", name: "Action", count: "1.2k" },
  { id: "rpg", name: "RPG", count: "850" },
  { id: "strategy", name: "Strategy", count: "420" },
  { id: "sports", name: "Sports", count: "310" },
  { id: "horror", name: "Horror", count: "150" },
  { id: "simulation", name: "Simulation", count: "280" },
];

// --- Components ---

interface FloatingCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
}

const IntroVideo = ({ onComplete }: { onComplete: () => void, key?: string }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 4500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] z-[60]" />
      
      {/* Cinematic Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: 0,
              scale: 0
            }}
            animate={{ 
              y: [null, Math.random() * -200],
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0]
            }}
            transition={{ 
              duration: 2 + Math.random() * 2, 
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            className="absolute w-1 h-1 bg-gaming-primary rounded-full blur-[1px]"
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center">
        {/* Glitchy Text Effect */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative"
        >
          <motion.h2
            animate={{ 
              x: [-2, 2, -2, 0],
              filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(0deg)"]
            }}
            transition={{ duration: 0.2, repeat: Infinity, repeatType: "mirror" }}
            className="text-2xl font-bold tracking-[0.5em] text-gaming-secondary mb-4 uppercase"
          >
            Initializing
          </motion.h2>
        </motion.div>

        <div className="overflow-hidden flex flex-col items-center">
          <motion.h1
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-9xl font-bold tracking-tighter text-white text-center leading-none"
          >
            WELCOME
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: 1.2, ease: "easeInOut" }}
            className="h-[2px] bg-gradient-to-r from-transparent via-gaming-primary to-transparent my-4"
          />
          <motion.h1
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-bold tracking-tighter text-gaming-primary text-glow text-center leading-none"
          >
            GAME SITE ONLINE
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="mt-12 flex items-center gap-4"
        >
          <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.5, delay: 2.5, ease: "easeInOut" }}
              className="w-full h-full bg-gaming-secondary shadow-[0_0_10px_#00ffff]"
            />
          </div>
          <span className="text-xs font-mono text-gaming-secondary animate-pulse">LOADING ASSETS...</span>
        </motion.div>
      </div>

      {/* Flash Effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.5, delay: 4 }}
        className="absolute inset-0 bg-white z-50 pointer-events-none"
      />
    </motion.div>
  );
};

const SidebarItem = ({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${
      active 
      ? "bg-gaming-primary/10 text-gaming-primary border border-gaming-primary/20 shadow-[0_0_20px_rgba(255,0,255,0.1)]" 
      : "text-gray-500 hover:bg-white/5 hover:text-white"
    }`}
  >
    <div className={`${active ? "text-gaming-primary" : "group-hover:text-white"} transition-colors`}>
      {icon}
    </div>
    <span className="font-medium tracking-tight">{label}</span>
    {active && <motion.div layoutId="active-pill" className="ml-auto w-1.5 h-1.5 rounded-full bg-gaming-primary shadow-[0_0_10px_#ff00ff]" />}
  </button>
);

const Dashboard = ({ onNavigate }: { onNavigate: (screen: ScreenState) => void, key?: string }) => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex h-screen bg-[#050505] text-white overflow-hidden"
    >
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/5 bg-black/40 backdrop-blur-2xl p-6 flex flex-col gap-8">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-xl bg-gaming-primary flex items-center justify-center shadow-[0_0_20px_rgba(255,0,255,0.4)]">
            <Gamepad2 size={24} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tighter">GSO <span className="text-gaming-primary">PRO</span></span>
        </div>

        <nav className="flex-1 flex flex-col gap-2">
          <div className="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-bold mb-2 px-2">Main Menu</div>
          <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")} />
          <SidebarItem icon={<Monitor size={20} />} label="Platforms" active={activeTab === "platforms"} onClick={() => setActiveTab("platforms")} />
          <SidebarItem icon={<Layers size={20} />} label="Genres" active={activeTab === "genres"} onClick={() => setActiveTab("genres")} />
          <SidebarItem icon={<Trophy size={20} />} label="Achievements" active={activeTab === "achievements"} onClick={() => setActiveTab("achievements")} />
          
          <div className="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-bold mt-6 mb-2 px-2">System</div>
          <SidebarItem icon={<Settings size={20} />} label="Settings" active={activeTab === "settings"} onClick={() => setActiveTab("settings")} />
          <SidebarItem icon={<Bell size={20} />} label="Notifications" active={activeTab === "notifications"} onClick={() => setActiveTab("notifications")} />
        </nav>

        <div className="p-4 rounded-2xl bg-gradient-to-br from-gaming-primary/20 to-gaming-accent/20 border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <User size={16} />
            </div>
            <div>
              <div className="text-sm font-bold">Gamer_X</div>
              <div className="text-[10px] text-gaming-secondary uppercase tracking-widest">Premium Member</div>
            </div>
          </div>
          <button className="w-full py-2 bg-white text-black text-xs font-bold rounded-lg hover:bg-gray-200 transition-colors">
            LOGOUT
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-[#050505]/80 backdrop-blur-md border-bottom border-white/5 px-8 py-6 flex items-center justify-between">
          <div className="relative w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search games, platforms, or genres..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:border-gaming-primary/50 transition-all"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all relative">
              <Bell size={20} />
              <div className="absolute top-2 right-2 w-2 h-2 bg-gaming-primary rounded-full shadow-[0_0_10px_#ff00ff]" />
            </button>
            <div className="h-8 w-[1px] bg-white/10 mx-2" />
            <button className="flex items-center gap-3 px-4 py-2 bg-gaming-primary text-white rounded-xl font-bold text-sm shadow-[0_0_20px_rgba(255,0,255,0.3)] hover:scale-105 transition-transform">
              <Download size={18} />
              DOWNLOAD CLIENT
            </button>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {/* Hero Section */}
          <section className="mb-12">
            <div className="relative h-[400px] rounded-3xl overflow-hidden group">
              <img 
                src="https://picsum.photos/seed/gaming/1920/1080" 
                alt="Featured Game" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-12 left-12 max-w-xl">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-gaming-primary text-[10px] font-bold uppercase tracking-widest rounded-full">New Release</span>
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest rounded-full">Action RPG</span>
                </div>
                <h2 className="text-5xl font-bold mb-4 tracking-tighter">CYBERPUNK <span className="text-gaming-secondary">LEGENDS</span></h2>
                <p className="text-gray-300 mb-8 line-clamp-2">Experience the next generation of open-world gaming. High-octane action meets deep narrative choices in a neon-drenched future.</p>
                <div className="flex items-center gap-4">
                  <button className="px-8 py-3 bg-white text-black font-bold rounded-xl flex items-center gap-2 hover:bg-gray-200 transition-all">
                    <Play size={18} fill="black" /> PLAY NOW
                  </button>
                  <button className="px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 font-bold rounded-xl hover:bg-white/20 transition-all">
                    DETAILS
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Platforms Grid */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold tracking-tight">Explore Platforms</h3>
              <button className="text-sm text-gaming-secondary hover:text-gaming-primary transition-colors flex items-center gap-1">
                View All <ChevronRight size={16} />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {PLATFORMS.map((platform) => (
                <motion.button
                  key={platform.id}
                  whileHover={{ y: -5 }}
                  onClick={() => {
                    if (platform.id === "ppsspp") onNavigate("ppsspp-intro");
                    if (platform.id === "pc") onNavigate("pc-intro");
                  }}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-4 hover:border-gaming-primary/30 transition-all group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    {platform.icon}
                  </div>
                  <span className="text-sm font-bold text-gray-300 group-hover:text-white">{platform.name}</span>
                </motion.button>
              ))}
            </div>
          </section>

          {/* Genres Section */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold tracking-tight">Top Genres</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {GENRES.map((genre) => (
                <button 
                  key={genre.id}
                  className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-gaming-primary/10 hover:border-gaming-primary/30 transition-all flex items-center gap-3 group"
                >
                  <span className="font-bold text-gray-300 group-hover:text-white">{genre.name}</span>
                  <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-gray-500 group-hover:text-gaming-primary">{genre.count}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Trending Games */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold tracking-tight">Trending Now</h3>
              <div className="flex gap-2">
                <button className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10"><Filter size={18} /></button>
                <button className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10"><Star size={18} /></button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4">
                    <img 
                      src={`https://picsum.photos/seed/game-${i}/600/800`} 
                      alt="Game" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Download size={18} className="text-gaming-secondary" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                      <button className="w-full py-3 bg-gaming-primary text-white font-bold rounded-xl shadow-lg">
                        GET GAME
                      </button>
                    </div>
                  </div>
                  <h4 className="font-bold text-lg mb-1 group-hover:text-gaming-primary transition-colors">Epic Quest {i}</h4>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Star size={12} className="text-yellow-500" /> 4.9</span>
                    <span>•</span>
                    <span>Action</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </motion.div>
  );
};

const FloatingCard = ({ title, description, icon, delay = 0 }: FloatingCardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="relative h-96 w-72 rounded-xl bg-gradient-to-br from-gaming-accent/20 to-gaming-primary/20 p-8 glass-card cursor-pointer group"
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-4 grid place-content-center rounded-xl bg-white/5 shadow-lg border border-white/10"
      >
        <div style={{ transform: "translateZ(50px)" }} className="mb-4 flex justify-center text-gaming-secondary group-hover:text-gaming-primary transition-colors duration-300">
          {icon}
        </div>
        <h3
          style={{ transform: "translateZ(50px)" }}
          className="text-center text-2xl font-bold text-white mb-2"
        >
          {title}
        </h3>
        <p
          style={{ transform: "translateZ(50px)" }}
          className="text-center text-sm text-gray-400 px-4"
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [screen, setScreen] = useState<ScreenState>("start");

  return (
    <div className="min-h-screen w-full bg-[#050505] relative overflow-hidden font-sans">
      <AnimatePresence mode="wait">
        {screen === "start" && (
          <motion.div
            key="start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
            className="min-h-screen w-full flex flex-col items-center justify-center relative"
          >
            {/* Background Atmosphere */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gaming-primary/20 rounded-full blur-[120px] animate-pulse" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gaming-secondary/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
              <div className="absolute top-[30%] right-[20%] w-[30%] h-[30%] bg-gaming-accent/10 rounded-full blur-[100px]" />
            </div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

            <main className="relative z-10 container mx-auto px-4 py-20 flex flex-col items-center">
              {/* Logo Section */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="mb-12 relative"
              >
                <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-gaming-primary via-gaming-accent to-gaming-secondary p-[2px] shadow-[0_0_50px_rgba(255,0,255,0.3)]">
                  <div className="w-full h-full bg-[#050505] rounded-[22px] flex items-center justify-center overflow-hidden">
                    <Gamepad2 className="w-16 h-16 text-white" />
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-4 border border-dashed border-white/10 rounded-full pointer-events-none"
                />
              </motion.div>

              {/* Welcome Text */}
              <div className="text-center mb-20 max-w-3xl">
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40"
                >
                  GAME SITE <span className="text-gaming-primary text-glow text-glow">ONLINE</span>
                </motion.h1>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed"
                >
                  Your ultimate destination for gaming excellence. Download the latest titles across all platforms, genres, and generations.
                </motion.p>
              </div>

              {/* 3D Floating Cards Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 perspective-1000">
                <FloatingCard
                  title="All Platforms"
                  description="From PC and Console to Mobile and Retro. We've got every platform covered."
                  icon={<Layers size={48} />}
                  delay={0.6}
                />
                <FloatingCard
                  title="Instant Access"
                  description="High-speed downloads and seamless installation for all your favorite games."
                  icon={<Download size={48} />}
                  delay={0.8}
                />
                <FloatingCard
                  title="Pro Community"
                  description="Join millions of gamers, share reviews, and climb the global leaderboards."
                  icon={<Users size={48} />}
                  delay={1.0}
                />
              </div>

              {/* CTA Button */}
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setScreen("intro")}
                className="group relative px-12 py-5 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
              >
                <span className="relative z-10 flex items-center gap-2 text-lg">
                  ENTER THE ARENA <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-gaming-primary to-gaming-secondary opacity-0 group-hover:opacity-10 transition-opacity" />
              </motion.button>
            </main>
          </motion.div>
        )}

        {screen === "intro" && (
          <IntroVideo key="intro" onComplete={() => setScreen("dashboard")} />
        )}

        {screen === "dashboard" && (
          <Dashboard key="dashboard" onNavigate={setScreen} />
        )}

        {screen === "ppsspp-intro" && (
          <PPSSPPIntro key="ppsspp-intro" onComplete={() => setScreen("ppsspp-games")} />
        )}

        {screen === "ppsspp-games" && (
          <PPSSPPGamesScreen key="ppsspp-games" onBack={() => setScreen("dashboard")} />
        )}

        {screen === "pc-intro" && (
          <PCIntro key="pc-intro" onComplete={() => setScreen("pc-games")} />
        )}

        {screen === "pc-games" && (
          <PCGamesScreen key="pc-games" rawGames={PC_RAW_GAMES} onBack={() => setScreen("dashboard")} />
        )}
      </AnimatePresence>
    </div>
  );
}
