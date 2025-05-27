

















// // Global variables
// let allBooks = [];
// let currentBooks = [];
// const booksPerPage = 8;
// let currentPage = 1;

// // DOM Elements
// const booksContainer = document.getElementById('books-container');
// const paginationContainer = document.getElementById('pagination');
// const searchInput = document.getElementById('search-input');
// const searchBtn = document.getElementById('search-btn');
// const categoryFilter = document.getElementById('category-filter');
// const statusFilter = document.getElementById('status-filter');
// const sortBy = document.getElementById('sort-by');
// const viewBookModal = document.getElementById('view-book-modal-backdrop');
// const closeViewModalBtn = document.getElementById('close-view-modal');
// const closeDetailsBtn = document.getElementById('close-details-btn');
// const bookDetailsContainer = document.getElementById('book-details-container');
// const toastContainer = document.getElementById('toast-container');

// // Initialize the application
// function init() {
//     // Load books from db.json
//     loadBooks();
// }

// // Load books from db.json (replace with actual fetch call)
// async function loadBooks() {
//     try {
//         // In a real implementation, you would fetch from db.json:
//         // const response = await fetch('db.json');
//         // const data = await response.json();
//         // allBooks = data.books;
        
//         // For demonstration, we'll simulate a fetch call
//         setTimeout(() => {
//             // This would be replaced with actual fetch data
//             fetch('db.json')
//                 .then(response => response.json())
//                 .then(data => {
//                     allBooks = data.books;
//                     currentBooks = [...allBooks];
//                     displayBooks();
//                 })
//                 .catch(error => {
//                     console.error('Error loading books:', error);
//                     // Fallback to inline data if fetch fails
//                     loadFallbackData();
//                 });
//         }, 500);
//     } catch (error) {
//         console.error('Error loading books:', error);
//         loadFallbackData();
//     }
// }

// // Fallback data loading (in case db.json is not accessible)
// function loadFallbackData() {
//     allBooks = [
//         {
//             "id": 1,
//             "title": "To Kill a Mockingbird",
//             "author": "Harper Lee",
//             "isbn": "9780061120084",
//             "category": "fiction",
//             "publicationDate": "1960-07-11",
//             "description": "A novel about honor and injustice in the deep South through the eyes of a young girl.",
//             "coverUrl": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=250&h=300&fit=crop",
//             "status": "available",
//             "addedDate": "2023-01-15"
//         },
//         {
//             "id": 2,
//             "title": "1984",
//             "author": "George Orwell",
//             "isbn": "9780451524935",
//             "category": "fiction",
//             "publicationDate": "1949-06-08",
//             "description": "A dystopian novel about a totalitarian regime that manipulates and controls its citizens.",
//             "coverUrl": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=250&h=300&fit=crop",
//             "status": "borrowed",
//             "addedDate": "2023-02-20"
//         }
//         // Add more fallback books as needed
//     ];
//     currentBooks = [...allBooks];
//     displayBooks();
// }

// // Display books in the grid
// function displayBooks() {
//     // Apply filters and sorting
//     applyFilters();
    
//     // Pagination
//     const startIndex = (currentPage - 1) * booksPerPage;
//     const endIndex = startIndex + booksPerPage;
//     const booksToDisplay = currentBooks.slice(startIndex, endIndex);
    
//     // Clear the container
//     booksContainer.innerHTML = '';
    
//     if (booksToDisplay.length === 0) {
//         booksContainer.innerHTML = '<div class="loading">No books found matching your criteria.</div>';
//         paginationContainer.innerHTML = '';
//         return;
//     }
    
//     // Add books to the container
//     booksToDisplay.forEach(book => {
//         const bookCard = createBookCard(book);
//         booksContainer.appendChild(bookCard);
//     });
    
//     // Update pagination
//     updatePagination();
// }

// // Create a book card element
// function createBookCard(book) {
//     const card = document.createElement('div');
//     card.className = 'book-card';
    
//     // Status badge
//     const statusClass = book.status === 'available' ? 'status-available' : 'status-borrowed';
    
//     card.innerHTML = `
//         <div class="book-cover">
//             <img src="${book.coverUrl}" alt="${book.title} cover" onerror="this.src='https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=250&h=300&fit=crop'">
//             <span class="status-badge ${statusClass}">${book.status}</span>
//         </div>
//         <div class="book-info">
//             <h3 class="book-title">${book.title}</h3>
//             <p class="book-author">by ${book.author}</p>
//             <p class="book-category">${book.category.charAt(0).toUpperCase() + book.category.slice(1)}</p>
//             <div class="book-actions">
//                 <button class="btn btn-view" data-id="${book.id}">View Details</button>
//                 ${book.status === 'available' ? 
//                   `<button class="btn btn-borrow" data-id="${book.id}">Borrow</button>` : 
//                   `<button class="btn btn-borrowed" disabled>Borrowed</button>`}
//             </div>
//         </div>
//     `;
    
//     // Add event listeners
//     const viewButton = card.querySelector('.btn-view');
//     viewButton.addEventListener('click', () => viewBookDetails(book.id));
    
//     const borrowButton = card.querySelector('.btn-borrow');
//     if (borrowButton) {
//         borrowButton.addEventListener('click', () => borrowBook(book.id));
//     }
    
//     return card;
// }

// // Apply filters and sorting
// function applyFilters() {
//     const searchTerm = searchInput.value.toLowerCase().trim();
//     const category = categoryFilter.value;
//     const status = statusFilter.value;
//     const sortOption = sortBy.value;
    
//     // Filter books
//     currentBooks = allBooks.filter(book => {
//         const matchesSearch = book.title.toLowerCase().includes(searchTerm) || 
//                              book.author.toLowerCase().includes(searchTerm) || 
//                              book.isbn.includes(searchTerm);
//         const matchesCategory = category === '' || book.category === category;
//         const matchesStatus = status === '' || book.status === status;
        
//         return matchesSearch && matchesCategory && matchesStatus;
//     });
    
//     // Sort books
//     currentBooks.sort((a, b) => {
//         switch (sortOption) {
//             case 'title':
//                 return a.title.localeCompare(b.title);
//             case 'author':
//                 return a.author.localeCompare(b.author);
//             case 'publication-date':
//                 return new Date(a.publicationDate) - new Date(b.publicationDate);
//             case 'added-date':
//                 return new Date(a.addedDate) - new Date(b.addedDate);
//             default:
//                 return 0;
//         }
//     });
    
//     // Reset to first page when filters change
//     currentPage = 1;
// }

// // Update pagination controls
// function updatePagination() {
//     const totalPages = Math.ceil(currentBooks.length / booksPerPage);
//     paginationContainer.innerHTML = '';
    
//     if (totalPages <= 1) return;
    
//     // Previous button
//     const prevButton = document.createElement('button');
//     prevButton.className = 'pagination-btn';
//     prevButton.textContent = 'Previous';
//     prevButton.disabled = currentPage === 1;
//     prevButton.addEventListener('click', () => {
//         if (currentPage > 1) {
//             currentPage--;
//             displayBooks();
//         }
//     });
//     paginationContainer.appendChild(prevButton);
    
//     // Calculate which page numbers to show
//     let startPage = Math.max(1, currentPage - 2);
//     let endPage = Math.min(totalPages, currentPage + 2);
    
//     // Adjust if we're near the beginning or end
//     if (currentPage <= 3) {
//         endPage = Math.min(5, totalPages);
//     }
//     if (currentPage >= totalPages - 2) {
//         startPage = Math.max(1, totalPages - 4);
//     }
    
//     // First page button
//     if (startPage > 1) {
//         const firstButton = document.createElement('button');
//         firstButton.className = 'pagination-btn';
//         firstButton.textContent = '1';
//         firstButton.addEventListener('click', () => {
//             currentPage = 1;
//             displayBooks();
//         });
//         paginationContainer.appendChild(firstButton);
        
//         if (startPage > 2) {
//             const ellipsis = document.createElement('span');
//             ellipsis.textContent = '...';
//             ellipsis.className = 'pagination-btn';
//             ellipsis.style.cursor = 'default';
//             paginationContainer.appendChild(ellipsis);
//         }
//     }
    
//     // Page number buttons
//     for (let i = startPage; i <= endPage; i++) {
//         const pageButton = document.createElement('button');
//         pageButton.className = `pagination-btn ${i === currentPage ? 'active' : ''}`;
//         pageButton.textContent = i;
//         pageButton.addEventListener('click', () => {
//             currentPage = i;
//             displayBooks();
//         });
//         paginationContainer.appendChild(pageButton);
//     }
    
//     // Last page button
//     if (endPage < totalPages) {
//         if (endPage < totalPages - 1) {
//             const ellipsis = document.createElement('span');
//             ellipsis.textContent = '...';
//             ellipsis.className = 'pagination-btn';
//             ellipsis.style.cursor = 'default';
//             paginationContainer.appendChild(ellipsis);
//         }
        
//         const lastButton = document.createElement('button');
//         lastButton.className = 'pagination-btn';
//         lastButton.textContent = totalPages;
//         lastButton.addEventListener('click', () => {
//             currentPage = totalPages;
//             displayBooks();
//         });
//         paginationContainer.appendChild(lastButton);
//     }
    
//     // Next button
//     const nextButton = document.createElement('button');
//     nextButton.className = 'pagination-btn';
//     nextButton.textContent = 'Next';
//     nextButton.disabled = currentPage === totalPages;
//     nextButton.addEventListener('click', () => {
//         if (currentPage < totalPages) {
//             currentPage++;
//             displayBooks();
//         }
//     });
//     paginationContainer.appendChild(nextButton);
// }

// // View book details
// function viewBookDetails(bookId) {
//     const book = allBooks.find(b => b.id === bookId);
//     if (!book) return;
    
//     bookDetailsContainer.innerHTML = `
//         <div class="book-details">
//             <div class="book-details-cover">
//                 <img src="${book.coverUrl}" alt="${book.title} cover" onerror="this.src='https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=250&h=300&fit=crop'">
//             </div>
//             <div class="book-details-info">
//                 <h3>${book.title}</h3>
//                 <p><strong>Author:</strong> ${book.author}</p>
//                 <p><strong>ISBN:</strong> ${book.isbn}</p>
//                 <p><strong>Category:</strong> ${book.category.charAt(0).toUpperCase() + book.category.slice(1)}</p>
//                 <p><strong>Publication Date:</strong> ${new Date(book.publicationDate).toLocaleDateString()}</p>
//                 <p><strong>Status:</strong> <span class="status-badge ${book.status === 'available' ? 'status-available' : 'status-borrowed'}">${book.status}</span></p>
//                 <p><strong>Added Date:</strong> ${new Date(book.addedDate).toLocaleDateString()}</p>
                
//                 <div class="book-description">
//                     <h4>Description</h4>
//                     <p>${book.description}</p>
//                 </div>
//             </div>
//         </div>
//     `;
    
//     viewBookModal.style.display = 'flex';
// }

// // Borrow book
// function borrowBook(bookId) {
//     const book = allBooks.find(b => b.id === bookId);
//     if (!book || book.status !== 'available') return;
    
//     // Update book status
//     book.status = 'borrowed';
    
//     // In a real implementation, you would also update the server:
//     // updateBookStatus(bookId, 'borrowed');
    
//     // Refresh display
//     displayBooks();
    
//     // Show success message
//     showToast(`"${book.title}" has been borrowed successfully!`, 'success');
// }

// // Show toast notification
// function showToast(message, type = 'info') {
//     const toast = document.createElement('div');
//     toast.className = `toast toast-${type}`;
//     toast.textContent = message;
    
//     toastContainer.appendChild(toast);
    
//     // Trigger animation
//     setTimeout(() => {
//         toast.classList.add('show');
//     }, 100);
    
//     // Remove toast after 3 seconds
//     setTimeout(() => {
//         toast.classList.remove('show');
//         setTimeout(() => {
//             if (toast.parentNode) {
//                 toast.parentNode.removeChild(toast);
//             }
//         }, 300);
//     }, 3000);
// }

// // Event listeners
// searchBtn.addEventListener('click', displayBooks);
// searchInput.addEventListener('keyup', (e) => {
//     if (e.key === 'Enter') {
//         displayBooks();
//     }
// });
// searchInput.addEventListener('input', displayBooks);
// categoryFilter.addEventListener('change', displayBooks);
// statusFilter.addEventListener('change', displayBooks);
// sortBy.addEventListener('change', displayBooks);

// // Modal event listeners
// closeViewModalBtn.addEventListener('click', () => {
//     viewBookModal.style.display = 'none';
// });
// closeDetailsBtn.addEventListener('click', () => {
//     viewBookModal.style.display = 'none';
// });
// viewBookModal.addEventListener('click', (e) => {
//     if (e.target === viewBookModal) {
//         viewBookModal.style.display = 'none';
//     }
// });

// // Add book functionality (placeholder)
// document.getElementById('add-book-btn').addEventListener('click', () => {
//     showToast('Add book functionality would open a form modal here', 'info');
// });

// // Initialize the application
// init();







// Global variables
let allBooks = [];
let currentBooks = [];
const booksPerPage = 8;
let currentPage = 1;

// DOM Elements
const booksContainer = document.getElementById('books-container');
const paginationContainer = document.getElementById('pagination');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const categoryFilter = document.getElementById('category-filter');
const statusFilter = document.getElementById('status-filter');
const sortBy = document.getElementById('sort-by');
const addBookBtn = document.getElementById('add-book-btn');
const bookModal = document.getElementById('book-modal-backdrop');
const closeModalBtn = document.getElementById('close-modal');
const cancelBtn = document.getElementById('cancel-btn');
const bookForm = document.getElementById('book-form');
const viewBookModal = document.getElementById('view-book-modal-backdrop');
const closeViewModalBtn = document.getElementById('close-view-modal');
const closeDetailsBtn = document.getElementById('close-details-btn');
const bookDetailsContainer = document.getElementById('book-details-container');
const toastContainer = document.getElementById('toast-container');

// Fetch books from JSON file
async function fetchBooks() {
    try {
        const response = await fetch('db.json');
        const data = await response.json();
        
        // Get any borrowed books from localStorage (only for status updates)
        const borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
        
        // If we have borrowed books in localStorage, update their status
        if (borrowedBooks.length > 0) {
            data.books.forEach(book => {
                const borrowedBook = borrowedBooks.find(b => b.id === book.id);
                if (borrowedBook) {
                    book.status = 'borrowed';
                    book.borrowDate = borrowedBook.borrowDate;
                }
            });
        }
        
        allBooks = data.books;
        currentBooks = [...allBooks];
        
        console.log(`Loaded ${allBooks.length} books total`); // Debug log
        
        // Reset to first page and display
        currentPage = 1;
        displayBooks();
        
    } catch (error) {
        console.error('Error fetching books:', error);
        showToast('Failed to load books. Please try again later.', 'error');
    }
}

// Display books in the grid
function displayBooks() {
    // Apply filters and sorting first
    applyFilters();
    
    console.log(`Displaying page ${currentPage}, total filtered books: ${currentBooks.length}`); // Debug log
    
    // Calculate pagination
    const totalPages = Math.ceil(currentBooks.length / booksPerPage);
    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    const booksToDisplay = currentBooks.slice(startIndex, endIndex);
    
    console.log(`Showing books ${startIndex + 1} to ${Math.min(endIndex, currentBooks.length)} of ${currentBooks.length}`); // Debug log
    
    // Clear the container
    booksContainer.innerHTML = '';
    
    // Check if container exists
    if (!booksContainer) {
        console.error('Books container not found!');
        return;
    }
    
    // Add books to the container
    if (booksToDisplay.length === 0) {
        booksContainer.innerHTML = '<div class="no-books-message"><p>No books found matching your criteria.</p></div>';
    } else {
        booksToDisplay.forEach(book => {
            const bookCard = createBookCard(book);
            booksContainer.appendChild(bookCard);
        });
    }
    
    // Update pagination
    updatePagination();
}

// Create a book card element
function createBookCard(book) {
    const card = document.createElement('div');
    card.className = 'book-card';
    
    // Status badge
    const statusClass = book.status === 'available' ? 'status-available' : 'status-borrowed';
    
    card.innerHTML = `
        <div class="book-cover">
            <img src="${book.coverUrl || '/api/placeholder/250/300'}" alt="${book.title} cover"">
            <span class="status-badge ${statusClass}">${book.status}</span>
        </div>
        <div class="book-info">
            <h3 class="book-title">${book.title}</h3>
            <p class="book-author">by ${book.author}</p>
            <p class="book-category">${book.category.charAt(0).toUpperCase() + book.category.slice(1)}</p>
            <div class="book-actions">
                <button class="btn btn-view" data-id="${book.id}">View Details</button>
                ${book.status === 'available' ? 
                  `<button class="btn btn-borrow" data-id="${book.id}">Borrow</button>` : 
                  `<button class="btn btn-borrowed" disabled>Borrowed</button>`}
            </div>
        </div>
    `;
    
    // Add event listeners
    const viewButton = card.querySelector('.btn-view');
    viewButton.addEventListener('click', () => viewBookDetails(book.id));
    
    const borrowButton = card.querySelector('.btn-borrow');
    if (borrowButton) {
        borrowButton.addEventListener('click', () => borrowBook(book.id));
    }
    
    return card;
}

// Apply filters and sorting
function applyFilters() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const category = categoryFilter ? categoryFilter.value : '';
    const status = statusFilter ? statusFilter.value : '';
    const sortOption = sortBy ? sortBy.value : 'title';
    
    // Start with all books
    currentBooks = allBooks.filter(book => {
        const matchesSearch = !searchTerm || 
                             book.title.toLowerCase().includes(searchTerm) || 
                             book.author.toLowerCase().includes(searchTerm) || 
                             book.isbn.includes(searchTerm);
        const matchesCategory = !category || book.category === category;
        const matchesStatus = !status || book.status === status;
        
        return matchesSearch && matchesCategory && matchesStatus;
    });
    
    // Sort books
    currentBooks.sort((a, b) => {
        switch (sortOption) {
            case 'title':
                return a.title.localeCompare(b.title);
            case 'author':
                return a.author.localeCompare(b.author);
            case 'publication-date':
                return new Date(a.publicationDate) - new Date(b.publicationDate);
            case 'added-date':
                return new Date(a.addedDate) - new Date(b.addedDate);
            default:
                return 0;
        }
    });
    
    // Reset to first page when filters change (except when called from pagination)
    const callerFunction = applyFilters.caller?.name;
    if (callerFunction !== 'updatePagination' && callerFunction !== 'displayBooks') {
        currentPage = 1;
    }
}

// Update pagination controls
function updatePagination() {
    if (!paginationContainer) {
        console.error('Pagination container not found!');
        return;
    }
    
    const totalPages = Math.ceil(currentBooks.length / booksPerPage);
    paginationContainer.innerHTML = '';
    
    console.log(`Total pages: ${totalPages}, Current page: ${currentPage}`); // Debug log
    
    // Don't show pagination if only one page or no books
    if (totalPages <= 1) {
        return;
    }
    
    // Create pagination wrapper
    const paginationWrapper = document.createElement('div');
    paginationWrapper.className = 'pagination-wrapper';
    
    // Previous button
    const prevButton = document.createElement('button');
    prevButton.className = `pagination-btn ${currentPage === 1 ? 'disabled' : ''}`;
    prevButton.textContent = 'Previous';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayBooks();
        }
    });
    paginationWrapper.appendChild(prevButton);
    
    // Page numbers (show max 5 pages around current page)
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust start page if we're near the end
    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    // Show first page if not visible
    if (startPage > 1) {
        const firstPageButton = document.createElement('button');
        firstPageButton.className = 'pagination-btn';
        firstPageButton.textContent = '1';
        firstPageButton.addEventListener('click', () => {
            currentPage = 1;
            displayBooks();
        });
        paginationWrapper.appendChild(firstPageButton);
        
        if (startPage > 2) {
            const ellipsis = document.createElement('span');
            ellipsis.className = 'pagination-ellipsis';
            ellipsis.textContent = '...';
            paginationWrapper.appendChild(ellipsis);
        }
    }
    
    // Page number buttons
    for (let i = startPage; i <= endPage; i++) {
        const pageButton = document.createElement('button');
        pageButton.className = `pagination-btn ${currentPage === i ? 'active' : ''}`;
        pageButton.textContent = i;
        pageButton.addEventListener('click', () => {
            currentPage = i;
            displayBooks();
        });
        paginationWrapper.appendChild(pageButton);
    }
    
    // Show last page if not visible
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const ellipsis = document.createElement('span');
            ellipsis.className = 'pagination-ellipsis';
            ellipsis.textContent = '...';
            paginationWrapper.appendChild(ellipsis);
        }
        
        const lastPageButton = document.createElement('button');
        lastPageButton.className = 'pagination-btn';
        lastPageButton.textContent = totalPages;
        lastPageButton.addEventListener('click', () => {
            currentPage = totalPages;
            displayBooks();
        });
        paginationWrapper.appendChild(lastPageButton);
    }
    
    // Next button
    const nextButton = document.createElement('button');
    nextButton.className = `pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`;
    nextButton.textContent = 'Next';
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayBooks();
        }
    });
    paginationWrapper.appendChild(nextButton);
    
    // Add page info
    const pageInfo = document.createElement('div');
    pageInfo.className = 'page-info';
    pageInfo.textContent = `Page ${currentPage} of ${totalPages} (${currentBooks.length} books total)`;
    
    paginationContainer.appendChild(paginationWrapper);
    paginationContainer.appendChild(pageInfo);
}

// Borrow a book
function borrowBook(bookId) {
    // Find the book
    const book = allBooks.find(book => book.id === bookId);
    
    if (!book) {
        showToast('Book not found!', 'error');
        return;
    }
    
    if (book.status === 'borrowed') {
        showToast('This book is already borrowed', 'error');
        return;
    }
    
    // Update book status in our local data
    book.status = 'borrowed';
    book.borrowDate = new Date().toISOString();
    
    // Get current borrowed books from localStorage
    const borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
    
    // Add this book to borrowed books
    const borrowedBook = {
        id: book.id,
        title: book.title,
        author: book.author,
        category: book.category,
        coverUrl: book.coverUrl,
        borrowDate: book.borrowDate,
        returnDate: null,
        status: 'borrowed'
    };
    
    borrowedBooks.push(borrowedBook);
    
    // Save to localStorage
    localStorage.setItem('borrowedBooks', JSON.stringify(borrowedBooks));
    
    // Update total borrowed count
    const totalBorrowed = parseInt(localStorage.getItem('totalBorrowed') || '0');
    localStorage.setItem('totalBorrowed', totalBorrowed + 1);
    
    // Refresh the display
    displayBooks();
    
    // Show success message
    showToast(`Successfully borrowed "${book.title}"`, 'success');
}

// View book details
function viewBookDetails(bookId) {
    const book = allBooks.find(book => book.id === bookId);
    
    if (!book) {
        showToast('Book not found!', 'error');
        return;
    }
    
    const modalTitle = document.getElementById('view-modal-title');
    if (modalTitle) {
        modalTitle.textContent = book.title;
    }
    
    const formattedDate = new Date(book.publicationDate).toLocaleDateString('en-US', {
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
    });
    
    if (bookDetailsContainer) {
        bookDetailsContainer.innerHTML = `
            <div class="book-details">
                <div class="book-details-cover">
                    <img src="${book.coverUrl || '/api/placeholder/250/300'}" alt="${book.title} cover" onerror="this.src='/api/placeholder/250/300'">
                </div>
                <div class="book-details-info">
                    <h3>${book.title}</h3>
                    <p><strong>Author:</strong> ${book.author}</p>
                    <p><strong>ISBN:</strong> ${book.isbn}</p>
                    <p><strong>Category:</strong> ${book.category.charAt(0).toUpperCase() + book.category.slice(1)}</p>
                    <p><strong>Publication Date:</strong> ${formattedDate}</p>
                    <p><strong>Status:</strong> <span class="status-${book.status}">${book.status.charAt(0).toUpperCase() + book.status.slice(1)}</span></p>
                    <p class="book-description"><strong>Description:</strong> ${book.description}</p>
                    ${book.status === 'available' ? 
                        `<button class="btn btn-borrow-large" onclick="borrowBook(${book.id})">Borrow This Book</button>` : 
                        `<p class="borrowed-status">This book is currently borrowed</p>`}
                </div>
            </div>
        `;
    }
    
    if (viewBookModal) {
        viewBookModal.style.display = 'flex';
    }
}

// Show toast notification
function showToast(message, type = 'info') {
    if (!toastContainer) {
        console.log(`Toast: ${message} (${type})`); // Fallback if no toast container
        return;
    }
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    // Show the toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Hide the toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toastContainer.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Initialize search functionality
function initializeSearch() {
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            currentPage = 1; // Reset to first page when searching
            displayBooks();
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                currentPage = 1; // Reset to first page when searching
                displayBooks();
            }
        });
        
        // Optional: Real-time search (uncomment if desired)
        // searchInput.addEventListener('input', () => {
        //     currentPage = 1;
        //     displayBooks();
        // });
    }
}

// Initialize filters
function initializeFilters() {
    if (categoryFilter) {
        categoryFilter.addEventListener('change', () => {
            currentPage = 1; // Reset to first page when filtering
            displayBooks();
        });
    }
    
    if (statusFilter) {
        statusFilter.addEventListener('change', () => {
            currentPage = 1; // Reset to first page when filtering
            displayBooks();
        });
    }
    
    if (sortBy) {
        sortBy.addEventListener('change', () => {
            currentPage = 1; // Reset to first page when sorting
            displayBooks();
        });
    }
}

// Initialize modals
function initializeModals() {
    // Close add book modal
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            if (bookModal) bookModal.style.display = 'none';
        });
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            if (bookModal) bookModal.style.display = 'none';
        });
    }
    
    // Close view book modal
    if (closeViewModalBtn) {
        closeViewModalBtn.addEventListener('click', () => {
            if (viewBookModal) viewBookModal.style.display = 'none';
        });
    }
    
    if (closeDetailsBtn) {
        closeDetailsBtn.addEventListener('click', () => {
            if (viewBookModal) viewBookModal.style.display = 'none';
        });
    }
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === bookModal) {
            bookModal.style.display = 'none';
        }
        if (e.target === viewBookModal) {
            viewBookModal.style.display = 'none';
        }
    });
}

// Main initialization
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Initializing catalog page');
    
    // Initialize all components
    initializeSearch();
    initializeFilters();
    initializeModals();
    
    // Load books
    fetchBooks();
});



// Updated createBookCard function with better image handling
function createBookCard(book) {
    const card = document.createElement('div');
    card.className = 'book-card';
    
    // Status badge
    const statusClass = book.status === 'available' ? 'status-available' : 'status-borrowed';
    
    // Create a fallback image URL
    const fallbackImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
    
    card.innerHTML = `
        <div class="book-cover">
            <img src="${book.coverUrl || fallbackImage}" 
                 alt="${book.title} cover"
                 loading="lazy"
                 onerror="this.src='${fallbackImage}'; this.classList.add('error');">
            <span class="status-badge ${statusClass}">${book.status}</span>
        </div>
        <div class="book-info">
            <h3 class="book-title">${book.title}</h3>
            <p class="book-author">by ${book.author}</p>
            <p class="book-category">${book.category.charAt(0).toUpperCase() + book.category.slice(1)}</p>
            <div class="book-actions">
                <button class="btn btn-view" data-id="${book.id}">View Details</button>
                ${book.status === 'available' ? 
                  `<button class="btn btn-borrow" data-id="${book.id}">Borrow</button>` : 
                  `<button class="btn btn-borrowed" disabled>Borrowed</button>`}
            </div>
        </div>
    `;
    
    // Add event listeners
    const viewButton = card.querySelector('.btn-view');
    viewButton.addEventListener('click', () => viewBookDetails(book.id));
    
    const borrowButton = card.querySelector('.btn-borrow');
    if (borrowButton) {
        borrowButton.addEventListener('click', () => borrowBook(book.id));
    }
    
    // Add image load handling
    const img = card.querySelector('img');
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    
    img.addEventListener('error', function() {
        console.log(`Failed to load image for book: ${book.title}`);
        this.src = fallbackImage;
        this.classList.add('error');
    });
    
    return card;
}

