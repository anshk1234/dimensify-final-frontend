import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Command } from 'lucide-react';

export const AiGeneration: React.FC = () => {
  return (
    <section id="ai-gen" className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Text Content */}
        <div>
          <div className="flex items-center gap-2 text-purple-400 mb-4 font-medium">
            <Sparkles className="w-5 h-5" />
            <span>Generative AI</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Text to Geometry <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-brand-500">in Seconds.</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            Describe what you need, and Dimensify's proprietary engine builds a watertight, UV-mapped 3D mesh instantly. No modeling skills required.
          </p>

          <div className="bg-dark-800 rounded-2xl p-6 border border-white/10 max-w-md">
            <div className="flex items-center gap-3 mb-4 text-sm text-gray-500 border-b border-white/5 pb-4">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
              </div>
              <span>Prompt Editor</span>
            </div>
            <div className="flex items-center gap-3 text-gray-200 font-mono text-sm">
              <Command className="w-4 h-4 text-gray-500" />
              <span className="typing-cursor">"A futuristic cyberpunk helmet, worn, neon lights"</span>
            </div>
            <div className="mt-6 flex justify-end">
                <button className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-1.5 rounded text-xs font-bold transition-colors">
                    GENERATE
                </button>
            </div>
          </div>
        </div>

        {/* Visual/Demo */}
        <div className="relative h-[500px] w-full">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-purple-900/30 blur-[100px] rounded-full" />
            
            {/* Floating Cards Animation */}
            <motion.div 
                className="absolute top-10 right-0 w-64 h-64 bg-dark-800 rounded-2xl border border-white/10 overflow-hidden shadow-2xl z-20"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
                <img src="https://picsum.photos/400/400?random=1" alt="3D Model 1" className="w-full h-full object-cover opacity-80" />
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 to-transparent">
                    <span className="text-xs font-bold text-white">Cyberpunk Helmet</span>
                </div>
            </motion.div>

            <motion.div 
                className="absolute bottom-10 left-0 w-56 h-56 bg-dark-800 rounded-2xl border border-white/10 overflow-hidden shadow-2xl z-10"
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
                <img src="https://picsum.photos/400/400?random=2" alt="3D Model 2" className="w-full h-full object-cover opacity-80" />
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 to-transparent">
                    <span className="text-xs font-bold text-white">Retro Console</span>
                </div>
            </motion.div>

             <motion.div 
                className="absolute top-1/3 left-1/3 w-48 h-48 bg-dark-800 rounded-2xl border border-white/10 overflow-hidden shadow-2xl z-0 blur-[1px] opacity-60"
                animate={{ rotate: [0, 5, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
                <img src="https://picsum.photos/400/400?random=3" alt="3D Model 3" className="w-full h-full object-cover" />
            </motion.div>
        </div>
      </div>
    </section>
  );
};