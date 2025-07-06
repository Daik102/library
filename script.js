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

const androids = new Book('Do Androids Dream of Electric Sheep?', 'Philip K. Dick', '210', '5');
const client = new Book('The Client', 'John Grisham', '422', '4');
const nineteen = new Book('Nineteen Eighty-Four', 'George Orwell', '328', '5');
const charlie = new Book('Charlie and the Chocolate Factory', 'Roald Dahl', '155', '4');
const dragon = new Book('My Father\'s Dragon', 'Ruth Stiles Gannett', '98', '0');
const alice = new Book('Alice\'s Adventures in Wonderland', 'Lewis Carroll', '172', '0');

const bookshelf = document.querySelector('.bookshelf');
const sortBtn = document.querySelector('.sort-btn');
const newBookBtn = document.querySelector('.new-book-btn');
const cancelBtns = document.querySelectorAll('.cancel-btn');
const recommendedBooks = document.querySelectorAll('.recommended-book');
const users = document.querySelectorAll('.user');

const myLibrary = [];
let searchArray = [];
let highestArray = [];
let lowestArray = [];

let itemId;
let index;

let sortBtnClicked;
let NewBookBtnClicked;
let titleClicked;
let ratingBtnClicked;
let crossBtnClicked;
let recommendedBookClicked;

function addBookToLibrary(...rest) {
  myLibrary.push(...rest);
}

addBookToLibrary(androids, client, nineteen, charlie, dragon, alice);

function searchBooks(e) {
  const searchBar = document.querySelector('.search-bar');

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
}
document.body.addEventListener('keydown', searchBooks);

function closeModal(e) {
  e.preventDefault();

  const dialogs = document.querySelectorAll('dialog');

  dialogs.forEach((modal) => {
    const dialog = e.target.parentNode.parentNode.parentNode;

    if (dialog.className === modal.className) {
      modal.close();
    }
  });
}
cancelBtns.forEach((btn) => btn.addEventListener('click', closeModal));

function sortBooks(e) {
  e.preventDefault();

  const dialogSort = document.querySelector('.dialog-sort');
  const oldestBtn = document.querySelector('.oldest-btn');
  const newestBtn = document.querySelector('.newest-btn');
  const highRatingsBtn = document.querySelector('.high-ratings-btn');
  const lowRatingsBtn = document.querySelector('.low-ratings-btn');

  dialogSort.showModal();

  if (sortBtnClicked) {
    return;
  }
  sortBtnClicked = true;

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
}
sortBtn.addEventListener('click', sortBooks);

function generateNewBook(e) {
  e.preventDefault();

  const dialogAdd = document.querySelector('.dialog-add');
  const addBtn = document.querySelector('.add-btn');
  const ratingNewBook = document.getElementById('rating-new-book');
  let inputTitle = document.getElementById('title');
  let inputAuthor = document.getElementById('author');
  let inputPages = document.getElementById('pages');

  inputTitle.value = '';
  inputAuthor.value = '';
  inputPages.value = '';
  ratingNewBook.options[0].selected = true;

  dialogAdd.showModal();

  if (NewBookBtnClicked) {
    return;
  }
  NewBookBtnClicked = true;

  const addNewBook = (e) => {
    e.preventDefault();

    const alertNoTitle = document.querySelector('.alert-no-title');
    const alertNoAuthor = document.querySelector('.alert-no-author');
    const alertNoPages = document.querySelector('.alert-no-pages');
    const title = inputTitle.value;
    const author = inputAuthor.value;
    const pages = inputPages.value;
    const rating = ratingNewBook.value;

    const removeOnAlert = () => {
      if (alertNoTitle.classList.contains('on-alert')) {
        alertNoTitle.classList.remove('on-alert');
      }
      if (alertNoAuthor.classList.contains('on-alert')) {
        alertNoAuthor.classList.remove('on-alert');
      }
      if (alertNoPages.classList.contains('on-alert')) {
        alertNoPages.classList.remove('on-alert');
      }
    }

    removeOnAlert();

    if (title === '') {
      alertNoTitle.classList.add('on-alert');
      return;
    } else if (author === '') {
      alertNoAuthor.classList.add('on-alert');
      return;
    } else if (pages === '') {
      alertNoPages.classList.add('on-alert');
      return;
    }

    const newBook = new Book(title, author, pages, rating);
    addBookToLibrary(newBook);
    renderLibrary();
    dialogAdd.close();
  }
  addBtn.addEventListener('click', addNewBook);
}
newBookBtn.addEventListener('click', generateNewBook);

function generateRecommendedBook() {
  const dialogRecommendation = document.querySelector('.dialog-recommendation');
  const addBtnForRecommendation = document.querySelector('.add-btn-for-recommendation');

  dialogRecommendation.showModal();

  if (recommendedBookClicked) {
    return;
  }
  recommendedBookClicked = true;

  const addRecommendedBook = (e) => {
    e.preventDefault();
    
    if (index === 0) {
      const newBook = new Book('The Long Good-bye', 'Raymond Chandler', '320', '0');
      addBookToLibrary(newBook);
    } else if (index === 1) {
      const newBook = new Book('Flowers for Algernon', 'Daniel Keyes', '311', '0');
      addBookToLibrary(newBook);
    } else if (index === 2) {
      const newBook = new Book('Moon Palace', 'Paul Auster', '320', '0');
      addBookToLibrary(newBook);
    }
    
    renderLibrary();
    dialogRecommendation.close();
  };
  addBtnForRecommendation.addEventListener('click', addRecommendedBook);
}
recommendedBooks.forEach((book, i) => {
  book.addEventListener('click', () => {
    index = i;
    generateRecommendedBook();
  });
});

function showOtherBookshelves() {
  const dialogOthers = document.querySelector('.dialog-others');
  
  dialogOthers.showModal();
}
users.forEach(user => user.addEventListener('click', showOtherBookshelves));

function createBooks(book) {
  const item = document.createElement('li');
  const title = document.createElement('h4');
  const author = document.createElement('p');
  const pages = document.createElement('p');
  const btnContainer = document.createElement('p');
  const ratingBtn = document.createElement('button');
  const crossBtn = document.createElement('button');

  const editTitle = document.getElementById('edit-title');
  const editAuthor = document.getElementById('edit-author');
  const editPages = document.getElementById('edit-pages');
  const dialogEdit = document.querySelector('.dialog-edit');
  const editBtn = document.querySelector('.edit-btn');
  const ratingOldBook = document.getElementById('rating-old-book');
  const dialogRating = document.querySelector('.dialog-rating');
  const confirmBtn = document.querySelector('.confirm-btn');
  const dialogDelete = document.querySelector('.dialog-delete');
  const deleteBtn = document.querySelector('.delete-btn');
  
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

  const showEditModal = (e) => {
    itemId = e.target.parentNode.dataset.id;
    
    if (book.id === itemId) {
      editTitle.value = book.title;
      editAuthor.value = book.author;
      editPages.value = book.pages;
    }

    dialogEdit.showModal();

    if (titleClicked) {
      return;
    }
    titleClicked = true;

    const editBook = (e) => {
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
    };
    editBtn.addEventListener('click', editBook);
  };
  title.addEventListener('click', showEditModal);

  const editRating = (e) => {
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

    if (ratingBtnClicked) {
      return;
    }
    ratingBtnClicked = true;

    const confirmRating = (e) => {
      e.preventDefault();

      const rating = ratingOldBook.value;
      
      myLibrary.forEach((book) => {
        if (book.id === itemId) {
          book.rating = rating;
        }
      });
      renderLibrary();
      dialogRating.close();
    };
    confirmBtn.addEventListener('click', confirmRating);
  }
  ratingBtn.addEventListener('click', editRating);

  crossBtn.addEventListener('click', (e) => {
    itemId = e.target.parentNode.parentNode.dataset.id;
    dialogDelete.showModal();

    if (crossBtnClicked) {
      return;
    }
    crossBtnClicked = true;

    const deleteBook = (e) => {
      e.preventDefault();
      
      myLibrary.forEach((book, i) => {
        if (book.id === itemId) {
        myLibrary.splice(i, 1);
        }
      });

      renderLibrary();
      dialogDelete.close();
    };
    deleteBtn.addEventListener('click', deleteBook);
  });
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