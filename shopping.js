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
  singleItem.appendChild(p);
  singleItem.appendChild(button);
  items.appendChild(singleItem);
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
});

// ******** make the singleItems draggable by the User
let currentDrag;

const dragstartHandler = (e) => {
  currentDrag = e.target;
  console.log(currentDrag);
  // const dti = e.dataTransfer.items;
  // store the id for transferred item
  // dti.add(e.target.id, 'text/plain');

  e.effectAllowed = 'move';
};

const dragendHandler = (e) => {
};

const dropHandler = (e) => {
  e.preventDefault();
  currentDrag.remove(currentDrag);
  items.appendChild(currentDrag);
};

const dragoverHandler = (e) => {
  e.preventDefault();
}


