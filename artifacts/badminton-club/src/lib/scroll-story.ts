export function getStackScrollTarget({
  stackTop,
  pageY,
  stickyTop,
  heights,
  gap,
  index,
}: {
  stackTop: number;
  pageY: number;
  stickyTop: number;
  heights: readonly number[];
  gap: number;
  index: number;
}) {
  if (!heights.length) return 0;
  const step = Math.max(0, Math.min(index, heights.length - 1));
  const before = heights
    .slice(0, step)
    .reduce((distance, height) => distance + height + gap, 0);
  return Math.max(0, pageY + stackTop - stickyTop + before);
}
