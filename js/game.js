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

// Define a function to show the loading element.
function showLoading() {
    var loadingElement = document.getElementById("loading");
    loadingElement.style.display = "block";
}



// Your Firebase configuration and initialization code

// ... Your Firebase configuration and initialization code ...

var imageArray = [];
var imageContainer = document.getElementById("imageContainer");
var userPoints = {};
var database = firebase.database();
var usersRef = database.ref("users");
var skipButton = document.getElementById("skipButton");

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

function fetchPhotos() {
    showLoading(); // Show loading element
    usersRef.once("value")
        .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var user = childSnapshot.val();
                var profileImageUrl = user.profilePhotoURL;
                var username = user.username;
                var uid = childSnapshot.key;
                if (uid !== firebase.auth().currentUser.uid) { // Exclude current user's photo
                    imageArray.push({ profileImageUrl, username, uid });
                }
            });

            if (imageArray.length >= 2) {
                displayRandomPhotos();
            } else {
                imageContainer.textContent = "Not enough photos available for voting.";
            }

            hideLoading(); // Hide loading element after fetching images
        })
        .catch(function (error) {
            hideLoading(); // Hide loading element in case of an error
            console.log(error);
        });
}

function displayRandomPhotos() {
    imageContainer.innerHTML = "";

    var randomIndex1 = Math.floor(Math.random() * imageArray.length);
    var randomIndex2 = Math.floor(Math.random() * imageArray.length);

    while (randomIndex2 === randomIndex1) {
        randomIndex2 = Math.floor(Math.random() * imageArray.length);
    }

    var photo1 = imageArray[randomIndex1];
    var photo2 = imageArray[randomIndex2];

    var card1 = createCard(photo1.profileImageUrl, photo1.username, photo1.uid);
    var card2 = createCard(photo2.profileImageUrl, photo2.username, photo2.uid);

    imageContainer.appendChild(card1);
    addVsText();
    imageContainer.appendChild(card2);
}

function createCard(imageUrl, username, uid) {
    var card = document.createElement("div");
    card.className = "card m-2";
    card.style.width = "300px";

    var img = document.createElement("img");
    img.src = imageUrl;
    img.className = "card-img-top clickable-image";
    img.style.height = "250px";

    var cardBody = document.createElement("div");
    cardBody.className = "card-body";

    var usernameElement = document.createElement("p");
    usernameElement.className = "card-text text-center fw-bolder";
    usernameElement.textContent = username;

    cardBody.appendChild(usernameElement);
    card.appendChild(img);
    card.appendChild(cardBody);

    var pointsElement = document.createElement("p");
    pointsElement.className = "card-points text-center text-success";
    pointsElement.textContent = "Points: " + (userPoints[uid] || 0);

    cardBody.appendChild(usernameElement);
    cardBody.appendChild(pointsElement);

    img.addEventListener("click", function () {
        handleImageClick(uid);
    });

    return card;
}

function addVsText() {
    var vsText = document.createElement("p");
    vsText.className = "text-center my-4 mx-3";
    vsText.textContent = "OR";

    imageContainer.appendChild(vsText);
}

function handleImageClick(uid) {
    if (!userPoints[uid]) {
        userPoints[uid] = 0;
    }

    userPoints[uid]++;

    usersRef.child(uid).update({ points: userPoints[uid] });

    updatePointsUI(uid);

    displayRandomPhotos();
}

function fetchUserPoints() {
    usersRef.once("value")
        .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var uid = childSnapshot.key;
                var points = childSnapshot.val().points || 0;
                userPoints[uid] = points;
                updatePointsUI(uid);
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}

function updatePointsUI(uid) {
    var points = userPoints[uid] || 0;

    var card = document.querySelector(`[data-uid="${uid}"]`);
    if (card) {
        var pointsElement = card.querySelector(".card-points");
        if (pointsElement) {
            pointsElement.textContent = "Points: " + points;
        }
    }
}

window.onload = function () {
    fetchPhotos();
    fetchUserPoints();
};
// Get references to elements

skipButton.addEventListener("click", function () {
    displayRandomPhotos();
});


// Get references to elements

skipButton.addEventListener("click", function () {
    displayRandomPhotos();
});


