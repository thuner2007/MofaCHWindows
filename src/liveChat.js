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
      const LiveChatMessagesLeft = document.getElementById(
        "LiveChatMessagesLeft"
      );
      const LiveChatMessagesRight = document.getElementById(
        "LiveChatMessagesRight"
      );

      // Clear any existing content in the container
      LiveChatMessagesLeft.innerHTML = "";
      LiveChatMessagesRight.innerHTML = "";

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const message = data.message;
        const username = data.username;
        const timestamp = data.timestamp;
        const email = data.email;

        // Create a new <p> element for each message
        const newPTag = document.createElement("p");
        newPTag.textContent = username + ": " + message;
        if (email === user.email) {
          newPTag.classList.add("myText");
          LiveChatMessagesRight.appendChild(newPTag);
        } else {
          newPTag.classList.add("othersText");
          LiveChatMessagesLeft.appendChild(newPTag);
        }

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
          timestampText.classList.add("timestampright");
        } else {
          timestampText.classList.add("timestampleft");
        }

        newPTag.appendChild(timestampText);

        const divElement = document.getElementById("LiveChatMessagesLeft");
        divElement.scrollTop = divElement.scrollHeight;
        const divElement2 = document.getElementById("LiveChatMessagesRight");
        divElement2.scrollTop = divElement2.scrollHeight;
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
