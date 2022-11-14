export class Total{
    constructor(totalPrice) {
        this.totalPrice = totalPrice;
        this.getHtmlElements();
        this.fillValue(totalPrice);
    };
    
    getHtmlElements() {
        this.priceItem = document.querySelector('.price-in-total');
        this.totalPriceItem = document.querySelector('.total-value');
        
    };

    fillValue(value) {
        this.priceItem.innerText = value;
        this.totalPriceItem.innerText = value;
    };
};