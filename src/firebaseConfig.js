import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyCWr3sEgXv2kJbUf-fUdQPc0Fl4PgcTf1I",
  authDomain: "mofach-49f97.firebaseapp.com",
  projectId: "mofach-49f97",
  storageBucket: "mofach-49f97.appspot.com",
  messagingSenderId: "239334965682",
  appId: "1:239334965682:web:820b4e5f1158c5b7cde4ab",
  measurementId: "G-36GK6STHNE",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
