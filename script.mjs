import { db, auth, app } from "../../firebase/config.mjs";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import {
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

const form = document.querySelector(".form-container");

form.addEventListener("submit", async (ev) => {
  ev.preventDefault();
  const username = document.querySelector("#username").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const confirmPassword = document.querySelector("#confirmPassword").value;
  const data = await createUserWithEmailAndPassword(auth, email, password);
  if (data) {
    const user = data.user;
    try {
      await setDoc(doc(db, "users", user.uid), {
        name: username,
        user: user.uid,
        email,
        password,
        confirmPassword,
      });
      Swal.fire("Good job!", "Sign Up Succesfull!", "success");
      setInterval(() => {
        window.location.href = "../../index.html";
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  }
});
