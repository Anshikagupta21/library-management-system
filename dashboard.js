
// DOM Elements
const borrowedBooksContainer = document.getElementById('borrowedBooks');
const historyTableBody = document.getElementById('historyTableBody');
const menuLinks = document.querySelectorAll('.menu-link');
const dashboardPanels = document.querySelectorAll('.dashboard-panel');
const notification = document.getElementById('notification');
const statBorrowed = document.getElementById('statBorrowed');
const statHistory = document.getElementById('statHistory');
const settingsForm = document.getElementById('settingsForm');
const resetFormBtn = document.getElementById('resetForm');

// Check if user is logged in
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const currentUser = localStorage.getItem("currentUser");
    
    if (!isLoggedIn || !currentUser) {
        alert("Please log in to access the dashboard");
        location.href = "login.html";
        return false;
    }
    return true;
}

// Get current user data
function getCurrentUser() {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
        return JSON.parse(currentUser);
    }
    return null;
}

// Load user's borrowed books
function loadBorrowedBooks() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    
    // Get user-specific borrowed books (you can modify this to be user-specific)
    const borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
    
    // Update stats
    statBorrowed.textContent = borrowedBooks.length;
    
    // Update user stats
    let userStats = JSON.parse(localStorage.getItem("userStats")) || {
        totalBorrowed: 0,
        currentlyBorrowed: 0,
        favoriteGenre: "Not set",
        memberSince: new Date().toISOString()
    };
    userStats.currentlyBorrowed = borrowedBooks.length;
    localStorage.setItem("userStats", JSON.stringify(userStats));
    
    statHistory.textContent = userStats.totalBorrowed;
    
    // Clear container
    borrowedBooksContainer.innerHTML = '';
    
    if (borrowedBooks.length === 0) {
        borrowedBooksContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📚</div>
                <h3>No Books Borrowed</h3>
                <p>You haven't borrowed any books yet. Visit our <a href="catalog.html">catalog</a> to find your next read!</p>
                <div class="sample-books">
                    <h4>Sample Books Available:</h4>
                    <button onclick="borrowSampleBook('The Great Gatsby', 'F. Scott Fitzgerald')" class="sample-btn">Borrow "The Great Gatsby"</button>
                    <button onclick="borrowSampleBook('To Kill a Mockingbird', 'Harper Lee')" class="sample-btn">Borrow "To Kill a Mockingbird"</button>
                    <button onclick="borrowSampleBook('1984', 'George Orwell')" class="sample-btn">Borrow "1984"</button>
                </div>
            </div>
        `;
        return;
    }
    
    // Display borrowed books
    borrowedBooks.forEach(book => {
        const bookEl = createBookElement(book);
        borrowedBooksContainer.appendChild(bookEl);
    });
}

// Function to borrow sample books for testing
function borrowSampleBook(title, author) {
    const newBook = {
        id: Date.now(),
        title: title,
        author: author,
        borrowDate: new Date().toISOString(),
        coverUrl: '/api/placeholder/250/300'
    };
    
    let borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
    borrowedBooks.push(newBook);
    localStorage.setItem('borrowedBooks', JSON.stringify(borrowedBooks));
    
    // Add activity
    addUserActivity("Book Borrowed", `Borrowed "${title}" by ${author}`);
    
    // Reload the page
    loadBorrowedBooks();
    showNotification(`Successfully borrowed "${title}"!`, 'success');
}

// Create book element for the dashboard
function createBookElement(book) {
    const bookEl = document.createElement('div');
    bookEl.className = 'book-item';
    
    // Format the borrow date
    const borrowDate = new Date(book.borrowDate);
    const formattedBorrowDate = borrowDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    
    // Calculate due date (14 days from borrow date)
    const dueDate = new Date(borrowDate);
    dueDate.setDate(dueDate.getDate() + 14);
    const formattedDueDate = dueDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    
    // Check if book is overdue
    const isOverdue = new Date() > dueDate;
    const dueDateClass = isOverdue ? 'overdue' : '';
    
    bookEl.innerHTML = `
        <div class="book-cover">
            <img src="${book.coverUrl || '/api/placeholder/250/300'}" alt="${book.title} cover">
        </div>
        <div class="book-details">
            <h3>${book.title}</h3>
            <p class="author">by ${book.author}</p>
            <p class="borrow-info">Borrowed on: ${formattedBorrowDate}</p>
            <p class="due-date ${dueDateClass}">Due on: ${formattedDueDate}</p>
            <button class="btn btn-return" data-id="${book.id}">Return Book</button>
        </div>
    `;
    
    // Add event listener for return button
    const returnBtn = bookEl.querySelector('.btn-return');
    returnBtn.addEventListener('click', () => returnBook(book.id));
    
    return bookEl;
}

// Return a book
function returnBook(bookId) {
    const borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
    const bookIndex = borrowedBooks.findIndex(book => book.id === bookId);
    
    if (bookIndex === -1) {
        showNotification('Book not found!', 'error');
        return;
    }
    
    const returnedBook = borrowedBooks[bookIndex];
    returnedBook.returnDate = new Date().toISOString();
    returnedBook.status = 'returned';
    
    // Remove from borrowed books
    borrowedBooks.splice(bookIndex, 1);
    localStorage.setItem('borrowedBooks', JSON.stringify(borrowedBooks));
    
    // Add to history
    const borrowingHistory = JSON.parse(localStorage.getItem('borrowingHistory')) || [];
    borrowingHistory.push(returnedBook);
    localStorage.setItem('borrowingHistory', JSON.stringify(borrowingHistory));
    
    // Update user stats
    let userStats = JSON.parse(localStorage.getItem("userStats")) || {};
    userStats.totalBorrowed = (userStats.totalBorrowed || 0) + 1;
    localStorage.setItem("userStats", JSON.stringify(userStats));
    
    // Add activity
    addUserActivity("Book Returned", `Returned "${returnedBook.title}" by ${returnedBook.author}`);
    
    // Reload
    loadBorrowedBooks();
    if (document.getElementById('history').classList.contains('active')) {
        loadBorrowingHistory();
    }
    
    showNotification(`Successfully returned "${returnedBook.title}"`, 'success');
}

// Load borrowing history
function loadBorrowingHistory() {
    const borrowingHistory = JSON.parse(localStorage.getItem('borrowingHistory')) || [];
    
    historyTableBody.innerHTML = '';
    
    if (borrowingHistory.length === 0) {
        historyTableBody.innerHTML = `
            <tr>
                <td colspan="5" class="empty-history">
                    <div class="empty-state">
                        <div class="empty-icon">📖</div>
                        <h3>No Borrowing History</h3>
                        <p>Your borrowing history will appear here once you've returned books.</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }
    
    // Sort history by return date (newest first)
    borrowingHistory.sort((a, b) => new Date(b.returnDate) - new Date(a.returnDate));
    
    // Display history
    borrowingHistory.forEach(book => {
        const row = document.createElement('tr');
        
        const borrowDate = new Date(book.borrowDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        
        const returnDate = book.returnDate ? 
            new Date(book.returnDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            }) : 'N/A';
        
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${borrowDate}</td>
            <td>${returnDate}</td>
            <td><span class="status-returned">Returned</span></td>
        `;
        
        historyTableBody.appendChild(row);
    });
}

// Add user activity
function addUserActivity(action, details) {
    let userActivity = JSON.parse(localStorage.getItem("userActivity")) || [];
    userActivity.unshift({
        action: action,
        date: new Date().toISOString(),
        details: details
    });
    if (userActivity.length > 50) {
        userActivity = userActivity.slice(0, 50);
    }
    localStorage.setItem("userActivity", JSON.stringify(userActivity));
}

// Show notification
function showNotification(message, type = 'success') {
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Switch tab
function switchTab(targetId) {
    dashboardPanels.forEach(panel => panel.classList.remove('active'));
    menuLinks.forEach(link => link.classList.remove('active'));
    
    document.getElementById(targetId).classList.add('active');
    document.querySelector(`.menu-link[data-target="${targetId}"]`).classList.add('active');
    
    if (targetId === 'borrowed') {
        loadBorrowedBooks();
    } else if (targetId === 'history') {
        loadBorrowingHistory();
    } else if (targetId === 'activity') {
        loadUserActivity();
    }
}

// Load user activity
function loadUserActivity() {
    const activityPanel = document.getElementById('activity');
    if (!activityPanel) return;
    
    const userActivity = JSON.parse(localStorage.getItem("userActivity")) || [];
    
    let activityHTML = '<div class="panel-header"><h2 class="panel-title">Recent Activity</h2></div>';
    
    if (userActivity.length === 0) {
        activityHTML += `
            <div class="empty-state">
                <div class="empty-icon">📋</div>
                <h3>No Activity Yet</h3>
                <p>Your recent activities will appear here.</p>
            </div>
        `;
    } else {
        activityHTML += '<div class="activity-list">';
        userActivity.slice(0, 20).forEach(activity => {
            const activityDate = new Date(activity.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            
            activityHTML += `
                <div class="activity-item">
                    <div class="activity-action">${activity.action}</div>
                    <div class="activity-details">${activity.details}</div>
                    <div class="activity-date">${activityDate}</div>
                </div>
            `;
        });
        activityHTML += '</div>';
    }
    
    activityPanel.innerHTML = activityHTML;
}

// Load user data and display in profile
function loadUserData() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    
    // Update profile section
    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('userEmail').textContent = currentUser.email;
    document.getElementById('userMembership').textContent = currentUser.membership;
    document.getElementById('userJoined').textContent = currentUser.joinDate;
    
    // Set user initials
    const nameParts = currentUser.name.split(' ');
    const initials = nameParts.map(part => part[0]).join('');
    document.getElementById('profileInitial').textContent = initials;
    
    // Populate settings form
    if (document.getElementById('fullName')) {
        document.getElementById('fullName').value = currentUser.name;
        document.getElementById('email').value = currentUser.email;
    }
}

// Logout function
function logout() {
    addUserActivity("Logout", "Logged out of account");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    alert("You have been logged out successfully!");
    location.href = "login.html";
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    // Check login status first
    if (!checkLoginStatus()) {
        return;
    }
    
    // Load user data
    loadUserData();
    
    // Load borrowed books
    loadBorrowedBooks();
    
    // Add activity panel if it doesn't exist
    if (!document.getElementById('activity')) {
        const activityPanel = document.createElement('div');
        activityPanel.id = 'activity';
        activityPanel.className = 'dashboard-panel';
        document.querySelector('.content').appendChild(activityPanel);
        
        // Add activity menu item
        const activityMenuItem = document.createElement('li');
        activityMenuItem.innerHTML = '<a href="#" class="menu-link" data-target="activity">Recent Activity</a>';
        document.querySelector('.menu').appendChild(activityMenuItem);
    }
    
    // Set up menu tabs
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            switchTab(targetId);
        });
    });
    
    // Settings form
    if (settingsForm) {
        settingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const currentUser = getCurrentUser();
            if (!currentUser) return;
            
            currentUser.name = document.getElementById('fullName').value;
            currentUser.email = document.getElementById('email').value;
            
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            // Also update the original signup data
            localStorage.setItem("Name", currentUser.name);
            localStorage.setItem("Email", currentUser.email);
            
            addUserActivity("Profile Updated", "Updated account settings");
            loadUserData();
            showNotification('Account settings updated successfully');
        });
    }
    
    // Reset form button
    if (resetFormBtn) {
        resetFormBtn.addEventListener('click', () => {
            const currentUser = getCurrentUser();
            if (!currentUser) return;
            
            document.getElementById('fullName').value = currentUser.name;
            document.getElementById('email').value = currentUser.email;
            document.getElementById('password').value = '';
            document.getElementById('confirmPassword').value = '';
        });
    }
    
    // Handle logout link
    const logoutLink = document.querySelector('a[href="logout.html"]');
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }
});

// Add CSS for activity and sample books
const style = document.createElement('style');
style.textContent = `
    .activity-list {
        max-height: 500px;
        overflow-y: auto;
    }
    .activity-item {
        padding: 15px;
        border-left: 4px solid #667eea;
        margin-bottom: 10px;
        background: #f8f9fa;
        border-radius: 8px;
        transition: transform 0.2s ease;
    }
    .activity-item:hover {
        transform: translateX(5px);
        background: #e9ecef;
    }
    .activity-action {
        font-weight: bold;
        color: #333;
        font-size: 1.1em;
    }
    .activity-details {
        color: #555;
        margin: 5px 0;
    }
    .activity-date {
        font-size: 0.85em;
        color: #666;
        font-style: italic;
    }
    .sample-books {
        margin-top: 20px;
        padding: 20px;
        background: #f0f4ff;
        border-radius: 10px;
        border: 2px dashed #667eea;
    }
    .sample-btn {
        display: block;
        width: 100%;
        margin: 10px 0;
        padding: 10px;
        background: #667eea;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background 0.3s ease;
    }
    .sample-btn:hover {
        background: #5a67d8;
    }
`;
document.head.appendChild(style);