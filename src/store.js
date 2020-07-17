const bookmarks = [];
let error = null;

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
  findById,
  addBookmark,
  findAndDelete,
  setError,
  clearError
};

/*
function findAndUpdate (id, newData) {
  const currentItem = this.findById(id);
  Object.assign(currentItem, newData);
};*/
/*
const toggleCheckedFilter = function () {
  this.hideCheckedItems = !this.hideCheckedItems;
};
*/
