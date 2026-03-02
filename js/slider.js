<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Gallery — ICE Detailing LLC</title>

  <link rel="stylesheet" href="css/style.css?v=ice9" />
  <link rel="stylesheet" href="css/animations.css?v=ice9" />
</head>

<body class="hybrid">

<header class="site-header" role="banner">
  <div class="wrap header-inner">
    <a href="index.html" class="brand" aria-label="ICE Detailing home">
      <img src="images/iced_blue.png" alt="ICE Detailing LLC" class="logo-horizontal" />
      <span class="brand-text" aria-hidden="true">ICE Detailing LLC</span>
    </a>

    <nav class="primary-nav" aria-label="Primary navigation">
      <a href="index.html#home" class="nav-link">Home</a>
      <a href="services.html" class="nav-link">Services</a>
      <a href="reviews.html" class="nav-link">Reviews</a>
      <a href="gallery.html" class="nav-link active">Gallery</a>
      <a href="contact.html" class="nav-link">Contact</a>
    </nav>

    <div class="header-actions">
      <a href="tel:16179702329" class="cta-call">Call (617) 970-2329</a>
      <a id="bookSticky" class="cta-book" href="contact.html">Book</a>
    </div>
  </div>
</header>

<main>

  <!-- GALLERY HERO (aggressive / performance vibe) -->
  <section class="gallery-hero">
    <div class="wrap gallery-hero-inner reveal">
      <div class="gallery-hero-copy">
        <div class="gallery-kicker">REAL CLIENT TRANSFORMATIONS</div>
        <h1 class="gallery-title">Before &amp; After Gallery</h1>
        <p class="gallery-sub">
          Drag the divider to compare. Built for touch — crisp results, no gimmicks.
        </p>

        <div class="gallery-hero-actions">
          <a class="btn primary" href="contact.html">Book Now</a>
          <a class="btn ghost" href="services.html">View Packages</a>
        </div>
      </div>

      <div class="gallery-hero-metrics">
        <div class="gstat">
          <strong>Paint-Safe</strong>
          <span>Pro methods</span>
        </div>
        <div class="gstat">
          <strong>Premium</strong>
          <span>Products only</span>
        </div>
        <div class="gstat">
          <strong>Walkthrough</strong>
          <span>Client-approved</span>
        </div>
      </div>
    </div>
    <div class="gallery-hero-glow" aria-hidden="true"></div>
  </section>

  <!-- SHOWCASE GRID -->
  <section class="section gallery-section">
    <div class="wrap">

      <div class="ba-gallery reveal">

        <!-- Card 1 -->
        <article class="ba-card">
          <header class="ba-head">
            <div class="ba-title">
              <h2>Full Detail</h2>
              <p class="ba-meta">Interior reset + exterior decon</p>
            </div>
            <span class="ba-badge">CLIENT APPROVED</span>
          </header>

          <div class="before-after"
               aria-label="Before and after detailing comparison"
               data-before="images/gallery/before1.jpg"
               data-after="images/gallery/after1.jpg"></div>

          <footer class="ba-foot">
            <span class="ba-chip">High-impact results</span>
            <span class="ba-chip">Tap/drag divider</span>
          </footer>
        </article>

        <!-- Card 2 -->
        <article class="ba-card">
          <header class="ba-head">
            <div class="ba-title">
              <h2>Deep Clean Interior</h2>
              <p class="ba-meta">Steam + extraction + conditioning</p>
            </div>
            <span class="ba-badge">ICE FINISH</span>
          </header>

          <div class="before-after"
               aria-label="Before and after detailing comparison"
               data-before="images/gallery/before2.jpg"
               data-after="images/gallery/after2.jpg"></div>

          <footer class="ba-foot">
            <span class="ba-chip">Stain removal</span>
            <span class="ba-chip">Odor refresh</span>
          </footer>
        </article>

        <!-- Card 3 -->
        <article class="ba-card">
          <header class="ba-head">
            <div class="ba-title">
              <h2>Exterior Restoration</h2>
              <p class="ba-meta">Safe wash + gloss finishing</p>
            </div>
            <span class="ba-badge">SHOWROOM LOOK</span>
          </header>

          <div class="before-after"
               aria-label="Before and after detailing comparison"
               data-before="images/gallery/before3.jpg"
               data-after="images/gallery/after3.jpg"></div>

          <footer class="ba-foot">
            <span class="ba-chip">Gloss boost</span>
            <span class="ba-chip">Trim pop</span>
          </footer>
        </article>

      </div>

      <!-- CTA STRIP -->
      <section class="cta-strip" style="margin-top:40px">
        <div class="wrap cta-wrap reveal">
          <h3>Want your car to look like this?</h3>
          <a class="btn primary" href="contact.html">Get a Quote</a>
        </div>
      </section>

    </div>
  </section>

</main>

<footer class="site-footer sleek-footer">
  <div class="wrap footer-flex">
    <div class="footer-brand">
      <img src="images/iced_blue.png" alt="ICE Detailing" class="footer-logo" />
      <div class="footer-name">ICE Detailing LLC</div>
    </div>

    <div class="footer-links">
      <a href="index.html">Home</a>
      <a href="services.html">Services</a>
      <a href="contact.html">Contact</a>
    </div>

    <div class="footer-copy">© <span id="footerYearGal"></span> ICE Detailing LLC</div>
  </div>
</footer>

<script>document.getElementById('footerYearGal').textContent = new Date().getFullYear();</script>
<script src="js/slider.js" defer></script>
<script src="js/main.js" defer></script>
</body>
</html>
