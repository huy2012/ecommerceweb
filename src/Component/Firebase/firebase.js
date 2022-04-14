import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyDWAOHPgN5HWguPEuZynAVSXnsh317cfsI",
    authDomain: "btvn-ae527.firebaseapp.com",
    databaseURL: "https://btvn-ae527-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "btvn-ae527",
    storageBucket: "btvn-ae527.appspot.com",
    messagingSenderId: "637031832058",
    appId: "1:637031832058:web:054fc93a937b2620b0ec43",
    measurementId: "G-P2D00B4TGK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
