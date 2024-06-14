import { Layout } from "antd";
import React from "react";
import "./Category.scss";
import FromCategory from "../../components/form/formCategories/FromCategory";
import TableCategory from "../../components/tables/tableCategories/TableCategory";
import { useSelector } from "react-redux";
import { getThemeState } from "../../store/selector";
function Category(props) {
  console.log("render Category");
  const theme = useSelector(getThemeState);
  const { Content } = Layout;
  return (
    <Layout className={`layout-category ${theme ? "theme" : ""}`}>
      <Content>
        <h1 className="text-h1">Categories</h1>
        <FromCategory />
        <TableCategory />
      </Content>
    </Layout>
  );
}

export default React.memo(Category);
