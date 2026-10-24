export function toggleTheme() {
  const nowTheme = document.documentElement.getAttribute("data-theme");
  const nextTheme = nowTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", nextTheme);
  localStorage.setItem("theme", nextTheme);
}
