import { pets, generatePetCard, repeatPets } from "./petinfo.js";

class Paginator {
    pos = 0;
    cardsNumber;
    wrapper = document.getElementById('cards-wrapper');
    container = document.getElementById('cards-container');
    buttons = ['fast-backward', 'backward', 'current-number', 'forward', 'fast-forward'].
                map(id => document.getElementById(id));

    constructor() {
        this.buttons.forEach(button => button.addEventListener('click', e => {
            this.click(e.currentTarget.id);
        }));                   
        window.addEventListener('resize', () => {            
            this.update();
        });                        
        this.update();
    }

    get count() {
        return 48 / this.cardsNumber;
    }

    update() {
        let cardsNumber = 8;
        if (window.innerWidth < 768) {
            cardsNumber = 6;
        } else if (window.innerWidth < 1280) {
            cardsNumber = 3;
        }
        if (this.cardsNumber != cardsNumber) {
            this.cardsNumber = cardsNumber;
            this.container.replaceChildren(generatePetCard(repeatPets(cardsNumber, this.count, true)));
            this.moveTo(0);
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
        console.log('-' + this.wrapper.offsetHeight + 'px');
        const top = '-' + (this.wrapper.offsetHeight * position) + 'px'
        console.log(top);
        this.container.style.top = top;
        this.resetButtons();
    }

    click(button) {
        switch (button) {
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