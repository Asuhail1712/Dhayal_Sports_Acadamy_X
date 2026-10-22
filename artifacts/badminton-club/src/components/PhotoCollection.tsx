import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import type { AcademyPhoto } from "@/lib/academy-media";
import { PhotoFrame } from "@/components/PhotoFrame";
import { schedulePhotoAdvance } from "@/lib/photo-playback";

export function PhotoCollection({
  photos,
  label,
  className = "",
  sizes = "(max-width: 767px) calc(100vw - 88px), 44vw",
}: {
  photos: readonly AcademyPhoto[];
  label: string;
  className?: string;
  sizes?: string;
}) {
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.35 });
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState<boolean | null>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const autoEnabled = paused === false || (paused === null && !reduced);
  const playing = autoEnabled && visible && pageVisible && !hovered && !focused;

  useEffect(() => {
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () =>
      document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    return schedulePhotoAdvance(playing, photos.length, () =>
      setIndex((current) => (current + 1) % photos.length),
    );
  }, [playing, photos.length, index]);

  if (!photos.length) return null;
  const activeIndex = index % photos.length;
  const photo = photos[activeIndex];
  const multiple = photos.length > 1;
  const step = (direction: number) =>
    setIndex(
      (current) => (current + direction + photos.length) % photos.length,
    );

  return (
    <div
      ref={ref}
      className={`academy-photo-collection ${className}`}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocused(false);
      }}
      role={multiple ? "group" : undefined}
      aria-roledescription={multiple ? "carousel" : undefined}
      aria-label={multiple ? label : undefined}
    >
      <PhotoFrame photo={photo} sizes={sizes} />
      {multiple && (
        <div className="academy-photo-controls">
          <button
            type="button"
            onClick={() => {
              setPaused(autoEnabled);
              if (!autoEnabled) {
                setHovered(false);
                setFocused(false);
              }
            }}
            aria-label={`${autoEnabled ? "Pause" : "Play"} ${label} slideshow`}
          >
            {autoEnabled ? <Pause size={15} /> : <Play size={15} />}
          </button>
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label={`Previous ${label} photo`}
          >
            <ChevronLeft size={17} />
          </button>
          <span
            role="status"
            aria-live={playing ? "off" : "polite"}
            aria-atomic="true"
          >
            {activeIndex + 1} / {photos.length}
          </span>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label={`Next ${label} photo`}
          >
            <ChevronRight size={17} />
          </button>
        </div>
      )}
    </div>
  );
}
