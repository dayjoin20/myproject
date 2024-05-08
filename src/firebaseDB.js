import firebase from 'firebase/compat/app'; // Import Firebase compat
import 'firebase/compat/database'; // Import Database compat

const firebaseConfig = {
    apiKey: "AIzaSyAjNbzDCjiPau6mwWjiByO91I98ffWdNCU",
    authDomain: "cpeproject-dd682.firebaseapp.com",
    databaseURL: "https://cpeproject-dd682-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "cpeproject-dd682",
    storageBucket: "cpeproject-dd682.appspot.com",
    messagingSenderId: "1082652926993",
    appId: "1:1082652926993:web:503362587b023f8ea3bdb0",
    measurementId: "G-377MTD1JLY"
};

// ตรวจสอบว่า Firebase ยังไม่ถูกเรียกใช้ก่อน
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const database = firebase.database();

export default database;