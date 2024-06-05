import React from "react";
import "./CardMenu.scss";
import { Card } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import product from "../../../images/product-2.jpg";

const CardMenu = (props) => {
  console.log("render CardMenu");
  return (
    <Card
      className="content-dat-ban"
      title={
        <div className="box-title">
          <div className="box-text">
            <p>Menu</p>
            <span>| Hôm nay</span>
          </div>
          <EllipsisOutlined />
        </div>
      }
      bordered={false}
    >
      <div className="box-body">
        <table>
          <thead>
            <tr>
              <th>Hình ảnh</th>
              <th>Tên Món</th>
              <th>Giá</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <Link to={"#"} className="img">
                  <img src={product} alt="products-1" />
                </Link>
              </th>
              <td>Dưa leo xào mướp đắng</td>
              <td>$10</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default React.memo(CardMenu);
