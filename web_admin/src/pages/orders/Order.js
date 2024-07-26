import React from "react";
import "./Order.scss";
import TableOrder from "../../components/tables/tableOrders/TableOrder";
import { useSelector } from "react-redux";
import { getThemeState } from "../../store/selector";
function Order(props) {
  console.log("render Order");
  const theme = useSelector(getThemeState);
  return (
    <div className={`layout-order ${theme ? "theme" : ""}`}>
      <h1 className="text-h1">Orders</h1>
      <button className="mx-3 btn btn-primary bt2">Add New User</button>
      <TableOrder />
    </div>
  );
}

export default React.memo(Order);
