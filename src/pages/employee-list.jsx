import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../firebase';
import Table from '../components/table/Table';

function EmployeeList() {
  const { firebase } = useContext(FirebaseContext);
  const [employees, setEmployees] = useState([]);
  const columns = React.useMemo(
    () => [
      {
        Header: 'Firstname',
        accessor: 'firstname',
      },
      {
        Header: 'Lastname',
        accessor: 'lastname',
      },
      {
        Header: 'Birthdate',
        accessor: 'birthdate',
      },
      {
        Header: 'Startdate',
        accessor: 'startdate',
      },
      {
        Header: 'Street',
        accessor: 'street',
      },
      {
        Header: 'City',
        accessor: 'city',
      },
      {
        Header: 'State',
        accessor: 'state',
      },
      {
        Header: 'Zip code',
        accessor: 'zipcode',
      },
      {
        Header: 'Department',
        accessor: 'department',
      },
    ],
    []
  );

  function processSnapshot(snapshot) {
    const employeesList = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    employeesList && setEmployees(employeesList);
  }

  useEffect(() => {
    const getEmployees = () => {
      firebase.db.collection('employees').onSnapshot(processSnapshot);
    };
    getEmployees();

    console.log(employees);
  }, []);

  return (
    <div className="container">
      <Table columns={columns} data={employees} />
    </div>
  );
}

export default EmployeeList;
