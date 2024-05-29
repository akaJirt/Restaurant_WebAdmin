import React from "react";
import { Checkbox } from "antd";

const FormUser = (props) => {
  return (
    <div>
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
    </div>
  );
};

export default FormUser;
