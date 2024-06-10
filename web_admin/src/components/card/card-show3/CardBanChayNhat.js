import React from "react";
import { Card } from "antd";
import "./CardBanChayNhat.scss";
import { EllipsisOutlined } from "@ant-design/icons";
import product from "../../../images/product-2.jpg";
import { Link } from "react-router-dom";

function CardBanChayNhat(props) {
  console.log("render CardBanChayNhat");
  return (
    <Card
      className={`content-ban-chay-nhat`}
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
        <table className="content-box">
          <thead>
            <tr>
              <th>Hình ảnh</th>
              <th>Sản phẩm</th>
              <th>Giá</th>
              <th>Đã bán</th>
              <th>Doanh thu</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <Link to={"/chiTietSanPham"} className="link-img">
                  <img src={product} alt="products-1" />
                </Link>
              </th>
              <td className="text-mt">Cá viên chiên</td>
              <td>$10</td>
              <td className="text-da-ban">20</td>
              <td>$2000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default React.memo(CardBanChayNhat);
