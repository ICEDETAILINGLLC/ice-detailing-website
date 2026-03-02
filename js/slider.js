// slider.js — builds + runs before/after sliders from .before-after divs
// Usage in HTML:
// <div class="before-after" data-before="..." data-after="..."></div>

document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll(".before-after");

  sliders.forEach((el) => {
    const beforeSrc = el.getAttribute("data-before");
    const afterSrc = el.getAttribute("data-after");
    if (!beforeSrc || !afterSrc) return;

    // Clear in case anything is inside
    el.innerHTML = "";

    // After image (base)
    const afterImg = document.createElement("img");
    afterImg.src = afterSrc;
    afterImg.alt = "After";

    // Overlay container (shows BEFORE)
    const overlay = document.createElement("div");
    overlay.className = "ba-overlay";

    const beforeImg = document.createElement("img");
    beforeImg.src = beforeSrc;
    beforeImg.alt = "Before";

    overlay.appendChild(beforeImg);

    // Handle
    const handle = document.createElement("div");
    handle.className = "ba-handle";
    handle.setAttribute("role", "slider");
    handle.setAttribute("aria-label", "Before and after slider");
    handle.setAttribute("tabindex", "0");

    // Default 50/50
    setPercent(el, overlay, handle, 50);

    // Build DOM
    el.appendChild(afterImg);
    el.appendChild(overlay);
    el.appendChild(handle);

    // Drag logic
    let dragging = false;

    const startDrag = (e) => {
      dragging = true;
      move(e);
    };

    const endDrag = () => {
      dragging = false;
    };

    const move = (e) => {
      if (!dragging) return;

      const rect = el.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      let x = clientX - rect.left;

      // clamp
      x = Math.max(0, Math.min(x, rect.width));
      const pct = (x / rect.width) * 100;

      setPercent(el, overlay, handle, pct);
    };

    // Mouse
    handle.addEventListener("mousedown", startDrag);
    window.addEventListener("mouseup", endDrag);
    window.addEventListener("mousemove", move);

    // Touch
    handle.addEventListener("touchstart", startDrag, { passive: true });
    window.addEventListener("touchend", endDrag);
    window.addEventListener("touchmove", move, { passive: true });

    // Also allow clicking anywhere on the slider to jump the handle
    el.addEventListener("mousedown", (e) => {
      dragging = true;
      move(e);
    });
    el.addEventListener("touchstart", (e) => {
      dragging = true;
      move(e);
    }, { passive: true });

    // Keyboard support (optional but nice)
    handle.addEventListener("keydown", (e) => {
      const current = parseFloat(handle.dataset.pct || "50");
      if (e.key === "ArrowLeft") setPercent(el, overlay, handle, current - 3);
      if (e.key === "ArrowRight") setPercent(el, overlay, handle, current + 3);
    });
  });

  function setPercent(container, overlay, handle, pct) {
    const clamped = Math.max(0, Math.min(pct, 100));
    overlay.style.width = clamped + "%";
    handle.style.left = clamped + "%";
    handle.dataset.pct = String(clamped);
  }
});
