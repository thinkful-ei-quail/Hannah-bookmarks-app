import $ from 'jquery';
import api from './api.js';
import store from './store.js';


/*  GENERATE TEMPLATES */
const generateStarRating = function(bookmark) {
  let starCount = '';
  switch(bookmark.rating) {
  case(1):
    starCount = '<i class=\'fas fa-star\'></i><i class=\'far fa-star\'></i><i class=\'far fa-star\'></i><i class=\'far fa-star\'></i><i class=\'far fa-star\'></i>';
    break;
  case(2):
    starCount = '<i class=\'fas fa-star\'></i><i class=\'fas fa-star\'></i><i class=\'far fa-star\'></i><i class=\'far fa-star\'></i><i class=\'far fa-star\'></i>';
    break;
  case(3):
    starCount = '<i class=\'fas fa-star\'></i><i class=\'fas fa-star\'></i><i class=\'fas fa-star\'></i><i class=\'far fa-star\'></i><i class=\'far fa-star\'></i>';
    break;
  case(4):
    starCount = '<i class=\'fas fa-star\'></i><i class=\'fas fa-star\'></i><i class=\'fas fa-star\'></i><i class=\'fas fa-star\'></i><i class=\'far fa-star\'></i>';
    break;
  case(5):
    starCount = '<i class=\'fas fa-star\'></i><i class=\'fas fa-star\'></i><i class=\'fas fa-star\'></i><i class=\'fas fa-star\'></i><i class=\'fas fa-star\'></i>';
  }
  return starCount;
}

//generate item element
const generateBookmarkElement = function(bookmark) {
  let starRating = generateStarRating(bookmark);
  return `   
    <button class="accordion-element data-bookmark-id="${bookmark.id}">${bookmark.title} ${starRating}</button>
    <div class="accordion-content">
      <ul>
        <li><a href="${bookmark.url}" class="visit-site-button">Visit Site</a></li>
        <li>${bookmark.desc}</li>
        <li><div class="js-delete"><i class="fas fa-trash-alt"></i></li>
      </ul>
    </div>`
}

//generates main page
const generateMain = function(bookmarks) {
  return `
  <div class="js-menu">
    <button type="button" class="js-add-button">+ NEW</button>
    <select id="dropdown" name="rating">
        <option disabled value><option>Filter by rating:</option>
        <option value="5">5 stars</option>
        <option value="4">4 stars</option>
        <option value="3">3 stars</option>
        <option value="2">2 stars</option>
        <option value="1">1 star</option>
    </select>
  </div> 
  <div class="js-bookmark-list">
    ${bookmarks}
  </div>
  `;
}


//generate adding a bookmark, html form
const generateAddBookmarkForm = function() {
  return `
    <form class="js-add-bookmark-form">
      <div class="error-container">
      </div>
      <label for="js-new-url">Add New Bookmark:</label><br>
      <input id="js-new-url" name="url" type="text" placeholder="Enter url here:" required><br>
      <div class= "add-bookmark-wrapper">
          <input id="js-new-title" name="title" type="text" placeholder= "Enter title" required><br>
          <select class="js-new-rating" name="rating" id="rating" required><br>
            <option disabled value><option>Select rating</option>
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
          <button class="js-cancel-button" type="cancel">Cancel</button>
      </div>
    </form>
  `;
  //template goes above
}



//adding html divs together, list of bookmarks
const generateBookmarkString = function (bookmarkList) {
  const bookmarkItems = bookmarkList.map((bookmark) => generateBookmarkElement(bookmark));
  return bookmarkItems.join('');
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
  if(store.adding === true) {
    const addPageStuff = generateAddBookmarkForm();
    $('.main-page-content').html(addPageStuff);
  } else if (store.bookmarks.length === 0){
    const addPageStuff = generateAddBookmarkForm();
    $('.main-page-content').html(addPageStuff);
  } else {
    if(store.filter > 1) {
      bookmarks = store.bookmarks.filter(bookmark => bookmark.rating >= store.filter);
    }
    const bookmarkListHTML = generateBookmarkString(store.bookmarks);
    const page = generateMain(bookmarkListHTML);
    $('.main-page-content').html(page);
  }
};





/* EVENT LISTENERS */
//when user presses new bookmark button
function handleAddBookmarkClick() {
  $('.js-main-page-content').on('click','.js-add-button', event => {
    console.log("this is working");
    event.preventDefault();
    store.adding = true;
    render();
  });
};



//when user cancels add bookmark
function handleCancelClick() {
  $('.js-main-page-content').on('click','.js-cancel-button', event => {
    event.preventDefault();
    store.adding = false;
    render();
  });
};

//when user actually submits bookmark
function handleSubmitBookmarkClick() {
  $('.js-main-page-content').submit('.js-add-bookmark-form', event => {
    event.preventDefault();
    const newBookmarkInfo = {
      title : $('#js-new-title').val(),
      url : $('#js-new-url').val(),
      desc: $('#js-new-descr').val(),
      rating : $("#rating option:selected").val()
    };
    
    console.log(newBookmarkInfo);
    api.createBookmark(newBookmarkInfo)
      .then(data => {
        store.addBookmark(data);
        store.adding = false;
        render();
      })
      .catch((error) => {
        console.log(error);
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
  $('.js-main-page-content').on('click', '.js-delete', event => {
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
function handleFilterRating() {
  $('js-main-page-content').on('select', '#dropdown', () => {
    const filterVal = $("#rating option:selected").val();
    store.filter = filterVal;
    render();
  });
}

//when user clicks li to view more
function handleViewMoreClick() {
  $('.js-main-page-content')
  var accordions = document.getElementsByClassName('accordion-element');
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
    handleFilterRating();
    handleDeleteClick();
    handleCloseError();
  }
  
  
  // we export our event listeners so index can have access to them 
  // we also export our render function which calls the generate view functions 
  export default {
    render,
    bindEventListeners,
  }