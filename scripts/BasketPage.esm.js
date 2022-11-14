export const ACTIVE_CLASS = 'active';

export class BasketPage {
    constructor() {
        this.page = document.querySelector('.basket-page');
    };

    hideShowBasket(value) {
        this.isEmptyBasket(value);
        this.page.classList.toggle(ACTIVE_CLASS);
    };

    isEmptyBasket(value) {
        if (!value) return;
    };

    hideShowPages() {
        const main = document.querySelector('.main');
        const storeManagement = document.querySelector('.store-management');
        const starting = document.querySelector('.starting');
        [main, storeManagement, starting].forEach(element => element.classList.toggle(ACTIVE_CLASS));
    };

    doubleHtmlElement(elements) {
        Array.from(elements).forEach(element => {
            element.remove();
        });
    };
};