import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
apiKey: "AIzaSyBWI-OQAP91N3VFU1M8gtGzOj8bqrjW-fs",
    authDomain: "pokefire-f5648.firebaseapp.com",
    projectId: "pokefire-f5648",
    storageBucket: "pokefire-f5648.firebasestorage.app",
    messagingSenderId: "556818644849",
    appId: "1:556818644849:web:77bdf63952541f2c86c0d0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // ✅ ¡Esto es necesario!

export { auth, db };