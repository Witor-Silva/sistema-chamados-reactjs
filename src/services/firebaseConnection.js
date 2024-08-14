import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyDCe8YU1UGtk3f5R-6mWcfZc11fTex3ykw",
    authDomain: "tickets-b6960.firebaseapp.com",
    projectId: "tickets-b6960",
    storageBucket: "tickets-b6960.appspot.com",
    messagingSenderId: "835509202180",
    appId: "1:835509202180:web:fe62328dc7d69765213451",
    measurementId: "G-NG6BPVLCQ4"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage };