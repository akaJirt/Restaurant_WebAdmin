import React from "react";
import { EllipsisOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { Card } from "antd";
import "./CardHome3.scss";
import { useSelector } from "react-redux";
import { getThemeState } from "../../../store/selector";
function CardHome3(props) {
  console.log("render CardHome3");
  const theme = useSelector(getThemeState);

  return (
    <Card
      className={`card-3 ${theme ? "theme" : ""}`}
      title={
        <div className="content-title">
          <div className="content-title-box-1">
            <p className="text-banHang">Khách hàng</p>
            <span className="text-homNay">| Năm nay</span>
          </div>
          <EllipsisOutlined className="icon-ellips" />
        </div>
      }
      bordered={false}
    >
      <div className="content-body-3">
        <div className="icon-userGroup">
          <div className="ic-ne">
            <UsergroupAddOutlined className="ic" />
          </div>
        </div>
        <div className="content-body-box-2">
          <h6 className="h6">1245</h6>
          <div className="span">
            <span>giảm</span>
            <span>12%</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default React.memo(CardHome3);
