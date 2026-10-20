(() => {
  'use strict';

  /* ---------- mobile menu ---------- */
  const header = document.querySelector('[data-header]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const siteNav = document.querySelector('#site-nav');
  const wide = window.matchMedia('(min-width: 1024px)');

  if (header && menuToggle && siteNav) {
    const setMenu = (open) => {
      header.classList.toggle('is-open', open);
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.textContent = open ? 'Close' : 'Menu';
      if (open) siteNav.querySelector('a')?.focus();
    };

    menuToggle.addEventListener('click', () => {
      setMenu(!header.classList.contains('is-open'));
    });

    siteNav.addEventListener('click', (event) => {
      if (event.target.closest('a')) setMenu(false);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && header.classList.contains('is-open')) {
        setMenu(false);
        menuToggle.focus();
      }
    });

    document.addEventListener('click', (event) => {
      if (header.classList.contains('is-open') && !header.contains(event.target)) setMenu(false);
    });

    const closeOnWide = (event) => { if (event.matches) setMenu(false); };
    if (wide.addEventListener) wide.addEventListener('change', closeOnWide);
    else if (wide.addListener) wide.addListener(closeOnWide);
  }

  /* ---------- puppy filters ---------- */
  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const puppyCards = [...document.querySelectorAll('[data-puppy]')];
  const countEl = document.querySelector('[data-count]');
  const emptyEl = document.querySelector('[data-empty]');
  const puppyGrid = document.querySelector('#puppy-grid');

  const applyFilter = (filter, instant = false) => {
    let visible = 0;

    for (const card of puppyCards) {
      const categories = (card.dataset.cats || '').split(/\s+/).filter(Boolean);
      const show = filter === 'all' || categories.includes(filter);
      const item = card.closest('li');

      if (item) {
        item.hidden = !show;
        if (show && instant) item.classList.add('is-in');
      }
      if (show) visible += 1;
    }

    for (const button of filterButtons) {
      button.setAttribute('aria-pressed', String(button.dataset.filter === filter));
    }

    if (countEl) {
      countEl.textContent = visible === 0
        ? 'No puppies showing'
        : `Showing ${visible} ${visible === 1 ? 'puppy' : 'puppies'}`;
    }
    if (emptyEl) emptyEl.hidden = visible !== 0;
    if (puppyGrid) puppyGrid.dataset.visible = String(visible);
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => applyFilter(button.dataset.filter, true));
  });
  if (filterButtons.length) applyFilter('all');

  /* ---------- puppy detail ---------- */
  const dialog = document.querySelector('#puppy-detail');

  if (dialog) {
    const closeButton = dialog.querySelector('[data-close]');
    const detailImage = dialog.querySelector('[data-detail-image]');
    const detailName = dialog.querySelector('[data-detail-name]');
    const detailMeta = dialog.querySelector('[data-detail-meta]');
    const detailBio = dialog.querySelector('[data-detail-bio]');
    const detailGood = dialog.querySelector('[data-detail-good]');
    const detailNote = dialog.querySelector('[data-detail-note]');
    const detailTags = dialog.querySelector('[data-detail-tags]');
    const detailCta = dialog.querySelector('[data-detail-cta]');
    let opener = null;

    const openDialog = (card) => {
      const image = card.querySelector('img');
      const name = card.querySelector('.puppy-card__name')?.textContent.trim() || 'This puppy';
      const meta = card.querySelector('.puppy-card__meta')?.textContent.trim() || '';
      const size = card.dataset.size || '';
      const tags = [...card.querySelectorAll('.puppy-card__tags span')];

      if (image && detailImage) {
        detailImage.src = image.currentSrc || image.src;
        detailImage.alt = image.alt;
      }
      if (detailName) detailName.textContent = name;
      if (detailMeta) detailMeta.textContent = [meta, size].filter(Boolean).join(' · ');
      if (detailBio) detailBio.textContent = card.dataset.bio || '';
      if (detailGood) detailGood.textContent = card.dataset.good || '';
      if (detailNote) detailNote.textContent = card.dataset.note || '';

      if (detailTags) {
        detailTags.replaceChildren(...tags.map((tag) => {
          const item = document.createElement('li');
          item.textContent = tag.textContent;
          return item;
        }));
      }

      if (detailCta) {
        const subject = `Adoption application: ${name}`;
        const body = [
          'Hi Second Chance Paws,',
          '',
          `I would like to start an adoption application for ${name} (${[meta, size].filter(Boolean).join(' · ')}).`,
          '',
          'A little about my home and schedule:',
          '',
        ].join('\n');
        detailCta.href = `mailto:hello@secondchancepaws.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      }

      opener = card;
      document.body.classList.add('is-locked');

      if (typeof dialog.showModal === 'function') {
        if (!dialog.open) dialog.showModal();
      } else {
        dialog.setAttribute('open', '');
      }
      closeButton?.focus();
    };

    const closeDialog = () => {
      if (dialog.open && typeof dialog.close === 'function') dialog.close();
      else dialog.removeAttribute('open');
      document.body.classList.remove('is-locked');
    };

    for (const card of puppyCards) {
      card.addEventListener('click', () => openDialog(card));
    }

    closeButton?.addEventListener('click', closeDialog);

    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) closeDialog();
    });

    dialog.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeDialog();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = [...dialog.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')]
        .filter((el) => el.getClientRects().length > 0);
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    dialog.addEventListener('close', () => {
      document.body.classList.remove('is-locked');
      if (opener) opener.focus();
      opener = null;
    });
  }

  /* ---------- newsletter ---------- */
  const newsletter = document.querySelector('[data-newsletter]');

  if (newsletter) {
    const input = newsletter.querySelector('input[type="email"]');
    const error = newsletter.querySelector('[data-newsletter-error]');
    const success = newsletter.querySelector('[data-newsletter-success]');

    const showError = () => {
      if (error) error.hidden = false;
      if (success) success.hidden = true;
      if (input) {
        input.setAttribute('aria-invalid', 'true');
        input.focus();
      }
    };

    newsletter.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!input) return;

      const value = input.value.trim();
      input.value = value;
      const valid = value.length > 0
        && input.validity.valid
        && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

      if (!valid) {
        showError();
        return;
      }

      if (error) error.hidden = true;
      input.removeAttribute('aria-invalid');
      if (success) success.hidden = false;
      newsletter.reset();
    });

    input?.addEventListener('input', () => {
      if (error) error.hidden = true;
      input.removeAttribute('aria-invalid');
    });
  }

  /* ---------- section reveals ---------- */
  const reveals = [...document.querySelectorAll('[data-reveal]')];

  if (reveals.length) {
    const show = (el) => el.classList.add('is-in');

    if (!('IntersectionObserver' in window)) {
      reveals.forEach(show);
    } else {
      const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          show(entry.target);
          observer.unobserve(entry.target);
        }
      }, { rootMargin: '0px 0px -12% 0px', threshold: 0.1 });

      reveals.forEach((el) => observer.observe(el));

      // Keep the page readable if the observer never fires.
      window.setTimeout(() => {
        for (const el of reveals) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) show(el);
        }
      }, 2500);

      window.setTimeout(() => reveals.forEach(show), 4000);
    }
  }
})();
