import React from "react";
import { Card } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import "./CardChart.scss";
import LineChart from "../../chart/LineChart";

const CardChart = (props) => {
  console.log("render CardChart");

  return (
    <Card
      className="cart-chart"
      title={
        <div className="box-title">
          <div className="box-text">
            <p className="text-baoCao">Báo cáo</p>
            <span className="text-homNay">/Hôm nay</span>
          </div>
          <EllipsisOutlined className="icon-ellips" />
        </div>
      }
      bordered={false}
    >
      <div className="box-body">
        <LineChart />
      </div>
    </Card>
  );
};

export default React.memo(CardChart);
