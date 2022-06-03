// Pet information
const pets = {
    Katrine: {
        kind: "Cat - British Shorthair",
        desc: "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
        age: '1 year',
        inoculations: ''
    },
    Jennifer: {
        kind: 'Dog - Labrador',
        desc: "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
        age: '2 months'
    },
    Woody: {
        kind: "Dog - Golden Retriever",
        desc: "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
        age: '3 years'
    },   
    Sophia: {
        kind: "Dog - Shih tzu",
        desc: "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
        age: '1 year'
    },
    Timmy: {
        kind: "Cat - British Shorthair",
        desc: "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
        age: '3 years'
    },                        
    Charly: {
        kind: "Dog - Jack Russell Terrier",
        desc: "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
        age: '1 year'
    },
    Scarlett: {
        kind: "Dog - Jack Russell Terrier",
        desc: "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human."
    },
    Freddie: {
        kind: "Cat - British Shorthair",
        desc: "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home."
    }                              
}

class Modal {
    constructor() {
        this.window = document.getElementById('modal') ?? this.injectModal();
        this.cards = document.getElementsByClassName('pet-card');
        this.count = this.cards.length;
    }

    injectModal() {
        let _modal = document.createElement('div');
        _modal.id = 'modal';
        _modal.innerHTML = 
        `<div id="modal-window">
            <button type="button" class="secondary circle close" onclick="modalClose()"></button>
            <div id="modal-content">
                <img id="pet-picture">
                <div id="pet-info" class="pet-info">
                    <h3 id="pet-title"></h3>
                    <h4 id="pet-info-kind"></h4>
                    <h5 id="pet-info-desc"></h5>
                    <ul>
                        <li>Age: <span id="pet-info-age"></span></li>
                        <li>Inoculations: <span id="pet-info-inoculations"></span></li>
                        <li>Diseases: <span id="pet-info-diseases"></span></li>
                        <li>Parasites: <span id="pet-info-parasites"></span></li>
                    </ul>
                </div>
            </div>
        </div>`;
        document.body.appendChild(_modal);
        return document.getElementById('modal');
    }

    openModal(card) {
        let name = card.children[1].innerHTML;
        let src = card.children[0].src;
        document.getElementById('pet-title').innerHTML = name;
        document.getElementById('pet-picture').src = src;
        ['kind', 'desc', 'age', 'inoculations', 'diseases', 'parasites'].forEach(x=>{
            let el = document.getElementById('pet-info-' + x);
            if (el) el.innerHTML = pets[name][x] ?? 'none';
        });
        document.body.classList.add('modal-open');
        // this.window.style.display = 'flex';
    }

    closeModal() {
        document.body.classList.remove('modal-open');
        // this.window.style.display = 'none';
    }

}

class BurgerMenu {
    _open = false;
    _elements = ['#menu', '.logo', 'body'].
                map(el => document.querySelector(el));
    
    constructor () {
        const menuItems = document.querySelectorAll('#menu li');
        menuItems.forEach(item => {
            item.addEventListener('click', event => {
                this.hide();
            });
        })
        // About the shelter behaviour 
        
    }
    show() {
        if (!this._open) {
        this._open = true;
        this._elements.forEach(el => el.classList.add('menu-open'));
    }}
    hide() {
        if (this._open) {
            this._open = false;
            this._elements.forEach(el => el.classList.remove('menu-open'));    
        }
    }

    toggle = () => this._open ? this.hide() : this.show();
}

//Create modal variable of Modal class if necessary

let modal;
let burgerMenu;

function checkModal() {
    if (!modal) modal = new Modal();
    return modal;
}

function checkBurgerMenu() {
    if (!burgerMenu) burgerMenu = new BurgerMenu();
    return burgerMenu;
}

function modalOpen(card) {
    checkModal().openModal(card);
}


function modalClose() {
    checkModal().closeModal();
}

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