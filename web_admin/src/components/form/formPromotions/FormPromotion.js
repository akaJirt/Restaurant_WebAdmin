import React from "react";

const FormPromotion = () => {
  console.log("render FormPromotion");

  return (
    <div className="form">
      <h1 className="text-h1 text-center mt-3 mb-3">Create Promotion</h1>
      <div className="form-group">
        <label className="form-label">Title</label>
        <input
          placeholder="Nhập title ..."
          className="form-control"
          type="text"
        />
      </div>
      <div className="form-group mt-3 mb-3">
        <label className="form-label">Description</label>
        <input
          placeholder="Nhập description ..."
          className="form-control"
          type="text"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Discount percentage</label>
        <input
          placeholder="Nhập discount percentage ..."
          className="form-control"
          type="text"
        />
      </div>
      <div className="form-group mt-3">
        <label className="form-label">Start date</label>
        <input
          type="date"
          placeholder="Nhập comment ..."
          className="form-control"
        />
      </div>
      <div className="form-group mt-3">
        <label className="form-label">End date</label>
        <input
          type="date"
          placeholder="Nhập comment ..."
          className="form-control"
        />
      </div>
      <div className="mt-3 text-center">
        <button className="btn btn-primary">Add Promotion</button>
      </div>
    </div>
  );
};

export default FormPromotion;
