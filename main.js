document.addEventListener('DOMContentLoaded', () => {

  const skillFills = document.querySelectorAll('.skill-fill');
  if (skillFills.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.width + '%';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    skillFills.forEach(fill => observer.observe(fill));
  }

  const statNums = document.querySelectorAll('.stat-num[data-target]');
  if (statNums.length) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target);
          const step = target / (1200 / 16);
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(timer); }
            el.textContent = Math.floor(current);
          }, 16);
          countObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    statNums.forEach(n => countObserver.observe(n));
  }

  const filterBtns = document.querySelectorAll('.filter-btn');
  const workCards  = document.querySelectorAll('.work-card');

  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        let visibleIndex = 0;
        workCards.forEach(card => {
          // Support multiple categories separated by spaces e.g. data-category="env model"
          const categories = (card.dataset.category || '').split(' ');
          const show = filter === 'all' || categories.includes(filter);
          if (show) {
            card.classList.remove('hidden');
            card.style.animationDelay = (visibleIndex * 0.08) + 's';
            card.style.animation = 'none';
            void card.offsetWidth;
            card.style.animation = '';
            visibleIndex++;
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  const heroTag = document.querySelector('.hero-tag');
  if (heroTag) {
    const original = heroTag.textContent;
    heroTag.textContent = '';
    let i = 0;
    const type = () => {
      if (i < original.length) { heroTag.textContent += original[i]; i++; setTimeout(type, 45); }
    };
    setTimeout(type, 400);
  }

  const revealEls = document.querySelectorAll('.about-section, .featured-section, .works-grid, .contact-layout, .socials-grid, .project-body, .video-section, .status-banner, .contact-intro');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObs.observe(el);
  });

  let lastX = 0, lastY = 0;
  document.addEventListener('mousemove', (e) => {
    if (Math.abs(e.clientX - lastX) < 20 && Math.abs(e.clientY - lastY) < 20) return;
    lastX = e.clientX; lastY = e.clientY;
    const dot = document.createElement('div');
    dot.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:4px;height:4px;background:var(--purple);border-radius:50%;pointer-events:none;z-index:9998;opacity:0.5;transform:translate(-50%,-50%);transition:opacity 0.5s;`;
    document.body.appendChild(dot);
    setTimeout(() => { dot.style.opacity = '0'; }, 50);
    setTimeout(() => dot.remove(), 600);
  });

});