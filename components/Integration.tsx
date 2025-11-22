import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Copy, Check, Code2, Zap, Globe, Shield } from 'lucide-react';

const codeSnippet = `import { Dimensify } from '@dimensify/sdk';

// Initialize the viewer
const viewer = new Dimensify({
  apiKey: process.env.DIMENSIFY_KEY,
  container: '#canvas-root',
  theme: 'dark'
});

// Load a high-fidelity model
await viewer.load('model-uuid-v4', {
  autoRotate: true,
  quality: 'high',
  shadows: true
});

// Listen for interactions
viewer.on('click', (mesh) => {
  console.log('Selected:', mesh.id);
});`;

export const Integration: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    let i = 0;
    setDisplayText('');
    
    const timer = setInterval(() => {
      setDisplayText(codeSnippet.slice(0, i));
      i++;
      if (i > codeSnippet.length) clearInterval(timer);
    }, 20); 
    return () => clearInterval(timer);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const highlightCode = (text: string) => {
    return text
      .replace(/import|from|const|new|await|true|false|process|return/g, '<span class="text-purple-400">$&</span>')
      .replace(/'[^']*'/g, '<span class="text-green-400">$&</span>')
      .replace(/\/\/.*/g, '<span class="text-gray-500">$&</span>')
      .replace(/Dimensify/g, '<span class="text-yellow-400">$&</span>');
  };

  return (
    <section className="py-24 bg-black relative border-t border-white/10 overflow-hidden">
       {/* Background grid */}
       <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left Content */}
        <div>
          <div className="flex items-center gap-2 text-brand-500 mb-6 font-mono text-sm tracking-wider uppercase">
            <Terminal className="w-4 h-4" />
            <span>Developer_API_v2</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Seamless <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-purple-400">Integration</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            Drop our SDK into your existing codebase. Whether you use React, Vue, or vanilla JS, Dimensify handles the WebGL complexity so you can focus on building the experience.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            {[
                { title: "TypeScript Ready", desc: "First-class type definitions.", icon: Code2 },
                { title: "Zero Config", desc: "Auto-optimized rendering.", icon: Zap },
                { title: "Global CDN", desc: "Assets served from the edge.", icon: Globe },
                { title: "Secure", desc: "Enterprise token management.", icon: Shield }
            ].map((feature) => (
                <div key={feature.title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-dark-800 border border-white/10 flex items-center justify-center shrink-0">
                        <feature.icon className="w-5 h-5 text-brand-400" />
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-sm mb-1">{feature.title}</h4>
                        <p className="text-xs text-gray-500">{feature.desc}</p>
                    </div>
                </div>
            ))}
          </div>

          <div className="flex items-center gap-4 pt-6 border-t border-white/5">
             <span className="text-xs text-gray-500 font-bold uppercase">Works with:</span>
             <div className="flex gap-4 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
                <span className="text-sm font-semibold text-white bg-white/10 px-2 py-1 rounded cursor-default">React</span>
                <span className="text-sm font-semibold text-white bg-white/10 px-2 py-1 rounded cursor-default">Vue</span>
                <span className="text-sm font-semibold text-white bg-white/10 px-2 py-1 rounded cursor-default">Next.js</span>
                <span className="text-sm font-semibold text-white bg-white/10 px-2 py-1 rounded cursor-default">Angular</span>
             </div>
          </div>
        </div>

        {/* Right Code Block */}
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
        >
             {/* Abstract Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-500/20 to-purple-500/20 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
            
            <div className="relative bg-[#0a0a0a] rounded-xl border border-white/10 shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-[#111] border-b border-white/5">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    </div>
                    <span className="text-xs font-mono text-gray-500 ml-4">main.tsx</span>
                    <button onClick={handleCopy} className="ml-auto text-gray-500 hover:text-white transition-colors" title="Copy Code">
                        {isCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                </div>
                <div className="p-6 overflow-x-auto custom-scrollbar min-h-[300px]">
                    <pre className="font-mono text-sm leading-relaxed text-gray-300">
                        <code>
                            <span dangerouslySetInnerHTML={{ __html: highlightCode(displayText) }} />
                            <span className="inline-block w-2 h-4 bg-brand-500 align-middle ml-1 animate-pulse"/>
                        </code>
                    </pre>
                </div>
                <div className="px-4 py-2 bg-[#111] border-t border-white/5 flex justify-between items-center text-[10px] text-gray-500 font-mono">
                    <span>TypeScript 5.0</span>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span>Ready</span>
                    </div>
                </div>
            </div>
        </motion.div>
      </div>
    </section>
  );
};