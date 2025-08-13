const allBooks = [];

function Book(title, author, numOfPages, read) {
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
  this.read = read;
}

function createBook(title, author, numOfPages, read) {
  return allBooks.push(new Book(title, author, numOfPages, read));
}

let bookOne = createBook("Harry Books", "Rowlings", 500, "Read the book");
let bookTwo = createBook("Ron Books", "Jake", 250, "Haven't read the book");
let bookThree = createBook("Hermoine Books", "Robert", 754, "Read the book");

console.log(allBooks);
