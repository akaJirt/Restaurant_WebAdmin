import { Layout } from "antd";
import React from "react";
import "./Report.scss";

function Report(props) {
  console.log("render Report");
  const { Content } = Layout;
  return (
    <Layout className="layout-report">
      <Content>Report</Content>
    </Layout>
  );
}

export default Report;
