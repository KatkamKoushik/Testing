document.addEventListener('DOMContentLoaded', () => {
    // Basic setup to ensure elements are visible if the original loader logic is missing
    const loaderElements = document.querySelectorAll('.js-loader, .js-page-transition, .loader');
    loaderElements.forEach(el => {
        el.style.display = 'none';
        el.style.opacity = '0';
        el.style.visibility = 'hidden';
    });

    document.documentElement.classList.remove('is-loading');

    // Simple scroll reveal (very basic version of what the site likely does)
    const fadeElements = document.querySelectorAll('.landing-title__text, .landing-title__subheading, .tagline');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(el);
    });
});
