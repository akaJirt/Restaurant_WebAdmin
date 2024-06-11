import React from "react";
import { EllipsisOutlined, DollarOutlined } from "@ant-design/icons";
import { Card } from "antd";
import "./CardHome2.scss";
import { useSelector } from "react-redux";
import { getThemeState } from "../../../store/selector";
function CardHome2(props) {
  console.log("render CardHome2");
  const theme = useSelector(getThemeState);
  return (
    <Card
      className={`card-2 ${theme ? "theme" : ""}`}
      title={
        <div className="content-title">
          <div className="content-title-box-1">
            <p className="text-banHang">Doanh thu</p>
            <span className="text-homNay">| Tháng này</span>
          </div>
          <EllipsisOutlined className="icon-ellips" />
        </div>
      }
      bordered={false}
    >
      <div className="content-body-2">
        <div className="icon-dollar">
          <DollarOutlined className="ic" />
        </div>
        <div className="content-body-box-2">
          <h6 className="h6">$3,145</h6>
          <div className="span">
            <span>tăng</span>
            <span>8%</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default React.memo(CardHome2);
