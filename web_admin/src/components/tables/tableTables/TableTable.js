import React from "react";
import Table from "react-bootstrap/Table";
import test from "../../../images/QR_code.png";
const TableTable = () => {
  return (
    <div className="mt-3 mb-3 table-users">
      <h1 className="text-center mb-2">GET REVIEWS</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Id</th>
            <th>Table number</th>
            <th>Status</th>
            <th>QR code</th>
            <th>Create_At</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>1</td>
            <td>Mở</td>
            <td className="img-table">
              <img src={test} alt="avatar" />
            </td>
            <td>20/2/2025 </td>
            <td>25/2/2026</td>
            <td className="bt">
              <button className="btn btn-danger">Xóa</button>
              <button className="btn btn-primary">Sửa</button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default TableTable;
