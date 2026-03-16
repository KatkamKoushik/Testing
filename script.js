document.addEventListener('DOMContentLoaded', () => {
    // Remove no-js class and add js class so CSS can target JS-enabled state
    document.documentElement.classList.remove('no-js');
    document.documentElement.classList.add('js');

    // Hide loader/transition elements immediately
    const loaderElements = document.querySelectorAll(
        '.js-loader, .js-page-transition, .loader, .js-loader\\:progress, .loader__sprite-container'
    );
    loaderElements.forEach(el => {
        el.style.display = 'none';
        el.style.opacity = '0';
        el.style.visibility = 'hidden';
    });
    document.documentElement.classList.remove('is-loading');

    // Mobile menu toggle
    const menuToggleBtn = document.querySelector('.js-menu-toggle');
    const menu = document.getElementById('menu-toggle');
    if (menuToggleBtn && menu) {
        menuToggleBtn.addEventListener('click', () => {
            const isOpen = menu.classList.toggle('is-open');
            menuToggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });
        // Close menu on link click
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('is-open');
                menuToggleBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }

    // Currency dropdown toggle
    const currencyToggle = document.querySelector('.js-currency-toggle');
    const currencyList = document.getElementById('currency-toggle');
    if (currencyToggle && currencyList) {
        currencyToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = currencyToggle.getAttribute('aria-expanded') === 'true';
            currencyToggle.setAttribute('aria-expanded', (!isExpanded).toString());
            currencyList.style.display = isExpanded ? 'none' : 'block';
        });
        document.addEventListener('click', () => {
            currencyToggle.setAttribute('aria-expanded', 'false');
            currencyList.style.display = 'none';
        });
    }

    // Audio button toggle (visual only - no actual audio without original assets)
    const audioBtn = document.querySelector('.js-audio-button');
    if (audioBtn) {
        let audioOn = false;
        const audioOnIcon = audioBtn.querySelector('.js-audio-button\\:on');
        const audioOffIcon = audioBtn.querySelector('.js-audio-button\\:off');
        if (audioOnIcon) audioOnIcon.style.display = 'none';
        if (audioOffIcon) audioOffIcon.style.display = 'block';
        audioBtn.addEventListener('click', () => {
            audioOn = !audioOn;
            if (audioOnIcon) audioOnIcon.style.display = audioOn ? 'block' : 'none';
            if (audioOffIcon) audioOffIcon.style.display = audioOn ? 'none' : 'block';
        });
    }

    // Footer accordion (mobile)
    const homeToggle = document.querySelector('.js-home-toggle');
    const footerContent = document.getElementById('footer-toggle');
    if (homeToggle && footerContent && window.innerWidth < 768) {
        footerContent.style.display = 'none';
        homeToggle.setAttribute('aria-expanded', 'false');
        homeToggle.addEventListener('click', () => {
            const isExpanded = homeToggle.getAttribute('aria-expanded') === 'true';
            homeToggle.setAttribute('aria-expanded', (!isExpanded).toString());
            footerContent.style.display = isExpanded ? 'none' : 'block';
        });
    }

    // Scroll reveal for landing text elements
    if ('IntersectionObserver' in window) {
        const fadeElements = document.querySelectorAll(
            '.landing-title__text, .landing-title__subheading, .tagline, .landing-title__container_cta'
        );
        const observerOptions = { root: null, rootMargin: '0px', threshold: 0.05 };
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    obs.unobserve(entry.target);
                }
            });
        }, observerOptions);
        fadeElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(24px)';
            el.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out';
            observer.observe(el);
        });
    }

    // Set CSS vh variable for mobile browsers
    function setVh() {
        document.documentElement.style.setProperty('--vh', (window.innerHeight * 0.01) + 'px');
    }
    setVh();
    window.addEventListener('resize', setVh);
});

