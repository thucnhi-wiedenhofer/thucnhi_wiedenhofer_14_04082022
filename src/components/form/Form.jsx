import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import FirebaseContext from '../../firebase';
import States from '../../datas/states';
import Services from '../../datas/services';

function Form() {
  const { firebase } = useContext(FirebaseContext);
  const { message } = alert;
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

  //Validation form and submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      [
        employee.firstname,
        employee.lastname,
        employee.birthdate,
        employee.startdate,
        employee.street,
        employee.city,
        employee.state,
        employee.zipcode,
        employee.department,
      ].includes('')
    ) {
      showAlert({
        message: 'All fields are required',
        error: true,
      });
      return;
    }
    showAlert({ message: '', error: false });

    addEmployee(employee);
  };

  const showAlert = (alert) => {
    setAlert(alert);
  };

  async function addEmployee(employee) {
    firebase.db.collection('employees').add(employee);
  }

  return (
    <div className="container">
      <h1>Create Employee</h1>
      <form onSubmit={handleSubmit}>
        <div className={showAlert ? `is-invalid` : ''}>{message}</div>
        <div className="form-group">
          <label htmlFor="first-name" className="form-label mt-4">
            First Name
          </label>
          <input
            value={employee.firstname}
            onChange={(e) =>
              setEmployee({ ...employee, firstname: e.target.value })
            }
            type="text"
            className="form-control"
            id="first-name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="last-name">Last Name</label>
          <input
            value={employee.lastname}
            onChange={(e) =>
              setEmployee({ ...employee, lastname: e.target.value })
            }
            type="text"
            className="form-control"
            id="last-name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="date-of-birth">Date of Birth</label>
          <input
            value={employee.birthdate}
            onChange={(date) => {
              setBirthDate(date);
              setEmployee({
                ...employee,
                birthdate: date,
              });
            }}
            id="date-of-birth"
            className="form-control"
            type="text"
          />
        </div>

        <div className="form-group">
          <label htmlFor="start-date">Start Date</label>
          <input
            value={employee.startdate}
            onChange={(date) => {
              setStartDate(date);
              setEmployee({
                ...employee,
                startdate: date,
              });
            }}
            id="start-date"
            className="form-control"
            type="text"
          />
        </div>

        <fieldset class="address">
          <legend>Address</legend>

          <div className="form-group">
            <label htmlFor="street">Street</label>
            <input
              value={employee.street}
              onChange={(e) =>
                setEmployee({ ...employee, street: e.target.value })
              }
              id="street"
              type="text"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              value={employee.city}
              onChange={(e) =>
                setEmployee({ ...employee, city: e.target.value })
              }
              id="city"
              type="text"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="state">State</label>
            <select
              onChange={(e) => {
                setSelectState(e.target.value);
                setEmployee({ ...employee, state: e.target.value });
              }}
              name="state"
              id="state"
              className="form-select"
            >
              {States.map((option, index) => (
                <option key={index} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="zip-code">Zip Code</label>
            <input
              onChange={(e) =>
                setEmployee({ ...employee, zipcode: e.target.value })
              }
              id="zip-code"
              type="number"
              className="form-control"
            />
          </div>
        </fieldset>

        <div className="form-group">
          <label htmlFor="department">Department</label>
          <select
            onChange={(e) => {
              setSelectService(e.target.value);
              setEmployee({ ...employee, department: e.target.value });
            }}
            name="department"
            id="department"
            className="form-select"
          >
            {Services.map((option, index) => (
              <option key={index} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <div className="center">
          <button type="submit" className="btn btn-success">
            Save
          </button>
        </div>
      </form>
      <div id="confirmation" class="modal">
        Employee Created!
      </div>
    </div>
  );
}

export default Form;
