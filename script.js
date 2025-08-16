const uuidBrowser = crypto.randomUUID();

const container = document.querySelector("#container");
const table = document.querySelector("table");
const openPopup = document.querySelector(".open-popup");
const booksDialog = document.querySelector("#add-books-dialog");
const closeFormBtn = document.querySelector(".close-form-btn");
const addBookBtn = document.querySelector(".form-add-btn");
const form = document.querySelector("form");

openPopup.addEventListener("click", () => {
  booksDialog.style.position = "relative";
  booksDialog.style.top = "100px";
  booksDialog.showModal();
});

closeFormBtn.addEventListener("click", () => {
  booksDialog.close();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const title = formData.get("title");
  const author = formData.get("author");
  const numOfPages = parseInt(formData.get("numOfPages"));
  const readStatus = formData.get("readStatus");

  createBook(title, author, numOfPages, readStatus);
  form.reset();
  displayBooks();
  booksDialog.close();
});

const allBooks = [];

function Book(title, author, numOfPages, readStatus) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
  this.readStatus = readStatus;
}

Book.prototype.toggleReadStatus = function () {
  this.readStatus = this.readStatus === "Read" ? "Not Read" : "Read";
};

function createBook(title, author, numOfPages, readStatus) {
  return allBooks.push(new Book(title, author, numOfPages, readStatus));
}

function displayBooks() {
  table.querySelectorAll("tr:not(:first-child)").forEach((row) => row.remove());

  allBooks.forEach((book) => {
    const tableRow = document.createElement("tr");

    const titleCell = document.createElement("td");
    titleCell.textContent = `${book.title}`;

    const authorCell = document.createElement("td");
    authorCell.textContent = `${book.author}`;

    const pagesCell = document.createElement("td");
    pagesCell.textContent = `${book.numOfPages}`;

    const readStatusCell = document.createElement("td");
    readStatusCell.textContent = `${book.readStatus}`;
    const readBtn = document.createElement("button");
    readBtn.textContent = "Read Status";
    readBtn.setAttribute("data-id", book.id);

    readBtn.addEventListener("click", (event) => {
      const bookId = event.target.getAttribute("data-id");
      const foundBook = allBooks.find((b) => b.id === bookId);

      if (foundBook) foundBook.toggleReadStatus();
      displayBooks();
    });

    const actionsCell = document.createElement("td");
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.setAttribute("data-id", book.id);

    removeBtn.addEventListener("click", (event) => {
      const bookId = event.target.getAttribute("data-id");
      removeBook(bookId);
    });

    table.appendChild(tableRow);
    tableRow.appendChild(titleCell);
    tableRow.appendChild(authorCell);
    tableRow.appendChild(pagesCell);
    tableRow.appendChild(readStatusCell);
    actionsCell.appendChild(readBtn);
    actionsCell.appendChild(removeBtn);
    tableRow.appendChild(actionsCell);
  });
}

function removeBook(id) {
  const index = allBooks.findIndex((book) => book.id === id);
  if (index !== -1) {
    allBooks.splice(index, 1);
    displayBooks();
  }
}

let bookOne = createBook("Harry Books", "Rowlings", 500, "Reading");
let bookTwo = createBook("Ron Books", "Jake", 250, "Not Read Yet");
let bookThree = createBook("Hermoine Books", "Robert", 754, "Finished Reading");

displayBooks();
