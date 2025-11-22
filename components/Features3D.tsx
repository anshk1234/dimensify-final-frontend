import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Layers, Sun, Box, Share2, Settings, Zap } from 'lucide-react';

const features = [
  {
    id: 1,
    title: "Real-time Lighting",
    desc: "Dynamic HDR rendering with raytracing capabilities in-browser.",
    icon: Sun,
    gradient: "from-orange-500 to-red-500"
  },
  {
    id: 2,
    title: "Material Editor",
    desc: "Node-based PBR material editing with instant visual feedback.",
    icon: Layers,
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: 3,
    title: "Universal Format",
    desc: "Drag & drop GLB, OBJ, FBX, and USDZ files seamlessly.",
    icon: Box,
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: 4,
    title: "Instant Sharing",
    desc: "Generate embeddable links or AR QR codes in one click.",
    icon: Share2,
    gradient: "from-emerald-500 to-green-500"
  },
];

export const Features3D: React.FC = () => {
  const constraintsRef = useRef(null);

  return (
    <section id="viewer" className="py-24 bg-dark-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Pro-Grade <span className="text-brand-500">3D Viewer</span></h2>
          <p className="text-gray-400 text-lg">
            A powerful web-based engine designed for artists and developers. 
            Drag the cards below to explore the toolkit.
          </p>
        </div>

        {/* Draggable Area */}
        <div ref={constraintsRef} className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing min-h-[400px]">
          <motion.div 
            className="flex gap-6 py-10 absolute left-0"
            drag="x"
            // Add some width to constraints to allow scrolling through all items
            dragConstraints={{ right: 0, left: -600 }}
          >
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                className="relative min-w-[300px] h-[380px] bg-dark-800 rounded-3xl p-8 border border-white/5 overflow-hidden group"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-10 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2`} />
                
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-8`}>
                  <feature.icon className="text-white w-6 h-6" />
                </div>

                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>

                <div className="absolute bottom-8 left-8 right-8 pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-sm text-gray-500 font-mono">0{feature.id}</span>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <Settings className="w-4 h-4 text-gray-300" />
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Extra card to prompt dragging */}
            <div className="min-w-[100px] flex items-center justify-center opacity-20">
              <span className="writing-vertical-lr rotate-180 text-xl tracking-widest font-bold">DRAG FOR MORE</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};