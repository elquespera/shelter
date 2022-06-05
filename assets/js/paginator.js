import { pets, generatePetCard, repeatPets } from "./petinfo.js";

class Paginator {
    pos = 0;
    cardsNumber;
    constructor() {
        this.container = document.getElementById('cards-container');
        this.cards = this.container.children;
        this.count = this.cards.length;
        this.buttons = ['fast-backward', 'backward', 'current-number', 'forward', 'fast-forward'].
                        map(id => document.getElementById(id));
        window.addEventListener('resize', () => {            
            this.update();
        });                        
        this.update();
    }

    update() {
        let cardsNumber = 8;
        if (window.innerWidth < 768) {
            this._cardsInView = 6;
        } else if (window.innerWidth < 1280) {
            this._cardsInView = 3;
        }
        if (this.cardsNumber != cardsNumber) {
            this.cardsNumber = cardsNumber;
            this.container.replaceChildren(generatePetCard(repeatPets(cardsNumber, 6, true)));
        }
    }

    resetButtons () {
        this.buttons[0].disabled = this.pos <= 0;
        this.buttons[1].disabled = this.pos <= 0;
        this.buttons[2].innerHTML = this.pos + 1;
        this.buttons[3].disabled = this.pos >= this.count - 1;
        this.buttons[4].disabled = this.pos >= this.count - 1;
    }
    moveTo(position = 0) {
        if (position >= this.count) { 
            position = 0
        } else if (position < 0) {
            position = this.count - 1;
        }
        this.pos = position;
        console.log(this.cards[0].style.order);
        for (let i = 0; i < this.count; i++)
            this.cards[i].style.order = (i + position) % this.count;
        this.resetButtons();
    }

    click(button) {
        switch (button.id) {
            case 'fast-backward':
                this.moveTo(0);
                break;
            case 'backward':
                this.moveTo(this.pos - 1);
                break;
            case 'forward':
                this.moveTo(this.pos + 1);
                break;
             case 'fast-forward':
                this.moveTo(this.count - 1);
                break;
        }
    }
}

const paginator = new Paginator();

export { paginator };