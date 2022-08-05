import app from 'firebase/app';
import firebaseConfig from './config';

class Firebase {
  constructor() {
    //To avoid reinitialisation twice
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }
  }
}
const firebase = new Firebase();
export default firebase;
