import React from "react";
import "./User.scss";
import { Layout } from "antd";
const User = (props) => {
  console.log("render User");
  const { Content } = Layout;
  return (
    <Layout className="layout-user">
      <Content>User</Content>
    </Layout>
  );
};

export default User;
