import { db, storage } from '../../firebase/config.mjs'
import { ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";


const productForm = document.getElementById("product")

productForm.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const Name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const brand = document.getElementById("brand").value;
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;
    const storageRef = ref(storage, Name);
    const file = document.getElementById("file").files[0]
    uploadBytes(storageRef, file).then(async (snapshot) => {
        try {
            const docRef = await addDoc(collection(db, "product"), {
                name: Name,
                description,
                brand,
                category,
                price,
                review: 0,
                reviews: []
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    });

})