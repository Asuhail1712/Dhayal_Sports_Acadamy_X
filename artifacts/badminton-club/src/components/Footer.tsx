import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, SiteLink } from "@/components/Design";

const links = [
  ["About the academy", "/about"],
  ["Our programs", "/programs"],
  ["Meet the team", "/coaches"],
  ["Camps & Tours", "/camps-tours"],
  ["Our partners", "/partners"],
  ["Gallery", "/gallery"],
  ["Join Us", "/join-us"],
  ["Academy journal", "/blogs"],
  ["Get in touch", "/contact"],
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <Reveal className="footer-top">
          <h2>
            Your next level
            <br />
            <em>starts here.</em>
          </h2>
          <Button
            asChild
            variant="green"
            className="h-12 gap-6 rounded-full px-7 text-xs"
          >
            <SiteLink href="/contact">
              Let's get on court
              <ArrowUpRight size={17} />
            </SiteLink>
          </Button>
        </Reveal>
        <div className="footer-main">
          <div className="footer-brand">
            <SiteLink href="/" aria-label="Dayal Sports Academy home">
              <img
                src={import.meta.env.BASE_URL + "images/dayal-logo.png"}
                alt="Dayal Sports Academy"
              />
            </SiteLink>
            <p>
              Dayal Sports Academy builds champions through sport, science and
              global exposure.
            </p>
          </div>
          <div>
            <p className="footer-label">Explore the academy</p>
            <nav className="footer-links" aria-label="Footer navigation">
              {links.map(([label, href]) => (
                <SiteLink key={href} href={href}>
                  {label}
                </SiteLink>
              ))}
            </nav>
          </div>
          <div className="footer-contact">
            <p className="footer-label">Start a conversation</p>
            <a href="mailto:dayalsportsacademy@gmail.com">
              dayalsportsacademy@gmail.com
            </a>
            <br />
            <a href="tel:+85266285295">+852 6628 5295</a>
            <p className="mt-5 text-[10px] leading-relaxed text-[#8ca1bc]">
              Hong Kong / China / Malaysia / India
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Dayal Sports Academy. All rights
            reserved.
          </p>
          <p>Power. Intelligence. Possibility.</p>
        </div>
      </div>
      <div className="footer-wordmark" aria-hidden="true">
        DAYAL
      </div>
    </footer>
  );
}
