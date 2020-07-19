import $ from 'jquery';

import 'normalize.css';
import './index.css';

import api from './api.js';
import store from './store.js';
import templates from './templates.js';


/*
const store = {
bookmarks: [
    {
    id: 'x56w',
    title: 'Title 1',
    rating: 3,
    url: 'http:www.title1.com',
    description: 'lorem ipsum dolor sit',
    expanded: false
    },
    {
    id: '6ffw',
    title: 'Title 2',
    rating: 5,
    url: 'http:www.title2.com',
    description: 'dolorum tempore deserunt',
    expanded: false
    } 
],
adding: false,
error: null,
filter: 0
};
*/


const main = function() {
    api.getBookmarks()
        .then(bookmarks => {
            bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
            templates.render();
        });
        templates.bindEventListeners();
        templates.render();
};

$(main);