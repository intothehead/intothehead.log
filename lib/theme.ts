export function toggleTheme() {
  const nowTheme = document.documentElement.getAttribute("data-theme");
  const nextTheme = nowTheme === "dark" ? "light" : "dark";
  function applyTheme() {
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
  }
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (document.startViewTransition && !reduceMotion) {
    document.startViewTransition(applyTheme);
  } else {
    applyTheme();
  }
  return nextTheme;
}
