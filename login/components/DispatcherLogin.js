import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './AdminLogin.css';

const DispatcherLogin = () => {
  const [dispatcherUsername, setDispatcherUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();


  const handleUsernameChange = (e) => {
    setDispatcherUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/dispatchers/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dispatcherUsername, password }),
      });

      if (response.ok) {
        // Login successful
        const data = await response.json();
        // Do something with the authenticated user data
        history.push('/dispatcher/Sidebar')
        console.log("Logged in:", data);
      } else {
        // Login failed
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="admin-login-container">
      <form className="login-table" onSubmit={handleLogin}>
        <h1>dispatcher Login</h1>
        <table>
          <tbody>
            <tr>
              <td><label htmlFor="username">Username:</label></td>
              <td><input type="text" id="username" value={dispatcherUsername} onChange={handleUsernameChange} required/></td>
            </tr>
            <tr>
              <td><label htmlFor="password">Password:</label></td>
              <td><input type="password" id="password" value={password} onChange={handlePasswordChange} required/></td>
            </tr>
            <tr>
              <td></td>
              <td><button type="submit">Login</button></td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default DispatcherLogin;
