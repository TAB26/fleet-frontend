import React,{useEffect, useState} from 'react';
//import { Navbar } from 'react-bootstrap';
import { NavLink, useHistory } from 'react-router-dom';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import Logo from '../static/Logo1.png';
import '../App.css';

const MechanicsNavbar = () => {
  const history = useHistory();
  const [mechanicUsernam, setMechanicUsername] = useState('');
  //const [driverProfile, setDriverProfile] = useState(null);

  useEffect(() => {
    const loggedInUsername = sessionStorage.getItem('mechanicUsername');

    if (loggedInUsername) {
      setMechanicUsername(loggedInUsername);
    } else {
      // No username found in sessionStorage, redirect to login
      history.replace('/mechanicsLogin');
    }
  }, [history]);

  useEffect(() => {
    const fetchMechanics = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/drivers?username=${mechanicUsernam}`);
        const data = await response.json();
        //setDriverProfile(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (mechanicUsernam) {
      fetchMechanics();
    }
  }, [mechanicUsernam]);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('mechanicUsernam');
    sessionStorage.clear();
    history.replace('/mechanicsLogin');
  };

  return (
    <div>
      {/* <Navbar bg="dark" variant="dark" expand="lg" id="my-nav">
        {/* <Navbar.Brand className="app-logo" href="/">
          <img
            src={logo}
            width="40"
            height="50"
            className="d-inline-block align-center"
            alt="React Bootstrap logo"
          />{' '}
          FAS
        </Navbar.Brand> */}
         {/* <li className="welcome-message">
                Welcome, {mechanicsUsername ? <span>{mechanicsUsername}</span> : 'Guest'}
              </li> */}
         
     
      <div className="sidebar">
        <CDBSidebar textColor="#333" backgroundColor="#f0f0f0">
          <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
          
            <img
              style={{
                width: '130px',
                height: '130px',
                borderRadius: '50%',
                boxShadow: '0 0 0 2px red, 0 0 0 4px white, 0 0 0 6px black',
              }}
              src={Logo}
              alt="Logo"
            />
            <div>
              <span style={{ fontStyle: 'italic', color: 'blue' }}>fleet</span>
              <span style={{ color: 'red', marginLeft: '2px' }}>O</span>
              <span style={{ marginLeft: '-2px', fontStyle: 'italic', WebkitTextStroke: '1px black', WebkitTextFillColor: 'white' }}>B</span>
              <span style={{ color: 'black' }}>N</span>
            </div>
          </CDBSidebarHeader>
          
          <CDBSidebarContent>
            <CDBSidebarMenu>
              <NavLink exact to="/mechanics/Home" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/mechanics/ViewMiantenanceNotification" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="list">View-Assigned-Task</CDBSidebarMenuItem>
              </NavLink>
              <button className="btn btn-danger logout-btn" onClick={handleLogout}>
          Logout
        </button>
            </CDBSidebarMenu>
          </CDBSidebarContent>
        </CDBSidebar>
      </div>
    </div>
  );
};

export default MechanicsNavbar;
