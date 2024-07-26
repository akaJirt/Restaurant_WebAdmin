import React from "react";
import "./FormUser.scss";
import { useDispatch, useSelector } from "react-redux";
import { valueFormUsers } from "../../../store/valueForm/users/actions";
import {
  emailState,
  fullNameState,
  passwordState,
  roleState,
} from "../../../store/selector";
const FormUser = () => {
  console.log("render FormUser");
  const dispatch = useDispatch();
  const fullName = useSelector(fullNameState);
  const email = useSelector(emailState);
  const password = useSelector(passwordState);
  const role = useSelector(roleState);
  console.log(role, "role");

  return (
    <div className={`form  mt-3 mb-3`}>
      <div className="form-group">
        <label className="form-label">fullName</label>
        <input
          type="text"
          className="form-control"
          placeholder="Nhập full name ..."
          value={fullName}
          onChange={(e) => dispatch(valueFormUsers.setFullName(e.target.value))}
        />
      </div>
      <div className="form-group mt-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Nhập email ..."
          onChange={(e) => dispatch(valueFormUsers.setEmail(e.target.value))}
          value={email}
        />
      </div>
      <div className="form-group mt-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Nhập password ..."
          value={password}
          onChange={(e) => dispatch(valueFormUsers.setPassword(e.target.value))}
        />
      </div>
      <div className="form-group mt-3">
        <label className="form-label">Role</label>
        <select
          onChange={(e) => dispatch(valueFormUsers.setRole(e.target.value))}
          value={role}
          className="form-control ic-arrow"
        >
          <option value={"client"}>Khách hàng</option>
          <option value={"staff"}>Nhân viên</option>
          <option value={"admin"}>Admin</option>
        </select>
      </div>
    </div>
  );
};

export default FormUser;
