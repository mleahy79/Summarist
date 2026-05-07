import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCIOpLyAzkafKwq4t4emGiGyB9OyHYjl5k",
  authDomain: "summarist-6851e.firebaseapp.com",
  projectId: "summarist-6851e",
  storageBucket: "summarist-6851e.firebasestorage.app",
  messagingSenderId: "403565790841",
  appId: "1:403565790841:web:77a063a6eea9f3e3c6b6a8",
  measurementId: "G-VK0NBWRNQ9"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
