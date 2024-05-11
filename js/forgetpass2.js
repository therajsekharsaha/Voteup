import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";

// Firebase configuration
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
const auth = getAuth(app);

const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const feedbackElement = document.getElementById('feedback');

forgotPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;

    try {
        // Send a password reset email to the user's email address
        await sendPasswordResetEmail(auth, email);

        feedbackElement.textContent = "Password reset email sent. Check your inbox.";
        feedbackElement.style.color = "green";
        clearForm();
    } catch (error) {
        feedbackElement.textContent = "Error sending password reset email. Please check your email address.";
        feedbackElement.style.color = "red";
        console.error("Error sending password reset email:", error);
    }
});

function clearForm() {
    document.getElementById('email').value = '';
}
