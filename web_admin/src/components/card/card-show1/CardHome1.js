import React from "react";
import { EllipsisOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Card } from "antd";
import "./CardHome1.scss";

function CardHome1(props) {
  console.log("render CardHome1");
  return (
    <Card
      className={`card-1 `}
      title={
        <div className="content-title">
          <div className="content-title-box-1">
            <p className="text-banHang">Bán hàng</p>
            <span className="text-homNay">| Hôm nay</span>
          </div>
          <EllipsisOutlined className="icon-ellips" />
        </div>
      }
      bordered={false}
    >
      <div className="content-body">
        <div className="icon-cart">
          <ShoppingCartOutlined className="ic" />
        </div>
        <div className="content-body-box-2">
          <h6 className="h6">145</h6>
          <div className="span">
            <span>tăng</span>
            <span>12%</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default React.memo(CardHome1);
