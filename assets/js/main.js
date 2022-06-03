import { modal } from './modal.js';

function burgerButtonClick() {
    checkBurgerMenu().toggle();
}

// Global events that close modal window: clicking outside it and pressing ESC key

window.addEventListener('click', event => {
    if (event.target == checkModal().window)
        checkModal().closeModal();

    if (!['#menu', '.logo'].
        some(c => event.target.closest(c))) {
            checkBurgerMenu().hide();
    }
})


window.addEventListener('keydown', event => {
    if (event.key == 'Escape') {
        checkModal().closeModal();
        checkBurgerMenu().hide();
    }
});

window.addEventListener('resize', _ => {
    if (window.innerWidth >= 768) checkBurgerMenu().hide();
});

// Smooth scroll into view when clicking anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', event => {
        anchor = event.currentTarget;
        document.querySelector(anchor.getAttribute('href')).
                scrollIntoView({ behavior: 'smooth' });
        event.preventDefault();
    });
});