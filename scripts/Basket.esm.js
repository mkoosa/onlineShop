import {
    products
} from "./products.js";

import {
    BasketPage,
    ACTIVE_CLASS
} from "./BasketPage.esm.js";

import {
    BasketItem,
} from "./BasketItem.esm.js"

import {
    storage
} from "./Storage.esm.js";

import {
    Total
} from "./Total.esm.js"

import {
    Increase
} from "./Increase.esm.js";

import {
    Decrease
} from "./Decrease.esm.js";

const BUTTON_PLUS = 'data-plus';
const BUTTON_MINUS = 'data-minus';

class Basket {
    constructor() {
        this.bagItems = [];
        this.getHtmlElements();
        this.basket.addEventListener('click', this.showHideBasketPage)
        this.addProductsToBasket();
        setTimeout(this.isBasketToShow, 500);
    }

    getHtmlElements() {
        this.quantityInput = document.querySelectorAll('.product__amount');
        this.form = document.querySelectorAll('.product__quantity-form');
        this.addButtons = document.querySelectorAll('.product__order-btn');
        this.basket = document.querySelector('.basket');
        this.basketDivItem = document.querySelector('.basket-page__items');
    }

    addProductsToBasket() {
        this.basketCounter();
        this.bagItems = storage.getItemFromStorage();
        this.form.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const quantity = Number(e.target.quantity.value);
                const productName = e.target.quantity.title;
                const name = this.checkProductName(productName, products);
                this.addProductToBasket(name, quantity);
                this.clearInputValue();
            });
        });
    };

    basketCounter() {
        const basketCounter = document.querySelector('.basket__counter');
        basketCounter.innerText = this.bagItems.length;
    };

    removeProductFromBasket() {
        const removeIcons = document.querySelectorAll('.fa-trash-can');
        removeIcons.forEach(removeIcon => {
            removeIcon.addEventListener('click', (e) => {

                e.target.parentNode.parentNode.remove();
                let value = e.target.parentNode.parentNode.getAttribute('data-name');
                this.updateBasket(value);
                this.basketCounter();
                this.totalItemsValue(this.bagItems);
            });
        });
    };

    updateBasket(value) {
        this.bagItems = this.bagItems.filter(element => element.name !== value);
        storage.addItemToStorage(this.bagItems);
    };

    checkProductName(name, products) {
        let productName;
        products.forEach(product => {
            if (product.name == name) {
                productName = name
            };
        });
        return productName;
    };

    addProductToBasket(name, quantity) {
        if (!quantity) return;
        const product = this.matchProduct(name);
        if (this.checkDoubleProductInBasket(product)) return;
        product.quantity = quantity;
        this.bagItems.push(product);
        this.checkStorage();
        this.checkBasket();
        this.basketCounter();
    };

    checkStorage() {
        if (storage.localStorageTest()) {
            storage.addItemToStorage(this.bagItems);
        };
    };

    checkDoubleProductInBasket(product) {
        let double = false
        const productsInBags = storage.getItemFromStorage()
        productsInBags.forEach(productInBag => {
            if (productInBag.name === product.name) {
                double = true
            };
        });
        return double;
    };

    matchProduct(value) {
        let matchingProduct;
        products.forEach(product => {
            if (value === product.name) {
                matchingProduct = product
            };
        });
        return matchingProduct;

    }
    checkBasket() {
        if (this.bagItems.length) {
            this.basket.classList.add('active');
        };
    };

    clearInputValue() {
        this.quantityInput.forEach(element => {
            element.value = '';
        })
    };

    isBasketToShow = () => {
        let value = storage.getItemFromStorage();
        this.showBasket(value);
    };

    showBasket(value) {

        if (value.length) {
            this.basketCounter();
            document.querySelector('.basket').classList.add(ACTIVE_CLASS);
        };
    };

    showHideBasketPage = () => {
        this.basketPage = new BasketPage();
        this.basketPage.hideShowBasket(this.bagItems.length);
        this.basketPage.hideShowPages();
        this.displayItems(storage.getItemFromStorage());
        this.increase = new Increase(this.bagItems, document.querySelectorAll('.fa-plus'), BUTTON_PLUS);
        this.decrease = new Decrease(this.bagItems, document.querySelectorAll('.fa-minus'), BUTTON_MINUS);
        this.increase.eventTarget();
        this.decrease.eventTarget();
        this.bagItems = this.increase.basketItems;
        this.bagItems = this.decrease.basketItems;
        this.updateBasket(this.bagItems);
        this.showHideDecreaseButton()
        storage.addItemToStorage(this.bagItems);
        this.hideEmptyBasket(this.bagItems.length);
    };

    hideEmptyBasket(value) {
        if (!value) {
            const basket = document.querySelector('.basket');
            basket.classList.remove('active');
        };
    };

    showHideDecreaseButton() {
        this.bagItems.forEach(bagItem => {
            this.decrease.disabledButton(bagItem.quantity, bagItem.name)
        });
    };

    displayItems(items) {
        let elements = document.querySelectorAll('.list-item');
        this.basketPage.doubleHtmlElement(elements);
        items.forEach(item => {
            const basketItem = new BasketItem(item.name, item.price, item.quantity, item.img);
            basketItem.inBag = true;
            this.basketDivItem.appendChild(basketItem.divElement);
        })
        this.removeProductFromBasket()
        this.totalItemsValue(this.bagItems);
    };

    totalItemsValue(items) {
        let totalValue = 0;
        items.forEach(item => {
            totalValue += (item.price * item.quantity)
        });
        totalValue = totalValue.toFixed(2);
        const total = new Total(totalValue);
    };
};

const basket = new Basket();
export default basket;