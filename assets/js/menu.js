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
        });
        window.addEventListener('click', event => {
            if (!['#menu', '.logo'].
                some(c => event.target.closest(c))) {
                    this.hide();
            }
        });                
        window.addEventListener('keydown', event => {
            if (event.key == 'Escape') {
                this.hide();
            }
        });
        window.addEventListener('resize', _ => {
            if (window.innerWidth >= 768) this.hide();
        }); 
        
        document.querySelector('#burger-button')?.addEventListener('click', _ => {
            this.toggle();
        })
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

const burgerMenu = new BurgerMenu();
export { burgerMenu };