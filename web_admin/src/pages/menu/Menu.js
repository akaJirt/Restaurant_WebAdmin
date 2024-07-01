import { Layout } from "antd";
import React from "react";
import "./Menu.scss";
import TableMenu from "../../components/tables/tableMenu/TableMenu";
import { useSelector } from "react-redux";
import { getThemeState } from "../../store/selector";
function Menu(props) {
  console.log("render Menu");
  const { Content } = Layout;
  const theme = useSelector(getThemeState);
  return (
    <Layout className={`layout-menu ${theme ? "theme" : ""}`}>
      <Content>
        <h1 className="text-h1">Menu</h1>
        <button className="mx-3 btn btn-primary mt-3 mb-3">Add New Menu</button>
        <TableMenu />
      </Content>
    </Layout>
  );
}

export default React.memo(Menu);
