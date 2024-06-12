import React from "react";
import "./User.scss";
import FormUser from "../../components/form/formUsers/FormUser";
import TableUser from "../../components/tables/TableUsers/TableUser";
import { useSelector } from "react-redux";
import { getThemeState } from "../../store/selector";
import { Layout } from "antd";
const User = (props) => {
  console.log("render User");
  const { Content } = Layout;
  const theme = useSelector(getThemeState);
  return (
    <Layout className={`layout-user ${theme ? "theme" : ""}`}>
      <Content>
        <h1 className="text-h1">Users</h1>
        <FormUser />
        <TableUser />
      </Content>
    </Layout>
  );
};

export default User;
