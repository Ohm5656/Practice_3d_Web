export type FlyingImage = {
  id: string;
  src: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  size: number;
};

export function buildCartFlight(src: string, rect: DOMRect, size = 88): FlyingImage {
  const cartIcon = document.getElementById("cart-icon");
  const cartRect = cartIcon?.getBoundingClientRect();
  const targetX = cartRect
    ? cartRect.left + cartRect.width / 2 - size / 2
    : window.innerWidth - size - 28;
  const targetY = cartRect
    ? cartRect.top + cartRect.height / 2 - size / 2
    : 18;

  return {
    id: `${src}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    src,
    startX: rect.left + rect.width / 2 - size / 2,
    startY: rect.top + rect.height / 2 - size / 2,
    endX: targetX,
    endY: targetY,
    size,
  };
}
