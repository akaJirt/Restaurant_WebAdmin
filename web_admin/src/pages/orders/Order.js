import { Layout } from "antd";
import React from "react";
import "./Order.scss";
import FormOrder from "../../components/form/formOrders/FormOrder";
import TableOrder from "../../components/tables/tableOrders/TableOrder";
import { useSelector } from "react-redux";
import { getThemeState } from "../../store/selector";
function Order(props) {
  console.log("render Order");
  const { Content } = Layout;
  const theme = useSelector(getThemeState);
  return (
    <Layout className={`layout-order ${theme ? "theme" : ""}`}>
      <Content>
        <h1 className="text-h1">Orders</h1>
        <FormOrder />
        <TableOrder />
      </Content>
    </Layout>
  );
}

export default React.memo(Order);
