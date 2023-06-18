const itemForm = document.getElementById("addItemForm");
const itemInput = document.getElementById("ingredientInput");
const itemList = document.getElementById("itemList");
const clearBtn = document.getElementById("clearAllButton");
const itemFilter = document.getElementById("filterInput");
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDOM(item));
  checkUI();
}
function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  return itemsFromStorage;
}

function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();

  // Add new item to array
  itemsFromStorage.push(item);

  // Convert to JSON string and set to local storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}
function onAddItemSubmit(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  // Validate Input
  if (newItem === "") {
    alert("Please add an item");
    return;
  }

  // Check for edit mode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector('.edit-mode');

    removeItemFromStorage(itemToEdit.firstChild.textContent);
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if (checkIfItemExists(newItem)) {
      alert('That item already exists!');
      return;
    }
  }

  // Create item DOM element
  addItemToDOM(newItem);

  // Add item to local storage
  addItemToStorage(newItem);

  checkUI();

  itemInput.value = "";
}
function addItemToDOM(item) {
  // Create list item
  const li = document.createElement("li");

  li.appendChild(document.createTextNode(item));


  const button = createButton("btn btn-sm btn-outline-danger");
  li.appendChild(button);
  li.className =
    "col-md-3 list-group-item d-flex justify-content-between align-items-center";

  itemList.appendChild(li);
}

function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  button.innerText = "Delete";
  return button;
}

function onClickItem(e) {
    if (e.target.tagName === "BUTTON") {
      removeItem(e.target.parentElement);
    } else {
        setItemToEdit(e.target);
      }
  }

  function checkIfItemExists(item) {
    const itemsFromStorage = getItemsFromStorage();
    return itemsFromStorage.includes(item);
  }
  function setItemToEdit(item) {
    isEditMode = true;

    itemList
      .querySelectorAll('li')
      .forEach((i) => i.style.color='black');

    item.style.color='#ccc';
    item.classList.add('edit-mode');
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i>   Update Item';
    formBtn.style.backgroundColor = '#228B22';
    itemInput.value = item.firstChild.textContent;
  }

function removeItem(item) {

  if (confirm("Are you sure?")) {
    // Remove item from DOM
    item.remove();

    // Remove item from storage
    removeItemFromStorage(item.firstChild.textContent);


    checkUI();
  }
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();


 // Filter out item to be removed
 itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  // Re-set to localstorage

  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  // Clear from localStorage
  localStorage.removeItem("items");

  checkUI();
}

function checkUI() {

  itemInput.value = '';

  const items = itemList.querySelectorAll("li");

  if (items.length === 0) {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }
  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';

  formBtn.style.background = '#0275d8'

  isEditMode = false;
}

function filterItems(e) {
  const items = itemList.querySelectorAll("li");
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) != -1) {
      item.className =
        "list-group-item d-flex justify-content-between align-items-center";
    } else {
      item.className = "d-none";
    }
  });
}

function init() {
  // Event Listeners
  itemForm.addEventListener("submit", onAddItemSubmit);
  itemList.addEventListener('click', onClickItem);
  clearBtn.addEventListener("click", clearItems);
  itemFilter.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displayItems);

  checkUI();
}

init();
