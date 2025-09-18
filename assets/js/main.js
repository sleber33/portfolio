document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('[data-menu-toggle]');
    const menuPanel = document.querySelector('[data-project-menu]');
    const menuLinks = menuPanel ? menuPanel.querySelectorAll('a') : [];

    const toggleMenu = (force) => {
        if (!menuPanel || !menuToggle) return;
        const willOpen = typeof force === 'boolean' ? force : !menuPanel.classList.contains('is-open');
        menuPanel.classList.toggle('is-open', willOpen);
        menuToggle.setAttribute('aria-expanded', String(willOpen));
        document.body.classList.toggle('menu-open', willOpen);
    };

    if (menuToggle) {
        menuToggle.addEventListener('click', () => toggleMenu());
    }

    menuLinks.forEach((link) => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    document.addEventListener('keyup', (event) => {
        if (event.key === 'Escape') {
            toggleMenu(false);
        }
    });

    const dragContainer = document.querySelector('[data-drag-container]');
    const dragSurface = document.querySelector('[data-drag-surface]');

    if (dragContainer && dragSurface) {
        let isDragging = false;
        let startX = 0;
        let startY = 0;


        const updatePosition = () => {
            dragSurface.style.setProperty('--offset-x', `${currentX}px`);
            dragSurface.style.setProperty('--offset-y', `${currentY}px`);
        };

        const pointerDown = (event) => {
            if (event.button !== 0) return;
            if (event.target.closest('a, button')) return;
            isDragging = true;
            dragContainer.classList.add('is-dragging');
            startX = event.clientX - currentX;
            startY = event.clientY - currentY;
            event.preventDefault();
            try {
                dragContainer.setPointerCapture(event.pointerId);
            } catch (error) {
                // Ignore pointer capture errors (e.g., unsupported browser)
            }
        };

        const pointerMove = (event) => {
            if (!isDragging) return;
            currentX = event.clientX - startX;
            currentY = event.clientY - startY;
            updatePosition();
        };

        const stopDragging = (event) => {
            isDragging = false;
            dragContainer.classList.remove('is-dragging');
            try {
                dragContainer.releasePointerCapture(event.pointerId);
            } catch (error) {
                // ignore release errors when pointer capture was not set
            }
        };

        dragContainer.addEventListener('pointerdown', pointerDown);
        dragContainer.addEventListener('pointermove', pointerMove);
        dragContainer.addEventListener('pointerup', stopDragging);
        dragContainer.addEventListener('pointerleave', stopDragging);
        dragContainer.addEventListener('pointercancel', stopDragging);
    }
});
