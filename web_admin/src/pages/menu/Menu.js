import { Layout } from "antd";
import React from "react";
import "./Menu.scss";

function Menu(props) {
  console.log("render Menu");
  const { Content } = Layout;
  return (
    <Layout className="layout-menu">
      <Content>Menu</Content>
    </Layout>
  );
}

export default Menu;
