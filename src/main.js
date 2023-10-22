import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "./auth.js";
import {
  db,
  doc,
  setDoc,
  getDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "./firestore.js";

// The rest of your main script goes here...

let user;
//on start
document.getElementById("settingsPanel").style.display = "none";
document.getElementById("profilePanel").style.display = "none";
checkIfLoggedIn();

function checkIfLoggedIn() {
  if (!user) {
    document.getElementById("registerBTN").style.display = "none";
    document.getElementById("loginBTN").style.display = "block";
    document.getElementById("changeToRegister").style.display = "block";
    document.getElementById("changeToLogin").style.display = "none";
    document.getElementById("settingsPanel").style.display = "none";
    document.getElementById("profilePanel").style.display = "none";
    document.getElementById("searchPanel").style.display = "none";
    document.getElementById("loginPanel").style.display = "block";
    document.getElementById("LiveChat").style.display = "none";

    document.getElementById("mainPanel").style.display = "none";
  } else {
    document.getElementById("registerBTN").style.display = "none";
    document.getElementById("loginBTN").style.display = "none";
    document.getElementById("changeToRegister").style.display = "none";
    document.getElementById("changeToLogin").style.display = "none";
    document.getElementById("LiveChat").style.display = "none";

    document.getElementById("mainPanel").style.display = "block";
  }
}

liveChatBtn.addEventListener("click", (e) => {
  document.getElementById("LiveChat").style.display = "block";
  document.getElementById("settingsPanel").style.display = "none";
  document.getElementById("profilePanel").style.display = "none";
  document.getElementById("searchPanel").style.display = "none";
});

//when changeToRegister button clicked, show register button and inputs
changeToRegister.addEventListener("click", (e) => {
  document.getElementById("registerBTN").style.display = "block";
  document.getElementById("loginBTN").style.display = "none";
  document.getElementById("changeToRegister").style.display = "none";
  document.getElementById("changeToLogin").style.display = "block";
});
//when changeToLogin button clicked, show login button and inputs
changeToLogin.addEventListener("click", (e) => {
  document.getElementById("registerBTN").style.display = "none";
  document.getElementById("loginBTN").style.display = "block";
  document.getElementById("changeToRegister").style.display = "block";
  document.getElementById("changeToLogin").style.display = "none";
});

registerBTN.addEventListener("click", (e) => {
  let email = document.getElementById("emailInput").value;
  let password = document.getElementById("passwordInput").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      user = userCredential.user;
      document.getElementById("loginPanel").style.display = "none";
      document.getElementById("mainPanel").style.display = "block";

      //clear input fields
      document.getElementById("emailInput").value = "";
      document.getElementById("passwordInput").value = "";

      setDoc(doc(db, "Users", user.email), {
        Email: user.email,
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
});

loginBTN.addEventListener("click", (e) => {
  let email = document.getElementById("emailInput").value;
  let password = document.getElementById("passwordInput").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      user = userCredential.user;
      document.getElementById("loginPanel").style.display = "none";
      document.getElementById("mainPanel").style.display = "block";

      //clear input fields
      document.getElementById("emailInput").value = "";
      document.getElementById("passwordInput").value = "";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
});

saveProfileBtn.addEventListener("click", (e) => {
  setDoc(doc(db, "Users", user.email), {
    Email: user.email,
    username: document.getElementById("userNameInput").value,
    firstname: document.getElementById("firstnameInput").value,
    secondname: document.getElementById("secondnameInput").value,
    biography: document.getElementById("biographyInput").value,
  });
});

logoutProfile.addEventListener("click", (e) => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("signed out!");
      user = null;
      checkIfLoggedIn();
    })
    .catch((error) => {
      // An error happened.
      console.log("error while logout!: " + error);
    });
});

document.getElementById("settingsBtn").addEventListener("click", () => {
  //open settings panel
  document.getElementById("settingsPanel").style.display = "block";
  document.getElementById("profilePanel").style.display = "none";
  document.getElementById("LiveChat").style.display = "none";
  document.getElementById("searchPanel").style.display = "none";
});

document.getElementById("searchBtn").addEventListener("click", () => {
  //open settings panel
  document.getElementById("settingsPanel").style.display = "none";
  document.getElementById("profilePanel").style.display = "none";
  document.getElementById("LiveChat").style.display = "none";
  document.getElementById("searchPanel").style.display = "block";
});

document.getElementById("profileBtn").addEventListener("click", () => {
  // open profile panel
  document.getElementById("profilePanel").style.display = "block";
  document.getElementById("settingsPanel").style.display = "none";
  document.getElementById("LiveChat").style.display = "none";
  document.getElementById("searchPanel").style.display = "none";

  // get profile data
  getDoc(doc(db, "Users", user.email)).then((docSnapshot) => {
    if (docSnapshot.exists()) {
      const data = docSnapshot.data();

      // Set the input values
      document.getElementById("userNameInput").value = data.username;
      document.getElementById("firstnameInput").value = data.firstname;
      document.getElementById("secondnameInput").value = data.secondname;
      document.getElementById("biographyInput").value = data.biography;
    }
  });
});

document.getElementById("settingsBack").addEventListener("click", () => {
  //open settings panel
  document.getElementById("settingsPanel").style.display = "none";
});

document.getElementById("profileBack").addEventListener("click", () => {
  //open profile panel
  document.getElementById("profilePanel").style.display = "none";
});

document.getElementById("closeBtn").addEventListener("click", () => {
  // Send a message to request window closure
  window.api.send("quit");
});

export { user };
