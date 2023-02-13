import { initializeApp } from "firebase/app";
import firebaseConfig from "./FirebaseConfig";

// initalize firbase
const firebaseInitalize = () => {
    initializeApp(firebaseConfig);
}

export default firebaseInitalize;