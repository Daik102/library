function Book(title, author, pages, rating) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.rating = rating;
  this.info = function() {
    return `${title} by ${author}, ${pages} pages, ${rating}`;
  }
}

const myLibrary = [];
const doAndroidsDreamOfElectricSheep = new Book('Do Androids Dream of Electric Sheep?', 'Philip K. Dick', '210', '5');
const theClient = new Book('The Client', 'John Grisham', '422', '4');
const nineteenEightyFour = new Book('Nineteen Eighty-Four', 'George Orwell', '328', '5');
const charlieAndTheChocolateFactory = new Book('Charlie and the Chocolate Factory', 'Roald Dahl', '155', '4');
const myFathersDragon = new Book('My Father\'s Dragon', 'Ruth Stiles Gannett', '98', '0');
const alicesAdventuresInWonderland = new Book('Alice\'s Adventures in Wonderland', 'Lewis Carroll', '172', '0');

function addBookToLibrary(...rest) {
  myLibrary.push(...rest);
}

addBookToLibrary(doAndroidsDreamOfElectricSheep, theClient, nineteenEightyFour, charlieAndTheChocolateFactory, myFathersDragon, alicesAdventuresInWonderland);

const bookshelf = document.querySelector('.bookshelf');
const searchBar = document.querySelector('.search-bar');
const sortBtn = document.querySelector('.sort-btn');
const oldestBtn = document.querySelector('.oldest-btn');
const newestBtn = document.querySelector('.newest-btn');
const highRatingsBtn = document.querySelector('.high-ratings-btn');
const lowRatingsBtn = document.querySelector('.low-ratings-btn');
const newBtn = document.querySelector('.new-btn');
const dialogAdd = document.querySelector('.dialog-add');
const cancelBtns = document.querySelectorAll('.cancel-btn');
const addBtn = document.querySelector('.add-btn');
const confirmBtn = document.querySelector('.confirm-btn');
const deleteBtn = document.querySelector('.delete-btn');
const ratingNewBook = document.getElementById('rating-new-book');
const dialogRating = document.querySelector('.dialog-rating');
const ratingOldBook = document.getElementById('rating-old-book');
const dialogDelete = document.querySelector('.dialog-delete');
const dialogEdit = document.querySelector('.dialog-edit');
const editBtn = document.querySelector('.edit-btn');
const dialogNoBooks = document.querySelector('.dialog-no-books');
const dialogSort = document.querySelector('.dialog-sort');
const dialogRecommendation = document.querySelector('.dialog-recommendation');
const dialogOthers = document.querySelector('.dialog-others');
const dialogs = document.querySelectorAll('dialog');
const blankAlertTitle = document.querySelector('.blank-alert-title');
const blankAlertAuthor = document.querySelector('.blank-alert-author');
const blankAlertPages = document.querySelector('.blank-alert-pages');
const recommendedItems = document.querySelectorAll('.recommended-item');
const addBtnForRecommendation = document.querySelector('.add-btn-for-recommendation');
const users = document.querySelectorAll('.user');
let inputTitle = document.getElementById('title');
let inputAuthor = document.getElementById('author');
let inputPages = document.getElementById('pages');
let editTitle = document.getElementById('edit-title');
let editAuthor = document.getElementById('edit-author');
let editPages = document.getElementById('edit-pages');
let searchArray = [];
let highestArray = [];
let lowestArray = [];
let newBook;
let ratingBtn;
let crossBtn;
let title;
let itemId;
let listItem;
let index;

Book.prototype.editRating = function() {
  ratingBtn.addEventListener('click', (e) => {
    itemId = e.target.parentNode.parentNode.dataset.id;
    myLibrary.forEach((book) => {
      if (book.id === itemId) {
        if (book.rating === '5') {
          ratingOldBook.options[1].selected = true;
        } else if (book.rating === '4') {
          ratingOldBook.options[2].selected = true;
        } else if (book.rating === '3') {
          ratingOldBook.options[3].selected = true;
        } else if (book.rating === '2') {
          ratingOldBook.options[4].selected = true;
        } else if (book.rating === '1') {
          ratingOldBook.options[5].selected = true;
        } else {
          ratingOldBook.options[0].selected = true;
        }
      }
    });
    dialogRating.showModal();
  });
}

Book.prototype.deleteItem = function() {
  crossBtn.addEventListener('click', (e) => {
    itemId = e.target.parentNode.parentNode.dataset.id;
    listItem = e.target.parentNode.parentNode;
    dialogDelete.showModal();
  });
}

function createBooks(book) {
  const item = document.createElement('li');
  title = document.createElement('h4');
  const author = document.createElement('p');
  const pages = document.createElement('p');
  const btnContainer = document.createElement('p');
  ratingBtn = document.createElement('button');
  crossBtn = document.createElement('button');
  
  item.setAttribute('data-id', `${book.id}`);
  title.textContent = book.title;
  author.textContent = book.author;
  pages.textContent = book.pages + ' pages';
  btnContainer.classList = 'btn-container';
  ratingBtn.classList = 'rating-btn';
  
  if (book.rating === '0') {
    ratingBtn.classList.add('not-read-yet');
  }
  
  if (book.rating === '5') {
    ratingBtn.innerHTML = '&#9733;&#9733;&#9733;&#9733;&#9733;';
  } else if (book.rating === '4') {
    ratingBtn.innerHTML = '&#9733;&#9733;&#9733;&#9733;'
  } else if (book.rating === '3') {
    ratingBtn.innerHTML = '&#9733;&#9733;&#9733;'
  } else if (book.rating === '2') {
    ratingBtn.innerHTML = '&#9733;&#9733;'
  } else if (book.rating === '1') {
    ratingBtn.innerHTML = '&#9733;'
  } else {
    ratingBtn.textContent = 'Not read yet';
  }

  crossBtn.classList = 'cross-btn';
  crossBtn.innerHTML = '&#10005;';

  item.appendChild(title);
  item.appendChild(author);
  item.appendChild(pages);
  btnContainer.appendChild(ratingBtn);
  btnContainer.appendChild(crossBtn);
  item.appendChild(btnContainer);
  bookshelf.appendChild(item);

  if (book.rating === '0') {
    item.classList.add('not-read-notice'); 
  } else {
    if (item.classList === 'not-read-notice') {
      item.classList.remove('not-read-notice');
    }
  }

  title.addEventListener('click', (e) => {
    itemId = e.target.parentNode.dataset.id;
    
    if (book.id === itemId) {
      editTitle.value = book.title;
      editAuthor.value = book.author;
      editPages.value = book.pages;
    }

    dialogEdit.showModal();
  });
  
  doAndroidsDreamOfElectricSheep.editRating();
  doAndroidsDreamOfElectricSheep.deleteItem();
}

function renderLibrary() {
  bookshelf.innerHTML = '';

  if (searchArray[0]) {
    searchArray.forEach((book) => {
      createBooks(book);
    });
    searchArray = [];
  } else if (highestArray[0]) {
    highestArray.forEach((book) => {
      createBooks(book);
    });
    highestArray = [];
  } else if (lowestArray[0]) {
    lowestArray.forEach((book) => {
      createBooks(book);
    });
    lowestArray = [];
  } else {
    myLibrary.forEach((book) => {
      createBooks(book);
    });
  } 
}

renderLibrary();

document.body.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && searchBar.value) {
    myLibrary.forEach((book) => {
      const titleWithLowerCase = book.title.toLowerCase();
      const authorWithLowerCase = book.author.toLowerCase();
      const searchWord = searchBar.value.toLowerCase();
      if (titleWithLowerCase.includes(searchWord) || authorWithLowerCase.includes(searchWord)) {
        searchArray.push(book);
      }
    });
    searchBar.value = '';

    if (!searchArray[0]) {
      bookshelf.innerHTML = `No books were found.<br><br>You can go back with sort button.`;
      return;
    }
    renderLibrary();
  }
});

sortBtn.addEventListener('click', () => {
  dialogSort.showModal();
});

oldestBtn.addEventListener('click', (e) => {
  e.preventDefault();
  renderLibrary();
  dialogSort.close();
});

newestBtn.addEventListener('click', (e) => {
  e.preventDefault();
  myLibrary.reverse();
  renderLibrary();
  myLibrary.reverse();
  dialogSort.close();
});

highRatingsBtn.addEventListener('click', (e) => {
  e.preventDefault();
  highestArray = myLibrary.toSorted((a, b) => b.rating - a.rating);
  renderLibrary();
  dialogSort.close();
});

lowRatingsBtn.addEventListener('click', (e) => {
  e.preventDefault();
  lowestArray = myLibrary.toSorted((a, b) => a.rating - b.rating);
  renderLibrary();
  dialogSort.close();
});

newBtn.addEventListener('click', () => {
  inputTitle.value = '';
  inputAuthor.value = '';
  inputPages.value = '';
  ratingNewBook.options[0].selected = true;

  dialogAdd.showModal();
});

function removeOnAlert() {
  if (blankAlertTitle.classList.contains('on-alert')) {
    blankAlertTitle.classList.remove('on-alert');
  } else if (blankAlertAuthor.classList.contains('on-alert')) {
    blankAlertAuthor.classList.remove('on-alert');
  } else if (blankAlertPages.classList.contains('on-alert')) {
    blankAlertPages.classList.remove('on-alert');
  }
}

cancelBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    removeOnAlert();

    dialogs.forEach((modal) => {
      modal.close();
    });
  });
});

addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const title = inputTitle.value;
  const author = inputAuthor.value;
  const pages = inputPages.value;
  const rating = ratingNewBook.value;

  if (title === '') {
    blankAlertTitle.classList.add('on-alert');
    return;
  } else if (author === '') {
    if (blankAlertTitle.classList.contains('on-alert')) {
      blankAlertTitle.classList.remove('on-alert');
    }
    blankAlertAuthor.classList.add('on-alert');
    return;
  } else if (pages === '') {
    if (blankAlertTitle.classList.contains('on-alert')) {
      blankAlertTitle.classList.remove('on-alert');
    } else if (blankAlertAuthor.classList.contains('on-alert')) {
      blankAlertAuthor.classList.remove('on-alert');
    }
    blankAlertPages.classList.add('on-alert');
    return;
  }

  removeOnAlert();
  newBook = new Book(title, author, pages, rating);
  addBookToLibrary(newBook);
  renderLibrary();
  dialogAdd.close();
});

editBtn.addEventListener('click', (e) => {
  e.preventDefault();

  myLibrary.forEach((book) => {
    if (book.id === itemId) {
      book.title = editTitle.value;
      book.author = editAuthor.value;
      book.pages = editPages.value;
    }
  });
  renderLibrary();
  dialogEdit.close();
});

confirmBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const rating = ratingOldBook.value;
  
  myLibrary.forEach((book) => {
    if (book.id === itemId) {
      book.rating = rating;
    }
  });
  renderLibrary();
  dialogRating.close();
});

deleteBtn.addEventListener('click', (e) => {
  e.preventDefault();

  myLibrary.forEach((book, i) => {
    if (book.id === itemId) {
    myLibrary.splice(i, 1);
  }
  });
  renderLibrary();
  dialogDelete.close();
});

recommendedItems.forEach((item, i) => {
  item.addEventListener('click', () => {
    index = i;
    dialogRecommendation.showModal();
  });
});

addBtnForRecommendation.addEventListener('click', (e) => {
  e.preventDefault();
  if (index === 0) {
    newBook = new Book('The Long Good-bye', 'Raymond Chandler', '320', '0');
  } else if (index === 1) {
    newBook = new Book('Flowers for Algernon', 'Daniel Keyes', '311', '0');
  } else if (index === 2) {
    newBook = new Book('Moon Palace', 'Paul Auster', '320', '0');
  }
  addBookToLibrary(newBook);
  renderLibrary();
  dialogRecommendation.close();
});

users.forEach((user) => {
  user.addEventListener('click', () => {
    dialogOthers.showModal();
  });
});