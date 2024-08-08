const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read; 
}

function addBookToTable() {
    const bookTable = document.querySelector(".book-table tbody");
    bookTable.innerHTML = "";

    myLibrary.forEach((item, index) => {
    const row = document.createElement("tr");

    const titleCell = document.createElement("td");
    titleCell.textContent = item.title;
    row.appendChild(titleCell);

    const authorCell = document.createElement("td");
    authorCell.textContent = item.author;
    row.appendChild(authorCell);
    
    const pagesCell = document.createElement("td");
    pagesCell.textContent = item.pages;
    row.appendChild(pagesCell);
    
    const readCell = document.createElement("td");
    const readButton = document.createElement("button");
    readButton.textContent = item.read ? "Read" : "Not Read";
    readButton.style.cursor = "pointer";
    readButton.addEventListener("click", () => {
        item.read = !item.read; 
        readButton.textContent = item.read ? "Read" : "Not Read"; 
        updateLibraryLog(); 
    });
    readCell.appendChild(readButton);
    row.appendChild(readCell);

    const removeCell = document.createElement("td");
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
        removeBookFromLibrary(index);
    });
    removeCell.appendChild(removeButton);
    row.appendChild(removeCell);

    bookTable.appendChild(row);
    });

    updateLibraryLog(); 
}

function addBookToLibrary() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read-option").value === "true"; 
    let newBook = new Book(title, author, pages, read);

    myLibrary.push(newBook);
    addBookToTable();
}

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
    addBookToTable();
}

function updateLibraryLog() {
    const totalCount = myLibrary.length;
    const readCount = myLibrary.filter(book => book.read).length;
    const notReadCount = totalCount - readCount;

    document.querySelector(".library-log .log-div").innerHTML = `
    <div>Total Book Count: ${totalCount}</div>
    <div>Read: ${readCount}</div>
    <div>Not Read: ${notReadCount}</div>
    `;
}

document.querySelector(".book-form").addEventListener("submit", (e) => {
    e.preventDefault();
    addBookToLibrary();
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    document.getElementById("read-option").value = ""; 
});
