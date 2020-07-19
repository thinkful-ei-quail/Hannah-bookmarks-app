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
  if(!store.adding) {
    return `   
    <button class="accordion-element data-bookmark-id="${item.id}">${bookmark.title} ${starRating}</button>
    <div class="accordion-content">
      <ul>
        <li><a href="${url}" class="visit-site-button">Visit Site</a></li>
        <li>${bookmark.decription}</li>
        <li><div class="js-delete"><i class="fas fa-trash-alt"></i></li>
      </ul>
    </div>`
  } 
}


//generate adding a bookmark, html form
const generateAddBookmarkForm = function() {
  if(store.adding) {
    $('.js-menu').empty();
    $('.js-bookmark-list').empty();
    return `
      <form class="js-add-bookmark-form">
        <div class="error-container">
        </div>
        <label for="js-new-url">Add New Bookmark:</label><br>
        <input id="js-new-url" name="url" type="text" placeholder="Enter url here:" required><br>
        <div class= "add-bookmark-wrapper">
            <input id="js-new-title" name="title" type="text" placeholder= "Enter title" required><br>
            <select class="js-new-rating" name="rating" id="rating" required><br>
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
            </select>
            <textarea id="js-new-descr" name="description" placeholder="Add a description (optional)"></textarea>
        </div>
        <div class= "button-wrapper">
            <button class= "submit" type="submit">Add</button>
            <button class="cancel" type="cancel">Cancel</button>
        </div>
      </form>
    
    `;
    //template goes above
  }
}



//adding html divs together, list of bookmarks
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
  $('.js-menu').on('click','.js-add-button', event => {
    store.adding = true;
    $('#js-add-bookmark').html(generateAddBookmarkForm());
    render();
  });
};



//when user cancels add bookmark
function handleCancelClick() {
  $('#js-add-bookmark').on('click','.js-cancel-button', event => {
    store.adding = false;
    $('js-')
    render();
  });
};

//when user actually submits bookmark
function handleSubmitBookmarkClick() {
  $('#js-add-bookmark').submit(event => {
    event.preventDefault();
    const newBookmark = {
      'title' : $('js-new-title').val(),
      'url' : $('js-new-url').val(),
      'description': $('js-new-descr').val(),
      'rating' : parseInt($('js-new-rating').val()),
    };
    api.createItem(newBookmark)
      .then((newThing) => {
        store.addBookmark(newThing);
        render();
      })
      .catch((error) => {
        store.setError(error.message);
        renderError();
      });
  });
};

//get id from element
function getBookmarkIdFromElement(bookmark) {
  return $(bookmark).closest('.accordion-element').data('bookmark-id');
}


//handle delete bookmark
function handleDeleteClick() {
  $('.js-bookmark-list').on('click', '.js-delete', event => {
    const id = getBookmarkIdFromElement(event.currentTarget);
    api.deleteBookmark(id)
      .then(() => {
        store.findAndDelete(id);
        render();
      })
      .catch((error) => {
        store.setError(error.message);
        renderError();
      });
  });
}

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