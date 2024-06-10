import React from "react";
import { Layout } from "antd";
import "./Promotion.scss";
function Promotion(props) {
  console.log("render Promotion");
  const { Content } = Layout;
  return (
    <Layout className="layout-promotion">
      <Content>Promotion</Content>
    </Layout>
  );
}

export default Promotion;
