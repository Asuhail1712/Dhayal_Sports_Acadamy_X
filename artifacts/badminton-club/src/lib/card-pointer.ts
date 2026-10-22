export function getCardPointer(
  rect: { left: number; top: number; width: number; height: number },
  clientX: number,
  clientY: number,
  tilt = 3,
) {
  const clamp = (value: number) => Math.max(0, Math.min(1, value));
  const x = rect.width > 0 ? clamp((clientX - rect.left) / rect.width) : 0.5;
  const y = rect.height > 0 ? clamp((clientY - rect.top) / rect.height) : 0.5;
  return {
    rotateX: (0.5 - y) * tilt,
    rotateY: (x - 0.5) * tilt,
    lightX: x * 100,
    lightY: y * 100,
  };
}
