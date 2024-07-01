import React from "react";
import { Card, Avatar } from "antd";
import avatar from "../../../images/messages-1.jpg";
import {
  FacebookFilled,
  InstagramFilled,
  LoadingOutlined,
} from "@ant-design/icons";
import "./CardProfileLeft.scss";
import { useSelector } from "react-redux";
import {
  getMeState,
  getThemeState,
  updateMeState,
} from "../../../store/selector";
const CardProfileLeft = () => {
  console.log("render CardProfileLeft");
  const theme = useSelector(getThemeState);
  const getMe = useSelector(getMeState);
  const updateState = useSelector(updateMeState);
  const { isLoadingUpdateMe } = updateState;
  return (
    <Card bordered={false} className={`card-profile-1 ${theme ? "theme" : ""}`}>
      <Avatar
        size={120}
        src={
          isLoadingUpdateMe ? (
            <LoadingOutlined />
          ) : (
            <img
              src={getMe?.isDataMe?.img_avatar_url || avatar}
              alt="avatar"
              className="avatar"
            />
          )
        }
      />
      <p className="p">{getMe?.isDataMe?.fullName || "Phùng Hưng"}</p>
      <div className="box-icon mt-3">
        <FacebookFilled className="ic-footer" />
        <InstagramFilled className="ic-footer" />
      </div>
    </Card>
  );
};

export default CardProfileLeft;
