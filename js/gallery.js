// ===========================================
// Gallery Lightbox Functionality
// ===========================================

let currentIndex = 0;
let galleryImages = [];

document.addEventListener('DOMContentLoaded', () => {
    // Collect all gallery images
    const items = document.querySelectorAll('.gallery-item img');
    galleryImages = Array.from(items).map(img => img.src);

    // Update total count
    const totalEl = document.getElementById('lightbox-total');
    if (totalEl) {
        totalEl.textContent = galleryImages.length;
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox || !lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') changeSlide(-1);
        if (e.key === 'ArrowRight') changeSlide(1);
    });

    // Close on background click
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }
});

function openLightbox(index) {
    currentIndex = index;
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    const current = document.getElementById('lightbox-current');

    if (lightbox && img && galleryImages[index]) {
        img.src = galleryImages[index];
        current.textContent = index + 1;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function changeSlide(direction) {
    currentIndex += direction;

    // Loop around
    if (currentIndex >= galleryImages.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = galleryImages.length - 1;

    const img = document.getElementById('lightbox-img');
    const current = document.getElementById('lightbox-current');

    if (img && galleryImages[currentIndex]) {
        img.src = galleryImages[currentIndex];
        current.textContent = currentIndex + 1;
    }
}
