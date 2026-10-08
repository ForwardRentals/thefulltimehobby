// ===========================================
// Stock Photos: sticky filters (location, category, colour),
// back to top, license lightbox
// ===========================================

document.addEventListener('DOMContentLoaded', () => {
    const items = Array.from(document.querySelectorAll('.stock-item'));
    const lightbox = document.getElementById('stock-lightbox');
    const lbImg = lightbox.querySelector('.stock-lb-image img');
    const lbTitle = lightbox.querySelector('.stock-lb-title');
    const lbMeta = lightbox.querySelector('.stock-lb-meta');
    const lbLicense = lightbox.querySelector('.stock-lb-license');
    const lbPage = lightbox.querySelector('.stock-lb-page');
    let visible = items;
    let current = 0;

    // ---- Filters: location + category + colour, combined ----
    const toolbar = document.getElementById('stock-filters');
    const grid = document.querySelector('.stock-grid');
    const countEl = document.querySelector('.stock-count');
    const emptyEl = document.querySelector('.stock-empty');
    const clearBtns = document.querySelectorAll('.stock-clear');
    const state = { place: 'all', cat: 'all', color: 'all' };
    const keys = { place: 'place', cat: 'cat', color: 'color' };
    const total = items.length;

    function chipsFor(key) {
        return toolbar ? toolbar.querySelectorAll(`[data-${key}]`) : [];
    }

    function matches(item) {
        const d = item.dataset;
        if (state.place !== 'all' && !(d.places || '').split(' ').includes(state.place)) return false;
        if (state.cat !== 'all' && d.category !== state.cat) return false;
        if (state.color !== 'all' && !(d.colors || '').split(' ').includes(state.color)) return false;
        return true;
    }

    function labelFor(key) {
        const chip = toolbar && toolbar.querySelector(`[data-${key}="${CSS.escape(state[key])}"]`);
        if (!chip) return '';
        const clone = chip.cloneNode(true);
        clone.querySelectorAll('span, i').forEach(n => n.remove());
        return clone.textContent.trim();
    }

    function apply(scroll) {
        items.forEach(item => { item.hidden = !matches(item); });
        visible = items.filter(item => !item.hidden);
        Object.keys(keys).forEach(key => {
            chipsFor(key).forEach(chip => chip.classList.toggle('active', chip.dataset[key] === state[key]));
        });
        const active = Object.keys(keys).filter(k => state[k] !== 'all');
        if (countEl) {
            const parts = active.map(labelFor).filter(Boolean);
            countEl.textContent = active.length
                ? `Showing ${visible.length} of ${total} photos: ${parts.join(' · ')}`
                : `Showing all ${total} photos`;
        }
        clearBtns.forEach(btn => { btn.hidden = !active.length; });
        if (emptyEl) emptyEl.hidden = visible.length > 0;

        const params = new URLSearchParams(location.search);
        Object.keys(keys).forEach(k => {
            if (state[k] === 'all') params.delete(k); else params.set(k, state[k]);
        });
        const qs = params.toString();
        history.replaceState(null, '', location.pathname + (qs ? `?${qs}` : '') + location.hash);

        // If the visitor is already down in the grid, bring the new results into view.
        if (scroll && grid && toolbar) {
            const top = grid.getBoundingClientRect().top + window.pageYOffset - toolbar.offsetHeight - navHeight() - 12;
            if (window.pageYOffset > top) window.scrollTo({ top, behavior: 'smooth' });
        }
    }

    if (toolbar) {
        Object.keys(keys).forEach(key => {
            chipsFor(key).forEach(chip => {
                chip.addEventListener('click', e => {
                    e.preventDefault(); // location chips are real links for crawlers; filter in place instead
                    const val = chip.dataset[key];
                    state[key] = (state[key] === val && val !== 'all') ? 'all' : val;
                    apply(true);
                });
            });
        });
        clearBtns.forEach(btn => btn.addEventListener('click', () => {
            state.place = state.cat = state.color = 'all';
            apply(true);
        }));

        // Restore filters from the URL (?place=whistler&cat=Winter&color=blue)
        const params = new URLSearchParams(location.search);
        Object.keys(keys).forEach(k => {
            const v = params.get(k);
            if (v && toolbar.querySelector(`[data-${k}="${CSS.escape(v)}"]`)) state[k] = v;
        });
        if (Object.keys(keys).some(k => state[k] !== 'all')) apply(false);

        // Shadow under the bar once it is stuck
        const sentinel = document.createElement('div');
        sentinel.setAttribute('aria-hidden', 'true');
        toolbar.before(sentinel);
        new IntersectionObserver(([entry]) => {
            toolbar.classList.toggle('is-stuck', !entry.isIntersecting && entry.boundingClientRect.top < 0 + navHeight() + 1);
        }, { rootMargin: `-${navHeight() + 1}px 0px 0px 0px` }).observe(sentinel);
    }

    // Keep the bar tucked right under the fixed site nav
    function navHeight() {
        const nav = document.querySelector('.nav');
        return nav ? nav.offsetHeight : 0;
    }
    function setNavVar() {
        document.documentElement.style.setProperty('--nav-h', `${navHeight()}px`);
    }
    setNavVar();
    window.addEventListener('resize', setNavVar);

    // ---- Back to top ----
    const topBtn = document.querySelector('.back-to-top');
    if (topBtn) {
        topBtn.hidden = false;
        const toggleTop = () => topBtn.classList.toggle('is-visible', window.pageYOffset > 900);
        window.addEventListener('scroll', toggleTop, { passive: true });
        toggleTop();
        topBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            const first = toolbar && toolbar.querySelector('.stock-chip');
            if (first) setTimeout(() => first.focus({ preventScroll: true }), 600);
        });
    }

    function show(index) {
        current = (index + visible.length) % visible.length;
        const d = visible[current].dataset;
        lbImg.src = d.full;
        lbImg.alt = d.title;
        lbTitle.textContent = d.title;
        lbMeta.textContent = [d.id, d.location, d.category, `Original ${d.size}`].filter(Boolean).join(' · ');
        if (lbPage) lbPage.href = d.page;
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
        item.addEventListener('click', e => { if (!e.target.closest('a')) open(item); });
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
