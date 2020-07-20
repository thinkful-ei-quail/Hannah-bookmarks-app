const bookmarks = [];
let error = null;
let adding = false;
let filter = 0;

function filterBookmarks(){
  return store.bookmarks.filter(bookmark => bookmark.rating >= store.filter);
}

const findById = function (id) {
  return this.bookmarks.find(currentBookmark => currentBookmark.id === id);
};

const addBookmark = function (bookmark) {
  this.bookmarks.push(bookmark);
};

const findAndDelete = function (id) {
  this.bookmarks = this.bookmarks.filter(currentBookmark => currentBookmark.id !== id);
};

function setError (err) {
  this.error = err;
}

function clearError() {
  this.error = null;
}


export default {
  bookmarks,
  error,
  adding,
  filter,
  filterBookmarks,
  findById,
  addBookmark,
  findAndDelete,
  setError,
  clearError
};

