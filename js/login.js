// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDc0LPuRl1K6W6rBeZU_kOVsiPGDof4Gkg",
    authDomain: "best-8c0e6.firebaseapp.com",
    projectId: "best-8c0e6",
    storageBucket: "best-8c0e6.appspot.com",
    messagingSenderId: "765419235049",
    appId: "1:765419235049:web:00e0863554e4d85f60f278",
    measurementId: "G-TKRDTR487L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

// Define a function to show the loading element.
function showLoading() {
    var loadingElement = document.getElementById("loading");
    loadingElement.style.display = "block";
}

// Define a function to hide the loading element.
function hideLoading() {
    var loadingElement = document.getElementById("loading");
    loadingElement.style.display = "none";
}

showLoading();

// Function to check if the user is logged in
function checkLoginStatus() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is logged in
            hideLoading();
            window.location.href = "dashboard.html";
            // Redirect to dashboard.html or perform actions accordingly
        } else {
            hideLoading();
            // User is not logged in
            console.log("User is not logged in");
            // You might want to show a login form or perform other actions
        }
    });
}

// Call the function when the page loads
window.onload = function () {
    checkLoginStatus();
};

// Login function
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    var email = document.getElementById("login-email").value;
    var pass = document.getElementById("login-password").value;

    //disable button
    const submitButton = document.getElementById("submit");
    submitButton.disabled = true;
    submitButton.innerHTML = "Loading...";

    signInWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            alert("Login successful");

            // Clear input fields
            document.getElementById("login-email").value = "";
            document.getElementById("login-password").value = "";

            // Restore the submit button's state
            submitButton.innerHTML = "Register";
            submitButton.disabled = false;

            // Redirect to the dashboard page
            window.location.href = "dashboard.html";
        })
        .catch((error) => {

            // Restore the submit button's state
            submitButton.innerHTML = "Login";
            submitButton.disabled = false;
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
});
