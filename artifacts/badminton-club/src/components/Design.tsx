import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type ReactNode,
  type MouseEvent,
} from "react";
import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useLocation } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { startRouteTransition } from "@/hooks/use-scroll-restoration";
import {
  CardArtwork,
  CardVisual,
  type CardMotif,
  type CardTone,
} from "@/components/CardArtwork";

export const ease = [0.22, 1, 0.36, 1] as const;

export const SiteLink = forwardRef<
  HTMLAnchorElement,
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
>(function SiteLink({ href, children, className = "", ...props }, ref) {
  const [location, navigate] = useLocation();
  return (
    <a
      {...props}
      ref={ref}
      href={href}
      className={className}
      onClick={(event) => {
        props.onClick?.(event);
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          props.target === "_blank" ||
          !href.startsWith("/")
        )
          return;
        event.preventDefault();
        if (location === href) {
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
        startRouteTransition(href);
        navigate(href);
      }}
    >
      {children}
    </a>
  );
});

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 28, filter: "blur(6px)" }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transitionEnd: { filter: "none", willChange: "auto" },
      }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: reduced ? 0 : 0.75,
        delay: reduced ? 0 : delay,
        ease,
      }}
    >
      {children}
    </motion.div>
  );
}

export function SectionIntro({
  label,
  title,
  description,
  action,
  dark = false,
  heading = "h2",
}: {
  label: string;
  title: ReactNode;
  description?: string;
  action?: ReactNode;
  dark?: boolean;
  heading?: "h1" | "h2";
}) {
  const Heading = heading;
  return (
    <Reveal className={`section-intro ${dark ? "section-intro--dark" : ""}`}>
      <div>
        <div className="eyebrow">
          <span />
          {label}
        </div>
        <Heading className="section-title">{title}</Heading>
        {description && <p className="section-description">{description}</p>}
      </div>
      {action && <div className="section-action">{action}</div>}
    </Reveal>
  );
}

export function TextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <SiteLink href={href} className="text-link">
      {children}
      <ArrowUpRight size={18} />
    </SiteLink>
  );
}

export function GlassCard({
  children,
  className = "",
  index = 0,
  interactive = true,
  tilt = 4,
  artwork = "shuttlecock",
  artworkLayout = "header",
  artworkTitle,
  header,
  tone,
}: {
  children?: ReactNode;
  className?: string;
  index?: number;
  interactive?: boolean;
  tilt?: number;
  artwork?: CardMotif | false;
  artworkLayout?: "header" | "custom";
  artworkTitle?: ReactNode;
  header?: ReactNode;
  tone?: CardTone;
}) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const rotateX = useSpring(y, { stiffness: 220, damping: 28 });
  const rotateY = useSpring(x, { stiffness: 220, damping: 28 });
  const glowX = useMotionValue(50),
    glowY = useMotionValue(0);
  const glow = useMotionTemplate`radial-gradient(480px circle at ${glowX}% ${glowY}%, rgba(var(--card-glow,33,81,163),var(--card-glow-opacity,0.10)), transparent 65%)`;
  const onMove = (event: MouseEvent<HTMLElement>) => {
    if (
      !interactive ||
      reduced ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    )
      return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width,
      py = (event.clientY - rect.top) / rect.height;
    x.set((px - 0.5) * tilt);
    y.set((0.5 - py) * tilt);
    glowX.set(px * 100);
    glowY.set(py * 100);
  };
  return (
    <motion.article
      className={`premium-card ${className}`}
      data-card-motif={artwork || undefined}
      data-artwork-layout={artwork ? artworkLayout : undefined}
      data-card-tone={
        artwork ? tone || (index % 2 ? "green" : "blue") : undefined
      }
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      initial={reduced ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.65, delay: Math.min(index * 0.07, 0.28), ease }}
    >
      <motion.div
        className="card-light"
        style={{ background: glow }}
        aria-hidden="true"
      />
      {artwork && <CardArtwork />}
      {artwork && artworkLayout === "header" && (
        <CardVisual motif={artwork} header={header} title={artworkTitle} />
      )}
      {children}
    </motion.article>
  );
}

export function CountUp({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const [count, setCount] = useState(value);
  useEffect(() => {
    if (!inView || reduced) return;
    let frame = 0,
      start = 0;
    const tick = (time: number) => {
      if (!start) start = time;
      const progress = Math.min((time - start) / 1500, 1);
      setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, value]);
  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}
