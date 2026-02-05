// /assets/site.js
document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const menuBtn = document.getElementById("mobileMenu");
  const nav = document.getElementById("navLinks");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
  }

  // Apps Rotator
  const root = document.querySelector(".app-rotator");
  if (!root) return;

  const track = root.querySelector(".ar-track");
  if (!track) return;

  const slides = Array.from(track.querySelectorAll(".ar-slide"));
  if (slides.length <= 1) return;

  const intervalMs = parseInt(root.getAttribute("data-interval"), 10) || 5500;

  const dotsHost = root.querySelector(".ar-dots");
  if (!dotsHost) return;
  dotsHost.innerHTML = "";

  let i = slides.findIndex(s => s.classList.contains("is-active"));
  if (i < 0) i = 0;

  const dots = slides.map((_, idx) => {
    const b = document.createElement("button");
    b.type = "button";
    b.addEventListener("click", () => go(idx, true));
    dotsHost.appendChild(b);
    return b;
  });

  let timer = null;
  let paused = false;

  function mark() {
    root.style.setProperty("--i", i);
    dots.forEach((d, idx) => d.setAttribute("aria-current", idx === i ? "true" : "false"));
    slides.forEach((s, idx) => s.classList.toggle("is-active", idx === i));
  }

  function go(n, user = false) {
    i = (n + slides.length) % slides.length;
    mark();
    if (user) restart();
  }

  function next() { go(i + 1); }

  function start() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    stop();
    timer = setInterval(next, intervalMs);
  }

  function stop() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  function restart() {
    if (!paused && document.visibilityState === "visible") start();
  }

  root.addEventListener("mouseenter", () => { paused = true; stop(); });
  root.addEventListener("mouseleave", () => { paused = false; restart(); });
  root.addEventListener("focusin", () => { paused = true; stop(); });
  root.addEventListener("focusout", () => { paused = false; restart(); });

  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); next(); }
    if (e.key === "ArrowLeft")  { e.preventDefault(); go(i - 1, true); }
  });

  let x0 = null;
  root.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, { passive: true });
  root.addEventListener("touchend", e => {
    if (x0 == null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) dx < 0 ? next() : go(i - 1, true);
    x0 = null;
  });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") stop();
    else restart();
  });

  if (!root.hasAttribute("tabindex")) root.setAttribute("tabindex", "0");
  mark();
  start();
});
