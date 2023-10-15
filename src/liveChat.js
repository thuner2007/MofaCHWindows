import {
  db,
  doc,
  setDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "./firestore.js";
import { auth } from "./auth.js";
import { user } from "./main.js";

// Live chat related functions go here...

function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

document.getElementById("sendMessage").addEventListener("click", (e) => {
  const timestamp = Date.now(); // Get the current timestamp

  setDoc(doc(db, "LiveChat", makeid(10)), {
    username: user.email,
    message: document.getElementById("messageInput").value,
    timestamp: timestamp, // Set the timestamp in the document
  });

  document.getElementById("messageInput").value = "";
});

onSnapshot(
  query(collection(db, "LiveChat"), orderBy("timestamp")),
  (querySnapshot) => {
    const liveChatContainer = document.getElementById("LiveChatMessages");

    // Clear any existing content in the container
    liveChatContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const message = data.message;
      const username = data.username;
      const timestamp = data.timestamp;

      // Create a new <p> element for each message
      const newPTag = document.createElement("p");
      newPTag.textContent = username + ": " + message;

      // Append the <p> element to the container
      liveChatContainer.appendChild(newPTag);
    });
  }
);
