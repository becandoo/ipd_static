//import $ from 'jquery';

let isOpen = (bln, id) => {
    let el;
    if (bln) {
      el = document.getElementById(id).className = 'drop open';
    } else {
      el = document.getElementById(id).className = 'drop';
    }
  }

//remove selected item
let removeSelection = (el, id) => {
    el.innerText = 'Please make a selection';
    el.className = 'placeholder';
    //id of element to hide
    $('#' + id).slideUp();
}

let errorMsg = (el, msg) => {
    removeSelection(el);
    document.getElementById('error').innerText = msg;
    $('#error').slideDown();
}

let parseBoolean = val => {
  let bool = val == 'true' ? true : false
  return bool;
}

export { isOpen, removeSelection, errorMsg, parseBoolean };