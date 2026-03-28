import React from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';
import { useLocation } from 'wouter';
import { startRouteTransition } from '@/hooks/use-scroll-restoration';

export function Footer() {
  const [location, setLocation] = useLocation();
  const isHomeLocation = window.location.pathname === '/';
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
      return;
    }

    event.preventDefault();
    normalizeHomeHistoryEntry(href);
    startRouteTransition(href);
    setLocation(href);
  };

  return (
    <footer className="border-t border-white/10 bg-background/50 backdrop-blur-lg py-12 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <a
              href={toHomeAnchor('#home')}
              onPointerDown={() => startRouteTransition(toHomeAnchor('#home'))}
              onClick={(event) => navigateClientSide(event, toHomeAnchor('#home'))}
              className="flex items-center gap-2 mb-4"
            >
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
              <li><a href={toHomeAnchor('#about')} onPointerDown={() => startRouteTransition(toHomeAnchor('#about'))} onClick={(event) => navigateClientSide(event, toHomeAnchor('#about'))} className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href={toHomeAnchor('#classes')} onPointerDown={() => startRouteTransition(toHomeAnchor('#classes'))} onClick={(event) => navigateClientSide(event, toHomeAnchor('#classes'))} className="hover:text-primary transition-colors">Training Solutions</a></li>
              <li><a href={toHomeAnchor('#coaches')} onPointerDown={() => startRouteTransition(toHomeAnchor('#coaches'))} onClick={(event) => navigateClientSide(event, toHomeAnchor('#coaches'))} className="hover:text-primary transition-colors">Our Team</a></li>
              <li><a href="/blogs" onPointerDown={() => startRouteTransition("/blogs")} onClick={(event) => navigateClientSide(event, "/blogs")} className="hover:text-primary transition-colors">Blogs</a></li>
              <li><a href={toHomeAnchor('#contact')} onPointerDown={() => startRouteTransition(toHomeAnchor('#contact'))} onClick={(event) => navigateClientSide(event, toHomeAnchor('#contact'))} className="hover:text-primary transition-colors">Contact</a></li>
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
