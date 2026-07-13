export const useIntroDone = () => useState<boolean>("introDone", () => false);

export const introAlreadyPlayed = (): boolean => {
  if (!import.meta.client) return false;
  try {
    return !!sessionStorage.getItem("kitsumi_intro_played");
  } catch {
    return false;
  }
};

export const prefersReducedMotion = (): boolean =>
  import.meta.client &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
