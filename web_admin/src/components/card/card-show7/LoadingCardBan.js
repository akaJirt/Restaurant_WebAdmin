import { SmileFilled } from "@ant-design/icons";
import React from "react";

const LoadingCardBan = ({ data }) => {
  return (
    <div className="box-item-ban">
      <div className="item-ban">
        <span className="so-ban">{data.tableNumber}</span>
        <SmileFilled className="icon-smile" title="Bàn trống" />
      </div>
      <div className="item-status">
        <img src={data.qrCode} alt="qr" loading="lazy" />
      </div>
    </div>
  );
};

export default LoadingCardBan;
