import React from "react";
import Table from "react-bootstrap/Table";
import avatar from "../../../images/messages-1.jpg";

const TableUser = () => {
  return (
    <div className="mt-3 mb-3 table-users">
      <h1 className="text-center mb-2">GET USERS</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Id</th>
            <th>Phone Number</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Avatar</th>
            <th>Role</th>
            <th>Create_At</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>123456</td>
            <td>Phùng</td>
            <td>Hưng</td>
            <td className="avatar">
              <img src={avatar} alt="avatar" />
            </td>
            <td>Admin</td>
            <td>20/2/2024</td>
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

export default TableUser;
