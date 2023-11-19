import {
  db,
  doc,
  setDoc,
  getDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  getDocs, // Add this import for the "getDocs" function
} from "./firestore.js";

const searchedUserpanel = document.getElementById("searchedUserpanel");
const searchedUserButton = document.getElementById("searchedUserButton");

document.addEventListener("DOMContentLoaded", function () {
  // Your code here will run only after the DOM is fully loaded.
  // You can put your script here.
  searchedUserpanel.style.display = "none";
  searchedUserButton.style.display = "none";
});

let data;

document.getElementById("searchButton").addEventListener("click", async (e) => {
  search();
});

document
  .getElementById("searchInput")
  .addEventListener("keydown", function (event) {});

document
  .getElementById("searchForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission
    search(); // Call your custom function
  });

function myEventHandler() {
  //eventhandler when clicked on searched user
  const searchedUsername = document.getElementById("searchedUsername");
  const searchedUserFirstname = document.getElementById(
    "searchedUserFirstname"
  );

  console.log(data);
  searchedUserpanel.style.display = "block";
  searchedUsername.innerHTML = data.username;
  searchedUserFirstname.innerHTML = data.firstname;
}

const searchedUserPanelBack = document.getElementById("searchedUserPanelBack");
searchedUserPanelBack.addEventListener("click", (e) => {
  searchedUserpanel.style.display = "none";
});

searchedUserButton.addEventListener("click", (e) => {
  myEventHandler();
});

async function search() {
  const searchInput = document.getElementById("searchInput");

  const searchedUserButton = document.getElementById("searchedUserButton");
  const searchP = document.getElementById("searchP");

  const collectionRef = collection(db, "Users");

  const fieldName = "username"; // Replace with your actual field name
  const fieldValue = searchInput.value; // Replace with the value you're looking for

  const q = query(collectionRef, where(fieldName, "==", fieldValue));

  try {
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No matching documents.");
      searchP.style.display = "block";
      searchP.innerHTML = "Keine Ergebnisse!";
      searchedUserButton.style.display = "none";
      return;
    }

    querySnapshot.forEach((doc) => {
      // console.log(doc.id, "=>", doc.data());
      data = doc.data();
      searchP.style.display = "none";
      searchedUserButton.style.display = "block";
      searchedUserButton.innerHTML = data.username;
    });
  } catch (err) {
    console.error("Error getting documents", err);
  }
}
