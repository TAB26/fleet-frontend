import React, { useState, useEffect } from "react";
import { TextField } from '@mui/material';

import "./EmployeeList.css";

const DispatcherList = () => {
  const [dispatchers, setDispatchers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  //const [updatedData, setUpdatedData] = useState({});

  // Fetch all dispatchers from the database
  const fetchDispatchers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/dispatchers");
      const data = await response.json();
      setDispatchers(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Call fetchDispatchers when the component mounts
  useEffect(() => {
    fetchDispatchers();
  }, []);

  // Delete a dispatcher record
  const deleteDispatcher = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/dispatchers/${id}`, {
        method: "DELETE",
      });
      const updatedDispatchers = dispatchers.filter(dispatcher => dispatcher._id !== id);
      setDispatchers(updatedDispatchers);
      if (updatedDispatchers.length === 0) {
        setDispatchers([]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  const updateDispatcher = async (id, updateData) => {
    try {
      await fetch(`http://localhost:5000/api/dispatchers/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify(updateData),
      });
      fetchDispatchers();
      //setUpdatedData({});
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateDispatcher = (id, updatedData) => {
    const updatedDispatchers = dispatchers.map(dispatcher => {
      if (dispatcher._id === id) {
        return { ...dispatcher, ...updatedData };
      }
      return dispatcher;
    });
  
    setDispatchers(updatedDispatchers);
    updateDispatcher(id, updatedData);
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
  const filteredDispatchers = Object.values(dispatchers).filter(
    (dispatcher) =>
      (dispatcher.dispatcherFullName?.firstName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (dispatcher.dispatcherFullName?.lastName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (dispatcher.dispatcherUsername?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (dispatcher.address?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (dispatcher.phoneNo?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (dispatcher.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (dispatcher.password?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );
  
  


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="employee-list">
      <h2>Dispatcher List</h2>
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
        {Object.values(filteredDispatchers).map(([key, dispatcher], index) => (
            <tr key={key}>
          
            <td>{index + 1}</td>
            <td>{dispatcher.dispatcherFullName?.firstName}</td>
            <td>{dispatcher.dispatcherFullName?.lastName}</td>
            <td>{dispatcher.dispatcherUsername}</td>
            <td>{dispatcher.address}</td>
            <td>{dispatcher.phoneNo}</td>
            <td>{dispatcher.password}</td>
            <td>
              <button onClick={() => handleUpdateDispatcher(dispatcher._id, {
                firstName: dispatcher.dispatcherFullName?.firstName,
                lastName: dispatcher.dispatcherFullName?.lastName,
                username: dispatcher.dispatcherUsername,
                password: dispatcher.password,
                address: dispatcher.address,
                phoneNo: dispatcher.phoneNo,
                email: dispatcher.email,
              })}>
        Update
      </button>

      <button onClick={() => deleteDispatcher(dispatcher._id)}>
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

export default DispatcherList;
