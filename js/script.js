<script>
  // Cursor
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
    ring.style.left = mx + 'px'; ring.style.top = my + 'px';
  });
  document.querySelectorAll('a, button, .work-card, .service-card, .tool-pill').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '30px'; cursor.style.height = '30px';
      cursor.style.background = 'var(--lime)';
      ring.style.width = '60px'; ring.style.height = '60px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '14px'; cursor.style.height = '14px';
      cursor.style.background = 'var(--coral)';
      ring.style.width = '40px'; ring.style.height = '40px';
    });
  });

  // Intersection Observer for reveal + skill bars + stats
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal, .skill-row, .stat-item').forEach(el => observer.observe(el));

  // Counter animation
  function animateCounter(id, target, suffix) {
    const el = document.getElementById(id);
    let current = 0;
    const step = target / 50;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.round(current);
      if (current >= target) clearInterval(timer);
    }, 40);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter('n1', 45);
        animateCounter('n2', 12);
        animateCounter('n3', 6);
        animateCounter('n4', 30);
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });

  statsObserver.observe(document.querySelector('.stats-section'));
</script>