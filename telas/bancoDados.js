import { initializeApp } from "firebase/app";
import firebase from "firebase"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuqQjfmTSkQyWq2eBtEJijyBpXTMvBwng",
  authDomain: "projeto-da-biblioteca.firebaseapp.com",
  projectId: "projeto-da-biblioteca",
  storageBucket: "projeto-da-biblioteca.appspot.com",
  messagingSenderId: "1038054868101",
  appId: "1:1038054868101:web:5c514708925fbcadb555ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default firebase.app