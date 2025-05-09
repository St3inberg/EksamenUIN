import React, { useState } from 'react';

function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const handleLogin = (e) => {
    e.preventDefault();
    
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <div>
        <h1>Login to Dashboard</h1>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h1>My Page (Dashboard)</h1>
      <p>Welcome, user!</p>
     
      
      <button onClick={() => setIsLoggedIn(false)}>Logout (Simulated)</button>
    </div>
  );
}

export default Dashboard;