import React from "react";
import { Card, Avatar } from "antd";
import avatar from "../../../images/messages-1.jpg";
import { FacebookFilled, InstagramFilled } from "@ant-design/icons";
import "./CardProfileLeft.scss";
const CardProfileLeft = () => {
  console.log("render CardProfileLeft");
  return (
    <Card bordered={false} className="card-profile-1">
      <Avatar
        size={120}
        src={<img src={avatar} alt="avatar" className="avatar" />}
      />
      <p className="p">Phùng Hưng</p>
      <div className="box-icon mt-3">
        <FacebookFilled className="ic-footer" />
        <InstagramFilled className="ic-footer" />
      </div>
    </Card>
  );
};

export default CardProfileLeft;
