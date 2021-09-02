// Get Error Message Id ... ...
const errorMsg = document.getElementById("error-msg");

// Hide Spinner Function ... ...
function showSpinner() {
    document.getElementById('overlay').style.display = 'block';
}
// Hide Spinner Function ... ...
function hideSpinner() {
    document.getElementById('overlay').style.display = 'none';
}
hideSpinner();


// Get Input Book name text ... ...
const searchBook = async () => {
    const searchField = document.getElementById('search-book-field');
    const searchText = searchField.value;
    if(searchText.length > 0) {
        showSpinner(); 
        searchField.value = '';
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        // NEW PROCESS OF GET DATA
        const res = await fetch(url);
        const books = await res.json(); 
        displaySearchBooks(books);
        hideSpinner();
    }
    else {
        // alert('Search Box Is Empty, Please Enter Your Book Name!!!');
        showSpinner(); 
        errorMsg.innerHTML =`<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                <strong>Search Field Is Empty!</strong> Please, Type Your Favorite Book Name & Try Again To Search...
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>`;
        hideSpinner(); 
    }

}

// Set To Display All Searched Books Results ... ...
const displaySearchBooks = books => {
    // console.log(books.numFound);
    const SearchBooksSectionContainer  = document.getElementById('search-section');
    const searchTotalBooks  = document.getElementById('search-total-books');
    const displaySearchBooksContainer = document.getElementById('search-books-result');
    const coverImage = document.getElementById('cover-image');

    // displaySearchBooksContainer.innerHTML = ''; // Old Process
    displaySearchBooksContainer.textContent = '';
    
    if(books.numFound !== 0) {
        showSpinner();
        errorMsg.innerHTML = "";
        // SearchBooksSectionContainer.appendChild(h2)
        searchTotalBooks.innerText = books.numFound
        // for (let i=20; i >= books.numFound; i--) {
        //     console.log(books.numFound);
        // }
        books.docs.forEach (book => {
            // console.log(book);
            const searchBookDiv = document.createElement('div');
            searchBookDiv.classList.add('col-md-3');
            searchBookDiv.innerHTML = `<div onclick="loadSingleBookImage('${book.cover_i}')" class="card bg-dark p-2 text-white bg-opacity-75bg-dark text-white bg-opacity-25">
                    <a target="_blank" href="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg">
                        <img width="100" height="270" id="cover-image" height="270" src="${book.cover_i ? 'https://covers.openlibrary.org/b/id/' + book.cover_i + '-M.jpg' : 'images/dummy2.png'}" class="img-responsive card-img-top cover-image" alt="${book.cover_i}-M">
                        <div class="card-body">
                    </a>
                    <div class="card-body text-center">
                        <h6 class="card-title"><strong>Book:</strong></h6>
                        <p class="card-text">${book.title ? book.title : 'Not Found'}</p>
                        <h6 class="card-title"><strong>Author:</strong></h6>
                        <p class="card-text"> ${book.author_name ? book.author_name : 'Not Found'}</p>
                        <h6 class="card-title"><strong>Publisher:</strong></h6>
                        <p class="card-text">
                            ${book.publisher ? book.publisher : 'Not Found'}
                        </p>
                        <h6 class="card-title"><strong>1st Published:</strong></h6>
                        <p class="card-text">${book.first_publish_year ? book.first_publish_year : ''}</p>
                    </div>
                </div>
            `;
            
            displaySearchBooksContainer.appendChild(searchBookDiv);
            
        })
        hideSpinner();
    }
    else {
        // Error Handing
        errorMsg.innerHTML =`<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                <strong>No Result Found!</strong> Please Try Again...
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>`;
        searchTotalBooks.innerText = 0; 
        hideSpinner();
    }
    
}