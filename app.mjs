import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getDocs ,doc} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { db, auth } from "../firebase/config.mjs";

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const querySnapshot = await getDocs(doc(db, "users" , user.uid));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
    console.log(user);
    document.getElementById("username").innerHTML = user.uid;
  } else {
  }
});
