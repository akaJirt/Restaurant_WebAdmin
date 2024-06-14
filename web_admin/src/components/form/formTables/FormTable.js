import React from "react";
import test from "../../../images/QR_code.png";
const FormTable = () => {
  console.log("render FormTable");

  return (
    <div className="form">
      <h1 className="text-h1 text-center mt-3 mb-3">Create Table</h1>
      <div className="form-group">
        <label className="form-label">Table number</label>
        <select className="form-control ic-arrow">
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
      </div>
      <div className="form-group mt-3">
        <label className="form-label">Status</label>
        <select className="form-control ic-arrow">
          <option>Mở</option>
          <option>Đóng</option>
        </select>
      </div>
      <div className="form-group mt-3 mb-3">
        <label className="form-label">QR code</label>
        <input type="file" className="form-control" />
      </div>
      <div className="img">
        <img alt="qr_code" src={test} />
      </div>
      <div className="mt-3 text-center">
        <button className="btn btn-primary">Add Table</button>
      </div>
    </div>
  );
};

export default FormTable;
