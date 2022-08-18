import app from 'firebase/app';
import firebaseConfig from './config';
import 'firebase/firestore';

class Firebase {
  constructor() {
    //To avoid reinitialisation twice
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }
    this.db = app.firestore();
  }
}
const firebase = new Firebase();
export default firebase;
