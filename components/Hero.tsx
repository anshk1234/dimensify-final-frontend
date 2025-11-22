import React, { useEffect, useRef } from 'react';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Particles setup
    const particles: { x: number; y: number; baseX: number; baseY: number; size: number; color: string }[] = [];
    const gap = 30; // Tighter gap for better density
    const rows = Math.ceil(height / gap);
    const cols = Math.ceil(width / gap);

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        particles.push({
          x: x * gap,
          y: y * gap,
          baseX: x * gap,
          baseY: y * gap,
          size: 2.2, 
          color: 'rgba(255, 255, 255, 0.3)', 
        });
      }
    }

    let time = 0;
    const mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      // Re-init particles on resize could be added here for perfection, 
      // but simplest approach is just resizing canvas
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.015;

      particles.forEach((p) => {
        // Wave effect
        const waveY = Math.sin(p.x * 0.008 + time) * 15 + Math.cos(p.y * 0.008 + time) * 15;
        
        // Mouse interaction
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 300;
        let forceX = 0;
        let forceY = 0;

        if (distance < maxDistance) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (maxDistance - distance) / maxDistance;
          // Repel force
          forceX = forceDirectionX * force * 60;
          forceY = forceDirectionY * force * 60;
        }

        p.y = p.baseY + waveY + forceY;
        p.x = p.baseX + forceX;

        // Draw
        // Calculate opacity based on proximity to mouse for a spotlight effect, plus base visibility
        const spotlight = Math.max(0, 1 - distance / 400);
        const baseOpacity = 0.2; // Always visible
        const finalOpacity = Math.min(1, baseOpacity + spotlight * 0.6);

        ctx.fillStyle = `rgba(255, 255, 255, ${finalOpacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Shader/Canvas Background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0"
      />
      
      {/* Gradient Overlay to blend bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none z-0" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="pointer-events-auto"
        >
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 backdrop-blur-sm">
            <span className="text-brand-400 text-sm font-medium tracking-wide uppercase">v2.0 Now Live</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 text-white drop-shadow-2xl">
            Reality, <br /> Reimagined.
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
            The all-in-one platform to view, edit, and generate photorealistic 3D assets directly in your browser. Powered by next-gen AI.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto bg-white text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              Start Creating
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-lg border border-white/20 bg-black/40 backdrop-blur-md hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-gray-300">
              <PlayCircle className="w-5 h-5" />
              Watch Demo
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2 backdrop-blur-sm">
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};