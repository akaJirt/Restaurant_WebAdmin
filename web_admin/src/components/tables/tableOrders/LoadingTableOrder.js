import React from "react";
import moment from "moment";
const LoadingTableOrder = ({ item, index }) => {
  console.log(item, "item ne");
  return (
    <>
      {item.items.length > 0 ? (
        item.items.map((item, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.options}</td>
              <td>{item.quantity}</td>
              <td>{item.status}</td>
              <td>{item.note}</td>
              <td>{moment(item.createdAt).format("DD-MM-YYYY ~ HH:mm:ss")}</td>
              <td className="bt">
                <button className="btn btn-secondary">View</button>
                <button className="btn btn-danger mx-2">Xóa</button>
                <button className="btn btn-primary">Sửa</button>
              </td>
            </tr>
          );
        })
      ) : (
        <tr>
          <td colSpan={6}>No data</td>
        </tr>
      )}
    </>
  );
};

export default LoadingTableOrder;
