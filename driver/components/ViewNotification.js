import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";

import "./prmission.css";

const ViewNotification = () => {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('driverUsername');
  // Fetch all requests from the database
  const fetchRequests = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/tripRequests");
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Call fetchRequests when the component mounts
  useEffect(() => {
    fetchRequests();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
  };

  return (
    <div className="employee-list">
      <h2>Trip Request List</h2>
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "10px" }}>
        <TextField label="Search" variant="outlined" size="small" value={searchTerm} onChange={handleSearch} />
      </div>
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>driver fullName</th>
            <th>workType</th>
            <th>licenseNumber</th>
            <th>headStatus</th>
            <th>dispatcherStatus</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(requests).map(([key, request], index) => (
            <tr key={key}>
              <td>{index + 1}</td>
              <td>{request.driverDetail.firstName} {request.driverDetail.lastName}</td>
              <td>{request.workType}</td>
              <td>{request.driverDetail.licenseNumber}</td>
              <td>{request.headStatus}</td>
              <td>{request.dispatcherStatus}</td>
              <td>
                <button
                  onClick={() => handleViewDetails(request)}
                  disabled={request.headStatus !== "approved" || request.dispatcherStatus !== "assigned" || request.headStatus === "pending" || request.dispatcherStatus === "pending"}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

              

{selectedRequest && (
  <div>
    <h3>assigned driver and vehicle for Request </h3>
    <table>
      <tbody>
        <tr>
          <td>department name:</td>
          <td>{selectedRequest.departmentName}</td>
        </tr>
        <tr>
          <td>representative Name:</td>
          <td>{selectedRequest.representativeName}</td>
        </tr>
        <tr>
          <td>noOfTravelers:</td>
          <td>{selectedRequest.noOfTravelers}</td>
        </tr>
        <tr>
          <td> departure Date:</td>
          <td>{selectedRequest.tripRoute.departureDate}</td>
        </tr>
        <tr>
          <td> destination :</td>
          <td>{selectedRequest.tripRoute.destination}</td>
        </tr>
        <tr>
          <td> return Date:</td>
          <td>{selectedRequest.tripRoute.returnDate}</td>
        </tr>
      
        {/* <tr>
          <td>tripStatus:</td>
          <td>{selectedRequest.tripStatus}</td>
        </tr> */}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewNotification;



