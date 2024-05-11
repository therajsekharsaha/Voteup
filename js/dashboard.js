// Your Firebase configuration here
const firebaseConfig = {
    apiKey: "AIzaSyDc0LPuRl1K6W6rBeZU_kOVsiPGDof4Gkg",
    authDomain: "best-8c0e6.firebaseapp.com",
    projectId: "best-8c0e6",
    storageBucket: "best-8c0e6.appspot.com",
    messagingSenderId: "765419235049",
    appId: "1:765419235049:web:00e0863554e4d85f60f278",
    measurementId: "G-TKRDTR487L"
};

// checkProfile.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
import { getDatabase , ref ,get} from "https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js";

// Import your Firebase configuration from the firebase-config module
// import { firebaseConfig } from ".https://www.gstatic.com/firebasejs/10.3.0/firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

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
// Check if the user is authenticated
onAuthStateChanged(auth, (user) => {
    if (user) {
        hideLoading();
        // User is authenticated, get their UID (user ID)
        const userId = user.uid;

        // Reference to the user's data in the Realtime Database
        const userRef = ref(database, `users/${userId}`);

        // Fetch the user data from the Realtime Database
        get(userRef)
            .then((snapshot) => {
                const userData = snapshot.val();

                if (!userData || !userData.profilePhotoURL) {
                    // Profile photo is not found, redirect to complete_profile.html
                    window.location.href = "complete_profile.html";
                } else {
                    // Profile photo exists, continue with your application logic
                }
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
                // Handle the error as needed
            });
    } else {
        hideLoading();
        // User is not authenticated, handle as needed (e.g., redirect to login)
        window.location.href = "login.html";
    }
});
