// slider.js — builds before/after sliders from .before-after divs

document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll(".before-after");

  sliders.forEach((el, index) => {
    const beforeSrc = el.getAttribute("data-before");
    const afterSrc = el.getAttribute("data-after");
    const beforeLabelText = (el.getAttribute("data-before-label") || "Before").trim();
    const afterLabelText = (el.getAttribute("data-after-label") || "After").trim();

    if (!beforeSrc || !afterSrc) return;

    el.innerHTML = "";

    const afterImg = document.createElement("img");
    afterImg.src = afterSrc;
    afterImg.alt = afterLabelText;

    const overlay = document.createElement("div");
    overlay.className = "ba-overlay";

    const beforeImg = document.createElement("img");
    beforeImg.src = beforeSrc;
    beforeImg.alt = beforeLabelText;
    overlay.appendChild(beforeImg);

    const beforeLabel = document.createElement("div");
    beforeLabel.className = "ba-side-label left";
    beforeLabel.textContent = beforeLabelText;

    const afterLabel = document.createElement("div");
    afterLabel.className = "ba-side-label right";
    afterLabel.textContent = afterLabelText;

    const handle = document.createElement("div");
    handle.className = "ba-handle";
    handle.setAttribute("role", "slider");
    handle.setAttribute("aria-label", `${beforeLabelText} and ${afterLabelText} comparison slider`);
    handle.setAttribute("aria-valuemin", "0");
    handle.setAttribute("aria-valuemax", "100");
    handle.setAttribute("aria-valuenow", "50");
    handle.setAttribute("tabindex", "0");
    handle.dataset.sliderId = String(index);

    setPercent(overlay, handle, 50);

    el.appendChild(afterImg);
    el.appendChild(overlay);
    el.appendChild(beforeLabel);
    el.appendChild(afterLabel);
    el.appendChild(handle);

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

      x = Math.max(0, Math.min(x, rect.width));
      const pct = (x / rect.width) * 100;

      setPercent(overlay, handle, pct);
    };

    handle.addEventListener("mousedown", startDrag);
    window.addEventListener("mouseup", endDrag);
    window.addEventListener("mousemove", move);

    handle.addEventListener("touchstart", startDrag, { passive: true });
    window.addEventListener("touchend", endDrag);
    window.addEventListener("touchmove", move, { passive: true });

    el.addEventListener("mousedown", (e) => {
      dragging = true;
      move(e);
    });

    el.addEventListener("touchstart", (e) => {
      dragging = true;
      move(e);
    }, { passive: true });

    handle.addEventListener("keydown", (e) => {
      const current = parseFloat(handle.dataset.pct || "50");

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setPercent(overlay, handle, current - 3);
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        setPercent(overlay, handle, current + 3);
      }
    });
  });

  function setPercent(overlay, handle, pct) {
    const clamped = Math.max(0, Math.min(pct, 100));
    overlay.style.width = clamped + "%";
    handle.style.left = clamped + "%";
    handle.dataset.pct = String(clamped);
    handle.setAttribute("aria-valuenow", String(Math.round(clamped)));
  }
});
