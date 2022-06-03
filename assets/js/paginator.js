class Paginator {
    pos = 0;
    constructor() {
        this.container = document.getElementById('cards-container');
        this.cards = this.container.children;
        this.count = this.cards.length;
        this.buttons = ['fast-backward', 'backward', 'current-number', 'forward', 'fast-forward'].
                        map(id => document.getElementById(id));
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
}

let paginator;

function paginatorClick(button) {
    if (!paginator) paginator = new Paginator();
    switch (button.id) {
        case 'fast-backward':
            paginator.moveTo(0);
            break;
        case 'backward':
            paginator.moveTo(paginator.pos - 1);
            break;
        case 'forward':
            paginator.moveTo(paginator.pos + 1);
            break;
         case 'fast-forward':
            paginator.moveTo(paginator.count - 1);
            break;
    }
}