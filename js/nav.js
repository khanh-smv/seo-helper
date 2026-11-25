(function () {
  var links = document.querySelectorAll('.sidenav ul li a[href^="#"]');
  if (!links.length) return;

  var sections = Array.from(links).map(function (a) {
    return document.querySelector(a.getAttribute('href'));
  }).filter(Boolean);

  var current = '';

  function setActive(id) {
    if (id === current) return;
    current = id;
    links.forEach(function (a) {
      var active = a.getAttribute('href') === '#' + id;
      a.classList.toggle('active', active);
      // On mobile: scroll active link into view horizontally
      if (active && window.innerWidth <= 900) {
        a.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'instant' });
      }
    });
  }

  // Activate first section by default
  if (sections[0]) setActive(sections[0].id);

  var observer = new IntersectionObserver(function (entries) {
    // Among currently-intersecting entries, pick the topmost
    var intersecting = entries.filter(function (e) { return e.isIntersecting; });
    if (!intersecting.length) return;
    intersecting.sort(function (a, b) {
      return a.boundingClientRect.top - b.boundingClientRect.top;
    });
    setActive(intersecting[0].target.id);
  }, {
    // Trigger when top 30% of viewport is crossed
    rootMargin: '-5% 0px -65% 0px',
    threshold: 0
  });

  sections.forEach(function (s) { observer.observe(s); });
})();
