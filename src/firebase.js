// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
//import { collection, addDoc, getDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
/*const GOOGLE_APPLICATION_CREDENTIALS = process.env.REACT_APP_GOOGLE_APPLICATION_CREDENTIALS;*/
const email = process.env.REACT_APP_EMAIL;
const password = process.env.REACT_APP_YEK;
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDH-MpbnOzGXHq0AIxg7N7EffQbyBs7Bws",
  authDomain: "fire-counter-3108a.firebaseapp.com",
  projectId: "fire-counter-3108a",
  storageBucket: "fire-counter-3108a.appspot.com",
  messagingSenderId: "784063884227",
  appId: "1:784063884227:web:42ba739ef17dd99671eb76",
  measurementId: "G-CWKKN4LD1D"
};



// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

//Detect auth state
onAuthStateChanged(auth, user=> {

	if(user !== null) {
		console.log('logged in!');
	} else {
		console.log('No user');
	}
});

signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });


export{
  db,
}
