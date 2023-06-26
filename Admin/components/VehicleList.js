import React, { useState, useEffect } from "react";
import "./EmployeeList.css";
import { TextField } from '@mui/material';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all vehicles from the database
  const fetchVehicles = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/vehicles");
      const data = await response.json();
      setVehicles(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Call fetchVehicles when the component mounts
  useEffect(() => {
    fetchVehicles();
  }, []);

  // Delete a vehicle record
  const deleteVehicle = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/vehicles/${id}`, {
        method: "DELETE",
      });
      fetchVehicles();
    } catch (error) {
      console.error(error);
    }
  };

  const updateVehicle = async (id, updatedData) => {
    try {
      await fetch(`http://localhost:5000/api/vehicles/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      fetchVehicles();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateVehicle = (id) => {
    // Create a new object to hold the updated data
    const updatedData = {
      // Set the properties you want to update
      // Example: firstName: "New First Name"
      // Assuming you have form fields for each property, you can retrieve their updated values here
      // For simplicity, let's assume you have fields with the same names as the properties
      VIN: document.getElementById("VIN").value,
      vehicleMake: document.getElementById("vehicleMake").value,
      vehicleModel: document.getElementById("vehicleModel").value,
      // Add other properties here...
    };
  
    // Make the API call to update the vehicle with the updated data
    updateVehicle(id, updatedData);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="employee-list">
      <h2>Vehicles List</h2>
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
        <TextField label="Search" variant="outlined" size="small" value={searchTerm} onChange={handleSearch} />
      </div>
      <table>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>VIN</th>
            <th>Vehicle Make</th>
            <th>Vehicle Model</th>
            <th>Year</th>
            <th>Code</th>
            <th>Region</th>
            <th>Number</th>
            <th>Body Type</th>
            <th>Color</th>
            <th>Engine Size</th>
            <th>GPS Id</th>
            <th>Current Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.length === 0 ? (
            <tr>
              <td colSpan="14">No registered vehicles found.</td>
            </tr>
          ) : (
            Object.values(vehicles).map(([key, vehicles], index) => (
              <tr key={vehicles._id}>
                <td>{index + 1}</td>
                <td>{vehicles.VIN}</td>
                <td>{vehicles.vehicleMake}</td>
                <td>{vehicles.vehicleModel}</td>
                <td>{vehicles.Year}</td>
                <td>{vehicles.vehicleLicensePlate?.code}</td>
                <td>{vehicles.vehicleLicensePlate?.region}</td>
                <td>{vehicles.vehicleLicensePlate?.plateNumber}</td>
                <td>{vehicles.detail?.bodyType}</td>
                <td>{vehicles.detail?.color}</td>
                <td>{vehicles.detail?.engineSize}</td>
                <td>{vehicles.GPS_ID}</td>
                <td>{vehicles.vehicleStatus}</td>
                <td>
                  <button onClick={() => handleUpdateVehicle(vehicles._id)}>
                    Update
                  </button>
                  <button onClick={() => deleteVehicle(vehicles._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleList;
