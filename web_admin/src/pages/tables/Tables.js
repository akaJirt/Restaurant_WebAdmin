import { Layout } from "antd";
import React from "react";
import "./Tables.scss";
import FormTable from "../../components/form/formTables/FormTable";
import TableTable from "../../components/tables/tableTables/TableTable";
import { useSelector } from "react-redux";
import { getThemeState } from "../../store/selector";
function Tables(props) {
  console.log("render tables");
  const { Content } = Layout;
  const theme = useSelector(getThemeState);
  return (
    <Layout className={`layout-table ${theme ? "theme" : ""}`}>
      <Content>
        <h1 className="text-h1">Tables</h1>
        <FormTable />
        <TableTable />
      </Content>
    </Layout>
  );
}

export default React.memo(Tables);
