type TimingFunction = (t: number) => number;

// https://css-tricks.com/emulating-css-timing-functions-javascript/
export const timingFunctions: Record<string, TimingFunction> = {
  linear: (t: number) => t,
  easeIn: (t: number) => Math.pow(t, 1.675),
  easeOut: (t: number) => 1 - Math.pow(1 - t, 1.675),
  easeInOut: (t: number) => 0.5 * (Math.sin((t - 0.5) * Math.PI) + 1),
} as const;

/**
 * Плавная прокрутка по горизонтали
 *
 * @param {Element} element DOM элемент, в котором производится скролл
 * @param {number} position позиция
 * @param {number} duration продолжительность
 * @param {string | Function} timingFunction тайминг-функция
 */
export function animatedScrollToX(element: Element, position: number, duration = 300, timingFunction: TimingFunction | keyof typeof timingFunctions = 'easeIn'): void {
  let startTime: number;
  const startX = element.scrollLeft;
  const endX = Math.max(0, Math.min(element.scrollWidth - element.clientWidth, position));
  const timingFn = typeof timingFunction === 'function' ? timingFunction : timingFunctions[timingFunction];

  const handleNewAnimationFrame = (): void => {
    startTime = startTime || Date.now();
    const timePos = Math.min(1, Math.max(1, Date.now() - startTime) / duration);
    const scrollPos = timingFn(timePos);
    const left = startX + (endX - startX) * scrollPos;
    element.scrollTo({ left });
    if (timePos !== 1) window.requestAnimationFrame(handleNewAnimationFrame);
  };

  window.requestAnimationFrame(handleNewAnimationFrame);
}

/**
 * Плавная прокрутка по вертикали
 *
 * @param {Element} element DOM элемент, в котором производится скролл
 * @param {number} position позиция
 * @param {number} duration продолжительность
 * @param {string | Function} timingFunction тайминг-функция
 */
export function animatedScrollToY(element: Element, position: number, duration = 300, timingFunction: TimingFunction | keyof typeof timingFunctions = 'easeIn') {
  let startTime: number;
  const startY = element.scrollTop;
  const endY = Math.max(0, Math.min(element.scrollHeight - element.clientHeight, position));
  const timingFn = typeof timingFunction === 'function' ? timingFunction : timingFunctions[timingFunction];

  const handleNewAnimationFrame = (): void => {
    startTime = startTime || Date.now();
    const timePos = Math.min(1, Math.max(1, Date.now() - startTime) / duration);
    const scrollPos = timingFn(timePos);
    const top = startY + (endY - startY) * scrollPos;
    element.scrollTo({ top });
    if (timePos !== 1) window.requestAnimationFrame(handleNewAnimationFrame);
  };

  window.requestAnimationFrame(handleNewAnimationFrame);
}
