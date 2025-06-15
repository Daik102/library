const myLibrary = [];

function Book(title, author, pages, haveRead) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
  this.info = function() {
    return `${title} by ${author}, ${pages} pages, ${haveRead}`;
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
  const haveRead = document.createElement('p');
  title.textContent = book.title;
  author.textContent = book.author;
  pages.textContent = book.pages + ' pages';
  haveRead.textContent = book.haveRead;
  item.appendChild(title);
  item.appendChild(author);
  item.appendChild(pages);
  item.appendChild(haveRead);
  bookshelf.appendChild(item);
});
}

const newBtn = document.querySelector('.new-btn');
const dialog = document.querySelector('.dialog');
const cancelBtn = document.querySelector('.cancel-btn');
const addBtn = document.querySelector('.add-btn');
const inputTitle = document.getElementById('title');
const inputAuthor = document.getElementById('author');
const inputPages = document.getElementById('pages');
const selectHaveRead = document.getElementById('have-read');

newBtn.addEventListener('click', (e) => {
  dialog.showModal();
  document.addEventListener('keydown', () => {
    if (e.key === 'Enter') {
      
    }
  });
});

cancelBtn.addEventListener('click', (e) => {
  dialog.close();
});

addBtn.addEventListener('click', () => {
  let title = inputTitle.value;
  let author = inputAuthor.value;
  let pages = inputPages.value;
  let haveRead = selectHaveRead.value;

  const newBook = new Book(title, author, pages, haveRead);
  addBookToLibrary(newBook);
  renderLibrary();
  dialog.close();
});