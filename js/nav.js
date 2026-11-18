// Dropdown behaviour for the main nav.
// Desktop: CSS handles hover/focus; the caret button also toggles (touch devices).
// Mobile (hamburger): caret toggles an accordion. main.js owns the hamburger itself.
(function () {
    function ready(fn) {
        if (document.readyState !== 'loading') fn();
        else document.addEventListener('DOMContentLoaded', fn);
    }

    ready(function () {
        var items = Array.prototype.slice.call(document.querySelectorAll('.nav-menu .has-sub'));
        if (!items.length) return;

        function closeAll(except) {
            items.forEach(function (li) {
                if (li === except) return;
                li.classList.remove('open');
                var b = li.querySelector('.sub-toggle');
                if (b) b.setAttribute('aria-expanded', 'false');
            });
        }

        items.forEach(function (li) {
            var btn = li.querySelector('.sub-toggle');
            if (!btn) return;
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                var open = !li.classList.contains('open');
                closeAll(li);
                li.classList.toggle('open', open);
                btn.setAttribute('aria-expanded', open ? 'true' : 'false');
            });
        });

        document.addEventListener('click', function (e) {
            if (!e.target.closest('.nav-menu .has-sub')) closeAll();
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeAll();
        });

        // Reset open state when the hamburger menu closes
        var toggle = document.querySelector('.nav-toggle');
        if (toggle) {
            toggle.addEventListener('click', function () {
                setTimeout(function () {
                    var menu = document.querySelector('.nav-menu');
                    if (menu && !menu.classList.contains('active')) closeAll();
                }, 0);
            });
        }
    });
})();
