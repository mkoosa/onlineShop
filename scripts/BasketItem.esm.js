export class BasketItem {
    constructor(name, price, quantity, img, inBag) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.img = img;
        this.inBag = inBag;
        this.creteItem(this.name, this.price, this.quantity, this.img);
    }
    creteItem(product, price, quantity, img) {
        let element = `
        <div class="basket-page__list-item list-item" data-name=${product}>
                <div class="list-item__top">
                            <div class="ordered-product-img">
                                <img src="${img}" alt="">
                            </div>
                            <div class="flex-column">
                                <p class="ordered-product-description">${product}</p>
                                <p class="ordered-product-quantity">Quantity<span class="quantity-value" data-product-quantity=${product}>${quantity}</span></p>
                            <div class="list-item__buttons">
                        <button type="button" class="list-item__button list-item__button--increase"><i class="fas fa-regular fa-plus" data-plus=${product}></i></button>
                        <button type="button" class="list-item__button list-item__button--decrease" data-minus-button=${product}><i class="fas fa-regular fa-minus" data-minus=${product}></i></button>
                    </div>
                            </div>
                        </div>
                        <p class="remove-item"><i class="fa-solid fa-trash-can"></i></p>
                        <div class="list-item__bottom">
                            <p class="price-item">Price</p>
                            <p class="price"><span class="price-value" data-price-total=${product}>${(price*quantity).toFixed(2)}</span> $</p>
                        </div>
        </div>
     `;

        this.divElement = document.createElement('div');
        this.divElement.innerHTML = element;
        this.totalValue = (price * quantity).toFixed(2);




    }
}