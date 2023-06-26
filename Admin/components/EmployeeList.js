import React, { useState, useEffect } from "react";
import { TextField } from '@mui/material';

import "./EmployeeList.css";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all employees from the database
  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/employees");
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Call fetchEmployees when the component mounts
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Delete an employee record
  const deleteEmployee = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/employees/${id}`, {
        method: "DELETE",
      });
      fetchEmployees(); // Fetch updated list of employees after deletion
    } catch (error) {
      console.error(error);
    }
  };

  const updateEmployee = async (id, updateData) => {
    try {
      await fetch(`http://localhost:5000/api/employees/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify(updateData),
      });
      fetchEmployees();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateEmployee = (id) => {
    const updatedData = {
      // Set the properties you want to update
      // Example: firstName: "New First Name"
    };

    updateEmployee(id, updatedData);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // const filteredEmployees = employees.filter((employee) => {
  //   const fullName = employee.employeeFullName.join(' ').toLowerCase();
  //   return fullName.includes(searchTerm.toLowerCase());
  // });

  return (
    <div className="employee-list">
      <h2>Employee List</h2>
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
        <TextField label="Search" variant="outlined" size="small" value={searchTerm} onChange={handleSearch} />
      </div>
      <table>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Department Name</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {Object.values(employees).map(([key, employees], index) => (
            <tr key={employees._id}>
              <td>{index + 1}</td>
              <td>{employees.employeeFullName.firstName}</td>
              <td>{employees.employeeFullName.lastName}</td>
              <td>{employees.employeeUsername}</td>
              <td>{employees.address}</td>
              <td>{employees.phoneNo}</td>
              <td>{employees.departmentName}</td>
              <td>{employees.password}</td>
             
              <td>
                <button onClick={() => handleUpdateEmployee(employees._id)}>
                  Update
                </button>
                <button onClick={() => deleteEmployee(employees._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
