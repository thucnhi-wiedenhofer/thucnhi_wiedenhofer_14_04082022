import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../firebase';
import Table from '../components/table/Table';
//Install and use date-fns library
import { format } from 'date-fns';

function EmployeeList() {
  const { firebase } = useContext(FirebaseContext);
  const [employees, setEmployees] = useState([]);

  // use React.useMemo here to ensure that our data isn't recreated on every render
  //only when value actually changes
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
        Cell: ({ value }) => {
          return format(new Date(value.seconds * 1000), 'MM/dd/yyyy');
        },
      },
      {
        Header: 'Startdate',
        accessor: 'startdate',
        Cell: ({ value }) => {
          return format(new Date(value.seconds * 1000), 'MM/dd/yyyy');
        },
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
    setEmployees(employeesList);
  }

  useEffect(() => {
    const getEmployees = () => {
      firebase.db.collection('employees').onSnapshot(processSnapshot);
    };
    getEmployees();
  }, [firebase.db]);

  return (
    <div className="container mt-4">
      <h1 className="text-center">Employee List</h1>
      <Table columns={columns} data={employees} />
    </div>
  );
}

export default EmployeeList;
