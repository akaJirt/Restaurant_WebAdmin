import React from "react";
import "./FormUser.scss";
const FormUser = () => {
  console.log("render FormUser");
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value, "<<<<<<<<<<<<<<");
  };
  return (
    <div className="form mt-3 mb-3">
      <div className="form-group">
        <label className="form-label">fullName</label>
        <input
          type="text"
          className="form-control"
          placeholder="Nhập full name ..."
          onChange={handleChange}
        />
      </div>
      <div className="form-group mt-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Nhập email ..."
        />
      </div>
      <div className="form-group mt-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Nhập password ..."
        />
      </div>
      <div className="form-group mt-3">
        <label className="form-label">Role</label>
        <select className="form-control ic-arrow">
          <option>Admin</option>
          <option>Nhân viên</option>
          <option>Khách hàng</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label mt-3">violations</label>
        <input type="date" className="form-control" />
      </div>
    </div>
  );
};

export default FormUser;
