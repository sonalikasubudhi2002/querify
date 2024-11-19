import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyA527OS1ZNl8nbtAlV7YXvVZ7Qe2Vl8i4o",
  authDomain: "querify-63e3b.firebaseapp.com",
  projectId: "querify-63e3b",
  storageBucket: "querify-63e3b.appspot.com",
  messagingSenderId: "535359071021",
  appId: "1:535359071021:web:394a8e2058b1db163669a4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, login, signup, logout };