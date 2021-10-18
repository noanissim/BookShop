'use strict'
const KEY = 'books';
const PAGE_SIZE = 4;

var gBooks;
var gPageIdx = 0;
var gNextId = 0;
var gCurrOpenBook
var gSortBy = ''




_createBooks();

function nextPage() {
    gPageIdx++;
    if (gPageIdx * PAGE_SIZE >= gBooks.length || gPageIdx < 0) {
        gPageIdx = 0;
    }
}

function prevPage() {
    gPageIdx--
    if (gPageIdx * PAGE_SIZE >= gBooks.length || gPageIdx < 0) {
        gPageIdx = 0;
    }
}

function goToLastPage() {
    var lastPage = Math.ceil(gBooks.length / PAGE_SIZE) - 1
    gPageIdx = lastPage
    return gPageIdx
}

function getBooks() {
    var books = gBooks
    const fromIdx = gPageIdx * PAGE_SIZE
    sortBooksForDisplay()
    books = books.slice(fromIdx, fromIdx + PAGE_SIZE)
    console.log(books);
    // if (Array.isArray(books) && books.length) return books
    if (books || books.length) return books
    else {
        prevPage()
        return
    }

}

function sortBooksForDisplay() {
    if (gSortBy === 'Title') {
        console.log(gSortBy);
        gBooks.sort(function (book1, book2) {
            return (book1.name.toLowerCase() > book2.name.toLowerCase()) ? 1 : -1
        })
    }
    if (gSortBy === 'Price') {
        console.log(gSortBy);
        gBooks.sort(function (book1, book2) {
            return book1.price - book2.price
        })
    }
    console.log(gBooks);
}

function removeBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return bookId === book.id
    })
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage()


}

function savePageIdxToStorage() {
    saveToStorage('gPageIdx', gPageIdx)
}


function addBook(bookNmae, bookPrice) {
    var book = _createBook(bookNmae, bookPrice, "img/book1.png")
    gBooks.push(book)
    _saveBooksToStorage()

}

function getBookById(bookId) {
    var book = gBooks.find(function (book) {
        return bookId == book.id
    })
    gCurrOpenBook = book
    return book
}



function updateBook(bookId, bookNewPrice) {
    var book = gBooks.find(book => bookId === book.id)
    book.price = bookNewPrice
    _saveBooksToStorage()
}

function _createBook(name, price, url, rating = 0) {
    return {
        id: makeId(),
        name: name,
        price: parseInt(price),
        img: `<img src=${url} class="book-img" alt="">`,
        desc: makeLorem(),
        rating: rating
    }
}

function _createBooks() {
    var books = loadFromStorage(KEY)
    if (!books || !books.length) {
        books = [
            _createBook('It Ends With Us', '18', "img/img1.PNG", 0),
            _createBook('They Both Die at the End', '10', "img/img2.PNG", 0),
            _createBook('The Midnight Library', '8', "img/img3.PNG", 0),
            _createBook('The Silent Patient', '18', "img/img4.PNG", 0),
            _createBook('This is Going to Hurt', '83', "img/img5.PNG", 0),
            _createBook('Ugly Love', '56', "img/img6.PNG", 0),
            _createBook('Man\'s Search For Meaning ', '12', "img/img7.PNG", 0),
            _createBook('Atomic Habits', '98', "img/img8.PNG", 0),
            _createBook('Good Vibes, Good Life', '11', "img/img9.PNG", 0),
            _createBook('The Secret', '90', "img/img10.PNG", 0),
            _createBook('Thinking, Fast and Slow', '43', "img/img11.PNG", 0),
            _createBook('Leaders Eat Last', '39', "img/img12.PNG", 0)
        ]

    }
    gBooks = books
    _saveBooksToStorage();
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks)
}

function changeRate(newRate) {
    gCurrOpenBook.rating = newRate
    _saveBooksToStorage()
}

function setSort(sortBy) {
    gSortBy = sortBy
}