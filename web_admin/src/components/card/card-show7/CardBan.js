import React from "react";
import { Card } from "antd";
import { EllipsisOutlined, SmileFilled } from "@ant-design/icons";
import "./CardBan.scss";

import qr from "../../../images/QR_code.png";
const CardBan = (props) => {
  console.log("render CardBan");
  return (
    <Card
      className={`card-ban`}
      title={
        <div className="box-title">
          <div className="box-text">
            <p>Tất cả bàn</p>
            <span>| Hôm nay</span>
          </div>
          <EllipsisOutlined className="icon-ellips" />
        </div>
      }
      bordered={false}
    >
      <div className="box-body">
        <div className="item-ban">
          <span className="so-ban">Bàn Số 1</span>
          <SmileFilled className="icon-smile" title="Bàn trống" />
        </div>
        <div className="item-status">
          <img src={qr} alt="qr" />
        </div>
      </div>
    </Card>
  );
};

export default React.memo(CardBan);
