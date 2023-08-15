import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getDoc, doc, getDocs, collection } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getDownloadURL, ref } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import { db, auth, storage } from "../firebase/config.mjs";

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    document.getElementById("username").innerHTML = docSnap.data().name;
    document.getElementById("username").href = "#"
  } else {
  }
});

const getData = async () => {
  const querySnapshot = await getDocs(collection(db, "product"));
  document.querySelector('.product-section').innerHTML = ""
  querySnapshot.forEach((doc) => {
    // document.querySelector('.product-section').innerHTML = ""
    getDownloadURL(ref(storage, doc.data().name))
      .then((url) => {
        document.querySelector('.product-section').innerHTML += `
        <div class="product-card">
        <img onclick="redirect('${doc.id}')" src='${url}' alt="">
        <p onclick="redirect('${doc.id}')">${doc.data().name}</p>
        <h3 onclick="redirect('${doc.id}')">₹${doc.data().price}</h3>
        <div onclick="redirect('${doc.id}')" class="icons">
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        </div>
        <button onclick="addtobag('${doc.id}')">Add to bag</button>
        </div>
        `
      })
      .catch((error) => {
        // Handle any errors
      });
  });
}

function redirect(id) {
  localStorage.setItem("id", id)
  window.location.href = "./pages/Details/index.html"
}
window.redirect = redirect
getData()
