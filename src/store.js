const items = [];
let expanded = false;
let error = null;

//finds item inside items by id
const findById = function(id) {
    return this.items.find(currentItem => currentItem.id === id);
};

//adds item to items array
const addItem = function(item) {
    this.items.push(item);
};

//finds item by id, then deletes it from items
const findAndDelete = function(id) {
    this.items = this.items.filter(currentItem => currentItem.id !== id);
};

const findAndUpdate = function(id, newData) {
    const currrentItem = this.findById(id);
    Object.assign(currentItem, newData);
};

const setError = function(err) {
    this.error = err;
};

const clearError = function() {
    this.error = null;
};

export default {
    items,
    error,
    expanded,
    findById,
    addItem,
    findAndDelete,
    findAndUpdate,
    setError,
    clearError
};