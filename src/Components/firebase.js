import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAu2K-dzrEmZz_MypyTTCgNprXjTIeGruA",
  authDomain: "seven-328905.firebaseapp.com",
  projectId: "seven-328905",
  storageBucket: "seven-328905.appspot.com",
  messagingSenderId: "398228875467",
  appId: "1:398228875467:web:bdfadf9458c1fc9fccd34e",
};
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
const signInWithEmailAndPassword = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (error) {
    // console.error(error);
    alert(error.message);
  }
};
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    await db.collection("users").add({
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    // console.error(error);
    alert(error.message);
  }
};
const logout = () => {
  auth.signOut();
};

export {
  auth,
  db,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
};
