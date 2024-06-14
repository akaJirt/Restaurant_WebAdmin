import Table from "react-bootstrap/Table";
import React from "react";

const TableReview = () => {
  return (
    <div className="mt-3 mb-3 table-users">
      <h1 className="text-center mb-2">GET REVIEWS</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Id</th>
            <th>User Id</th>
            <th>Menu Item Id</th>
            <th>Rating</th>
            <th>Comment</th>
            <th>Create_At</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>1</td>
            <td>2</td>
            <td>5 sao</td>
            <td>quá ngon chị bảy ơi!!!!!!</td>
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

export default TableReview;
