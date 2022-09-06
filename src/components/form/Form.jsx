import React, { useState, useContext, useEffect } from 'react';
import { FirebaseContext } from '../../firebase';
//Install and use react-datepicker library and css
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import States from '../../datas/states';
import Services from '../../datas/services';
import './form.css';
import { Modal, useModal } from 'tnw-modal-library';

function Form() {
  //Use firebase to keep data in cloud and context
  const { firebase } = useContext(FirebaseContext);

  //Initial states of inputs
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
  const { message } = alert;
  const [success, setSuccess] = useState(false);

  // use useModal hook and useEffect to open Modal when an employee is added
  const { isShowing, toggle } = useModal();

  useEffect(() => {
    if (success) {
      toggle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  //function to add an employee in firestore database
  async function addEmployee(employee) {
    try {
      firebase.db.collection('employees').add(employee);
      setSuccess(true);
    } catch (error) {
      console.error(error);
    }
  }
  //function to refresh form
  const reload = () => window.location.reload();

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
        message: 'Warning! All fields are required',
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

  return (
    <div className="container mt-4">
      <h1 className="text-center">Create Employee</h1>

      <form onSubmit={handleSubmit}>
        <p className={showAlert ? `text-warning text-center` : ''}>{message}</p>
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-8 col-sm-12">
            <div className="form-group">
              <label htmlFor="first-name" className="mt-3">
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
              <label htmlFor="last-name" className="mt-3">
                Last Name
              </label>
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
              <label htmlFor="date-of-birth" className="mt-3">
                Date of Birth
              </label>
              <DatePicker
                className="form-control"
                selected={birthDate}
                dateFormat="MM/dd/yyyy"
                maxDate={new Date()} //disable birthdate>date
                onChange={(date) => {
                  setBirthDate(date);
                  setEmployee({
                    ...employee,
                    birthdate: date,
                  });
                }}
                showYearDropdown
                dropdownMode="select"
              />
            </div>
            <div className="form-group">
              <label htmlFor="start-date" className="mt-3">
                Start Date
              </label>
              <DatePicker
                className="form-control"
                selected={startDate}
                maxDate={new Date()} //disable startdate>date
                dateFormat="MM/dd/yyyy"
                onChange={(date) => {
                  setStartDate(date);
                  setEmployee({
                    ...employee,
                    startdate: date,
                  });
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="department" className="mt-3">
                Department
              </label>
              <select
                value={selectService}
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
          </div>

          <div className="col-lg-1"></div>

          <div className="col-lg-6  col-md-8 col-sm-12">
            <div className="card border-secondary mt-3">
              <div className="card-header">Address</div>
              <div className="card-body">
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
                  <label htmlFor="city" className="mt-3">
                    City
                  </label>
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
                  <label htmlFor="state" className="mt-3">
                    State
                  </label>
                  <select
                    value={selectState}
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
                  <label htmlFor="zip-code" className="mt-3">
                    Zip Code
                  </label>
                  <input
                    onChange={(e) =>
                      setEmployee({ ...employee, zipcode: e.target.value })
                    }
                    id="zip-code"
                    type="number"
                    className="form-control"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-success mt-4">
            Save
          </button>
        </div>
      </form>

      {/* Display modal only if an employee was added and clear form when close madal*/}
      <Modal
        isShowing={isShowing}
        close={toggle && reload}
        title={''}
        message={'Employee created!'}
      />
    </div>
  );
}

export default Form;
