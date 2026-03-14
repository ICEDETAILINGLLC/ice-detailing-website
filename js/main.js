// main.js — reveal on scroll, prefill, parallax, sticky CTA
document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");

  if (reveals.length) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    reveals.forEach((r) => io.observe(r));
  }

  document.querySelectorAll("[data-prefill]").forEach((el) => {
    el.addEventListener("click", () => {
      const pref = (el.dataset.prefill || "").trim();
      if (!pref) return;

      try {
        sessionStorage.setItem("prefillService", pref);
      } catch (err) {}
    });
  });

  const isContact = document.body.classList.contains("contact-page");

  if (isContact) {
    const url = new URL(window.location.href);
    const fromUrl = (url.searchParams.get("service") || "").trim();

    let fromStorage = "";
    try {
      fromStorage = (sessionStorage.getItem("prefillService") || "").trim();
    } catch (err) {}

    const pref = fromUrl || fromStorage;

    if (pref) {
      const targets = document.querySelectorAll('input[type="checkbox"][data-prefill-target]');

      targets.forEach((cb) => {
        if ((cb.value || "").toLowerCase() === pref.toLowerCase()) {
          cb.checked = true;
        }
      });

      try {
        sessionStorage.removeItem("prefillService");
      } catch (err) {}
    }
  }

  const hero = document.querySelector(".hero[data-parallax]");
  if (hero) {
    window.addEventListener("scroll", () => {
      const speed = 0.22;
      const y = window.scrollY * speed;
      hero.style.backgroundPosition = `center calc(50% + ${y}px)`;
    }, { passive: true });
  }

  const bookSticky = document.getElementById("bookSticky");

  if (bookSticky) {
    function updateBookVisible() {
      if (window.scrollY > 420) {
        bookSticky.classList.add("visible");
      } else {
        bookSticky.classList.remove("visible");
      }
    }

    updateBookVisible();
    window.addEventListener("scroll", updateBookVisible, { passive: true });
  }
});
