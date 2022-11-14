const BUTTON_ATTRIBUTE = 'data-minus';

import {
    Increase
} from "./Increase.esm.js";

export class Decrease extends Increase {
    constructor(basketItems, buttons, plusOrMinus) {
        super(basketItems, buttons, plusOrMinus)
    };
};