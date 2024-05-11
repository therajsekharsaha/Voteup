// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-storage.js";
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

const editProfileForm = document.getElementById('editProfileForm');

onAuthStateChanged(auth, (user) => {
    if (user) {
        const userRef = ref(database, "users/" + user.uid);
        const updateProfileButton = document.getElementById("edit_profile");

        // Retrieve existing user data from the Realtime Database
        get(userRef).then((snapshot) => {
            const existingData = snapshot.val() || {};

            // ... (previous code)

            editProfileForm.addEventListener('submit', async (e) => {
                e.preventDefault();

                // Disable the update profile button and show loading state
                updateProfileButton.disabled = true;
                updateProfileButton.innerHTML = "Updating...";

                const newGender = document.getElementById('gender').value;
                const newBio = document.getElementById('bio').value;
                const newAddress = document.getElementById('address').value;
                const newDOB = document.getElementById('dob').value;
                const newSocialLink = document.getElementById('socialLink').value;

                // Merge the new data with the existing data
                const newData = {
                    ...existingData,
                    gender: newGender || existingData.gender,
                    bio: newBio || existingData.bio,
                    address: newAddress || existingData.address,
                    dob: newDOB || existingData.dob,
                    socialLink: newSocialLink || existingData.socialLink,
                };

                // Handle profile photo update
                const profilePhotoInput = document.getElementById('profilePhoto');
                if (profilePhotoInput.files.length > 0) {
                    const photoFile = profilePhotoInput.files[0];

                    const storagePath = `profile_photos/${user.uid}/${photoFile.name}`;
                    const storageRefPath = storageRef(storage, storagePath);

                    // Upload the file to Firebase Storage
                    await uploadBytes(storageRefPath, photoFile);

                    // Get the download URL of the uploaded image
                    const downloadURL = await getDownloadURL(storageRefPath);

                    newData.profilePhotoURL = downloadURL;
                }

                // Update user data in the database
                await set(userRef, newData);

                // Restore the update profile button's state
                updateProfileButton.innerHTML = "Update Profile";
                updateProfileButton.disabled = false;

                // Provide feedback to the user
                const feedbackElement = document.getElementById('feedback');
                feedbackElement.textContent = 'Profile updated successfully';

                // Optional: Refresh the page or perform other actions
            });

        });
    } else {
        // User is not logged in, redirect to the login page
        window.location.href = "login.html";
    }
});