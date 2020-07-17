import $ from 'jquery';
import api from './api.js';
import store from './store.js';


/*  GENERATE TEMPLATES */
//generate stars
const generateStarRating = function(bookmark) {
  let starRating = '';

  return starRating;
}

//generate item element
const generateBookmarkElement = function(bookmark, starRating) {
  return `
  <button class="accordion">${bookmark.title} ${starRating}</button>
  <div class="accordion-content">
  <ul>
      <li><a href="${url}" class="visit-site-button">Visit Site</a></li>
      <li>${bookmark.decription}</li>
      <li><div class="js-delete"><i class="fas fa-trash-alt"></i></li>
  </ul>
</div>
  `;
}


//generate adding a bookmark




//generate the list of bookmarks




//adding html divs together
const generateBookmarkString = function (BookmarkList) {
  const items = bookmarkList.map((bookmark) => generateBookmarkElement(bookmark));
  return items.join('');
};


//generate error
const generateError = function(message){
  return `
    <section class="error-content">
      <button id="cancel-error">X</button>
      <p>${message}</p>
    </section>
  `;
};

//render error
const renderError = function() {
    if(store.error) {
      const el = generateError(store.error);
      $('.error-container').html(el);
    } else {
        $('.error-container').empty();
    }
};
  

//generate page
const render = function () {
  renderError();
  // Filter item list if store prop is true by item.checked === false
  let bookmarks = [...store.items];
  
  const bookmarkString = generateBookmarkString(bookmarks);
  // render the shopping list in the DOM

  // insert that HTML into the DOM
  $('.js-bookmark-list').html(bookmarkString);
};






/* EVENT LISTENERS */
//when user presses new bookmark button
function handleAddBookmarkClick() {

};



//when user cancels add bookmark
function handleCancelClick() {

};

//when user actually submits bookmark
function handleSubmitBookmarkClick() {

};

//when user filters by rating
function handleRatingSubmit() {

}

//when user clicks li to view more
function handleViewMoreClick() {
  var accordions = document.getElementsByClassName('accordion');
  for (var i =0; i < accordions.length; i++) {
    accordions[i].onclick = function () {
      this.classList.toggle('is-open');
      var content = this.nextElementSibling;
      if(content.style.maxHeight) {
        //accordion is open need to close it
        content.style.maxHeight = null;
      } else {
        //accordion is closed, need to open
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    };
  };
}


function handleCloseError() {
    $('.error-container').on('click', '#cancel-error', () => {
      store.setError(null);
      renderError();
    });
};


//all event listeners
function bindEventListeners() {
    handleAddBookmarkClick();
    handleCancelClick();
    handleSubmitBookmarkClick();
    handleViewMoreClick();
    handleRatingSubmit();
    handleDeleteClick();
    handleCloseError();
  }
  
  
  // we export our event listeners so index can have access to them 
  // we also export our render function which calls the generate view functions 
  export default {
    render,
    bindEventListeners,
  }