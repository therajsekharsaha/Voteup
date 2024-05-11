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


var userPoints = {};
var pointTableBody = document.getElementById("pointTableBody");

function fetchUserPoints() {
    pointTableBody.innerHTML = "<tr><td colspan='3' class='text-center'>Loading...</td></tr>"; // Show loading message

    var database = firebase.database();
    var usersRef = database.ref("users");

    usersRef.once("value")
        .then(function (snapshot) {
            if (snapshot.exists()) {
                snapshot.forEach(function (childSnapshot) {
                    var user = childSnapshot.val();
                    var uid = childSnapshot.key;
                    var points = user.points || 0;
                    userPoints[uid] = { points: points, username: user.username };
                });

                populatePointTable();
            } else {
                pointTableBody.innerHTML = "<tr><td colspan='3' class='text-center'>No data found.</td></tr>";
            }
        })
        .catch(function (error) {
            console.log(error);
            pointTableBody.innerHTML = "<tr><td colspan='3' class='text-center'>Error fetching data.</td></tr>";
        });
}

var prevTopUser = null; // Variable to track previous top user

function populatePointTable() {
    pointTableBody.innerHTML = ""; // Clear existing content

    var sortedUsers = Object.keys(userPoints).sort(function (a, b) {
        return userPoints[b].points - userPoints[a].points;
    });

    sortedUsers.forEach(function (uid, index) {
        var userData = userPoints[uid];
        var rank = index + 1;

        var row = document.createElement("tr");
        var rankCell = document.createElement("td");
        var usernameCell = document.createElement("td");
        var pointsCell = document.createElement("td");

        rankCell.textContent = rank;
        usernameCell.textContent = userData.username;
        pointsCell.textContent = userData.points;

        row.appendChild(rankCell);
        row.appendChild(usernameCell);
        row.appendChild(pointsCell);

        if (index === 0) {
            row.style.backgroundColor = "#176B87"; // Set solid color for top user
            row.style.color = "white"; // Set white text color for top user
            row.style.fontWeight = "bolder"; // Set white text color for top user

            if (prevTopUser !== userData.username) {
                row.classList.add("blink"); // Apply blink effect if the user is new top
            }
            
            // Continuously add the blink class to the top user
            if (prevTopUser === userData.username && !row.classList.contains("blink")) {
                row.classList.add("blink");
            }

            prevTopUser = userData.username; // Update the previous top user
        } else {
            row.style.backgroundColor = "transparent"; // Reset background color for other rows
            row.style.color = "black"; // Set black text color for other rows
            row.classList.remove("blink"); // Remove blink effect for non-top users
        }

        pointTableBody.appendChild(row);
    });
}






// Listen for changes to user points in the database
function listenForPointChanges() {
    var database = firebase.database();
    var usersRef = database.ref("users");

    usersRef.on("child_changed", function (snapshot) {
        var uid = snapshot.key;
        var user = snapshot.val();
        var points = user.points || 0;
        userPoints[uid].points = points;
        populatePointTable();
    });
}

// Fetch initial user points and populate point table when the page loads
window.onload = function () {
    fetchUserPoints();
    listenForPointChanges();

   
};


