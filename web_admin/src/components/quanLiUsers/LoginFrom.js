import React from "react";
import "./Login.scss";
import logo from "../../images/logo.png";
import { Checkbox } from "antd";
const LoginFrom = (props) => {
  return (
    <div className="content-login-from">
      <div className="logo-title mb-3">
        <img src={logo} />
        <h3>NiceAdmin</h3>
      </div>
      <div className="form-login">
        <div className="box-title">
          <h5 className="text-center">Login to You Account</h5>
          <p className="text-center">Enter your phone & password to login</p>
        </div>
        <div className="form-group mb-3">
          <label className="mb-2">PhoneNumber</label>
          <input
            type="number"
            className="form-control"
            placeholder="enter phone..."
          />
        </div>
        <div className="form-group mb-3">
          <label className="mb-2">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="enter password..."
          />
        </div>
        <div className="form-group">
          <Checkbox className="text-checkbox">Remember me</Checkbox>
        </div>
        <div className="text-center button mt-3">
          <button className="btn btn-primary">Login</button>
        </div>
        <div className="text-footer mt-3">
          <span>Don't have account?</span>
          <span>Create an account</span>
        </div>
      </div>
    </div>
  );
};

export default LoginFrom;
