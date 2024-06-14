import React from "react";
import Table from "react-bootstrap/Table";

const TableCategory = () => {
  return (
    <div className="mt-3 mb-3 table-users">
      <h1 className="text-center mb-2">GET CATEGORIES</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Create_At</th>
            <th>Update_At</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Cổ điển</td>
            <td>Món ăn thời 9x</td>
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

export default TableCategory;
