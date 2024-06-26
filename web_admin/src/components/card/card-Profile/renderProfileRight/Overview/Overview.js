import React from "react";
import "./Overview.scss";
import { useSelector } from "react-redux";
import { getMeState, getThemeState } from "../../../../../store/selector";
const Overview = () => {
  console.log("render Overview");
  const theme = useSelector(getThemeState);
  const getMe = useSelector(getMeState);
  const { isDataMe } = getMe;
  const data = isDataMe?.user;
  return (
    <div className={`layout-overview ${theme ? "theme" : ""}`}>
      <h5>Chi Tiết Hồ Sơ</h5>
      <div className="p">
        <p>Full Name</p>
        <p>{data?.fullName || "Phùng Hưng"}</p>
      </div>
      <div className="p">
        <p>Email</p>
        <p>{data?.email || "Phungloc6102003@gmail.com"}</p>
      </div>
      <div className="p">
        <p>Role</p>
        <p>{data?.role || "Admin"}</p>
      </div>
      <div className="p">
        <p>Status</p>
        <p>{data?.isVerified ? "Online" : "Offline" || "demo offline"}</p>
      </div>
    </div>
  );
};

export default Overview;
