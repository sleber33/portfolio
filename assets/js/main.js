document.addEventListener('DOMContentLoaded', () => {
  const menuOverlay = document.querySelector('.menu-overlay');
  const menuToggles = document.querySelectorAll('[data-menu-toggle]');

  menuToggles.forEach((toggle) => {
    toggle.addEventListener('click', (event) => {
      event.preventDefault();
      if (!menuOverlay) return;
      menuOverlay.classList.toggle('open');
    });
  });

  if (menuOverlay) {
    menuOverlay.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menuOverlay.classList.remove('open');
      });
    });
  }

  if (document.body.classList.contains('home')) {
    setupDragCanvas();
  }
});

function setupDragCanvas() {
  const wrapper = document.querySelector('.canvas-wrapper');
  const inner = document.querySelector('.canvas-inner');
  if (!wrapper || !inner) return;

  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let currentX = -220;
  let currentY = -160;

  applyTransform();

  wrapper.addEventListener('pointerdown', (event) => {
    isDragging = true;
    startX = event.clientX - currentX;
    startY = event.clientY - currentY;
    wrapper.classList.add('dragging');
  });

  window.addEventListener('pointerup', stopDrag);
  window.addEventListener('pointerleave', stopDrag);

  wrapper.addEventListener('pointermove', (event) => {
    if (!isDragging) return;
    currentX = event.clientX - startX;
    currentY = event.clientY - startY;
    applyTransform();
  });

  function stopDrag() {
    if (!isDragging) return;
    isDragging = false;
    wrapper.classList.remove('dragging');
  }

  function applyTransform() {
    inner.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
  }
}
