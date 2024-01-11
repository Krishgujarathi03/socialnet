// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmxHyPJ_-dNo-efuNO9E_Z1eaPbt_T0fU",
  authDomain: "socialnet-302db.firebaseapp.com",
  projectId: "socialnet-302db",
  storageBucket: "socialnet-302db.appspot.com",
  messagingSenderId: "1031135377597",
  appId: "1:1031135377597:web:2dfd94df492980f9ef9fd4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDb = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { fireDb, auth, storage };
