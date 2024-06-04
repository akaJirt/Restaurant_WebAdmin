import React from "react";
import { Card } from "antd";
import "./CardBanChayNhat.scss";
import { EllipsisOutlined } from "@ant-design/icons";
import product from "../../../images/product-2.jpg";
function CardBanChayNhat(props) {
  console.log("render CardBanChayNhat");
  return (
    <Card
      className="content-ban-chay-nhat"
      title={
        <div className="box-title">
          <div className="box-text">
            <p>Bán chạy nhất</p>
            <span>| Hôm nay</span>
          </div>
          <EllipsisOutlined className="icon-ellips" />
        </div>
      }
      bordered={false}
    >
      <div className="content-body">
        <div className="content-box">
          <ul className="box-ul">
            <li className="item-li">Hình ảnh</li>
            <li className="item-li item-sp">Sản phẩm</li>
            <li className="item-li">Giá</li>
            <li className="item-li">Đã bán</li>
            <li className="item-li">Doanh thu</li>
          </ul>
        </div>
        <div className="content-box-sp">
          <ul className="box-ul">
            <li className="item-li item-img">
              <img src={product} alt="product-1" />
            </li>
            <li className="item-li item-sp">
              Món ăn này quá ngon tôi sẽ ăn quài lun
            </li>
            <li className="item-li">20</li>
            <li className="item-li item-da-ban">10</li>
            <li className="item-li">$200</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

export default CardBanChayNhat;
