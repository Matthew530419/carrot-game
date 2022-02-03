`use strict`;

export default class PopUp {
    constructor() {
        this.Popup = document.querySelector('.pop-up');
        this.PopupText = document.querySelector('.pop-up__message');
        this.PopupBtn = document.querySelector('.pop-up__refresh');
        this.PopupBtn.addEventListener('click', () => {
            this.onClick && this.onClick();
            hide();
        });
    }

    setClickListener(onClick) {
        this.onClick = onClick;
    }

    showWithText(text) {
        this.Popup.classList.remove('pop-up--hide');
        this.PopupText.innerText = text;
    }

    hide() {
        this.Popup.classList.add('pop-up--hide');
    }
}