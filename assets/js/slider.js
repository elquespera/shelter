import { pets, generatePetCard, repeatPets } from "./petinfo.js";

class Slider {
    _pos = 0;
    _cardWidth = 270 + 40;
    _cardsInView = 3;
    _slider = document.querySelector('#pets-slider');
    constructor() {       
        this._slider.replaceChildren(generatePetCard(repeatPets()));
        this._cards = document.querySelectorAll('.pet-card'); 
        this.update();
        window.addEventListener('resize', () => {            
            this.update();
        });
        document.querySelectorAll('#slider-left, #slider-right').forEach(button => {
            button.addEventListener('click', event => this.moveOne(event.currentTarget.id === 'slider-right'));
        });
    }

    get count() {
        return this._cards.length;
    }

    update() {
        this._cardsInView = 3;
        if (window.innerWidth < 768) {
            this._cardsInView = 1;
        } else if (window.innerWidth < 1280) {
            this._cardsInView = 2;
        }        
        if (this._cards[0]) {            
            this._cardWidth = this._cards[0].offsetWidth + 
                parseInt(getComputedStyle(this._cards[0]).marginRight);
        }
        this.moveTo(this._pos);
    }

    moveTo(position = 0) {
        if (position >= this.count - 2) { 
            position = 0
        } else if (position < 0) {
            position = this.count - 3;
        }
        this._slider.style.left = -position * this._cardWidth + 'px';        
        this._pos = position;
    }

    moveOne(isRight = false) {
        this.moveTo(this._pos + (isRight ? this._cardsInView : -this._cardsInView));
    }
}

const slider = new Slider();

export { slider };