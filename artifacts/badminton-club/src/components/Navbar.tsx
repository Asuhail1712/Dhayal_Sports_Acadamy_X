import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { SiteLink, ease } from "@/components/Design";

import { navigation as links, whatsappUrl } from "@/lib/academy-content";

export function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const id = useId();
  const reduced = useReducedMotion();
  const glass = location !== "/" || scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    setOpen(false);
  }, [location]);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const active = (href: string) =>
    href === "/" ? location === "/" : location.startsWith(href);
  return (
    <header className="site-nav">
      <div className="site-container">
        <div
          className={"nav-shell " + (glass || open ? "nav-shell--glass" : "")}
        >
          <SiteLink
            href="/"
            className="nav-logo"
            aria-label="Dayal Sports Academy home"
          >
            <img
              src={import.meta.env.BASE_URL + "images/dayal-logo.png"}
              alt="Dayal"
              width="142"
              height="47"
            />
          </SiteLink>
          <nav className="nav-links" aria-label="Main navigation">
            {links.map((link) => (
              <SiteLink
                href={link.href}
                key={link.href}
                aria-current={active(link.href) ? "page" : undefined}
                className={
                  "nav-link " + (active(link.href) ? "nav-link--active" : "")
                }
              >
                {active(link.href) && (
                  <motion.span
                    className="nav-link-active"
                    layoutId={"nav-active-" + id}
                    transition={{ type: "spring", stiffness: 350, damping: 32 }}
                  />
                )}
                <span>{link.label}</span>
              </SiteLink>
            ))}
          </nav>
          <div className="nav-desktop-cta">
            <Button
              asChild
              variant="green"
              size="sm"
              className="h-10 gap-4 rounded-full px-5 text-[11px]"
            >
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                Book a Trial
                <ArrowUpRight size={14} />
              </a>
            </Button>
          </div>
          <button
            className="nav-mobile-toggle"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls={"mobile-" + id}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <AnimatePresence>
          {open && (
            <motion.nav
              id={"mobile-" + id}
              aria-label="Mobile navigation"
              className="mobile-nav"
              initial={reduced ? false : { opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: reduced ? 0 : 0.4, ease }}
            >
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={reduced ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.045, duration: 0.3 }}
                >
                  <SiteLink
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active(link.href) ? "page" : undefined}
                  >
                    {link.label}
                    <ArrowUpRight size={18} />
                  </SiteLink>
                </motion.div>
              ))}
              <Button
                asChild
                variant="green"
                className="mt-5 w-full rounded-full"
              >
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                >
                  Book a Trial
                  <ArrowUpRight className="ml-3" size={16} />
                </a>
              </Button>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
