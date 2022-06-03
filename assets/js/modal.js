class Modal {
    constructor() {
        this.window = this.injectModal();
        this.cards = document.getElementsByClassName('pet-card');
        this.count = this.cards.length;
        window.addEventListener('click', event => {
            if (event.target == this.window)
                checkModal().closeModal();
        });
        window.addEventListener('keydown', event => {
            if (event.key == 'Escape') {
                this.closeModal();
            }
        });
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

    open(data) {
        let name = data.children[1].innerHTML;
        let src = data.children[0].src;
        document.getElementById('pet-title').innerHTML = name;
        document.getElementById('pet-picture').src = src;
        ['kind', 'desc', 'age', 'inoculations', 'diseases', 'parasites'].forEach(x=>{
            let el = document.getElementById('pet-info-' + x);
            if (el) el.innerHTML = pets[name][x] ?? 'none';
        });
        document.body.classList.add('modal-open');
    }

    close() {
        document.body.classList.remove('modal-open');
    }

}

const modal = new Modal();

export { modal };