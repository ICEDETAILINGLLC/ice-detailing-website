// main.js — reveal on scroll, prefill, parallax, sticky CTA, gallery lightbox
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

  // gallery lightbox
  const albumCards = document.querySelectorAll(".gallery-album-card");
  const lightbox = document.getElementById("galleryLightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const lightboxMeta = document.getElementById("lightboxMeta");
  const prevBtn = document.getElementById("lightboxPrev");
  const nextBtn = document.getElementById("lightboxNext");
  const closeEls = document.querySelectorAll("[data-lightbox-close]");

  let activeGallery = [];
  let activeTitle = "";
  let activeIndex = 0;

  function renderLightbox() {
    if (!activeGallery.length) return;

    lightboxImage.src = activeGallery[activeIndex];
    lightboxImage.alt = `${activeTitle} image ${activeIndex + 1}`;
    lightboxTitle.textContent = activeTitle;
    lightboxMeta.textContent = `${activeIndex + 1} / ${activeGallery.length}`;
  }

  function openLightbox(title, images, startIndex = 0) {
    activeTitle = title;
    activeGallery = images;
    activeIndex = startIndex;

    renderLightbox();
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
    lightboxImage.src = "";
  }

  function showNext() {
    if (!activeGallery.length) return;
    activeIndex = (activeIndex + 1) % activeGallery.length;
    renderLightbox();
  }

  function showPrev() {
    if (!activeGallery.length) return;
    activeIndex = (activeIndex - 1 + activeGallery.length) % activeGallery.length;
    renderLightbox();
  }

  albumCards.forEach((card) => {
    card.addEventListener("click", () => {
      const title = (card.dataset.galleryTitle || "Gallery").trim();
      let images = [];

      try {
        images = JSON.parse(card.dataset.galleryImages || "[]");
      } catch (err) {
        images = [];
      }

      if (!images.length) return;
      openLightbox(title, images, 0);
    });
  });

  if (prevBtn) prevBtn.addEventListener("click", showPrev);
  if (nextBtn) nextBtn.addEventListener("click", showNext);

  closeEls.forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox || !lightbox.classList.contains("open")) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
  });
});


// universal mobile nav toggle
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const primaryNav = document.getElementById("primaryNav") || document.querySelector(".primary-nav");

  if (!navToggle || !primaryNav) return;

  const closeNav = () => {
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    primaryNav.classList.remove("open");
  };

  navToggle.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isOpen = !primaryNav.classList.contains("open");
    primaryNav.classList.toggle("open", isOpen);
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  }, { passive: false });

  primaryNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 980) closeNav();
    });
  });

  document.addEventListener("click", (e) => {
    if (window.innerWidth > 980) return;
    if (!primaryNav.contains(e.target) && !navToggle.contains(e.target)) {
      closeNav();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 980) closeNav();
  });
});
