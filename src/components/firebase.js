import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfHsrZ2R7PEB3eTCHU4Rrm-dLeUU8o0mA",
  authDomain: "mipay-9c3c6.firebaseapp.com",
  projectId: "mipay-9c3c6",
  storageBucket: "mipay-9c3c6.appspot.com",
  messagingSenderId: "1023717095783",
  appId: "1:1023717095783:web:f8dbb277509918d20897c2",
  measurementId: "G-8HSTH268JF"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export const addUser = ([name, accountNo, balance]) => {
  return db
    .collection("users")
    .add({ name: name, accountNo: accountNo, balance: balance });
};

export const addTransaction = (amount, to, from) => {
  return db
    .collection("transactions")
    .add({ amount: amount, to: to, from: from, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
};

export const transact = (id1, balance1, id2, balance2, amount) => {
  return [db.collection("users").doc(id1).update({
    balance: Number(balance1) - Number(amount)
  }),
  db.collection("users").doc(id2).update({
    balance: Number(balance2) + Number(amount)
  })]

}

export { db };
export default firebase;
