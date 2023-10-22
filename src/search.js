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

document.getElementById("searchButton").addEventListener("click", async (e) => {
  const searchInput = document.getElementById("searchInput");

  const collectionRef = collection(db, "Users");

  const fieldName = "username"; // Replace with your actual field name
  const fieldValue = searchInput.value; // Replace with the value you're looking for

  const q = query(collectionRef, where(fieldName, "==", fieldValue));

  try {
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No matching documents.");
      return;
    }

    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
  } catch (err) {
    console.error("Error getting documents", err);
  }
});
