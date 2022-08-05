import firebase, { FirebaseContext } from '../firebase';

function App() {
  return (
    <FirebaseContext.Provider value={{ firebase }}></FirebaseContext.Provider>
  );
}

export default App;
