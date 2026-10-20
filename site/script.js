/* Second Chance Paws — filters, program notes, and the box-office form. */

(() => {
  const filterButtons = Array.from(document.querySelectorAll('.filter-group [data-filter]'));
  const allFilterButtons = Array.from(document.querySelectorAll('[data-filter]'));
  const cards = Array.from(document.querySelectorAll('.puppy-card'));
  const resultCount = document.querySelector('.result-count');
  const emptyState = document.querySelector('[data-empty]');
  const dialog = document.getElementById('puppy-dialog');
  const dialogContent = dialog ? dialog.querySelector('[data-dialog-content]') : null;
  const closeButton = dialog ? dialog.querySelector('[data-close]') : null;
  const newsletter = document.querySelector('[data-newsletter]');

  let dialogTrigger = null;

  function countLabel(count) {
    return `Showing ${count} ${count === 1 ? 'puppy' : 'puppies'}`;
  }

  function applyFilter(filter, animate) {
    const visible = [];

    cards.forEach((card) => {
      const tags = (card.dataset.tags || '').split(/\s+/).filter(Boolean);
      const match = filter === 'all' || tags.includes(filter);
      card.hidden = !match;
      if (match) visible.push(card);
    });

    filterButtons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.filter === filter));
    });

    if (resultCount) resultCount.textContent = countLabel(visible.length);
    if (emptyState) emptyState.hidden = visible.length !== 0;

    if (!animate) return;

    visible.forEach((card) => card.classList.remove('is-entering'));
    void document.body.offsetWidth;

    requestAnimationFrame(() => {
      visible.forEach((card, index) => {
        card.style.setProperty('--i', String(index));
        card.classList.add('is-entering');
      });
    });
  }

  allFilterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      applyFilter(button.dataset.filter, true);

      if (button.closest('[data-empty]')) {
        const allButton = filterButtons.find((item) => item.dataset.filter === 'all');
        if (allButton) allButton.focus();
      }
    });
  });

  function openProgramNote(trigger) {
    const template = document.getElementById(`detail-${trigger.dataset.puppy}`);
    if (!template || !dialog || !dialogContent) return;

    dialogContent.replaceChildren(template.content.cloneNode(true));
    dialogTrigger = trigger;
    document.documentElement.classList.add('dialog-open');
    dialog.showModal();
    if (closeButton) closeButton.focus();
  }

  function closeProgramNote() {
    if (dialog && dialog.open) dialog.close();
  }

  document.querySelectorAll('[data-puppy]').forEach((trigger) => {
    trigger.addEventListener('click', () => openProgramNote(trigger));
  });

  if (dialog) {
    if (closeButton) closeButton.addEventListener('click', closeProgramNote);

    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) closeProgramNote();
    });

    dialog.addEventListener('keydown', (event) => {
      if (event.key !== 'Tab') return;

      const focusable = Array.from(dialog.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'));
      if (focusable.length === 0) return;

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
      document.documentElement.classList.remove('dialog-open');
      if (dialogContent) dialogContent.replaceChildren();

      if (dialogTrigger) {
        dialogTrigger.focus();
        dialogTrigger = null;
      }
    });
  }

  if (newsletter) {
    const email = newsletter.querySelector('input[type="email"]');
    const error = newsletter.querySelector('[data-newsletter-error]');
    const success = newsletter.querySelector('[data-newsletter-success]');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    newsletter.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!email || !error || !success) return;

      const value = email.value.trim();
      success.hidden = true;

      if (!value || !emailPattern.test(value)) {
        error.hidden = false;
        email.setAttribute('aria-invalid', 'true');
        email.focus();
        return;
      }

      error.hidden = true;
      email.removeAttribute('aria-invalid');
      success.hidden = false;
      newsletter.reset();
    });

    if (email && error && success) {
      email.addEventListener('input', () => {
        if (!error.hidden) {
          error.hidden = true;
          email.removeAttribute('aria-invalid');
        }
        if (!success.hidden) success.hidden = true;
      });
    }
  }
})();
