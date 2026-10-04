class Book {
  constructor(title, author, pages, rating) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.rating = rating;
    this.info = () => `${title} by ${author}, ${pages} pages, ${rating}`;
  }
}

function addBookToLibrary(...rest) {
  myLibrary.push(...rest);
}

function searchBooks(e) {
  const customIndex = [];

  if (e.key === 'Enter' && searchBar.value) {
    e.preventDefault();

    for (let i = 0; i < myLibrary.length; i++) {
      const book = myLibrary[i];
      const title = book.title.toLowerCase();
      const author = book.author.toLowerCase();
      const searchWord = searchBar.value.toLowerCase();

      if (title.includes(searchWord) || author.includes(searchWord)) {
        customIndex.push(i);
      }
    }

    searchBar.value = '';

    if (customIndex.length === 0) {
      const dialogNoBooks = document.querySelector('.dialog-no-books');
      dialogNoBooks.showModal();
    } else {
      renderLibrary('', '', customIndex);
    }
  }
}

function closeModal(e) {
  const dialogs = document.querySelectorAll('dialog');
  
  dialogs.forEach((dialog) => {
    let modal = e.target.parentNode.parentNode.parentNode;
    
    if (e.target.textContent === 'Back') {
      modal = e.target.parentNode.parentNode;
    }
    
    if (dialog.className === modal.className) {
      dialog.close();
      inputTitle.value = '';
      inputAuthor.value = '';
      inputPages.value = '';
      selectRating.options[0].selected = true;
    }
  });
}

function sortBooks(e) {
  const target = e.target;
  let customLibrary = myLibrary;

  if (target.classList.contains('newest-btn')) {
    customLibrary = myLibrary.toReversed();
  } else if (target.classList.contains('high-ratings-btn')) {
    customLibrary = myLibrary.toSorted((a, b) => b.rating - a.rating);
  } else if (target.classList.contains('low-ratings-btn')) {
    customLibrary = myLibrary.toSorted((a, b) => a.rating - b.rating);
  }
  
  renderLibrary(e, customLibrary);
}

function addNewBook(e) {
  // Validates in order and reports the first error found
  const invalidInput = [inputTitle, inputAuthor, inputPages].find(input => !input.checkValidity());

  if (invalidInput) {
    invalidInput.reportValidity();
    return;
  }

  const title = inputTitle.value;
  const author = inputAuthor.value;
  const pages = inputPages.value;
  const rating = selectRating.value;
  const newBook = new Book(title, author, pages, rating);
  addBookToLibrary(newBook);
  renderLibrary(e);
}

function showEditModal(e, book) {
  if (e.key === 'Enter') {
    e.preventDefault();
  } else if (e instanceof KeyboardEvent) {
    if (e.key !== ' ') {
      return;
    }
  }

  if (e.target.classList.contains('cross-btn')) {
    return;
  }

  itemId = e.target.parentNode.dataset.id;

  if (e.target.classList.contains('book')) {
    itemId = e.target.dataset.id;
  } else if (e.target.classList.contains('rating')) {
    itemId = e.target.parentNode.parentNode.dataset.id;
  }
  
  if (book.id === itemId) {
    editTitle.value = book.title;
    editAuthor.value = book.author;
    editPages.value = book.pages;

    switch (book.rating) {
      case '5':
        editRating.options[1].selected = true;
        break;
      case '4':
        editRating.options[2].selected = true;
        break;
      case '3':
        editRating.options[3].selected = true;
        break;
      case '2':
        editRating.options[4].selected = true;
        break;
      case '1':
        editRating.options[5].selected = true;
        break;
      default:
      editRating.options[0].selected = true;
    }
  }

  const dialogEdit = document.querySelector('.dialog-edit');
  dialogEdit.showModal();
}

function editBook(e) {
  // Validates in order and reports the first error found
  const invalidEdit = [editTitle, editAuthor, editPages].find(edit => !edit.checkValidity());

  if (invalidEdit) {
    invalidEdit.reportValidity();
    return;
  }

  const bookForEdit = myLibrary.find(book => book.id === itemId);

  if (bookForEdit) {
    bookForEdit.title = editTitle.value;
    bookForEdit.author = editAuthor.value;
    bookForEdit.pages = editPages.value;
    bookForEdit.rating = editRating.value;
    renderLibrary(e);
  }
};

function showDeleteModal(e) {
  if (e instanceof KeyboardEvent) {
    if (e.key !== 'Enter') {
      return;
    }
  }

  const dialogDelete = document.querySelector('.dialog-delete');
  dialogDelete.showModal();
  itemId = e.target.parentNode.parentNode.dataset.id;
}

function deleteBook(e) {
  const indexForDelete = myLibrary.findIndex(book => book.id === itemId);
  
  if (indexForDelete !== -1) {
    myLibrary.splice(indexForDelete, 1);
    renderLibrary(e);
  }
}

function showRecommendationModal(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
  } else if (e instanceof KeyboardEvent) {
    if (e.key !== ' ') {
      return;
    }
  }
  
  let target = e.target;
  
  if (!target.classList.contains('recommended-book')) {
    target = e.target.parentNode;
  }
  
  if (target.classList.contains('first-rec')) {
    index = 0;
  } else if (target.classList.contains('second-rec')) {
    index = 1;
  } else if (target.classList.contains('third-rec')) {
    index = 2;
  }
  
  const dialogRecommendation = document.querySelector('.dialog-recommendation');
  dialogRecommendation.showModal();
}

function addRecommendedBook(e) {
  let newBook = {};

  if (index === 0) {
    newBook = new Book('The Long Good-bye', 'Raymond Chandler', '320', '0');
  } else if (index === 1) {
    newBook = new Book('Flowers for Algernon', 'Daniel Keyes', '311', '0');
  } else if (index === 2) {
    newBook = new Book('Moon Palace', 'Paul Auster', '320', '0');
  }
  
  addBookToLibrary(newBook);
  renderLibrary(e);
}

function showUserListModal(e) {
  if (e instanceof KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
    } else if (e.key !== ' ') {
      return;
    }
  }

  const dialogUserList = document.querySelector('.dialog-user-list');
  dialogUserList.showModal();
}

function createBooks(book) {
  const item = document.createElement('li');
  const title = document.createElement('h4');
  const author = document.createElement('p');
  const pages = document.createElement('p');
  const btnContainer = document.createElement('div');
  const rating = document.createElement('div');
  const crossBtn = document.createElement('button');

  item.classList.add('book');
  item.dataset.id = book.id;
  item.setAttribute('tabindex', '0');
  title.classList.add('book-title');
  title.textContent = book.title;
  author.textContent = book.author;
  pages.textContent = book.pages + ' pages';
  btnContainer.classList.add('btn-container');
  rating.classList.add('rating');
  
  switch (book.rating) {
    case '5':
      rating.innerHTML = '&#9733;&#9733;&#9733;&#9733;&#9733;';
      break;
    case '4':
      rating.innerHTML = '&#9733;&#9733;&#9733;&#9733;';
      break;
    case '3':
      rating.innerHTML = '&#9733;&#9733;&#9733;';
      break;
    case '2':
      rating.innerHTML = '&#9733;&#9733;';
      break;
    case '1':
      rating.innerHTML = '&#9733;';
      break;
    default:
    rating.classList.add('not-read-yet');
    rating.textContent = 'Not read yet';
  }

  crossBtn.classList.add('cross-btn');
  crossBtn.innerHTML = '&#10005;';

  btnContainer.appendChild(rating);
  btnContainer.appendChild(crossBtn);
  item.appendChild(title);
  item.appendChild(author);
  item.appendChild(pages);
  item.appendChild(btnContainer);
  bookshelf.appendChild(item);
  
  const books = document.querySelectorAll('.book');

  books.forEach((currentBook) => {
    currentBook.addEventListener('click', (e) =>showEditModal(e, book));
    currentBook.addEventListener('keydown', (e) => showEditModal(e, book));
  });

  crossBtn.addEventListener('click', showDeleteModal);
  crossBtn.addEventListener('keydown', showDeleteModal);
}

function renderLibrary(e, customLibrary, customIndex) {
  if (e) {
    closeModal(e);
  }

  bookshelf.innerHTML = '';
  let renderingLibrary = myLibrary;
  
  if (customLibrary) {
    renderingLibrary = customLibrary;
  } else if (customIndex) {
    renderingLibrary = [];

    for (const index of customIndex) {
      renderingLibrary.push(myLibrary[index]);
    }
  }
  
  for (const book of renderingLibrary) {
    createBooks(book);
  }

  saveLibrary();
}

function saveLibrary() {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

const myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];
let itemId = '';
let index = 0;

const bookshelf = document.querySelector('.bookshelf');
const searchBar = document.querySelector('.search-bar');
const cancelBtns = document.querySelectorAll('.cancel-btn');
const inputTitle = document.getElementById('title');
const inputAuthor = document.getElementById('author');
const inputPages = document.getElementById('pages');
const selectRating = document.getElementById('rating');
const sortBtn = document.querySelector('.sort-btn');
const sortOptionBtns = document.querySelectorAll('.sort-option-btn');
const dialogSort = document.querySelector('.dialog-sort');
const newBookBtn = document.querySelector('.new-book-btn');
const dialogAdd = document.querySelector('.dialog-add');
const addBtn = document.querySelector('.add-btn');
const editTitle = document.getElementById('edit-title');
const editAuthor = document.getElementById('edit-author');
const editPages = document.getElementById('edit-pages');
const editRating = document.getElementById('edit-rating');
const editBtn = document.querySelector('.edit-btn');
const deleteBtn = document.querySelector('.delete-btn');
const recommendationList = document.querySelector('.recommendation-list');
const addBtnForRecommendation = document.querySelector('.add-btn-for-recommendation');
const userList = document.querySelector('.user-list');

searchBar.addEventListener('keydown', searchBooks);
cancelBtns.forEach((btn) => btn.addEventListener('click', closeModal));
sortBtn.addEventListener('click', () => dialogSort.showModal());
sortOptionBtns.forEach((btn) => btn.addEventListener('click', sortBooks)); 
newBookBtn.addEventListener('click', () => dialogAdd.showModal());
addBtn.addEventListener('click', addNewBook);
editBtn.addEventListener('click', editBook);
deleteBtn.addEventListener('click', deleteBook);
recommendationList.addEventListener('click', showRecommendationModal);
recommendationList.addEventListener('keydown', showRecommendationModal);
addBtnForRecommendation.addEventListener('click', addRecommendedBook);
userList.addEventListener('click', showUserListModal);
userList.addEventListener('keydown', showUserListModal);

// Default items
if (myLibrary.length === 0) {
  const androids = new Book('Do Androids Dream of Electric Sheep?', 'Philip K. Dick', '210', '5');
  const client = new Book('The Client', 'John Grisham', '422', '4');
  const nineteen = new Book('Nineteen Eighty-Four', 'George Orwell', '328', '5');
  const charlie = new Book('Charlie and the Chocolate Factory', 'Roald Dahl', '155', '4');
  const dragon = new Book('My Father\'s Dragon', 'Ruth Stiles Gannett', '98', '0');
  const alice = new Book('Alice\'s Adventures in Wonderland', 'Lewis Carroll', '172', '0');
  addBookToLibrary(androids, client, nineteen, charlie, dragon, alice);
}

// Initial rendering
renderLibrary();
