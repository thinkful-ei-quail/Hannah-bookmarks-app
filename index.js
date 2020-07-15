import $ from 'jquery';

import 'normalize.css';
import './index.js';

import api from './api.js';
import store from './store.js';
import bookmarkList from './shoppingList';

const main = function() {
    api.getItems()
        .then((items) => {
            items.forEach((item) => store.addItem(item));
        });
        bookmarkList.bindEventListeners();
        bookmarkList.render();
};

$(main);