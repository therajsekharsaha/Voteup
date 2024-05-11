const firebaseConfig = {
    apiKey: "AIzaSyDc0LPuRl1K6W6rBeZU_kOVsiPGDof4Gkg",
    authDomain: "best-8c0e6.firebaseapp.com",
    projectId: "best-8c0e6",
    storageBucket: "best-8c0e6.appspot.com",
    messagingSenderId: "765419235049",
    appId: "1:765419235049:web:00e0863554e4d85f60f278",
    measurementId: "G-TKRDTR487L"
};

// Initialize Firebase (include your Firebase configuration)
firebase.initializeApp(firebaseConfig);

// Reference to the users in the Realtime Database
var usersRef = firebase.database().ref("users");

// Function to display user images
function displayUserImages() {
    var imageContainer = document.getElementById("imageContainer");
    imageContainer.innerHTML = ""; // Clear any existing content

    usersRef.once("value")
        .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var user = childSnapshot.val();
                var profileImageUrl = user.profilePhotoURL; // Use the correct property name
                var username = user.username;

                // Create a Bootstrap card (similar to your existing code)
                var card = document.createElement("div");
                card.className = "card mb-2 p-2 rounded-pill";

                var cardBody = document.createElement("div");
                cardBody.className = "d-flex align-items-center";

                var userImage = document.createElement("img");
                userImage.src = profileImageUrl;
                userImage.className = "col-5 rounded-circle me-2 img-thumbnail border img-border";
                userImage.style.width = "70px";
                userImage.style.height = "70px";

                cardBody.appendChild(userImage);

                var usernameElement = document.createElement("p");
                usernameElement.className = "mb-0 col-5 text-start";
                usernameElement.textContent = username;
                usernameElement.style.fontSize = "12px";

                cardBody.appendChild(usernameElement);

                

                var addButton = document.createElement("button");
                addButton.className = "btn btn-primary btn-sm ms-auto mx-end col-lg-1 col-md-1 col-2 rounded-circle me-2 fa fa-eye";
                addButton.style.width = "50px";
                addButton.style.height = "50px";

                cardBody.appendChild(addButton);

                card.appendChild(cardBody);
                imageContainer.appendChild(card);
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}

// Function to filter users by username
function filterUsersByUsername(query) {
    query = query.toLowerCase();

    usersRef.once("value")
        .then(function (snapshot) {
            var filteredUsers = [];

            snapshot.forEach(function (childSnapshot) {
                var user = childSnapshot.val();
                var username = user.username.toLowerCase();

                if (username.includes(query)) {
                    filteredUsers.push(user);
                }
            });

            // Display filtered users
            displayFilteredUsers(filteredUsers);
        })
        .catch(function (error) {
            console.log(error);
        });
}

// Function to display filtered users
function displayFilteredUsers(users) {
    var imageContainer = document.getElementById("imageContainer");
    imageContainer.innerHTML = ""; // Clear any existing content

    users.forEach(function (user) {
        var profileImageUrl = user.profilePhotoURL;
        var username = user.username;

        // Create Bootstrap cards for filtered users (similar to your existing code)
        var card = document.createElement("div");
        card.className = "card mb-2 p-2";

        var cardBody = document.createElement("div");
        cardBody.className = "d-flex align-items-center";

        var userImage = document.createElement("img");
        userImage.src = profileImageUrl;
        userImage.className = "col-5 rounded-circle me-2 img-thumbnail border img-border";
        userImage.style.width = "70px";
        userImage.style.height = "70px";

        cardBody.appendChild(userImage);

        var usernameElement = document.createElement("p");
        usernameElement.className = "mb-0 col-5 text-start";
        usernameElement.textContent = username;

        cardBody.appendChild(usernameElement);

        var addButton = document.createElement("button");
        addButton.className = "btn btn-primary btn-sm ms-auto mx-end col-lg-1 col-md-1 col-2";
        addButton.textContent = "go";

        cardBody.appendChild(addButton);

        card.appendChild(cardBody);
        imageContainer.appendChild(card);
    });
}

// Add an event listener to the search button
var searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", function () {
    var searchInput = document.getElementById("searchInput");
    var query = searchInput.value.trim();

    if (query !== "") {
        // Filter users by username and display the results
        filterUsersByUsername(query);
    } else {
        // If the search input is empty, display all user images
        displayUserImages();
    }
});

// Call the function to display all user images when the page loads
window.onload = displayUserImages;


