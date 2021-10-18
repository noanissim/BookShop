'use strict'

function onInit() {
    renderBooks()
    renderPaging()
}

function renderBooks() {
    var strHtmls = ''
    var books = getBooks()
    strHtmls += books.map(function (book) {
        return `<tr><td>${book.id}</td>
            <td>${book.name}</td>
            <td>${book.price}</td>
            <td> 
                <div class="buttons-section">
                    <button class="read-btn" onclick="onReadBook('${book.id}')">Read</button>
                    <button class="update-btn" onclick="onUpdateBook('${book.id}')">Update</button>
                    <button class="delete-btn" onclick="onRemoveBook('${book.id}')">Delete</button> 
                    <a href="https://www.bookdepository.com/" target="_blank"> 
                    <button class="buy-btn" onclick="onBuyBook()">Buy!</button> </a>
                </div>
            </td>
            <td>${book.img}</td>
         </tr>`

    }).join('')
    document.querySelector('.books-tbody').innerHTML = strHtmls

}

// function renderVendors() {
//     var vendors = getVendors()
//     var strHtmls = vendors.map(vendor => `<option>${vendor}</option>`)
//     document.querySelector('.vendor-list').innerHTML = strHtmls.join('')
// }


function renderPaging() {

    var strHtml = ''
    for (var i = 0; i <= (Math.ceil(gBooks.length / PAGE_SIZE) - 1); i++) {
        var pageClass = ''
        if (i === gPageIdx) pageClass = 'marked'
        strHtml += `<button class="paging page${i} ${pageClass}" onclick="goToPage(${i})">${i+1}</button>`
    }
    document.querySelector('.paging-section').innerHTML = strHtml
}

function goToPage(selectedPage) {
    document.querySelector(`.page${gPageIdx}`).classList.remove('marked');
    if (gPageIdx !== selectedPage) gPageIdx = selectedPage
    renderPaging()
    renderBooks()
    // if (gPageIdx > selectedPage) {
    //     gPageIdx = selectedPage + 1
    //     onPrevPage()
    // } else if (gPageIdx < selectedPage) {
    //     gPageIdx = selectedPage - 1
    //     onNextPage()
    // }
    document.querySelector(`.page${gPageIdx}`).classList.add('marked');
}

function onRemoveBook(bookId) {
    console.log(bookId);
    removeBook(bookId)
    renderPaging()
    renderBooks()
}

function onAddBook() {
    var elInputName = document.querySelector('.input-add-name')
    var elInputPrice = document.querySelector('.input-add-price')
    document.querySelector('.modal-add-book-content').hidden = true

    var bookName = elInputName.value
    var bookPrice = elInputPrice.value
    addBook(bookName, bookPrice)
    ongoToLastPage()
    elInputPrice.value = ''
    elInputName.value = ''
    renderPaging()
    renderBooks()

}

function openModalAddBook() {
    document.querySelector('.modal-add-book-content').hidden = false
}

function onUpdateBook(bookId) {
    var bookNewPrice = prompt('Enter new book price')
    updateBook(bookId, bookNewPrice)
    renderBooks()
}



function onReadBook(bookId) {
    var book = getBookById(bookId)
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h5').innerText = book.name
    elModal.querySelector('h6').innerText = book.price
    elModal.querySelector('p').innerText = book.desc
    elModal.querySelector('div').innerHTML = book.img
    elModal.querySelector('h4 span').innerText = book.rating
    document.querySelector('.input-rate').value = book.rating;
    elModal.hidden = false;

}

function onCloseModal() {
    document.querySelector('.modal').hidden = true
}

function onNextPage() {
    nextPage();
    renderBooks();
    renderPaging()
}

function onPrevPage() {
    prevPage();
    renderBooks();
    renderPaging()
}

function ongoToLastPage() {
    goToLastPage()
}



function onChangeRate(diff) {
    console.log('value', diff);
    var elInput = document.querySelector('.input-rate')
    console.log('elInput', elInput);
    var currRate = +elInput.value
    console.log(currRate);
    var newRate = currRate + diff
    console.log(newRate);
    if (newRate < 0 || newRate > 10) return

    elInput.value = newRate
    document.querySelector('.modal h4 span').innerText = newRate
    changeRate(newRate)

}

function onSetSort(sortBy) {
    setSort(sortBy)
    renderPaging()
    renderBooks()
}