// let Login=()=>{
//     let loginname=document.querySelector("#loginname").value
//     let loginpass=document.querySelector("#loginpass").value
    
//     Localname=localStorage.getItem("Name")
//     Localpass=localStorage.getItem("Password")

//     if(loginname==Localname && loginpass==Localpass){
//         location.href="home.html";
//         return false;
//     }
//     else{
//         alert("Your name and password is wrong!")
//     }
//     return false;

// }

let Login = () => {
    let loginName = document.querySelector("#loginname").value;
    let loginPass = document.querySelector("#loginpass").value;
    
    // Basic validation
    if (loginName == "") {
        alert("Please enter your name!");
        return false;
    }
    
    if (loginPass == "") {
        alert("Please enter your password!");
        return false;
    }
    
    // Get stored user data from signup
    let storedName = localStorage.getItem("Name");
    let storedEmail = localStorage.getItem("Email");
    let storedPassword = localStorage.getItem("Password");
    let storedNumber = localStorage.getItem("Number");
    
    // Check if user exists
    if (!storedName || !storedPassword) {
        alert("No account found. Please sign up first!");
        return false;
    }
    
    // Verify credentials - allow login by name or email
    if ((loginName !== storedName && loginName !== storedEmail) || loginPass !== storedPassword) {
        alert("Invalid name/email or password!");
        return false;
    }
    
    // Login successful - create user session
    let currentUser = {
        name: storedName,
        email: storedEmail,
        number: storedNumber,
        membership: "Premium Member",
        joinDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short' }),
        loginTime: new Date().toISOString()
    };
    
    // Store current session
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    localStorage.setItem("isLoggedIn", "true");
    
    // Initialize or update user activity
    let userActivity = JSON.parse(localStorage.getItem("userActivity")) || [];
    
    // Add login activity
    userActivity.unshift({
        action: "Login",
        date: new Date().toISOString(),
        details: "Successfully logged into account"
    });
    
    // If first time, add welcome activity
    if (userActivity.length === 1) {
        userActivity.push({
            action: "Account Created",
            date: new Date().toISOString(),
            details: "Welcome to LibraryEase!"
        });
    }
    
    // Keep only last 50 activities
    if (userActivity.length > 50) {
        userActivity = userActivity.slice(0, 50);
    }
    
    localStorage.setItem("userActivity", JSON.stringify(userActivity));
    
    // Initialize user stats if doesn't exist
    if (!localStorage.getItem("userStats")) {
        let initialStats = {
            totalBorrowed: 0,
            currentlyBorrowed: 0,
            favoriteGenre: "Not set",
            memberSince: new Date().toISOString()
        };
        localStorage.setItem("userStats", JSON.stringify(initialStats));
    }
    
    // Initialize empty arrays for books if they don't exist
    if (!localStorage.getItem('borrowedBooks')) {
        localStorage.setItem('borrowedBooks', JSON.stringify([]));
    }
    if (!localStorage.getItem('borrowingHistory')) {
        localStorage.setItem('borrowingHistory', JSON.stringify([]));
    }
    
    // Success message and redirect
    alert("Login successful! Welcome to LibraryEase, " + storedName + "!");
    location.href = "dashboard.html";
    return false;
};