import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCJSZu_wM8-ivC5o6kWrterXfBTDt9hy6I",
  authDomain: "hackathon-164b0.firebaseapp.com",
  projectId: "hackathon-164b0",
  storageBucket: "hackathon-164b0.appspot.com",
  messagingSenderId: "584913152001",
  appId: "1:584913152001:web:12e7e2927e89fb74f0f800",
  measurementId: "G-BCM152T3MF",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
