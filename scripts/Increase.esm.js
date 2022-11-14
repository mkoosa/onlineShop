import {
    storage
} from "./Storage.esm.js";
import {
    Total
} from "./Total.esm.js";

export class Increase {
    constructor(basketItems, buttons, plusOrMinus) {
        this.basketItems = basketItems;
        this.buttons = buttons;
        this.plusOrMinus = plusOrMinus;
    };

    eventTarget() {
        this.buttons.forEach(button => {
            button.addEventListener('click', (e) => this.changeQuantity(e))
        })
    };
    changeQuantity(e) {
        let item = e.target.getAttribute(this.plusOrMinus);
        this.basketItems.forEach(basketItem => {
            if (basketItem.name === item) {
                switch (this.plusOrMinus) {
                    case 'data-plus':
                        basketItem.quantity++;
                        this.updatesItemsValue(item, this.basketItems, basketItem.quantity, basketItem.price);
                        this.disabledButton(basketItem.quantity, basketItem.name)
                        break;
                    case 'data-minus':
                        basketItem.quantity--;
                        this.updatesItemsValue(item, this.basketItems, basketItem.quantity, basketItem.price);
                        this.disabledButton(basketItem.quantity, basketItem.name)
                        break;
                };
            };
        });
    };

    updatesItemsValue(item, items, quantity, price, ) {
        this.updateItemsQuantity(item, quantity);
        this.updateTotalPriceItem(item, quantity, price);
        this.updateTotalPrice(items);
        storage.addItemToStorage(items);
    };

    disabledButton(quantity, item) {
        let button = document.querySelector(`[data-minus-button =${item}]`);
        if (quantity < 1) {
            button.style.display = 'none'    
        };
        if (quantity > 0) {
            button.style.display = 'flex'
        };
    };

    updateItemsQuantity(item, quantity) {
        document.querySelector(`[data-product-quantity =${item}]`).textContent = quantity;
    };

    updateTotalPriceItem(item, quantity, price) {
        document.querySelector(`[data-price-total =${item}]`).textContent = (quantity * price).toFixed(2);
    };

    updateTotalPrice(items) {
        let totalPrice = 0;
        items.forEach(item => {
            totalPrice += (item.quantity * item.price)
        });
        const total = new Total(totalPrice.toFixed(2));
    };

};