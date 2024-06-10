import React from "react";
import "./Review.scss";
import { Layout } from "antd";
function Review(props) {
  console.log("render Review");
  const { Content } = Layout;
  return (
    <Layout className="layout-review">
      <Content>Review</Content>
    </Layout>
  );
}

export default Review;
