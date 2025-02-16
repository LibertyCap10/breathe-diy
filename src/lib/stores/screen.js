import { readable } from 'svelte/store';

export const isMobile = readable(false, (set) => {
  if (typeof window === "undefined") return; // Prevent SSR errors

  const matchMedia = window.matchMedia("(max-width: 768px)");
  const update = () => set(matchMedia.matches);

  update(); // Set initial value
  matchMedia.addEventListener("change", update);
  
  return () => matchMedia.removeEventListener("change", update);
});
