import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
import { app } from "./firebaseConfig.js";

const db = getFirestore(app);

export { db, doc, setDoc, getDoc, collection, onSnapshot, query, orderBy };
