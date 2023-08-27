// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8S-yeKOa35_t--eF3K7vqymvW8q75FKo",
  authDomain: "filipson-rorbu.firebaseapp.com",
  projectId: "filipson-rorbu",
  storageBucket: "filipson-rorbu.appspot.com",
  messagingSenderId: "1041120419825",
  appId: "1:1041120419825:web:ad5821c173e14b6f612e50",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default db;
