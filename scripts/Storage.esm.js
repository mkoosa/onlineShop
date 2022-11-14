class Storage {
    addItemToStorage(items) {
        localStorage.setItem('items', JSON.stringify(items));
    }

    getItemFromStorage() {
        return JSON.parse(localStorage.getItem('items'))
    }

    localStorageTest() {
        const test = "test" + new Date().valueOf();
        try {
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        };
    };

};
export const storage = new Storage();