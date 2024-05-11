import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getAuth, onAuthStateChanged, updateEmail } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
import { getDatabase, ref, get, update } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-storage.js";

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

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase();
const storage = getStorage();

document.addEventListener('DOMContentLoaded', function () {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const userRef = ref(database, "users/" + user.uid);
            const updateProfileButton = document.getElementById("edit_profile");
            const clearImageButton = document.getElementById("clear_image");

            // Function to fetch user data from the Realtime Database
            const fetchUserData = async () => {
                const snapshot = await get(userRef);
                return snapshot.val() || {};
            };

            // Function to clear the image input field
            const clearImageInput = () => {
                const profilePhotoInput = document.getElementById('profilePhoto');
                profilePhotoInput.value = ''; // Clear the selected file
            };

            // Populate the form with existing user data
            const populateForm = async () => {
                const existingData = await fetchUserData();
                document.getElementById('username').value = existingData.username || '';
                document.getElementById('email').value = existingData.email || '';
                document.getElementById('gender').value = existingData.gender || '';
                document.getElementById('bio').value = existingData.bio || '';
                document.getElementById('address').value = existingData.address || '';
                document.getElementById('dob').value = existingData.dob || '';
                document.getElementById('socialLink').value = existingData.socialLink || '';
            };

            populateForm();

            updateProfileButton.addEventListener('click', async () => {
                // Disable the update profile button and show loading state
                updateProfileButton.disabled = true;
                updateProfileButton.textContent = "Updating...";

                const newUsername = document.getElementById('username').value;
                const newEmail = document.getElementById('email').value;
                const newGender = document.getElementById('gender').value;
                const newBio = document.getElementById('bio').value;
                const newAddress = document.getElementById('address').value;
                const newDOB = document.getElementById('dob').value;
                const newSocialLink = document.getElementById('socialLink').value;

                // Fetch the existing user data
                const existingData = await fetchUserData();

                // Prepare the data to be updated, only updating fields that have new values
                const newData = {
                    username: newUsername || existingData.username || '',
                    email: newEmail || existingData.email || '',
                    gender: newGender || existingData.gender || '',
                    bio: newBio || existingData.bio || '',
                    address: newAddress || existingData.address || '',
                    dob: newDOB || existingData.dob || '',
                    socialLink: newSocialLink || existingData.socialLink || '',
                };


                // Update user's email in authentication
                try {
                    await updateEmail(user, newEmail);
                } catch (error) {
                    console.error(error);
                    // Handle email update errors
                }

                // Handle profile photo update
                const profilePhotoInput = document.getElementById('profilePhoto');
                if (profilePhotoInput.files.length > 0) {
                    const photoFile = profilePhotoInput.files[0];

                    const storagePath = `profile_photos/${user.uid}/${photoFile.name}`;
                    const storageRefPath = storageRef(storage, storagePath);

                    try {
                        // Upload the file to Firebase Storage
                        await uploadBytes(storageRefPath, photoFile);

                        // Get the download URL of the uploaded image
                        const downloadURL = await getDownloadURL(storageRefPath);

                        // Update the user's profile with the download URL
                        await update(userRef, { profilePhotoURL: downloadURL });

                        // Clear the image input field
                        clearImageInput();

                        // Provide feedback to the user
                        updateProfileButton.disabled = false;
                        updateProfileButton.textContent = "Save";

                        const feedbackElement = document.getElementById('feedback');
                        feedbackElement.textContent = 'Profile photo updated successfully';
                        
                    } catch (error) {
                        // Handle errors, such as network issues or storage permission issues
                        updateProfileButton.disabled = false;
                        updateProfileButton.textContent = "Update profile";
                        console.error("Error uploading image:", error);
                        // Provide feedback to the user about the error
                    }
                } else {
                    // Continue with updating other profile fields and saving to the Realtime Database
                    await update(userRef, newData);

                    // Provide feedback to the user

                    updateProfileButton.disabled = false;
                    updateProfileButton.textContent = "Save";

                    const feedbackElement = document.getElementById('feedback');
                    feedbackElement.textContent = 'Profile updated successfully';
                    window.location.href = "profile.html";
                }
            });

        } else {
            // User is not logged in, handle as needed
        }
    });
});

// Define a function to clear all text fields
function clearAllFields() {
    const inputFields = document.querySelectorAll('input[type="text"], input[type="email"], input[type="file"], input[type="url"], input[type="date"],  textarea');
    inputFields.forEach((field) => {
        field.value = '';
    });
    const genderSelect = document.getElementById('gender');
    genderSelect.selectedIndex = 0;
}

// Attach a click event listener to a "Clear All" button or element
const clearAllButton = document.getElementById('clearAllButton'); // Replace with the actual ID of your clear button

if (clearAllButton) {
    clearAllButton.addEventListener('click', () => {
        clearAllFields();
    });
}