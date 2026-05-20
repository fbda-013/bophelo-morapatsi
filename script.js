/* BDF — Shared Script */
(function () {
  "use strict";

  /* ── Mobile Nav ─────────────────────────── */
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      mobileMenu.classList.toggle("open");
    });

    // Close on link click
    mobileMenu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        hamburger.classList.remove("open");
        mobileMenu.classList.remove("open");
      });
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamburger.classList.remove("open");
        mobileMenu.classList.remove("open");
      }
    });
  }

  /* ── Header Scroll Shrink ───────────────── */
  const header = document.querySelector(".header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.style.background = "rgba(8,22,42,0.98)";
        header.style.boxShadow = "0 4px 24px rgba(0,0,0,0.5)";
      } else {
        header.style.background = "rgba(8,22,42,0.95)";
        header.style.boxShadow = "none";
      }
    });
  }

  /* ── Active Nav Link ────────────────────── */
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("a.nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage) link.classList.add("active");
  });

  /* ── Scroll Reveal ──────────────────────── */
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => observer.observe(el));
  }

  /* ── Contact Form ───────────────────────── */
  const contactForm = document.getElementById("contact-form");
  const modalBackdrop = document.getElementById("modal-backdrop");
  const modalClose = document.getElementById("modal-close");

  if (contactForm && modalBackdrop) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      modalBackdrop.classList.add("open");
      contactForm.reset();
    });
    modalClose && modalClose.addEventListener("click", () => modalBackdrop.classList.remove("open"));
    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) modalBackdrop.classList.remove("open");
    });
  }

  /* ── Counter Animation ──────────────────── */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = current.toLocaleString() + (el.dataset.suffix || "");
    }, 16);
  }

  const counters = document.querySelectorAll("[data-target]");
  if (counters.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { animateCounter(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.5 });
    counters.forEach((c) => io.observe(c));
  }
})();