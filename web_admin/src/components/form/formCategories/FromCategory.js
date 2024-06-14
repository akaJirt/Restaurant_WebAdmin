import React from "react";

const FromCategory = () => {
  console.log("render FormCategory");
  return (
    <div className="form">
      <h1 className="text-h1 text-center mt-3 mb-3">Create Category</h1>
      <div className="form-group">
        <label className="form-label">Name</label>
        <input
          placeholder="Nhập name..."
          type="text"
          className="form-control"
        />
      </div>
      <div className="form-group mt-3 mb-3">
        <label className="form-label">Description</label>
        <input
          placeholder="Nhập description..."
          type="text"
          className="form-control"
        />
      </div>

      <div className="mt-3 text-center">
        <button className="btn btn-primary">Add Category</button>
      </div>
    </div>
  );
};

export default FromCategory;
