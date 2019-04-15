import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

const settings = {timestampsInSnapshots: true};
console.log('firebase.js settings',settings);
const config = {
  apiKey: "",
  databaseURL: "",
  projectId: "",
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
