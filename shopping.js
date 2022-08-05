// implement an add function to add new items
const items = document.querySelector('.items');
if (items.children.length <= 1) {
  addNothing();
}

/** adds text 'nothing to show' to item list */
function addNothing() {
  const p = document.createElement('p');
  p.className = 'nothing';
  p.textContent = 'Nothing to show!';
  items.appendChild(p);
}

// delete items when delete button is clicked
items.addEventListener('click', (e) => {
  const target = e.target;
  if (target.className === 'delete') {
    target.parentElement.remove(target);
  };
  if (items.children.length <= 1) {
    addNothing();
  };
});

const addButton = document.querySelector('button.add');

// here we can add new items to our list
addButton.addEventListener('click', (e) => {
  const newItem = document.querySelector('#addItem');
  addItem(newItem.value);
  newItem.value = '';
  e.preventDefault();
});

/**
 * a function to add items to a list
 * @construcotr
 * @param {string} itemText - The text for the new item.
 */
function addItem(itemText) {
  const singleItem = document.createElement('div');
  const p = document.createElement('p');
  const button = document.createElement('button');
  button.className = 'delete';
  button.textContent = 'delete';
  p.className = 'itemName';
  p.textContent = itemText;
  singleItem.className = 'singleItem';
  singleItem.classList.add('draggable');
  singleItem.setAttribute('draggable', true);
  singleItem.appendChild(p);
  singleItem.appendChild(button);
  addEventListeners(singleItem);
  items.appendChild(singleItem);
  // check if "nothing to show!" has to be removed
  const nothing = document.querySelector('.nothing');
  if (nothing) {
    nothing.remove(nothing);
  }
}

// add a method to hide our whole shopping list
const hideList = document.querySelector('#hideList');

hideList.addEventListener('change', ()=> {
  const addDiv = document.querySelector('div.add');

  if (hideList.checked) {
    items.classList.add('hide');
    addDiv.classList.add('add-bottom-padding');
  } else {
    items.classList.remove('hide');
    addDiv.classList.remove('add-bottom-padding');
  }
});

// search for items in item list and hide not matched
// get all texts from items
const searchInput = document.querySelector('#search');

searchInput.addEventListener('input', (e) => {
  const singleItems = document.querySelectorAll('.singleItem');
  const input = new RegExp(searchInput.value.toLowerCase());

  singleItems.forEach((item) => {
    const match = item.textContent.toLowerCase().match(input);

    if (match === null) {
      item.classList.add('hide');
    } else {
      item.classList.remove('hide');
    };
  });
  e.preventDefault();
});

// prevent user from accidentely hitting return in search box
// and by that reloading the page
searchInput.addEventListener('submit', (e) => {
  console.log('submitted!');
  e.preventDefault();
  e.stopPropagation();
}, true);

// ******** make the singleItems draggable by the User
let currentDrag;

// create an invsible doprzone which is placed before or after an item
// and where dragged items can land
const dropzone = document.createElement('div');
dropzone.classList.add('dropzone');

const dragstartHandler = (e) => {
  currentDrag = e.target;
  e.effectAllowed = 'move';
};

const dragendHandler = (e) => {
  dropzone.remove(dropzone);
};

const dragoverHandler = (e) => {
  e.preventDefault();
  let target;
  if (e.target.tagName !== 'DIV') {
    target = e.target.parentElement;
  } else {
    target = e.target;
  }
  // only do something if item is dragged on another item
  if (target !== currentDrag) {
    // if dragged item comes from below, we want a drop zone above hovered item
    if (target.compareDocumentPosition(currentDrag) === 4) {
      // create a dropzone ABOVE target
      target.parentElement.insertBefore(dropzone, target);
    } else {
      // create a dropzone BELOW target
      if (target.nextElementSibling === null) {
        target.parentElement.appendChild(dropzone);
      } else {
        target.parentElement.insertBefore(dropzone, target.nextElementSibling);
      }
    }
  }
};

/** kill dropzone when it when it or target is left */
function dragleaveHandler(e) {
  e.preventDefault();
  // no problem when currentDrag is above target
  dropzone.remove(dropzone);
}

/** remove dropped item */
function dropHandler(e) {
  e.preventDefault();
  if (document.querySelector('.dropzone') !== null) {
    dropzone.parentElement.insertBefore(currentDrag, dropzone);
  }
};

/** adding event listeners */
function addEventListeners(item) {
  item.addEventListener('dragstart', dragstartHandler);
  item.addEventListener('dragover', dragoverHandler);
  item.addEventListener('dragend', dragendHandler);
  item.addEventListener('dragleave', dragleaveHandler);
  item.addEventListener('drop', dropHandler);
};

// only for initial items
draggableItems = document.querySelectorAll('.draggable');

draggableItems.forEach((item) => {
  addEventListeners(item);
});

