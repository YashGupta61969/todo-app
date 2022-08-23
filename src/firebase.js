import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAC7zBXh-vqitGfySXQZdnr0xaeBjXLxkw",
  authDomain: "todo-web-app-46c2e.firebaseapp.com",
  databaseURL: "https://todo-web-app-46c2e-default-rtdb.firebaseio.com",
  projectId: "todo-web-app-46c2e",
  storageBucket: "todo-web-app-46c2e.appspot.com",
  messagingSenderId: "1016814959799",
  appId: "1:1016814959799:web:53320c494c45576fe96132"
};
// I have choose to set these configs as public as this is a temporary project



const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)
export const auth = getAuth();