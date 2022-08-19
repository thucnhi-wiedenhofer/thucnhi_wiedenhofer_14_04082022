import firebase, { FirebaseContext } from './firebase';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/home';
import EmployeeList from './pages/employee-list';

function App() {
  return (
    <Router>
      <Header />
      <FirebaseContext.Provider value={{ firebase }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employee-list" element={<EmployeeList />} />
        </Routes>
      </FirebaseContext.Provider>
      <Footer />
    </Router>
  );
}

export default App;
