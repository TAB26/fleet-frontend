import React, { useState, useEffect } from "react";
import { TextField } from '@mui/material';

import "./EmployeeList.css";

const DeptList = () => {
  const [heads, setHeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all employees from the database
  const fetchHeads = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/departmentHeads");
      const data = await response.json();
      setHeads(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Call fetchEmployees when the component mounts
  useEffect(() => {
    fetchHeads();
  }, []);

  // Delete an employee record
  const deleteHeads = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/departmentHeads/${id}`, {
        method: "DELETE",
      });
      fetchHeads(); // Fetch updated list of employees after deletion
    } catch (error) {
      console.error(error);
    }
  };

  const updateHeads = async (id, updateData) => {
    try {
      await fetch(`http://localhost:5000/api/departmentHeads/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify(updateData),
      });
      fetchHeads();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateHeads = (id) => {
    const updatedData = {
      // Set the properties you want to update
      // Example: firstName: "New First Name"
    };

    updateHeads(id, updatedData);
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
      <h2>head List</h2>
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
            <th>Department Name</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {Object.values(heads).map(([key, head], index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{head.officerFullName.firstName}</td>
              <td>{head.officerFullName.lastName}</td>
              <td>{head.officerUsername}</td>
              <td>{head.departmentName}</td>
              <td>{head.address}</td>
              <td>{head.phoneNo}</td>
              <td>{head.password}</td>
              <td>
                <button onClick={() => handleUpdateHeads(head._id)}>
                  Update
                </button>
                <button onClick={() => deleteHeads(head._id)}>
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

export default DeptList;
