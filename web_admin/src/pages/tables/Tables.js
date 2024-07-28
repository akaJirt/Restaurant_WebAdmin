import React from "react";
import "./Tables.scss";
import FormTable from "../../components/form/formTables/FormTable";
import TableTable from "../../components/tables/tableTables/TableTable";
import { useSelector } from "react-redux";
import { getThemeState } from "../../store/selector";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
function Tables(props) {
  console.log("render tables");
  const theme = useSelector(getThemeState);
  return (
    <div className={`layout-table ${theme ? "theme" : ""}`}>
      <Tabs
        defaultActiveKey="Bàn"
        id="uncontrolled-tab-example"
        className="mb-3 mx-3"
      >
        <Tab eventKey="Bàn" title="Bàn">
          <TableTable />
        </Tab>
        <Tab eventKey="Tạo Bàn" title="Tạo Bàn">
          <FormTable />
        </Tab>
      </Tabs>
    </div>
  );
}

export default React.memo(Tables);
