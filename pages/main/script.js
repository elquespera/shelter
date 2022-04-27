class Slider {
    pos = 0;
    cardWidth = 270 + 80;
    cardsinView = 3;
    constructor() {
        this.slider = document.getElementById('pets-slider');
        this.cards = document.getElementsByClassName('pet-card');
        if (this.cards.length > 0) {            
            this.cardWidth = this.cards[0].offsetWidth + 
                            parseInt(getComputedStyle(this.cards[0]).marginLeft);
        }
        this.count = this.cards.length - this.cardsinView + 1;
    }

    moveTo(position = 0) {
        if (position >= this.count) { 
            position = 0
        } else if (position < 0) {
            position = this.count - 1;
        }
        this.slider.style.left = -position * this.cardWidth + 'px';        
        this.pos = position;
    }

    moveOne(isRight = false) {
        this.moveTo(this.pos + (isRight ? 1 : -1));
    }
}

let slider;

function sliderButtonClick(isRight = false) {
    if (slider == undefined) slider = new Slider();
    slider.moveOne(isRight); 
}