//  Signup=()=>{

// let signname=document.querySelector("#name").value
// let signnumber=document.querySelector("#number").value
// let signemail=document.querySelector("#email").value

// let signpaslets=document.querySelector("#password").value
// let signcpass=document.querySelector("#cpassword").value

  
// let errname=document.querySelector("#errname")
// let errnumber=document.querySelector("#errnumber")
// let erremail=document.querySelector("#erremail")
// let errpass=document.querySelector("#errpass")
// let errcpass=document.querySelector("#errcpass")

// if(signname==""){
// errname.innerHTML="please enter your name!";
// errname.style.color="red";
// return false;
// }

// if(signnumber==""){
//     errnumber.innerHTML="please enter your number!";
//     errnumber.style.color="red";
//     return false;
// }
// if(signemail==""){
//     erremail.innerHTML="please enter your email!"
//     erremail.style.color="red";

//     return false;
// }

// if(signpass==""){
//     errpass.innerHTML="please enter your password!"
//     errpass.style.color="red";

//     return false;
// }

// if(signcpass==""){
//     errcpass.innerHTML="please enter your cpassword!"
//     errcpass.style.color="red";

//     return false;
// }

// else if (signnumber.length!=10){
//     errnumber.innerHTML="please enter 10 digits!"
//     errnumber.style.color="red" 
//     return false
// }
// else if(isNaN(signnumber)){
//     errnumber.innerHTML="please enter number only!";
//     errnumber.style.color="red";

//     return false;
// }

// else if(!(signemail.includes("@") && signemail.includes(".com"))){
      
//     erremail.innerHTML="please enter a valid email!"
//     erremail.style.color="red";

//     return false
//  }


//  else if(signcpass != signpass){
//     errcpass.innerHTML ="please enter same passwords!";
//     errcpass.style.color="red";
//     document.querySelector("#cpassword").value=""  //new thing
//     document.querySelector("#cpassword").focus()   //new thing
//     return false;
   
//  }

// //   if( !(signpass.match(/[0-9]/))
// //     && !(signpass.match(/[!@#$%^&*()_]/))
// //     && !(signpass.match(/[A-Z]/))
// //     && !(signpass.match(/[a-z]/))
// // ){
// //  errpass.innerHTML="please enter strong password";
// //  errpass.style.color="red";

// //  return false;
// // }

// if (
//     !(
//       signpass.match(/[0-9]/) &&
//       signpass.match(/[!@#$%^&*()_]/) &&
//       signpass.match(/[A-Z]/) &&
//       signpass.match(/[a-z]/)
//     )
//   ) {
//     errpass.innerHTML = "please enter a strong password";
//     errpass.style.color = "red";
//     return false;
//   }
  

// localStorage.setItem("Name",signname)
// localStorage.setItem("Number",signnumber)
// localStorage.setItem("Email",signemail)
// localStorage.setItem("Password",signpass)
// localStorage.setItem("Cpass",signcpass)

// location.href="login.html"
// return false;

// }


//   AOS.init();

let Signup = () => {
    let signname = document.querySelector("#name").value;
    let signnumber = document.querySelector("#number").value;
    let signemail = document.querySelector("#email").value;
    let signpass = document.querySelector("#password").value;
    let signcpass = document.querySelector("#cpassword").value; // Fixed typo
    
    let errname = document.querySelector("#errname");
    let errnumber = document.querySelector("#errnumber");
    let erremail = document.querySelector("#erremail");
    let errpass = document.querySelector("#errpass");
    let errcpass = document.querySelector("#errcpass");
    
    // Clear previous errors
    errname.innerHTML = "";
    errnumber.innerHTML = "";
    erremail.innerHTML = "";
    errpass.innerHTML = "";
    errcpass.innerHTML = "";
    
    if (signname == "") {
        errname.innerHTML = "please enter your name!";
        errname.style.color = "red";
        return false;
    }
    
    if (signnumber == "") {
        errnumber.innerHTML = "please enter your number!";
        errnumber.style.color = "red";
        return false;
    }
    
    if (signemail == "") {
        erremail.innerHTML = "please enter your email!"
        erremail.style.color = "red";
        return false;
    }
    
    if (signpass == "") {
        errpass.innerHTML = "please enter your password!"
        errpass.style.color = "red";
        return false;
    }
    
    if (signcpass == "") {
        errcpass.innerHTML = "please enter your cpassword!"
        errcpass.style.color = "red";
        return false;
    }
    
    else if (signnumber.length != 10) {
        errnumber.innerHTML = "please enter 10 digits!"
        errnumber.style.color = "red"
        return false;
    }
    
    else if (isNaN(signnumber)) {
        errnumber.innerHTML = "please enter number only!";
        errnumber.style.color = "red";
        return false;
    }
    
    else if (!(signemail.includes("@") && signemail.includes(".com"))) {
        erremail.innerHTML = "please enter a valid email!"
        erremail.style.color = "red";
        return false;
    }
    
    else if (signcpass != signpass) {
        errcpass.innerHTML = "please enter same passwords!";
        errcpass.style.color = "red";
        document.querySelector("#cpassword").value = "";
        document.querySelector("#cpassword").focus();
        return false;
    }
    
    // Password strength validation
    if (
        !(
            signpass.match(/[0-9]/) &&
            signpass.match(/[!@#$%^&*()_]/) &&
            signpass.match(/[A-Z]/) &&
            signpass.match(/[a-z]/)
        )
    ) {
        errpass.innerHTML = "please enter a strong password";
        errpass.style.color = "red";
        return false;
    }
    
    // Check if email already exists
    let existingEmail = localStorage.getItem("Email");
    if (existingEmail === signemail) {
        erremail.innerHTML = "Email already registered! Please login instead.";
        erremail.style.color = "red";
        return false;
    }
    
    // Store user data
    localStorage.setItem("Name", signname);
    localStorage.setItem("Number", signnumber);
    localStorage.setItem("Email", signemail);
    localStorage.setItem("Password", signpass);
    localStorage.setItem("Cpass", signcpass);
    
    // Initialize user stats
    let userStats = {
        totalBorrowed: 0,
        currentlyBorrowed: 0,
        favoriteGenre: "Not set",
        memberSince: new Date().toISOString()
    };
    localStorage.setItem("userStats", JSON.stringify(userStats));
    
    // Initialize empty arrays for user data
    localStorage.setItem('borrowedBooks', JSON.stringify([]));
    localStorage.setItem('borrowingHistory', JSON.stringify([]));
    
    // Show success message
    alert("Signup successful! Please login to continue.");
    
    // Redirect to login page
    location.href = "login.html";
    return false;
};

AOS.init();
