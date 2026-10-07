// ===========================================
// Stock Photos: filters + license lightbox
// ===========================================

document.addEventListener('DOMContentLoaded', () => {
    const items = Array.from(document.querySelectorAll('.stock-item'));
    const filters = document.querySelectorAll('.stock-filter');
    const lightbox = document.getElementById('stock-lightbox');
    const lbImg = lightbox.querySelector('.stock-lb-image img');
    const lbTitle = lightbox.querySelector('.stock-lb-title');
    const lbMeta = lightbox.querySelector('.stock-lb-meta');
    const lbLicense = lightbox.querySelector('.stock-lb-license');
    let visible = items;
    let current = 0;

    filters.forEach(btn => {
        btn.addEventListener('click', () => {
            const cat = btn.dataset.filter;
            filters.forEach(b => b.classList.toggle('active', b === btn));
            items.forEach(item => {
                item.hidden = cat !== 'all' && item.dataset.category !== cat;
            });
            visible = items.filter(item => !item.hidden);
        });
    });

    function show(index) {
        current = (index + visible.length) % visible.length;
        const d = visible[current].dataset;
        lbImg.src = d.full;
        lbImg.alt = d.title;
        lbTitle.textContent = d.title;
        lbMeta.textContent = `${d.id} · ${d.category} · Original ${d.size}`;
        const subject = `Stock license: ${d.title} (${d.id})`;
        const body = `Hi Jeremy,\n\nI'd like to license ${d.id} – ${d.title}.\n\nLicense (Web & Social / Commercial / Extended):\nHow and where it will be used:\nCompany:\n\nThanks!`;
        lbLicense.href = `mailto:thefulltimehobby@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }

    function open(item) {
        visible = items.filter(i => !i.hidden);
        show(visible.indexOf(item));
        lightbox.hidden = false;
        document.body.style.overflow = 'hidden';
        lightbox.querySelector('.stock-lb-close').focus();
    }

    function close() {
        lightbox.hidden = true;
        document.body.style.overflow = '';
    }

    items.forEach(item => {
        item.tabIndex = 0;
        item.addEventListener('click', () => open(item));
        item.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(item); }
        });
    });

    lightbox.querySelector('.stock-lb-close').addEventListener('click', close);
    lightbox.querySelector('.prev').addEventListener('click', () => show(current - 1));
    lightbox.querySelector('.next').addEventListener('click', () => show(current + 1));
    lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
    lightbox.addEventListener('contextmenu', e => { if (e.target === lbImg) e.preventDefault(); });

    document.addEventListener('keydown', e => {
        if (lightbox.hidden) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft') show(current - 1);
        if (e.key === 'ArrowRight') show(current + 1);
    });
});
