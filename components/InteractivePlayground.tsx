import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Layers, Palette, Box, RefreshCcw, Cpu, Activity, Triangle, Zap, Grid, MousePointer2 } from 'lucide-react';

type ViewMode = 'solid' | 'wireframe' | 'hybrid';
type ShapeType = 'sphere' | 'box' | 'torus' | 'cone';

export const InteractivePlayground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeColor, setActiveColor] = useState('#0ea5e9');
  const [viewMode, setViewMode] = useState<ViewMode>('hybrid');
  const [shapeType, setShapeType] = useState<ShapeType>('torus');
  const [stats, setStats] = useState({ fps: 60, vertices: 0, triangles: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Refs for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const wireframeRef = useRef<THREE.Mesh | null>(null); // For hybrid mode
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameIdRef = useRef<number>(0);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Setup Scene
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 6);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const backLight = new THREE.PointLight(0x0ea5e9, 10);
    backLight.position.set(-5, -5, -5);
    scene.add(backLight);

    // 2. Create Initial Geometry
    createMesh(shapeType, activeColor, viewMode);

    // 3. Animation Loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      
      const time = Date.now() * 0.001;

      // Smooth rotation based on default animation
      if (meshRef.current) {
        meshRef.current.rotation.x += 0.002;
        meshRef.current.rotation.y += 0.005;
      }
      if (wireframeRef.current) {
        wireframeRef.current.rotation.x += 0.002;
        wireframeRef.current.rotation.y += 0.005;
      }

      // Fake FPS fluctuation for UI
      if (Math.random() > 0.98) {
        setStats(prev => ({ ...prev, fps: Math.floor(58 + Math.random() * 4) }));
      }

      renderer.render(scene, camera);
    };
    animate();

    // 4. Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameIdRef.current);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []); // Init only

  // Function to rebuild mesh based on state
  const createMesh = (shape: ShapeType, color: string, mode: ViewMode) => {
    if (!sceneRef.current) return;

    // Remove old meshes
    if (meshRef.current) {
        sceneRef.current.remove(meshRef.current);
        meshRef.current.geometry.dispose();
        (meshRef.current.material as THREE.Material).dispose();
        meshRef.current = null;
    }
    if (wireframeRef.current) {
        sceneRef.current.remove(wireframeRef.current);
        wireframeRef.current.geometry.dispose();
        (wireframeRef.current.material as THREE.Material).dispose();
        wireframeRef.current = null;
    }

    // Geometry Selection
    let geometry;
    switch(shape) {
        case 'box': geometry = new THREE.BoxGeometry(2, 2, 2, 4, 4, 4); break;
        case 'sphere': geometry = new THREE.IcosahedronGeometry(1.8, 2); break;
        case 'cone': geometry = new THREE.ConeGeometry(1.5, 3, 16, 8); break;
        case 'torus': default: geometry = new THREE.TorusKnotGeometry(1, 0.3, 120, 20); break;
    }

    // Update Stats
    setStats(prev => ({
        ...prev,
        vertices: geometry.attributes.position.count,
        triangles: geometry.index ? geometry.index.count / 3 : geometry.attributes.position.count / 3
    }));

    // Material Setup
    const material = new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.2,
        metalness: 0.8,
        flatShading: true, // Highlights the triangles more
        wireframe: mode === 'wireframe'
    });

    const mesh = new THREE.Mesh(geometry, material);
    sceneRef.current.add(mesh);
    meshRef.current = mesh;

    // Hybrid Mode: Add a second mesh for the wireframe overlay
    if (mode === 'hybrid') {
        const wireMat = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
            transparent: true,
            opacity: 0.15
        });
        const wireMesh = new THREE.Mesh(geometry.clone(), wireMat);
        wireMesh.scale.setScalar(1.001); 
        sceneRef.current.add(wireMesh);
        wireframeRef.current = wireMesh;
    }
  };

  // Effects to trigger updates
  useEffect(() => {
    createMesh(shapeType, activeColor, viewMode);
  }, [activeColor, viewMode, shapeType]);


  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden border-t border-white/5">
       {/* Futuristic Background Elements */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-[10%] left-[5%] w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[80px]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
       </div>

       <div className="max-w-[1600px] mx-auto px-6 relative z-10">
          
          {/* Header */}
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
                <div className="flex items-center gap-2 text-brand-500 mb-2 font-mono text-sm">
                    <Cpu className="w-4 h-4" />
                    <span>INTERACTIVE_DEMO_V2.4</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                    Inspect. <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-purple-400">Analyze.</span>
                </h2>
            </div>
            <div className="flex items-center gap-4">
               <div className="hidden md:flex items-center gap-2 text-xs font-mono text-gray-500 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  SYSTEM_ONLINE
               </div>
            </div>
          </div>

          {/* Layout Grid - Reduced height and fixed order */}
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:h-[600px]">
            
            {/* Main Viewport - Always First */}
            <div className="lg:col-span-9 h-[400px] lg:h-full relative group order-1">
                {/* Canvas Container */}
                <div 
                  className="w-full h-full bg-[#0a0a0a] rounded-3xl border border-white/10 relative overflow-hidden shadow-2xl transition-colors duration-500 hover:border-brand-500/30"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.08),transparent_70%)]" />
                    
                    {/* 3D Scene */}
                    <div ref={containerRef} className="w-full h-full cursor-move relative z-10" />

                    {/* HUD Overlay: Top Left */}
                    <div className="absolute top-6 left-6 z-20 pointer-events-none">
                        <div className="flex flex-col gap-2">
                             <div className="bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-md flex items-center gap-3 w-fit">
                                <Activity className="w-3 h-3 text-brand-400" />
                                <span className="text-xs font-mono text-gray-300">REALTIME_RENDER</span>
                             </div>
                             <div className="bg-black/80 backdrop-blur-md border border-white/10 px-4 py-4 rounded-xl text-xs font-mono text-gray-300 space-y-2 min-w-[180px]">
                                <div className="flex justify-between border-b border-white/10 pb-2 mb-2">
                                    <span className="text-gray-500">METRICS</span>
                                </div>
                                <div className="flex justify-between gap-8">
                                    <span className="text-gray-500">FPS</span>
                                    <span className="text-brand-400">{stats.fps}</span>
                                </div>
                                <div className="flex justify-between gap-8">
                                    <span className="text-gray-500">VERTS</span>
                                    <span>{stats.vertices.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between gap-8">
                                    <span className="text-gray-500">TRIS</span>
                                    <span>{Math.floor(stats.triangles).toLocaleString()}</span>
                                </div>
                             </div>
                        </div>
                    </div>

                    {/* HUD Overlay: Bottom Center - Interactive Prompt */}
                    <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
                         <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 text-xs text-gray-400">
                            <MousePointer2 className="w-3 h-3" />
                            <span>Hover to interact</span>
                         </div>
                    </div>

                    {/* HUD Overlay: Bottom Right */}
                    <div className="absolute bottom-6 right-6 z-20 pointer-events-none hidden sm:block">
                        <div className="flex items-center gap-4 text-xs font-mono text-brand-900/50">
                             <span>COORD_X: {(Math.random() * 100).toFixed(2)}</span>
                             <span>COORD_Y: {(Math.random() * 100).toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Decoration Corners */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-500/20 to-transparent opacity-50" />
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-500/20 to-transparent opacity-50" />
                    
                    <div className="absolute top-8 left-8 w-3 h-3 border-l border-t border-brand-500 opacity-50" />
                    <div className="absolute top-8 right-8 w-3 h-3 border-r border-t border-brand-500 opacity-50" />
                    <div className="absolute bottom-8 left-8 w-3 h-3 border-l border-b border-brand-500 opacity-50" />
                    <div className="absolute bottom-8 right-8 w-3 h-3 border-r border-b border-brand-500 opacity-50" />
                </div>
            </div>

            {/* Sidebar Controls - Always Second */}
            <div className="lg:col-span-3 flex flex-col gap-4 h-fit lg:h-full order-2">
                
                {/* View Mode Panel */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-5 shadow-xl">
                    <div className="flex items-center gap-2 mb-4 text-gray-400 text-xs font-bold uppercase tracking-wider">
                        <Layers className="w-4 h-4" /> Render Mode
                    </div>
                    <div className="grid grid-cols-3 lg:grid-cols-1 gap-2">
                        {(['solid', 'hybrid', 'wireframe'] as ViewMode[]).map((mode) => (
                            <button
                                key={mode}
                                onClick={() => setViewMode(mode)}
                                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-center lg:justify-between group border ${
                                    viewMode === mode 
                                    ? 'bg-brand-500/10 border-brand-500/50 text-white shadow-[0_0_20px_rgba(14,165,233,0.1)]' 
                                    : 'bg-black border-transparent text-gray-500 hover:bg-white/5 hover:text-gray-300'
                                }`}
                            >
                                <span className="capitalize hidden lg:inline">{mode}</span>
                                <span className="lg:hidden">{mode.slice(0,3)}</span>
                                {mode === 'hybrid' && <Layers className="w-4 h-4" />}
                                {mode === 'wireframe' && <Grid className="w-4 h-4" />}
                                {mode === 'solid' && <Box className="w-4 h-4" />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Geometry Panel */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-5 flex-1 flex flex-col shadow-xl">
                     <div className="flex items-center gap-2 mb-4 text-gray-400 text-xs font-bold uppercase tracking-wider">
                        <Box className="w-4 h-4" /> Geometry
                    </div>
                    <div className="grid grid-cols-4 lg:grid-cols-2 gap-2 mb-8">
                        {(['torus', 'sphere', 'box', 'cone'] as ShapeType[]).map((shape) => (
                            <button
                                key={shape}
                                onClick={() => setShapeType(shape)}
                                className={`p-3 rounded-xl text-xs font-medium transition-all border ${
                                    shapeType === shape
                                    ? 'bg-white/10 border-brand-500/50 text-white shadow-inner'
                                    : 'bg-black/40 border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/5'
                                }`}
                            >
                                {shape.toUpperCase().slice(0,3)}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 mb-4 text-gray-400 text-xs font-bold uppercase tracking-wider">
                        <Palette className="w-4 h-4" /> Material Color
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {['#0ea5e9', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444'].map((color) => (
                            <button
                                key={color}
                                onClick={() => setActiveColor(color)}
                                className={`w-10 h-10 rounded-lg border-2 transition-all hover:scale-105 ${activeColor === color ? 'border-white ring-2 ring-white/20' : 'border-transparent opacity-40 hover:opacity-100'}`}
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                    
                    <div className="mt-auto pt-6 border-t border-white/5 hidden lg:block">
                        <div className="flex items-start gap-3 p-3 rounded-xl bg-brand-900/10 border border-brand-500/10">
                            <div className="p-1.5 bg-brand-500/20 rounded-lg text-brand-400">
                                <Zap className="w-4 h-4" />
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-white mb-0.5">Pro Feature</h4>
                                <p className="text-[10px] text-gray-400 leading-relaxed">
                                    Access UV unwrapping and normal map generation in the Studio plan.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
          </div>
       </div>
    </section>
  );
};