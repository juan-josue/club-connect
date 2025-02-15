import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <div className="text-white">Login</div>
      <Link to="/matching">Go to About Page</Link>
    </>
  );
}

export default Login;
