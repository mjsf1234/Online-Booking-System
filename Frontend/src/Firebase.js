import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyAVAKzB5cq0WZMYjoEh2v3QOLtvXf4cnxM",
  authDomain: "website-auth-5b11a.firebaseapp.com",
  projectId: "website-auth-5b11a",
  storageBucket: "website-auth-5b11a.appspot.com",
  messagingSenderId: "169787011816",
  appId: "1:169787011816:web:08b03b5889923878c60f5d",
});

export const auth = getAuth(app);
export default app;
