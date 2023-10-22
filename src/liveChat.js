import {
  db,
  doc,
  setDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "./firestore.js";
import { user } from "./main.js";

let loggedIn = false;

// Live chat related functions go here...

document.getElementById("liveChatBtn").addEventListener("click", (e) => {
  loggedIn = true;
  onSnapshot(
    query(collection(db, "LiveChat"), orderBy("timestamp")),
    (querySnapshot) => {
      const LiveChatHolder = document.getElementById("LiveChatHolder");

      // Clear any existing content in the container
      LiveChatHolder.innerHTML = "";

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const message = data.message;
        const username = data.username;
        const timestamp = data.timestamp;
        const email = data.email;

        //Create new div for each message
        const newDiv = document.createElement("div");
        if (email === user.email) {
          newDiv.classList.add("myText");
          LiveChatHolder.appendChild(newDiv);
        } else {
          newDiv.classList.add("othersText");
          LiveChatHolder.appendChild(newDiv);
        }

        // Create a new <p> element for each message
        const newPTag = document.createElement("p");
        newPTag.textContent = username + ": " + message;
        newPTag.classList.add("message");
        newDiv.appendChild(newPTag);

        const date = new Date(timestamp);

        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Month is 0-indexed, so add 1
        const day = date.getDate();

        const formattedDate = `${year}-${month
          .toString()
          .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

        const timestampText = document.createElement("p");
        timestampText.textContent = formattedDate;
        if (email === user.email) {
          timestampText.classList.add("timestamp");
        } else {
          timestampText.classList.add("timestamp");
        }

        newDiv.appendChild(timestampText);

        LiveChatHolder.scrollTop = LiveChatHolder.scrollHeight;
      });
    }
  );
});

document.getElementById("logoutProfile").addEventListener("click", (e) => {
  loggedIn = false;
});

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
    email: user.email,
    message: document.getElementById("messageInput").value,
    timestamp: timestamp, // Set the timestamp in the document
  });

  document.getElementById("messageInput").value = "";
});
