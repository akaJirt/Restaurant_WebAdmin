import React from "react";
import "./CardDatBan.scss";
import { Card, Tag } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";

const CardDatBan = (props) => {
  console.log("render CardDatBan");

  return (
    <Card
      className="content-ban-gan-day"
      title={
        <div className="box-title">
          <div className="item-text">
            <p>Khách đặt bàn</p>
            <span>| Hôm nay</span>
          </div>
          <EllipsisOutlined />
        </div>
      }
      bordered={false}
    >
      <div className="box-body">
        <div className="box-danh-muc">
          <div className="item-1">
            <select>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
            <span>mục trang</span>
          </div>
          <div className="item-2">
            <input placeholder="Tìm Kiếm..." title="tìm kiếm trong bảng" />
          </div>
        </div>
        <table className="table-body">
          <thead>
            <tr>
              <th>Id</th>
              <th>Khách hàng</th>
              <th>Bàn đặt</th>
              <th>Giá cọc trước</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mr Tỏn</td>
              <td>2</td>
              <td>$200</td>
              <td>
                <Tag color="#108ee9">success</Tag>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default React.memo(CardDatBan);
