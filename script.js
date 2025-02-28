let usernameRef = document.getElementById("username");
let passwordRef = document.getElementById("password");
let loginBtn = document.querySelector("button");

// Panda Animation Elements
let eyeL = document.querySelector(".eyeball-l");
let eyeR = document.querySelector(".eyeball-r");
let handL = document.querySelector(".hand-l");
let handR = document.querySelector(".hand-r");

// Dummy credentials for admin and user (Replace with real authentication)
const credentials = {
  admin: { username: "admin", password: "password123" },
  user: { username: "user", password: "user123" }
};

// Function to check login credentials
function loginUser() {
  let enteredUsername = usernameRef.value;
  let enteredPassword = passwordRef.value;

  if (enteredUsername === credentials.admin.username && enteredPassword === credentials.admin.password) {
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("role", "admin"); // Store role
    alert("Admin Login Successful!");
    window.location.href = "admin.html"; // Redirect to admin page
  } 
  else if (enteredUsername === credentials.user.username && enteredPassword === credentials.user.password) {
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("role", "user"); // Store role
    alert("User Login Successful!");
    window.location.href = "index.html"; // Redirect to user page
  } 
  else {
    alert("Invalid username or password. Please try again.");
  }
}

// Attach event listener to login button
if (loginBtn) {
  loginBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent form submission
    loginUser();
  });
}

// Logout function (Works for both index.html & admin.html)
function logoutUser() {
  localStorage.removeItem("loggedIn"); // Remove login status
  localStorage.removeItem("role"); // Remove role
  alert("You have been logged out.");
  window.location.href = "login.html"; // Redirect to login page
}

// Redirect users if not logged in
function checkLoginStatus() {
  let isLoggedIn = localStorage.getItem("loggedIn");
  let userRole = localStorage.getItem("role");
  
  if (!isLoggedIn) {
    window.location.href = "login.html"; // Redirect to login if not logged in
  } else {
    // Redirect users/admins if they try to access the wrong page
    if (userRole === "admin" && window.location.pathname.includes("index.html")) {
      window.location.href = "admin.html";
    } else if (userRole === "user" && window.location.pathname.includes("admin.html")) {
      window.location.href = "index.html";
    }
  }
}

// Run login check on page load
window.onload = checkLoginStatus;

// ========= Panda Face Animation =========

// Normal eye position
let normalEyeStyle = () => {
  eyeL.style.cssText = `left:0.6em; top:0.6em;`;
  eyeR.style.cssText = `right:0.6em; top:0.6em;`;
};

// Normal hand position
let normalHandStyle = () => {
  handL.style.cssText = `height: 2.81em; top:8.4em; left:7.5em; transform: rotate(0deg);`;
  handR.style.cssText = `height: 2.81em; top: 8.4em; right: 7.5em; transform: rotate(0deg);`;
};

// When clicked on username input
usernameRef.addEventListener("focus", () => {
  eyeL.style.cssText = `left: 0.75em; top: 1.12em;`;
  eyeR.style.cssText = `right: 0.75em; top: 1.12em;`;
  normalHandStyle();
});

// When clicked on password input
passwordRef.addEventListener("focus", () => {
  handL.style.cssText = `height: 6.56em; top: 3.87em; left: 11.75em; transform: rotate(-155deg);`;
  handR.style.cssText = `height: 6.56em; top: 3.87em; right: 11.75em; transform: rotate(155deg);`;
  normalEyeStyle();
});

// When clicked outside username and password input
document.addEventListener("click", (e) => {
  let clickedElem = e.target;
  if (clickedElem !== usernameRef && clickedElem !== passwordRef) {
    normalEyeStyle();
    normalHandStyle();
  }
});



