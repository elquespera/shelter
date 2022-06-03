class Slider {
    _pos = 0;
    _cardWidth = 270 + 40;
    _cardsInView = 3;
    _slider = document.querySelector('#pets-slider');
    _cards = document.querySelectorAll('.pet-card');
    constructor() {
        this.update();
    }

    get count() {
        return this._cards.length;
    }

    update() {
        if (this._cards[0]) {            
            this._cardWidth = this._cards[0].offsetWidth + 
                parseInt(getComputedStyle(this._cards[0]).marginRight);
        }

        this.moveTo(this._pos);
    }

    moveTo(position = 0) {
        if (position >= this.count) { 
            position = 0
        } else if (position < 0) {
            position = this.count - 1;
        }
        this._slider.style.left = -position * this._cardWidth + 'px';        
        this._pos = position;
    }

    moveOne(isRight = false) {
        this.moveTo(this._pos + (isRight ? this._cardsInView : -this._cardsInView));
    }
}

let slider;

const checkSlider = () => {
    if (!slider) slider = new Slider();
    return slider;
} 

function sliderButtonClick(isRight = false) {
    checkSlider().moveOne(isRight); 
}

window.addEventListener('resize', _ => {
    const width = window.innerWidth;
    if (width < 768) {
        cards = 1;
    } else if (width < 1280) {
        cards = 2;
    } else {
        cards = 3;
    }
    checkSlider()._cardsInView = cards;
    checkSlider().update();
});