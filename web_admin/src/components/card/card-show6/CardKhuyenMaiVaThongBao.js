import React from "react";
import { Card } from "antd";
import { EllipsisOutlined, SwapRightOutlined } from "@ant-design/icons";
import "./CardKhuyenMaiVaThongBao.scss";
import product from "../../../images/product-2.jpg";
import { useSelector } from "react-redux";
import { getThemeState } from "../../../store/selector";
const CardKhuyenMaiVaThongBao = (props) => {
  console.log("render cardKhuyenMaiVaThongBao");
  const theme = useSelector(getThemeState);

  return (
    <Card
      className={`content-km-tb ${theme ? "theme" : ""}`}
      title={
        <div className="box-title">
          <div className="box-text">
            <p>Khuyến mãi & Thông báo</p>
            <span>| Hôm nay</span>
          </div>
          <EllipsisOutlined className="icon-ellips" />
        </div>
      }
      bordered={false}
    >
      <div className="box-body">
        <div className="img">
          <img src={product} alt="products" />
        </div>
        <div className="item-p">
          <p>Món này đang sale 5%</p>
          <div className="item-s">
            <span>$10</span>
            <SwapRightOutlined className="icon-swap" />
            <span>$5</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default React.memo(CardKhuyenMaiVaThongBao);
