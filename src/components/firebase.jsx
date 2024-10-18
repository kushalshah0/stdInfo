import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyColXke-V1rjzr3j0JjhzKW69gKLPQRyIc",
  authDomain: "stdinfo-6d1d7.firebaseapp.com",
  projectId: "stdinfo-6d1d7",
  storageBucket: "stdinfo-6d1d7.appspot.com",
  messagingSenderId: "437042549556",
  appId: "1:437042549556:web:9f70a4922d707340084b61"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export default app;