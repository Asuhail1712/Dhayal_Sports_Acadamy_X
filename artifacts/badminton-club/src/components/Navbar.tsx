import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { startRouteTransition } from '@/hooks/use-scroll-restoration';

export function Navbar() {
  const [location, setLocation] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHomeLocation = window.location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toHomeAnchor = (hash: string) => (isHomeLocation ? hash : `/${hash}`);
  const normalizeHomeHistoryEntry = (href: string) => {
    const isLeavingHomeForRoute = href.startsWith('/') && !href.startsWith('/#');

    if (window.location.pathname !== '/' || !window.location.hash || !isLeavingHomeForRoute) {
      return;
    }

    window.history.replaceState(
      window.history.state,
      '',
      `${window.location.pathname}${window.location.search}`,
    );
  };

  const navigateClientSide = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    const isHomeHashNavigation =
      window.location.pathname === '/' &&
      (href.startsWith('#') || href.startsWith('/#'));

    if (isHomeHashNavigation) {
      event.preventDefault();
      setMobileMenuOpen(false);
      const hash = href.startsWith('/#') ? href.slice(1) : href;
      window.history.replaceState(
        window.history.state,
        '',
        `${window.location.pathname}${window.location.search}${hash}`,
      );
      const targetId = hash.slice(1);
      const target = targetId ? document.getElementById(targetId) : null;
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    if (!href.startsWith('/')) {
      setMobileMenuOpen(false);
      return;
    }

    event.preventDefault();
    setMobileMenuOpen(false);
    normalizeHomeHistoryEntry(href);
    startRouteTransition(href);
    setLocation(href);
  };

  const navLinks = [
    { name: 'Home', href: toHomeAnchor('#home') },
    { name: 'About', href: toHomeAnchor('#about') },
    { name: 'Classes', href: toHomeAnchor('#classes') },
    { name: 'Coaches', href: toHomeAnchor('#coaches') },
    { name: 'Partners', href: toHomeAnchor('#partners') },
    { name: 'Blogs', href: isHomeLocation ? '#blogs' : '/blogs' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2 md:py-4' : 'py-3 md:py-6'
      }`}
    >
      <div className="container mx-auto px-2 md:px-6">
        <div className={`relative flex items-center justify-between px-4 md:px-6 py-3 md:py-4 rounded-2xl transition-all duration-300 ${
          isScrolled ? 'bg-white/[0.04] backdrop-blur-md border border-white/10 shadow-lg' : 'bg-transparent'
        }`}>
          
          {/* Logo */}
          <a
            href={toHomeAnchor('#home')}
            onPointerDown={() => startRouteTransition(toHomeAnchor('#home'))}
            onClick={(event) => navigateClientSide(event, toHomeAnchor('#home'))}
            className="flex items-center gap-2 z-10 group -ml-2 md:ml-0"
          >
            <img
              src={`${import.meta.env.BASE_URL}images/dayal-logo.png`}
              alt="Dayal Sports Academy"
              className="brand-logo-image h-12 w-auto md:h-14"
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                onPointerDown={() => startRouteTransition(link.href)}
                onClick={(event) => navigateClientSide(event, link.href)}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="group relative rounded-full px-3 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                <span className="pointer-events-none absolute inset-0 rounded-full bg-white/[0.03] opacity-0 blur-sm transition-all duration-300 group-hover:opacity-100" />
                <span>{link.name}</span>
                <span className="pointer-events-none absolute inset-x-3 bottom-0 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-100" />
                <span className="pointer-events-none absolute inset-x-4 -bottom-1 h-4 scale-x-0 bg-primary/20 blur-md opacity-0 transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-100" />
              </motion.a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4 z-10">
            <Button variant="neon" size="sm" asChild>
              <a
                href={toHomeAnchor('#contact')}
                onPointerDown={() => startRouteTransition(toHomeAnchor('#contact'))}
                onClick={(event) => navigateClientSide(event, toHomeAnchor('#contact'))}
              >
                Join Club
              </a>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white/80 hover:text-white z-10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-4 right-4 mt-2 p-6 bg-white/[0.05] backdrop-blur-md rounded-2xl flex flex-col gap-4 md:hidden border border-white/10"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onPointerDown={() => startRouteTransition(link.href)}
                onClick={(event) => navigateClientSide(event, link.href)}
                className="text-lg font-medium text-white/80 hover:text-white hover:pl-2 transition-all"
              >
                {link.name}
              </a>
            ))}
            <div className="h-px w-full bg-white/10 my-2" />
            <div className="pb-2">
              <img
                src={`${import.meta.env.BASE_URL}images/dayal-logo.png`}
                alt="Dayal Sports Academy"
                className="brand-logo-image h-14 w-auto"
              />
            </div>
            <Button variant="neon" className="w-full" asChild>
              <a
                href={toHomeAnchor('#contact')}
                onPointerDown={() => startRouteTransition(toHomeAnchor('#contact'))}
                onClick={(event) => navigateClientSide(event, toHomeAnchor('#contact'))}
              >
                Join Club Now
              </a>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
