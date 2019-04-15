import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

const settings = {timestampsInSnapshots: true};
console.log('firebase.js settings',settings);
const config = {
  apiKey: "AIzaSyCY8v97LHoBaG-n5f_MqU1AGkq5LeWQwEw",
  databaseURL: "https://cyclezone-6b16e.firebaseio.com/",
  projectId: "cyclezone-6b16e",
};
console.log('config',config);
if (!firebase.apps.length) {
   console.log('inicializar firebase');
  firebase.initializeApp(config);
}
export const firebaseAuth = firebase.auth;
export const storage = firebase.storage();
export const db = firebase.firestore();
db.settings(settings);

export default firebase;
