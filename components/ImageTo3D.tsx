import React from 'react';
import { motion } from 'framer-motion';
import { Image, ArrowRight, Box } from 'lucide-react';

export const ImageTo3D: React.FC = () => {
  return (
    <section id="img-3d" className="py-24 bg-dark-900 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">2D to 3D Transformation</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Turn static images into fully interactable 3D assets using our advanced photogrammetry and depth-estimation neural networks.
          </p>
        </div>

        <div className="relative grid md:grid-cols-3 gap-4 items-center">
          
          {/* Step 1: Input */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-black p-6 rounded-3xl border border-white/5 h-[400px] flex flex-col"
          >
            <div className="flex-1 bg-dark-800 rounded-2xl mb-6 overflow-hidden relative group">
                <img src="https://picsum.photos/600/800?random=10" alt="Input" className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/50 backdrop-blur-sm p-3 rounded-full">
                        <Image className="w-6 h-6 text-white" />
                    </div>
                </div>
            </div>
            <h3 className="text-xl font-bold">Upload Image</h3>
            <p className="text-sm text-gray-500 mt-2">Support for PNG, JPG, and WEBP. High contrast works best.</p>
          </motion.div>

          {/* Arrow Connector (Desktop) */}
          <div className="hidden md:flex justify-center text-brand-500">
            <ArrowRight className="w-8 h-8 animate-pulse" />
          </div>

          {/* Step 2: Result */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-black p-6 rounded-3xl border border-brand-500/20 shadow-[0_0_50px_-12px_rgba(14,165,233,0.2)] h-[400px] flex flex-col relative overflow-hidden"
          >
             {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />

            <div className="flex-1 relative z-10 flex items-center justify-center">
                 {/* Spinning Box Representation */}
                <motion.div 
                    animate={{ rotateY: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="w-32 h-32 border-2 border-brand-400 bg-brand-500/10 flex items-center justify-center relative transform-style-3d"
                >
                    <Box className="w-12 h-12 text-brand-400" />
                </motion.div>
            </div>

            <div className="relative z-10">
                <h3 className="text-xl font-bold text-white">Get 3D Model</h3>
                <p className="text-sm text-gray-400 mt-2">Automatic depth mapping and texture projection complete.</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};