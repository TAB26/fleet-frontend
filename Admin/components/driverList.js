import React, { useState, useEffect } from "react";
import "./EmployeeList.css";
import { TextField } from '@mui/material';

const DriverList = () => {
  const [drivers, setDrivers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const fetchDrivers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/drivers");
      const data = await response.json();
      console.log(data);
      setDrivers(data);
    } catch (error) {
      console.error(error);
    }
  };

  

  useEffect(() => {
    fetchDrivers();
  }, []);

  const deleteDriver = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/drivers/${id}`, {
        method: "DELETE",
      });
      fetchDrivers();
    } catch (error) {
      console.error(error);
    }
  };

  const updateDriver = async (id, updatedData) => {
    try {
      await fetch(`http://localhost:5000/api/drivers/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      fetchDrivers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateDriver = (id) => {
    const updatedData = {
      // Set the properties you want to update
      // Example: firstName: "New First Name"
    };

    updateDriver(id, updatedData);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="employee-list">
      <h2 >Driver List</h2>
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
            <TextField label="Search" variant="outlined" size="small" value={searchTerm} onChange={handleSearch} />
          </div>
        <table>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Password</th>
              <th>Address</th>
              <th>Phone</th>
              <th>License number</th>
              <th>expirationDate</th>
              <th>expir</th>
              <th>plateNumber</th>
              <th>vehicleMake</th>
              <th>driverStatus</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {Object.values(drivers).map(([key, driver], index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{driver.driverUsername}</td>
              <td>{driver.driverFullName.firstName}</td>
              <td>{driver.driverFullName.lastName}</td>
              <td>{driver.password}</td>
              <td>{driver.address}</td>
              <td>{driver.phoneNo}</td>
              <td>{driver.drivingLicense.licenseNumber}</td>
              <td>{driver.drivingLicense.expirationDate}</td>
              <td>{driver.drivingLicense.expire}</td>
              <td>{driver.vehicleToBeAssigned.plateNumber}</td>
              <td>{driver.vehicleToBeAssigned.vehicleMake}</td>
              <td>{driver.driverStatus}</td>
              <td>
                <button onClick={() => handleUpdateDriver(key)}>Update</button>
                <button onClick={() => deleteDriver(key)}>Delete</button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      
    </div>
  );
};

export default DriverList;
