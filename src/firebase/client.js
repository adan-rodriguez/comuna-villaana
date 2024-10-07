// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5DtOsdWHew1JdtkppXtmmJLI81L1jZoQ",
  authDomain: "comuna-villaana.firebaseapp.com",
  projectId: "comuna-villaana",
  storageBucket: "comuna-villaana.appspot.com",
  messagingSenderId: "273527174142",
  appId: "1:273527174142:web:6af0bf89c4cc3a26d146af",
  measurementId: "G-D12P8QQK3X",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
// export const db = getFirestore(app);
