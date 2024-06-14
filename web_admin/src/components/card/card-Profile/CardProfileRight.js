import React, { useState } from "react";
import { Card } from "antd";
import "./CardProfileRight.scss";
import RenderProfileRight from "./renderProfileRight/RenderProfileRight";
import {
  CHANGE_PASSWORD,
  EDIT_PROFILE,
  OVERVIEW,
} from "../../../utils/contants";

const CardProfileRight = () => {
  console.log("render CardProfileRight");
  const [changeTab, setChangeTab] = useState(OVERVIEW);
  return (
    <Card
      className="card-profile2"
      title={
        <ul className="box-title">
          <li
            onClick={() => setChangeTab(OVERVIEW)}
            className={`li ${changeTab === OVERVIEW ? "click" : ""}`}
          >
            Overview
          </li>
          <li
            onClick={() => setChangeTab(EDIT_PROFILE)}
            className={`li ${changeTab === EDIT_PROFILE ? "click" : ""}`}
          >
            Edit Profile
          </li>
          <li
            onClick={() => setChangeTab(CHANGE_PASSWORD)}
            className={`li ${changeTab === CHANGE_PASSWORD ? "click" : ""}`}
          >
            Change Password
          </li>
        </ul>
      }
      bordered={false}
    >
      <RenderProfileRight changeTab={changeTab} />
    </Card>
  );
};

export default CardProfileRight;
