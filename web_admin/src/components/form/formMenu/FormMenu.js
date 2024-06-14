import React from "react";
import test from "../../../images/product-2.jpg";
const FormMenu = () => {
  console.log("render FormMenu");
  return (
    <div className="form">
      <h1 className="text-h1 text-center mt-3 mb-3">Create MenuItem</h1>
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
      <div className="form-group">
        <label className="form-label">Price</label>
        <input
          placeholder="Nhập price..."
          type="text"
          className="form-control"
        />
      </div>
      <div className="form-group mt-3 mb-1">
        <label className="form-label">Image</label>
        <input type="file" className="form-control" />
      </div>
      <div className="img mb-3">
        <img alt="product" src={test} />
      </div>
      <div className="form-group">
        <label className="form-label">Rating</label>
        <input
          type="text"
          placeholder="Nhập rating..."
          className="form-control"
        />
      </div>
      <div className="form-group mt-3 mb-3">
        <label className="form-label">Category Id</label>
        <select className="form-control ic-arrow">
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
      </div>
      <div className="mt-3 text-center">
        <button className="btn btn-primary">Add MenuItem</button>
      </div>
    </div>
  );
};

export default FormMenu;
