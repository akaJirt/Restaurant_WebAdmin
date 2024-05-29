import React from "react";
import "./LoginForm.scss";
import logo from "../../images/logo.png";
import FormUser from "./formUser/FormUser";

const LoginFrom = (props) => {
  return (
    <div className="content-login-from">
      <div className="logo-title mb-3">
        <img src={logo} alt="logo" />
        <h3>NiceAdmin</h3>
      </div>
      <div className="form-login">
        <div className="box-title">
          <h5 className="text-center">Login to You Account</h5>
          <p className="text-center">Enter your phone & password to login</p>
        </div>
        <FormUser />
        <div className="text-footer mt-3">
          <span>Don't have account?</span>
          <span>Create an account</span>
        </div>
      </div>
    </div>
  );
};

export default LoginFrom;
