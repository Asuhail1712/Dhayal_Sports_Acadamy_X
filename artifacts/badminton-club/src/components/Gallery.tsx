import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Expand } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { SectionIntro, TextLink, ease } from "@/components/Design";

const photos = [
  {
    id: "team",
    title: "A shared ambition",
    category: "Training",
    src: import.meta.env.BASE_URL + "images/hero.jpeg",
    alt: "The Dayal Academy badminton team",
  },
  {
    id: "rally",
    title: "Every rally. Every day.",
    category: "Training",
    src: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=1400&q=85",
    alt: "Badminton players during a match",
  },
  {
    id: "movement",
    title: "Built for movement",
    category: "Training",
    src: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=1000&q=85",
    alt: "Athletic conditioning and performance training",
  },
  {
    id: "court",
    title: "Where progress happens",
    category: "Training",
    src: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=1400&q=85",
    alt: "A badminton court and sports facilities",
  },
  {
    id: "training",
    title: "The work behind the game",
    category: "Training",
    src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1000&q=85",
    alt: "Strength and conditioning training",
  },
];
const categories = [
  "All",
  "Training",
  "Camps",
  "Tournaments",
  "Yoga",
  "ProShop",
];

export function Gallery({ preview = false }: { preview?: boolean }) {
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<string | null>(null);
  const [location] = useLocation();
  useEffect(() => {
    setSelected(null);
  }, [location]);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const reduced = useReducedMotion();
  const visible = photos.filter(
    (photo) => category === "All" || photo.category === category,
  );
  const index = visible.findIndex((photo) => photo.id === selected);
  const photo = index >= 0 ? visible[index] : null;
  const step = (direction: number) =>
    setSelected(
      visible[(index + direction + visible.length) % visible.length].id,
    );

  return (
    <section id="gallery" className="section-shell gallery-section">
      <div className="site-container">
        <SectionIntro
          dark
          heading={preview ? "h2" : "h1"}
          label="Inside Dayal"
          title={
            <>
              Life at
              <br />
              <em>the academy.</em>
            </>
          }
          description="Training, camps, tournaments and everything in between."
          action={
            preview && <TextLink href="/gallery">View Full Gallery</TextLink>
          }
        />
        {!preview && (
          <div
            className="gallery-filters"
            role="group"
            aria-label="Filter gallery"
          >
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
              >
                {item}
              </button>
            ))}
          </div>
        )}
        {visible.length === 0 && (
          <p className="gallery-empty" role="status">
            Photos for {category} have not been published yet. Select Training
            to explore the current collection.
          </p>
        )}
        <motion.div layout className="gallery-grid">
          <AnimatePresence mode="popLayout">
            {visible.map((item, i) => (
              <motion.button
                type="button"
                className="gallery-tile"
                key={item.id}
                layout
                initial={reduced ? false : { opacity: 0, scale: 0.94, y: 25 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.65, delay: i * 0.04, ease }}
                onClick={(event) => {
                  triggerRef.current = event.currentTarget;
                  setSelected(item.id);
                }}
                aria-label={"Open image: " + item.title}
              >
                <img src={item.src} alt={item.alt} loading="lazy" />
                <div className="gallery-caption">
                  <div>
                    <small>{item.category}</small>
                    <strong>{item.title}</strong>
                  </div>
                  <Expand size={20} />
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
        <p className="gallery-media-note">
          Training collection includes illustrative photography.
        </p>
        <Dialog
          open={photo !== null}
          onOpenChange={(value) => {
            if (!value) setSelected(null);
          }}
        >
          <DialogContent
            className="max-h-[calc(100dvh_-_24px)] w-[calc(100%_-_32px)] max-w-5xl overflow-y-auto rounded-3xl border-white/60 bg-white/95 p-4 pt-12 backdrop-blur-xl sm:rounded-3xl sm:p-6 sm:pt-12"
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              triggerRef.current?.focus();
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") {
                event.preventDefault();
                step(1);
              }
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                step(-1);
              }
            }}
          >
            <DialogTitle className="sr-only">
              {photo?.title ?? "Academy gallery"}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Academy photo gallery. Use the left and right arrow keys to
              navigate between images.
            </DialogDescription>
            {photo && (
              <>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={photo.id}
                    className="gallery-modal-image"
                    src={photo.src}
                    alt={photo.alt}
                    initial={reduced ? false : { opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </AnimatePresence>
                <div className="gallery-modal-footer">
                  <div>
                    <p className="text-sm font-semibold">{photo.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {photo.category} / {index + 1} of {visible.length}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => step(-1)}
                      aria-label="Previous photo"
                      disabled={visible.length < 2}
                    >
                      <ArrowLeft size={16} />
                    </button>
                    <button
                      onClick={() => step(1)}
                      aria-label="Next photo"
                      disabled={visible.length < 2}
                    >
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
