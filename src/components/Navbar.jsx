import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'Team', href: '#aboutteam' },
  { name: 'Car', href: '#cartechnology' },
  { name: 'Drivers', href: '#drivers' },
  { name: 'Stats', href: '#seasonstats' },
  { name: 'Hub', href: '#fanexperience' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-am-dark/80 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-am-green flex items-center justify-center rounded-sm transform group-hover:scale-105 transition-transform">
            <span className="text-am-white font-orbitron font-bold text-xl">AM</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-am-white font-orbitron font-bold text-lg tracking-widest leading-none">Aston Martin</h1>
            <span className="text-am-neon text-xs font-montserrat tracking-widest uppercase">Formula One Team</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-montserrat text-gray-300 hover:text-am-neon transition-colors font-medium uppercase tracking-widest relative group"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-am-neon transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white hover:text-am-neon transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <motion.div
        initial={false}
        animate={{ height: mobileMenuOpen ? 'auto' : 0, opacity: mobileMenuOpen ? 1 : 0 }}
        className="md:hidden overflow-hidden bg-am-dark/95 backdrop-blur-md border-t border-gray-800"
      >
        <div className="flex flex-col px-6 py-4 gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 font-montserrat py-2 border-b border-gray-800 hover:text-am-neon transition-colors tracking-wider"
            >
              {link.name}
            </a>
          ))}
        </div>
      </motion.div>
    </header>
  );
};

export default Navbar;
