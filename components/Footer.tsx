import React from 'react';
import { Box, Twitter, Github, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-16">
          <div>
             <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
                    <Box className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight">Dimensify</span>
            </div>
            <p className="text-gray-500 max-w-xs text-sm">
              Empowering creators with the next generation of 3D tools and AI-driven workflows.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h4 className="font-bold mb-4 text-white">Product</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-brand-400 transition-colors">Viewer</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">AI Generator</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">API</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-brand-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
               <h4 className="font-bold mb-4 text-white">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-brand-400 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs">© 2024 Dimensify Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-600 hover:text-white transition-colors"><Twitter className="w-4 h-4" /></a>
            <a href="#" className="text-gray-600 hover:text-white transition-colors"><Github className="w-4 h-4" /></a>
            <a href="#" className="text-gray-600 hover:text-white transition-colors"><Linkedin className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};