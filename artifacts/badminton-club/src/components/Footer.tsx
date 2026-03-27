import React from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background/50 backdrop-blur-lg py-12 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <a href="#home" className="flex items-center gap-2 mb-4">
              <img
                src={`${import.meta.env.BASE_URL}images/dayal-logo.png`}
                alt="Dayal Sports Academy"
                className="brand-logo-image h-14 w-auto"
              />
            </a>
            <p className="text-white/50 max-w-sm">
              Dayal Sports Academy promotes sports and fitness through coaching, assessment, workshops, camps, championship support, and holistic athlete development.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-white/50">
              <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#classes" className="hover:text-primary transition-colors">Training Solutions</a></li>
              <li><a href="#coaches" className="hover:text-primary transition-colors">Our Team</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-primary/20 hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-primary/20 hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-primary/20 hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 text-center text-white/40 text-sm">
          <p>&copy; {new Date().getFullYear()} Dayal Sports Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
