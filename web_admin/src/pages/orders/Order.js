import { Layout } from "antd";
import React from "react";
import "./Order.scss";
function Order(props) {
  console.log("render Order");
  const { Content } = Layout;
  return (
    <Layout className="content-order">
      <Content>Order</Content>
    </Layout>
  );
}

export default Order;
