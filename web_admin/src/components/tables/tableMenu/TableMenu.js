import React from "react";
import Table from "react-bootstrap/Table";
import test from "../../../images/product-2.jpg";
const TableMenu = () => {
  return (
    <div className="mt-3 mb-3 table-users">
      <h1 className="text-center mb-2">GET MENUS</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Image</th>
            <th>Rating</th>
            <th>Create_At</th>
            <th>Update_At</th>
            <th>Category Id</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Món 1</td>
            <td>Ngon Vl</td>
            <td>20000</td>
            <td className="img-table">
              <img src={test} alt="avatar" />
            </td>
            <td>5 sao</td>
            <td>20/2/2025 </td>
            <td>25/2/2026</td>
            <td>1 </td>
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

export default TableMenu;
