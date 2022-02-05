`use strict`;

export default class PopUp {
    constructor() {
        this.Popup = document.querySelector('.pop-up');
        this.PopupText = document.querySelector('.pop-up__message');
        this.PopupBtn = document.querySelector('.pop-up__refresh');
        this.exitBtn = document.querySelector('.pop-up__exit');
        this.PopupBtn.addEventListener('click', () => {
            this.onClick && this.onClick();
            this.hide();
            console.log('replayGame');
            });
        this.exitBtn.addEventListener('click', () => {
            this.onClick && this.onClick();
            this.hide();
            console.log('exitGame');
            });
    
    }

    //setClickListener(onClick) {
    //    this.onClick = onClick;
    //}

    setClickListener(buttonName, onClick) {
        this[buttonName].addEventListener('click', onClick);
    }

    showWithText(text) {
        this.Popup.classList.remove('pop-up--hide');
        this.PopupText.innerText = text;
    }

    hide() {
        this.Popup.classList.add('pop-up--hide');
    }
}