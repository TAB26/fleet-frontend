import React, { useState, useEffect } from "react";
import { TextField } from '@mui/material';

import "./EmployeeList.css";

const MechanicsList = () => {
  const [mechanics, setMechanics] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  //const [updatedData, setUpdatedData] = useState({});

  // Fetch all dispatchers from the database
  const fetchMechanics = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/mechanics");
      const data = await response.json();
      setMechanics(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Call fetchDispatchers when the component mounts
  useEffect(() => {
    fetchMechanics();
  }, []);

  // Delete a dispatcher record
  const deleteMechanics = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/mechanics/${id}`, {
        method: "DELETE",
      });
      const updatedMechanics = mechanics.filter(mechanic => mechanic._id !== id);
      setMechanics(updatedMechanics);
      if (updatedMechanics.length === 0) {
        setMechanics([]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  


  const updateMechanics = async (id, updateData) => {
    try {
      await fetch(`http://localhost:5000/api/mechanics/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify(updateData),
      });
      fetchMechanics();
      //setUpdatedData({});
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateMechanics = (id, updatedData) => {
    const updatedMechanics = mechanics.map(mechanic => {
      if (mechanic._id === id) {
        return { ...mechanic, ...updatedData };
      }
      return mechanic;
    });
  
    setMechanics(updatedMechanics);
    updateMechanics(id, updatedData);
  };
  
  

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   const [dispatcherId, property] = name.split('.');
  //   setUpdatedData((prevState) => ({
  //     ...prevState,
  //     [dispatcherId]: {
  //       ...prevState[dispatcherId],
  //       [property]: value
  //     }
  //   }));
  // };
  const filteredMechanics = Object.values(mechanics).filter(
    (mechanic) =>
      (mechanic.mechanicFullName?.firstName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (mechanic.mechanicFullName?.lastName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (mechanic.mechanicUsername?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (mechanic.address?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (mechanic.phoneNo?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (mechanic.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (mechanic.password?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );
  
  


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="employee-list">
      <h2>mechanics List</h2>
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
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {Object.values(filteredMechanics).map(([key, mechanic], index) => (
            <tr key={key}>
          
            <td>{index + 1}</td>
            <td>{mechanic.mechanicFullName?.firstName}</td>
            <td>{mechanic.mechanicFullName?.lastName}</td>
            <td>{mechanic.mechanicUsername}</td>
            <td>{mechanic.address}</td>
            <td>{mechanic.phoneNo}</td>
            <td>{mechanic.password}</td>
            <td>
              <button onClick={() => handleUpdateMechanics(mechanic._id, {
                firstName: mechanic.mechanicFullName?.firstName,
                lastName: mechanic.mechanicFullName?.lastName,
                username: mechanic.mechanicUsername,
                password: mechanic.password,
                address: mechanic.address,
                phoneNo: mechanic.phoneNo,
                email: mechanic.email,
              })}>
        Update
      </button>

      <button onClick={() => deleteMechanics(mechanic._id)}>
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

export default MechanicsList;
