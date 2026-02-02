// /assets/site.js
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("mobileMenu");
  const nav = document.getElementById("navLinks");
  if (!menuBtn || !nav) return;

  menuBtn.addEventListener("click", () => nav.classList.toggle("open"));

  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => nav.classList.remove("open"));
  });
});
