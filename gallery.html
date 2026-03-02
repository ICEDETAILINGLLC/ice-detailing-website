// slider.js — Before/After slider for elements like:
// <div class="before-after" data-before="..." data-after="..."></div>
document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll(".before-after");

  sliders.forEach((el) => {
    const beforeSrc = el.getAttribute("data-before");
    const afterSrc  = el.getAttribute("data-after");
    if (!beforeSrc || !afterSrc) return;

    el.innerHTML = "";
    el.classList.add("ba-ready");

    const afterImg = document.createElement("img");
    afterImg.src = afterSrc;
    afterImg.alt = "After";

    const overlay = document.createElement("div");
    overlay.className = "ba-overlay";

    const beforeImg = document.createElement("img");
    beforeImg.src = beforeSrc;
    beforeImg.alt = "Before";

    const handle = document.createElement("div");
    handle.className = "ba-handle";
    handle.setAttribute("role", "slider");
    handle.setAttribute("aria-label", "Before and after slider");
    handle.setAttribute("aria-valuemin", "0");
    handle.setAttribute("aria-valuemax", "100");
    handle.setAttribute("aria-valuenow", "50");
    handle.tabIndex = 0;

    overlay.appendChild(beforeImg);
    el.appendChild(afterImg);
    el.appendChild(overlay);
    el.appendChild(handle);

    let pct = 50;

    const setPct = (nextPct) => {
      pct = Math.max(0, Math.min(100, nextPct));
      overlay.style.width = pct + "%";
      handle.style.left = pct + "%";
      handle.setAttribute("aria-valuenow", String(Math.round(pct)));
    };

    setPct(50);

    const moveFromClientX = (clientX) => {
      const rect = el.getBoundingClientRect();
      const x = clientX - rect.left;
      const nextPct = (x / rect.width) * 100;
      setPct(nextPct);
    };

    // Pointer events (mouse + touch)
    const onPointerDown = (e) => {
      el.setPointerCapture?.(e.pointerId);
      moveFromClientX(e.clientX);
      el.dataset.dragging = "1";
    };

    const onPointerMove = (e) => {
      if (el.dataset.dragging !== "1") return;
      moveFromClientX(e.clientX);
    };

    const onPointerUp = () => {
      el.dataset.dragging = "0";
    };

    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });

    // Keyboard support
    handle.addEventListener("keydown", (e) => {
      const step = e.shiftKey ? 10 : 3;
      if (e.key === "ArrowLeft") setPct(pct - step);
      if (e.key === "ArrowRight") setPct(pct + step);
    });
  });
});
