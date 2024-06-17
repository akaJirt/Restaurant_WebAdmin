import React from "react";

const FormUser = () => {
  console.log("render FormUser");

  return (
    <div className="form mt-3 mb-3">
      <h1 className="text-h1 text-center mt-3 mb-3">Create User</h1>
      <div className="form-group">
        <label className="form-label">Email</label>
        <input
          type="text"
          className="form-control"
          placeholder="Nhập Email ..."
        />
      </div>
      <div className="form-group mt-3">
        <label className="form-label">FirstName</label>
        <input
          type="text"
          className="form-control"
          placeholder="Nhập firstName ..."
        />
      </div>
      <div className="form-group mt-3">
        <label className="form-label">LastName</label>
        <input
          type="text"
          className="form-control"
          placeholder="Nhập lastName ..."
        />
      </div>
      <div className="form-group mt-3">
        <label className="form-label">Password</label>
        <input
          type="text"
          className="form-control"
          placeholder="Nhập password ..."
        />
      </div>
      <div className="form-group mt-3">
        <label className="form-label">Avatar</label>
        <input type="file" className="form-control" />
      </div>
      <div className="form-group">
        <label className="form-label mt-3">Role</label>
        <select className="form-control ic-arrow">
          <option>Admin</option>
          <option>Nhân viên</option>
          <option>Khách hàng</option>
        </select>
      </div>
      <div className="mt-3 text-center">
        <button className="btn btn-primary">Add User</button>
      </div>
    </div>
  );
};

export default FormUser;
