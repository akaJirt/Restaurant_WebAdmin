import { Layout } from "antd";
import React from "react";
import "./Tables.scss";

function Tables(props) {
  console.log("render tables");
  const { Content } = Layout;
  return (
    <Layout className="content-tables">
      <Content>Tables</Content>
    </Layout>
  );
}

export default Tables;
