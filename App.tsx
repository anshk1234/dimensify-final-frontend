import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features3D } from './components/Features3D';
import { InteractivePlayground } from './components/InteractivePlayground';
import { AiGeneration } from './components/AiGeneration';
import { ImageTo3D } from './components/ImageTo3D';
import { Integration } from './components/Integration';
import { Pricing } from './components/Pricing';
import { Support } from './components/Support';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-brand-500 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Features3D />
        <InteractivePlayground />
        <AiGeneration />
        <ImageTo3D />
        <Integration />
        <Pricing />
        <Support />
      </main>
      <Footer />
    </div>
  );
};

export default App;