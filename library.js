const myLibrary = [];

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

function addBookToLibrary(...rest) {
  myLibrary.push(...rest);
}

const doAndroidsDreamOfElectricSheep = new Book('Do Androids Dream of Electric Sheep?', 'Philip K. Dick', '210', 'five-stars');
const nineteenEightyFour = new Book('Nineteen Eighty-Four', 'George Orwell', '328', 'five-stars');
const theClient = new Book('The Client', 'John Grisham', '422', 'four-stars')
const charlieAndTheChocolateFactory = new Book('Charlie and the Chocolate Factory', 'Roald Dahl', '155', 'four-stars');
const myFathersDragon = new Book('My Father\'s Dragon', 'Ruth Stiles Gannett', '98', 'not-read-yet');
const alicesAdventuresInWonderland = new Book('Alice\'s Adventures in Wonderland', 'Lewis Carroll', '172', 'not-read-yet');


addBookToLibrary(doAndroidsDreamOfElectricSheep, nineteenEightyFour, theClient, charlieAndTheChocolateFactory, myFathersDragon, alicesAdventuresInWonderland);

const bookshelf = document.querySelector('.bookshelf');
const newBtn = document.querySelector('.new-btn');
const dialogAdd = document.querySelector('.dialog-add');
const cancelBtn = document.querySelectorAll('.cancel-btn');
const addBtn = document.querySelector('.add-btn');
const confirmBtn = document.querySelector('.confirm-btn');
const deleteBtn = document.querySelector('.delete-btn');
const inputTitle = document.getElementById('title');
const inputAuthor = document.getElementById('author');
const inputPages = document.getElementById('pages');
const ratingNewBook = document.getElementById('rating-new-book');
const dialogRating = document.querySelector('.dialog-rating');
const ratingOldBook = document.getElementById('rating-old-book');
const dialogDelete = document.querySelector('.dialog-delete');
const dialog = document.querySelectorAll('dialog');
let itemId;
let listItem;

Book.prototype.renderLibrary = function() {
  bookshelf.innerHTML = '';
  
  myLibrary.forEach((book) => {
    const item = document.createElement('li');
    const title = document.createElement('h4');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const btnContainer = document.createElement('p');
    const ratingBtn = document.createElement('button');
    const crossBtn = document.createElement('button');
    
    item.setAttribute('data-id', `${book.id}`);
    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages + ' pages';
    btnContainer.classList = 'btn-container';
    ratingBtn.classList = 'rating-btn';
    if (book.rating === 'not-read-yet') {
      ratingBtn.classList.add('not-read-yet');
    }
    
    if (book.rating === 'five-stars') {
      ratingBtn.innerHTML = '&#9733;&#9733;&#9733;&#9733;&#9733;';
    } else if (book.rating === 'four-stars') {
      ratingBtn.innerHTML = '&#9733;&#9733;&#9733;&#9733;'
    } else if (book.rating === 'three-stars') {
      ratingBtn.innerHTML = '&#9733;&#9733;&#9733;'
    } else if (book.rating === 'two-stars') {
      ratingBtn.innerHTML = '&#9733;&#9733;'
    } else if (book.rating === 'one-star') {
      ratingBtn.innerHTML = '&#9733;'
    } else {
      ratingBtn.textContent = book.rating;
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

    ratingBtn.addEventListener('click', (e) => {
      itemId = e.target.parentNode.parentNode.dataset.id;
      
      if (book.id === itemId) {
        if (book.rating === 'five-stars') {
          ratingOldBook.options[1].selected = true;
        } else if (book.rating === 'four-stars') {
          ratingOldBook.options[2].selected = true;
        } else if (book.rating === 'three-stars') {
          ratingOldBook.options[3].selected = true;
        } else if (book.rating === 'two-stars') {
          ratingOldBook.options[4].selected = true;
        } else if (book.rating === 'one-stars') {
          ratingOldBook.options[5].selected = true;
        } else {
          ratingOldBook.options[0].selected = true;
        }
      }

      dialogRating.showModal();
    });

    crossBtn.addEventListener('click', (e) => {
      itemId = e.target.parentNode.parentNode.dataset.id;
      listItem = e.target.parentNode.parentNode;
      dialogDelete.showModal();
    });
  });
}

newBtn.addEventListener('click', () => {
  inputTitle.value = '';
  inputAuthor.value = '';
  inputPages.value = '';
  ratingNewBook.options[0].selected = true;

  dialogAdd.showModal();
});

cancelBtn.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    dialog.forEach((modal) => {
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

  const newBook = new Book(title, author, pages, rating);
  addBookToLibrary(newBook);
  doAndroidsDreamOfElectricSheep.renderLibrary();
  dialogAdd.close();
});

confirmBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const rating = ratingOldBook.value;
  
  myLibrary.forEach((book) => {
    if (book.id === itemId) {
      book.rating = rating;
    }
  });
  doAndroidsDreamOfElectricSheep.renderLibrary();
  dialogRating.close();
});

deleteBtn.addEventListener('click', (event) => {
  event.preventDefault();

  myLibrary.forEach((book, i) => {
    if (book.id === itemId) {
    myLibrary.splice(i, 1);
  }
  });
  bookshelf.removeChild(listItem);
  doAndroidsDreamOfElectricSheep.renderLibrary();
  dialogDelete.close();
});


doAndroidsDreamOfElectricSheep.renderLibrary();