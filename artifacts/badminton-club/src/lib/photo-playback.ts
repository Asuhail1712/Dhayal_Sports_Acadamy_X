export const PHOTO_ADVANCE_MS = 3000;

export function schedulePhotoAdvance(
  enabled: boolean,
  count: number,
  advance: () => void,
) {
  if (!enabled || count < 2) return;
  const timer = setTimeout(advance, PHOTO_ADVANCE_MS);
  return () => clearTimeout(timer);
}
