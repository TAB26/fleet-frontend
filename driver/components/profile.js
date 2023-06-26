import React, { useEffect, useState } from 'react';

const ViewProfile = () => {
  const [driverProfile, setDriverProfile] = useState(null);

  useEffect(() => {
    const fetchDriverProfile = async () => {
      try {
        const driverUsername = sessionStorage.getItem('driverUsername');
  
        if (driverUsername) {
          const response = await fetch(`http://localhost:5000/api/drivers/drivers?username=${driverUsername}`);
          const data = await response.json();
          console.log('API Response:', data);
          setDriverProfile(data.drivers); // Store the drivers array in state
        } else {
          console.log('driverUsername not found in sessionStorage');
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchDriverProfile();
  }, []);

  return (
    <div>
      <h2>Driver Profile</h2>
      {driverProfile ? (
        <div>
          <p>Username: {driverProfile.driverUsername}</p>
          <p>First Name: {driverProfile.driverFullName.firstName}</p>
          <p>Last Name: {driverProfile.driverFullName.lastName}</p>
          {/* Add more personal information */}
        </div>
      ) : (
        <p>Loading driver profile...</p>
      )}
    </div>
  );
};

export default ViewProfile;
