import Table from "react-bootstrap/Table";
import React from "react";

const TablePromotion = () => {
  return (
    <div className="mt-3 mb-3 table-users">
      <h1 className="text-center mb-2">GET PROMOTIONS</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Discount percentage</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Create_At</th>
            <th>Update_At</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Khuyến mãi ngày 8/3</td>
            <td>Nhanh tay nào mọi ngừ ơi!</td>
            <td>10%</td>
            <td>8/3/2024</td>
            <td>15/3/2024</td>
            <td>8/3/2024</td>
            <td>15/3/2024</td>
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

export default TablePromotion;
