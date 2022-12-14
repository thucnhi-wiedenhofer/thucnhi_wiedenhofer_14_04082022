import firebase, { FirebaseContext } from './firebase';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home';
import EmployeeList from './pages/employee-list';

function App() {
  return (
    <Router>
      <Header />
      {/*  Share  firebase data in home and  employeeList */}
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
