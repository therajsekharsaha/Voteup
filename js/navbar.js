// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";

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

//logo
document.getElementById('logo').addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = "dashboard.html";
});

//home
document.getElementById('home').addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = "dashboard.html";
});

//users
document.getElementById('users').addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = "users.html";
});

//game
document.getElementById('game').addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = "game.html";
});

//game
document.getElementById('point_table').addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = "point_table.html";
});

//profile
document.getElementById('profile').addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = "profile.html";
});

//forgetpass
document.getElementById('forgetpass').addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = "forgetpass.html";
});

//feedback
document.getElementById('feedback').addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = "feedback.html";
});

//share
document.getElementById('share').addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = "share.html";
});

//about
document.getElementById('d_info').addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = "d_info.html";
});

// Logout function
document.getElementById('logout').addEventListener('click', function (event) {
    event.preventDefault();

    const confirmation = confirm("Are you sure you want to logout?");

    if (confirmation) {
        signOut(auth)
            .then(() => {
                // Sign-out successful
                console.log("Logged out successfully");
                // Redirect to login.html or perform other actions
                window.location.href = "login.html";
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert("Logout failed. " + errorMessage);
            });
    }
});

//block previous page
function blockPreviousPage() {
    history.pushState(null, null, location.href);
    window.onpopstate = function (event) {
        history.go(1);
    };
}
blockPreviousPage();