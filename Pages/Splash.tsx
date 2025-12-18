
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, ChevronRight, Sparkles, TrendingDown, Zap } from 'lucide-react';

const Splash: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [stage, setStage] = useState<'branding' | 'ecosystem'>('branding');

  useEffect(() => {
    // Increased duration to allow for slower, more graceful animations
    const timer = setTimeout(() => setStage('ecosystem'), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden relative" style={{ perspective: '1200px' }}>
      <AnimatePresence mode="wait">
        {stage === 'branding' ? (
          <motion.div 
            key="branding"
            initial={{ opacity: 0, scale: 0.05, z: -1000, rotateX: 20 }}
            animate={{ opacity: 1, scale: 1, z: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 2.2, z: 500, rotateX: -10 }}
            transition={{ 
              duration: 2.2, // Slower entrance as requested
              ease: [0.16, 1, 0.3, 1],
              opacity: { duration: 1.2 } 
            }}
            className="flex-1 flex flex-col items-center justify-center z-10"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* The Floating 3D Logo Component */}
            <motion.div 
              animate={{ 
                y: [0, -15, 0], // Slower floating vertical motion
                rotateY: [-8, 8, -8], // Subtle 3D tilt
                rotateX: [5, -5, 5] // Subtle 3D tilt
              }}
              transition={{ 
                duration: 8, // Slower movement loop
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="w-44 h-44 bg-green-600 rounded-[3.5rem] flex items-center justify-center mb-10 shadow-[0_40px_100px_rgba(22,163,74,0.35)] relative"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Leaf className="text-white fill-current" size={80} style={{ transform: 'translateZ(30px)' }} />
              
              {/* Outer Energy Ring */}
              <motion.div 
                animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute inset-[-22px] border-[2px] border-green-600/10 rounded-[4.5rem]"
              />
            </motion.div>

            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-5xl font-black text-gray-900 tracking-tighter"
            >
              GreenPlate
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="flex items-center gap-3 mt-6 bg-green-50 px-4 py-1.5 rounded-full border border-green-100"
            >
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <p className="text-green-600 font-black uppercase tracking-[0.4em] text-[9px]">
                Syncing Environment
              </p>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            key="ecosystem"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="flex-1 flex flex-col p-10 pt-16 z-10 bg-[#FDFDFD]"
          >
            <header className="flex items-center justify-between mb-16">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center shadow-[0_10px_30px_rgba(22,163,74,0.2)]">
                    <Leaf className="text-white fill-current" size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900 tracking-tighter leading-none">Terminal</h2>
                    <span className="text-[10px] font-black text-green-600 uppercase tracking-widest mt-1 block">Surplus Marketplace</span>
                  </div>
               </div>
            </header>

            <div className="grid grid-cols-2 gap-4 mb-10">
               <RevealCard delay={0.1} icon={<Sparkles size={22} className="text-blue-500" />} title="AI Nutrition" color="bg-white" />
               <RevealCard delay={0.2} icon={<TrendingDown size={22} className="text-green-600" />} title="70% Surplus" color="bg-white" />
               <RevealCard delay={0.3} icon={<Zap size={22} className="text-orange-500" />} title="Instant Claim" color="bg-green-600" isFull />
            </div>

            <div className="mt-auto">
              <motion.button 
                whileTap={{ scale: 0.98 }}
                onClick={onFinish}
                className="w-full bg-gray-900 text-white py-6 rounded-[2.5rem] font-black text-sm uppercase tracking-[0.4em] flex items-center justify-center gap-4 shadow-[0_25px_60px_rgba(0,0,0,0.15)] group transition-all"
              >
                Access Hub
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <p className="text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.5em] mt-10">
                Secure • Verified • Green
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const RevealCard: React.FC<{ delay: number; icon: React.ReactNode; title: string; color: string; isFull?: boolean }> = ({ delay, icon, title, color, isFull }) => (
  <motion.div 
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5, ease: "easeOut" }}
    className={`${isFull ? 'col-span-2 h-32' : 'col-span-1 h-36'} ${color} p-7 rounded-[2.5rem] border border-gray-100 flex flex-col justify-between shadow-sm`}
  >
    <div className={`w-12 h-12 ${color === 'bg-green-600' ? 'bg-white/10' : 'bg-gray-50'} rounded-2xl flex items-center justify-center`}>
      {icon}
    </div>
    <h4 className={`text-xl font-black tracking-tighter leading-none ${color === 'bg-green-600' ? 'text-white' : 'text-gray-900'}`}>{title}</h4>
  </motion.div>
);

export default Splash;
