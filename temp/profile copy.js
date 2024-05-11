// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js";
import { getStorage, ref as storageRef, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-storage.js";
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
const auth = getAuth();
const database = getDatabase();
const storage = getStorage();

const profileContainer = document.getElementById("profileContainer");
const profilePhotoElement = document.getElementById("profilePhoto");
const profileUsernameElement = document.getElementById("profileUsername");
const profileEmailElement = document.getElementById("profileEmail");
const editProfileButton = document.getElementById("edit_profile");

onAuthStateChanged(auth, async (user) => {
    if (user) {
        // Fetch user data from the Realtime Database using their UID
        const userRef = ref(database, "users/" + user.uid);
        const snapshot = await get(userRef);

        const userData = snapshot.val();
        if (userData) {
            // Display the username, email, and profile photo in the profile
            profileUsernameElement.value = userData.username || "N/A";
            profileEmailElement.value = user.email || "N/A"; // Use value instead of textContent

            // profileUsernameElement.textContent = userData.username || "N/A";
            // profileEmailElement.textContent = user.email || "N/A";

            if (userData.profilePhotoURL) {
                // Get the download URL of the profile photo from Storage
                profilePhotoElement.src = userData.profilePhotoURL;
            } else {
                profilePhotoElement.src = "./res/default-profile-photo.png"; // Replace with your default image
            }

            profileContainer.style.display = "block";
        } else {
            // Handle the case where user data is not available
            profileUsernameElement.textContent = "Username not found";
            profileEmailElement.textContent = "Email not found";
            profilePhotoElement.src = "./res/default-profile-photo.png"; // Replace with your default image
            profileContainer.style.display = "block";
        }
    } else {
        // Redirect to login page if user is not authenticated
        window.location.href = "login.html";
    }
});

// Edit Profile button click event

editProfileButton.addEventListener('click', function (event) {
    event.preventDefault();
    // Redirect to the edit profile page
    window.location.href = "edit_profile.html";
});