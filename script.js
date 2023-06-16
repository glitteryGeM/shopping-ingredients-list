const itemForm = document.getElementById('addItemForm');
const itemInput = document.getElementById('ingredientInput');
const itemList = document.getElementById('itemList');

function addItem(e) {
    e.preventDefault();

    const newItem = itemInput.value;

    // Validate Input
    if (newItem === '') {
      alert('Please add an item');
      return;
    }

    // Create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));

    const button = createButton('btn btn-sm btn-outline-danger');
    li.appendChild(button);
    li.className='list-group-item d-flex justify-content-between align-items-center';
    itemList.appendChild(li);

    itemInput.value = '';
  }

  function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    button.innerText='Delete';
    return button;
  }

  itemForm.addEventListener('submit', addItem);

