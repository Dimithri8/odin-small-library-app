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

  createBook(title, author, numOfPages);
  form.reset();
  displayBooks();

  booksDialog.close();
});

const allBooks = [];

function Book(title, author, numOfPages) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
}

function createBook(title, author, numOfPages) {
  return allBooks.push(new Book(title, author, numOfPages));
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

    table.appendChild(tableRow);
    tableRow.appendChild(titleCell);
    tableRow.appendChild(authorCell);
    tableRow.appendChild(pagesCell);
  });
}

let bookOne = createBook("Harry Books", "Rowlings", 500);
let bookTwo = createBook("Ron Books", "Jake", 250);
let bookThree = createBook("Hermoine Books", "Robert", 754);

displayBooks();
