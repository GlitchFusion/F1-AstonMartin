import React from 'react';
import { Instagram, Twitter, Youtube, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black pt-16 pb-8 border-t border-am-green/20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-am-green flex items-center justify-center rounded-sm">
                <span className="text-am-white font-orbitron font-bold text-xl">AM</span>
              </div>
              <div>
                <h4 className="text-am-white font-orbitron font-bold text-lg tracking-widest leading-none">Aston Martin</h4>
                <span className="text-am-neon text-[10px] font-montserrat tracking-widest uppercase">Formula One Team</span>
              </div>
            </div>
            <p className="text-gray-400 font-montserrat text-sm max-w-sm leading-relaxed mb-6">
              Driven by a relentless pursuit of performance and innovation on the world's greatest tracks.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com/astonmartinf1" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:text-am-neon hover:border-am-neon transition-colors duration-300">
                <Instagram size={18} />
              </a>
              <a href="https://twitter.com/AstonMartinF1" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:text-am-neon hover:border-am-neon transition-colors duration-300">
                <Twitter size={18} />
              </a>
              <a href="https://youtube.com/AstonMartinF1" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:text-am-neon hover:border-am-neon transition-colors duration-300">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-am-white font-orbitron font-bold uppercase tracking-widest text-sm border-b border-gray-800 pb-2 mb-4">Explore</h5>
            <ul className="space-y-3 font-montserrat text-sm text-gray-400">
              <li><a href="#hero" className="hover:text-am-neon transition-colors">The AMR24</a></li>
              <li><a href="#drivers" className="hover:text-am-neon transition-colors">Drivers</a></li>
              <li><a href="#seasonstats" className="hover:text-am-neon transition-colors">Championship Data</a></li>
              <li><a href="#engineering" className="hover:text-am-neon transition-colors">Factory Campus</a></li>
            </ul>
          </div>

          {/* Official Site */}
          <div>
            <h5 className="text-am-white font-orbitron font-bold uppercase tracking-widest text-sm border-b border-gray-800 pb-2 mb-4">Network</h5>
            <a 
              href="https://www.astonmartinf1.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 text-am-neon hover:text-am-white font-montserrat text-sm transition-colors group"
            >
              Official Website
              <ArrowUpRight size={16} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
            <div className="mt-6">
              <h6 className="text-gray-500 font-montserrat text-xs uppercase tracking-widest mb-2">Partners</h6>
              <div className="flex gap-4 items-center">
                <span className="text-gray-400 font-orbitron font-bold text-sm tracking-wider">ARAMCO</span>
                <span className="text-gray-400 font-orbitron font-bold text-sm tracking-wider">HONDA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
          <p className="text-gray-600 font-montserrat text-xs tracking-widest uppercase mb-4 md:mb-0">
            © {new Date().getFullYear()} Aston Martin Racing. Concept Site.
          </p>
          <div className="flex gap-6 text-xs font-montserrat tracking-widest uppercase text-gray-600">
            <a href="#" className="hover:text-am-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-am-white transition-colors">Terms</a>
            <a href="#" className="hover:text-am-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
