// Initialize Firebase with your configuration
const firebaseConfig = {
  apiKey: "AIzaSyDc0LPuRl1K6W6rBeZU_kOVsiPGDof4Gkg",
  authDomain: "best-8c0e6.firebaseapp.com",
  projectId: "best-8c0e6",
  storageBucket: "best-8c0e6.appspot.com",
  messagingSenderId: "765419235049",
  appId: "1:765419235049:web:00e0863554e4d85f60f278",
  measurementId: "G-TKRDTR487L"
};
firebase.initializeApp(firebaseConfig);

// Reference to Firebase Storage and Database
const storage = firebase.storage();
const database = firebase.database();

// Function to handle form submission
function handleSubmitForm(event) {
  event.preventDefault();

  const topicName = document.getElementById("topicName").value;
  const photoUpload = document.getElementById("photoUpload").files[0];

  // Upload the photo to Firebase Storage
  const storageRef = storage.ref();
  const photoRef = storageRef.child("topic-photos/" + photoUpload.name);

  photoRef.put(photoUpload).then(function (snapshot) {
    console.log("Uploaded a file!");

    // Get the download URL of the uploaded photo
    photoRef.getDownloadURL().then(function (downloadURL) {
      // Store topic information in Firebase Database
      const topicsRef = database.ref("topics");
      const newTopicRef = topicsRef.push();

      newTopicRef.set({
        topicName: topicName,
        photoURL: downloadURL
      }).then(function () {
        console.log("Topic information stored in the database!");
        // You can trigger the voting game or perform any other action here
      }).catch(function (error) {
        console.error("Error storing topic information:", error);
      });
    }).catch(function (error) {
      console.error("Error getting download URL:", error);
    });
  }).catch(function (error) {
    console.error("Error uploading file:", error);
  });

  // Close the modal
  document.getElementById("myModal").style.display = "none";
}

// JavaScript for handling modal behavior (show/hide)
var modal = document.getElementById("myModal");
var btn = document.getElementById("createTopicButton");
var closeModal = document.getElementById("closeModal");

btn.addEventListener("click", function () {
  modal.style.display = "block";
});

closeModal.addEventListener("click", function () {
  modal.style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});
