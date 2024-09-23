import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDB0AAA3kOJkX2APLbA_FxUNgJ3HeGHCgs",
  authDomain: "ignite-shop-40bf5.firebaseapp.com",
  projectId: "ignite-shop-40bf5",
  storageBucket: "ignite-shop-40bf5.appspot.com",
  messagingSenderId: "214452616799",
  appId: "1:214452616799:web:0ee4e6c5e449eb5782e5ea",
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

