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
const inputTitle = document.getElementById('title');
const inputAuthor = document.getElementById('author');
const inputPages = document.getElementById('pages');
const ratingNewBook = document.getElementById('rating-new-book');
const dialogRating = document.querySelector('.dialog-rating');
const ratingOldBook = document.getElementById('rating-old-book');
let itemId;

renderLibrary();

function renderLibrary() {
  bookshelf.innerHTML = '';
  
  myLibrary.forEach((book) => {
    const item = document.createElement('li');
    const title = document.createElement('h4');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const btnContainer = document.createElement('p');
    const ratingBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');
    
    item.setAttribute('data-id', `${book.id}`);
    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages + ' pages';
    btnContainer.classList = 'btn-container';
    ratingBtn.classList = 'rating-btn';
    
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
    

    deleteBtn.classList = 'delete-btn';
    deleteBtn.innerHTML = '&#10005;';
    item.appendChild(title);
    item.appendChild(author);
    item.appendChild(pages);
    btnContainer.appendChild(ratingBtn);
    btnContainer.appendChild(deleteBtn);
    item.appendChild(btnContainer);
    bookshelf.appendChild(item);

    ratingBtn.addEventListener('click', (e) => {
      itemId = e.target.parentNode.parentNode.dataset.id;
      dialogRating.showModal();
    });

    cancelBtn.forEach((btn) => {
      btn.addEventListener('click', () => {
        dialogRating.close();
      });
    });

    deleteBtn.addEventListener('click', (e) => {
      bookshelf.removeChild(e.target.parentNode.parentNode);
    });
  });
}


confirmBtn.addEventListener('click', () => {
  let rating = ratingOldBook.value;

  myLibrary.forEach((book) => {
    if (book.id === itemId) {
      book.rating = rating;
    }
  });
  renderLibrary();
  dialogRating.close();
});


newBtn.addEventListener('click', (e) => {
  dialogAdd.showModal();
  document.addEventListener('keydown', () => {
    if (e.key === 'Enter') {
      
    }
  });
});

cancelBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    dialogAdd.close();
  });
});

addBtn.addEventListener('click', () => {
  let title = inputTitle.value;
  let author = inputAuthor.value;
  let pages = inputPages.value;
  let rating = ratingNewBook.value;

  const newBook = new Book(title, author, pages, rating);
  addBookToLibrary(newBook);
  renderLibrary();
  dialogAdd.close();
});