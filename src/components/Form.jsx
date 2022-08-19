import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import FirebaseContext from '../firebase';
import States from '../datas/states';
import Services from '../datas/services';

function Form() {
  const { firebase } = useContext(FirebaseContext);
  const { msg } = alert;
  const [birthDate, setBirthDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [selectState, setSelectState] = useState(States[0].name);
  const [selectService, setSelectService] = useState(Services[0].name);
  const [employee, setEmployee] = useState({
    firstname: '',
    lastname: '',
    birthdate: '',
    startdate: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    department: '',
  });

  const [alert, setAlert] = useState([]);
  const [success, setSuccess] = useState(false);
  const Navigate = useNavigate();

  const showAlert = (alert) => {
    setAlert(alert);
  };

  async function addEmployee(employee) {
    firebase.db.collection('employees').add(employee);
  }

  return (
    <div>
      <h1>Create Employee</h1>
      <form></form>
    </div>
  );
}

export default Form;
