import React from "react";
import "./User.scss";
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
        <h1 className="text-h1">Quản Lí Khách hàng</h1>
        <TableUser />
      </Content>
    </Layout>
  );
};

export default React.memo(User);
