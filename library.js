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

const doAndroidsDreamOfElectricSheep = new Book('Do Androids Dream of Electric Sheep?', 'Philip K. Dick', '210', 'not read yet');
const nineteenEightyFour = new Book('Nineteen Eighty-Four', 'George Orwell', '328', 'not read yet');
const theClient = new Book('The Client', 'John Grisham', '422', 'not read yet')
const charlieAndTheChocolateFactory = new Book('Charlie and the Chocolate Factory', 'Roald Dahl', '155', 'not read yet');
const myFathersDragon = new Book('My Father\'s Dragon', 'Ruth Stiles Gannett', '98', 'not read yet');
const alicesAdventuresInWonderland = new Book('Alice\'s Adventures in Wonderland', 'Lewis Carroll', '172', 'not read yet');

addBookToLibrary(doAndroidsDreamOfElectricSheep, nineteenEightyFour, theClient, charlieAndTheChocolateFactory, myFathersDragon, alicesAdventuresInWonderland);

const bookshelf = document.querySelector('.bookshelf');

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
  title.textContent = book.title;
  author.textContent = book.author;
  pages.textContent = book.pages + ' pages';
  btnContainer.classList = 'btn-container';
  ratingBtn.classList = 'rating-btn';
  ratingBtn.textContent = book.rating;
  deleteBtn.classList = 'delete-btn';
  deleteBtn.innerHTML = '&#10005;';
  item.appendChild(title);
  item.appendChild(author);
  item.appendChild(pages);
  btnContainer.appendChild(ratingBtn);
  btnContainer.appendChild(deleteBtn);
  item.appendChild(btnContainer);
  bookshelf.appendChild(item);

  ratingBtn.addEventListener('click', () => {
    
  });

  deleteBtn.addEventListener('click', (e) => {
    bookshelf.removeChild(e.target.parentNode.parentNode);
  });
});
}

const newBtn = document.querySelector('.new-btn');
const dialog = document.querySelector('.dialog');
const cancelBtn = document.querySelector('.cancel-btn');
const addBtn = document.querySelector('.add-btn');
const inputTitle = document.getElementById('title');
const inputAuthor = document.getElementById('author');
const inputPages = document.getElementById('pages');
const selectRating = document.getElementById('rating');

newBtn.addEventListener('click', (e) => {
  dialog.showModal();
  document.addEventListener('keydown', () => {
    if (e.key === 'Enter') {
      
    }
  });
});

cancelBtn.addEventListener('click', () => {
  dialog.close();
});

addBtn.addEventListener('click', () => {
  let title = inputTitle.value;
  let author = inputAuthor.value;
  let pages = inputPages.value;
  let rating = selectRating.value;

  const newBook = new Book(title, author, pages, rating);
  addBookToLibrary(newBook);
  renderLibrary();
  dialog.close();
});