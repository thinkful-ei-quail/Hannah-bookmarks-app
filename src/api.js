import store from "./store";
import { data } from "jquery";


const BASE_URL = 'https://thinkful-list-api.herokuapp.com/HannahHa';

function apiFetch(...args) {
  let error;
  return fetch(...args)
    .then(res => {
      if (!res.ok) { 
        error = {
          code: res.status
        };
          if(!res.headers.get('content-type').includes('json')) {
              error.message = res.json(message);
              return Promise.reject(error);
          }
      }
      return res.json();
    })
    .then(data => {
      if(error) {
        error.message = data.message;
        return Promise.reject(error);
      }
      return data;
    });
}

function createBookmark (object) {
    //stringify turns JS objects into string, data has to be string to send to server
  const bookmark = JSON.stringify(object);
  //header tells we are sending json object, requires a method of POST to add, body contains info
  return apiFetch(`${BASE_URL}/bookmarks`, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: bookmark
  });
}

function getBookmarks () {
  return apiFetch(`${BASE_URL}/bookmarks`);
}


function deleteBookmark(id) {
  return apiFetch(`${BASE_URL}/bookmarks/${id}`, {
    method: 'DELETE'
  });
}


export default {
  getBookmarks,
  createBookmark, 
  deleteBookmark
};



/*
function updateItem(id, updateData) {
  const newData = JSON.stringify(updateData);
  return listApiFetch(`${BASE_URL}/bookmarks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: newData
  });
}
*/