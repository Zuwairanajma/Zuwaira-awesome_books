class Library {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('books')) || [];
    this.booksDiv = document.getElementById('books');
    this.addBookForm = document.getElementById('addBookForm');
    this.titleInput = document.getElementById('titleInput');
    this.authorInput = document.getElementById('authorInput');
    this.navLinks = document.getElementsByTagName('a');
    this.sections = document.getElementsByTagName('section');
    this.dateDisplay = document.querySelector('.currentDate');
    this.list = document.querySelector('.list-div');

    this.addBookForm.addEventListener('submit', this.handleFormSubmit.bind(this));
    this.displayBooks();
    this.initializeNavLinks();
    this.initializeDateDisplay();
  }

  displayBooks() {
    this.booksDiv.innerHTML = '';

    if (this.books.length === 0) {
      this.booksDiv.textContent = 'No books in the collection.';
      return;
    }

    this.books.forEach((book, index) => {
      const bookDiv = document.createElement('div');
      bookDiv.classList.add('book');

      const titleSpan = document.createElement('span');
      titleSpan.classList.add('book-title');
      titleSpan.textContent = book.title;

      const authorSpan = document.createElement('span');
      authorSpan.classList.add('book-author');
      authorSpan.textContent = `by ${book.author}`;

      const removeButton = document.createElement('button');
      removeButton.classList.add('remove-button');
      removeButton.setAttribute('type', 'button');
      removeButton.setAttribute('data-index', index);
      removeButton.textContent = 'Remove';

      removeButton.addEventListener('click', () => {
        this.removeBook(index);
      });

      bookDiv.appendChild(titleSpan);
      bookDiv.appendChild(authorSpan);
      bookDiv.appendChild(removeButton);
      this.booksDiv.appendChild(bookDiv);
    });
  }

  addBook(title, author) {
    const book = {
      title,
      author,
    };

    this.books.push(book);
    localStorage.setItem('books', JSON.stringify(this.books));
    this.displayBooks();
  }

  removeBook(index) {
    this.books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(this.books));
    this.displayBooks();
  }

  handleFormSubmit(event) {
    event.preventDefault();

    this.addBook(this.titleInput.value, this.authorInput.value);

    this.titleInput.value = '';
    this.authorInput.value = '';
  }

  initializeNavLinks() {
    this.sections[0].style.display = 'none';

    for (let i = 0; i < this.navLinks.length; i += 1) {
      this.navLinks[i].addEventListener('click', () => {
        for (let j = 0; j < this.sections.length; j += 1) {
          if (i === j) {
            this.sections[j].style.display = 'block';
          } else {
            this.sections[j].style.display = 'none';
          }
        }
      });
    }
  }

  initializeDateDisplay() {
    const d = new Date();
    const year = d.getFullYear();
    let date = d.getDate();
    const hours = d.getHours();
    let napm;
    const monthLists = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    if (date === 1 || date === 21 || date === 31) {
      date += 'st';
    } else if (date === 2 || date === 22) {
      date = `${date}nd`;
    } else {
      date = `${date}th`;
    }

    if (hours < 12) {
      napm = 'am';
    } else {
      napm = 'pm';
    }

    this.dateDisplay.innerHTML = `${monthLists[d.getMonth()]} ${date} ${year}, ${hours}:${d.getMinutes()}:${d.getSeconds()} ${napm}`;
  }
}
const library = new Library();
library.addEventListener('click');
