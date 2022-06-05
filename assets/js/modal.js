import { pets } from "./petinfo.js";

class Modal {
    constructor() {
        this.window = this.injectModal();
        this.cards = document.getElementsByClassName('pet-card');
        this.count = this.cards.length;        
        window.addEventListener('keydown', event => {
            if (event.key == 'Escape') {
                this.close();
            }
        });
        window.addEventListener('click', event => {
            if (event.target === this.window) {
                this.close();
            }
        });
    }

    injectModal() {
        let _modal = document.createElement('div');
        _modal.id = 'modal';
        _modal.innerHTML = 
        `<div id="modal-window">
            <button type="button" class="secondary circle close"></button>
            <div id="modal-content">
                <img id="pet-picture">
                <div id="pet-info" class="pet-info">
                    <h3 id="pet-title"></h3>
                    <h4><span id="pet-info-type"></span> - <span id="pet-info-breed"></span></h4>
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
        _modal.querySelector('button').addEventListener('click', _ => this.close());
        document.body.appendChild(_modal);
        return document.getElementById('modal');
    }

    open(data) {
        document.getElementById('pet-title').innerHTML = data.name;
        document.getElementById('pet-picture').src = data.img;
        ['type', 'breed', 'description', 'age', 'inoculations', 'diseases', 'parasites'].forEach(x => {
            let el = document.getElementById('pet-info-' + x);
            if (el) el.innerHTML = data[x] ?? 'none';
        });
        document.body.classList.add('modal-open');
    }

    close() {
        document.body.classList.remove('modal-open');
    }

}

const modal = new Modal();

export { modal };