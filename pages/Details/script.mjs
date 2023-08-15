import { getDownloadURL, ref } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { storage, db, auth } from "../../firebase/config.mjs";
import { onSnapshot, doc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";


const getData = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            return user
        } else {
            return undefined
        }
    })
}

const data = getData()

onSnapshot(doc(db, "product", localStorage.getItem("id")), (doc) => {
    getDownloadURL(ref(storage, doc.data().name))
        .then((url) => {
            document.getElementById("title").innerHTML = doc.data().name + ' - NextZone'
            document.querySelector(".product-details").innerHTML = `
            <div class="mai">
            <div class="left-side">
            <img src="${url}" alt="">
        </div>
        <div class="right-side">
            <h1>
            ${doc.data().name}</h1>
            <h2>₹${doc.data().price}</h2>
            <div class="icons">
                ${doc.data().reviews.length === 0 ? `
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                ` : doc.data().reviews.map((item) => {
                if (item.review === 1) {
                    return `<i class="blue fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>`
                }
                else if (item.review === 2) {
                    return `<i class="blue fa-solid fa-star"></i>
                        <i class="blue fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>`
                }
                else if (item.review === 3) {
                    return `<i class="blue fa-solid fa-star"></i>
                        <i class="blue fa-solid fa-star"></i>
                        <i class="blue fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>`
                }
                else if (item.review === 4) {
                    return `<i class="blue fa-solid fa-star"></i>
                        <i class="blue fa-solid fa-star"></i>
                        <i class="blue fa-solid fa-star"></i>
                        <i class="blue fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>`
                }
            })}
                <p>${doc.data().review === 0 ? 0 : doc.data().review} review</p>
            </div>
            <p>${doc.data().description}</p>
            <div class="brand">
                <span>Brand</span>
                <p>${doc.data().brand}</p>
            </div>
            <div class="category">
                <span>Category</span>
                <p>${doc.data().category}</p>
            </div>
            <button>Add to bag</button>
        </div>
        </div>
        <div class="customer-review">
            <div class="left-review">
                <h1>Customer Reviews</h1>
                <div class="stars">
                <i class="blue fa-solid fa-star"></i>
                <i class="blue fa-solid fa-star"></i>
                <i class="blue fa-solid fa-star"></i>
                <i class="blue fa-solid fa-star"></i>
                <i class="blue fa-solid fa-star"></i>
                </div>
                <span>Based on ${doc.data().review} review</span>
                <p>
                ${data === undefined ? "To write a review, you must first <a href='../LoginRegister/index.html'>Sign in</a>" : ""}
                 </p>
                
            </div>
            <div class="right-review"></div>
        </div>
            `
        })
        .catch((error) => {
            console.log(error);
        });
});