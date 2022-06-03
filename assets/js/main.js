// Smooth scroll into view when clicking anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', event => {
        anchor = event.currentTarget;
        document.querySelector(anchor.getAttribute('href')).
                scrollIntoView({ behavior: 'smooth' });
        event.preventDefault();
    });
});