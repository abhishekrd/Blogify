import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider} from "firebase/auth"
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwADsgHGTj8_8bzRFYlpqNMx-LvWoGguY",
  authDomain: "blog-a6899.firebaseapp.com",
  projectId: "blog-a6899",
  storageBucket: "blog-a6899.appspot.com",
  messagingSenderId: "786265857888",
  appId: "1:786265857888:web:ef7cb5d44dd8b1f07a8805"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();