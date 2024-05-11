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
// Reference to the users in the Realtime Database
var usersRef = firebase.database().ref("users");

// Function to display user images
function displayUserImages() {
    hideLoading();
    var imageContainer = document.getElementById("imageContainer");
    imageContainer.innerHTML = ""; // Clear any existing content

    usersRef.once("value")
        .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var user = childSnapshot.val();
                var profileImageUrl = user.profilePhotoURL; // Use the correct property name
                var email = user.email;
                var bio = user.bio;
                var address = user.address;
                var dob = user.dob;
                var points = user.points;
                var sociallink = user.socialLink;
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

                // Add a click event listener to the "View" button
                addButton.addEventListener("click", function () {
                    // Create a Bootstrap modal
                    var modal = document.createElement("div");
                    modal.className = "modal fade";
                    modal.innerHTML = `
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">${username}'s Profile</h5>
                                <button type="button" class="btn-close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body">
                                <img src="${profileImageUrl}" class="img-thumbnail" style="width: 100px; height: 100px;"><br>
                                <br>
                                <p>${bio}</p>
                                <p>points : ${points}</p>
                                <p>Date of birth : ${dob}</p>
                                <p>Address : ${address}</p>
                                <p>Contact me : <a href="${sociallink}">click here</a></p>
                                
                            </div>
                        </div>
                    </div>
                    `;

                    // Append the modal to the body
                    document.body.appendChild(modal);

                    // Show the modal
                    $(modal).modal("show");

                    // Add a click event listener to the modal close button
                    modal.querySelector('.btn-close').addEventListener("click", function () {
                        // Close the modal
                        $(modal).modal("hide");
                        // Remove the modal from the DOM after it's hidden
                        modal.addEventListener('hidden.bs.modal', function () {
                            modal.remove();
                        });
                    });
                });

                card.appendChild(cardBody);
                imageContainer.appendChild(card);
            });
        })
        .catch(function (error) {
            hideLoading();
            console.log(error);
        });
}

// Function to filter users by username
function filterUsersByUsername(query) {
    hideLoading();
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
            hideLoading();
            console.log(error);
        });
}

// Function to display filtered users
function displayFilteredUsers(users) {
    hideLoading();
    var imageContainer = document.getElementById("imageContainer");
    imageContainer.innerHTML = ""; // Clear any existing content

    users.forEach(function (user) {
        var profileImageUrl = user.profilePhotoURL;
        var username = user.username;
        var email = user.email;
        var bio = user.bio;
        var address = user.address;
        var dob = user.dob;
        var points = user.points;
        var sociallink = user.socialLink;
        var username = user.username;

        // Create Bootstrap cards for filtered users (similar to your existing code)
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
        addButton.className = "btn btn-primary btn-sm ms-auto mx-end col-lg-1 col-md-1 col-2 rounded-circle me-2 fa fa-eye view";
        addButton.style.width = "50px";
        addButton.style.height = "50px";
        cardBody.appendChild(addButton);


        // Add a click event listener to the "View" button
        addButton.addEventListener("click", function () {
            // Create a Bootstrap modal
            var modal = document.createElement("div");
            modal.className = "modal fade";
            modal.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${username}'s Profile</h5>
                        <button type="button" class="btn-close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <img src="${profileImageUrl}" class="img-thumbnail" style="width: 100px; height: 100px;"><br>
                        <br>
                        <p>${bio}</p>
                        <p>points : ${points}</p>
                        <p>Date of birth : ${dob}</p>
                        <p>Address : ${address}</p>
                        <p>Contact me : <a href="${sociallink}">click here</a></p>
                        
                    </div>
                </div>
            </div>
            `;

            // Append the modal to the body
            document.body.appendChild(modal);

            // Show the modal
            $(modal).modal("show");

            // Add a click event listener to the modal close button
            modal.querySelector('.btn-close').addEventListener("click", function () {
                // Close the modal
                $(modal).modal("hide");
                // Remove the modal from the DOM after it's hidden
                modal.addEventListener('hidden.bs.modal', function () {
                    modal.remove();
                });
            });
        });

        addButton.addEventListener

        card.appendChild(cardBody);
        imageContainer.appendChild(card);

    });
}



// Call the function to display all user images when the page loads
window.onload = displayUserImages;

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

// ...






// ...