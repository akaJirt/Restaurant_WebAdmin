import { Layout } from "antd";
import React from "react";
import "./Menu.scss";
import FormMenu from "../../components/form/formMenu/FormMenu";
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
        <FormMenu />
        <TableMenu />
      </Content>
    </Layout>
  );
}

export default React.memo(Menu);
