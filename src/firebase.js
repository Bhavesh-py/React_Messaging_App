import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyDIBEnvCm2Qo71GpeccUvcTS5-a5TkRvxY",
    authDomain: "messaging-app-bhavesh.firebaseapp.com",
    projectId: "messaging-app-bhavesh",
    storageBucket: "messaging-app-bhavesh.appspot.com",
    messagingSenderId: "568947369751",
    appId: "1:568947369751:web:d987d04bee62cce99cb952",
    measurementId: "G-SFJF8M2XDX"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider} ;
  export default db;