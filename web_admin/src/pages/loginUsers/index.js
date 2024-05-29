// loginUsers.js
import React from "react";

const Login = ({ setIsAuthenticated }) => {
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};

export default Login;
