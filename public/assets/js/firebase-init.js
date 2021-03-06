// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBLBx3_Fej3tLs192QlZTCp_T-1MKk3sQ0",
  authDomain: "rw-chat-demo.firebaseapp.com",
  databaseURL: "https://rw-chat-demo-default-rtdb.firebaseio.com",
  projectId: "rw-chat-demo",
  storageBucket: "rw-chat-demo.appspot.com",
  messagingSenderId: "839407455246",
  appId: "1:839407455246:web:e6031acd2fda303d87805f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let auth = firebase.auth();
let db   = firebase.database();


// config url path local / prod
const prefix = window.location.hostname === "localhost"  ? "/public": "";