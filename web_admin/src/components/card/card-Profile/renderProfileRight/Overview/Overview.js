import React from "react";
import "./Overview.scss";
import { useSelector } from "react-redux";
import { getThemeState } from "../../../../../store/selector";
const Overview = () => {
  console.log("render Overview");
  const theme = useSelector(getThemeState);
  return (
    <div className={`layout-overview ${theme ? "theme" : ""}`}>
      <h5>Chi Tiết Hồ Sơ</h5>
      <div className="p">
        <p>Full Name</p>
        <p>Phùng Hưng</p>
      </div>
      <div className="p">
        <p>Email</p>
        <p>Phungloc6102003@gmail.com</p>
      </div>
      <div className="p">
        <p>Role</p>
        <p>Admin</p>
      </div>
    </div>
  );
};

export default Overview;
