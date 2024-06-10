import { Layout } from "antd";
import React from "react";
import "./Category.scss";

function Category(props) {
  console.log("render Category");
  const { Content } = Layout;
  return (
    <Layout className="layout-category">
      <Content>Category</Content>
    </Layout>
  );
}

export default Category;
