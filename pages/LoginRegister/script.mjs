import { db, auth, app } from "../../firebase/config.mjs";
import { createUserWithEmailAndPassword , signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import {
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
document.getElementById("signup").addEventListener("click", () => {
  document.querySelector(".login-container").style.display = "none"
  document.querySelector(".signUp-container").style.display = "flex"
})
document.querySelector(".login-s").addEventListener("click", () => {
  document.querySelector(".login-container").style.display = "flex"
  document.querySelector(".signUp-container").style.display = "none"
}
)


const form = document.querySelector(".signup");

form.addEventListener("submit", async (ev) => {
  ev.preventDefault();
  const username = document.querySelector("#username").value;
  const email = document.querySelector("#signUpEmail").value;
  const password = document.querySelector("#signUpPassword").value;
  const confirmPassword = document.querySelector("#ConfirmPassword").value;
  if (password != confirmPassword) {
    Swal.fire("Please Match Password", "Error", "error")
  }
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
const loginForm = document.querySelector(".login");

loginForm.addEventListener("submit", async (ev) => {
  ev.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const data = await signInWithEmailAndPassword(auth, email, password);
  if (data) {
    Swal.fire("Good job!", "Sign Up Succesfull!", "success").then(() => {
      window.location.href = "../../index.html"
    })
  }
});
