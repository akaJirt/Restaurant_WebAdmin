import React from "react";
import "./Overview.scss";
import { useSelector } from "react-redux";
import { getLoginState, getThemeState } from "../../../../../store/selector";
const Overview = () => {
  console.log("render Overview");
  const theme = useSelector(getThemeState);
  const login = useSelector(getLoginState);
  const { isLogin } = login;
  return (
    <div className={`layout-overview ${theme ? "theme" : ""}`}>
      <h5>Chi Tiết Hồ Sơ</h5>
      <div className="p">
        <p>Full Name</p>
        <p>{isLogin?.DT?.userWithLogin?.userName || "Phùng Hưng"}</p>
      </div>
      <div className="p">
        <p>Email</p>
        <p>
          {isLogin?.DT?.userWithLogin?.email || "Phungloc6102003@gmail.com"}
        </p>
      </div>
      <div className="p">
        <p>Role</p>
        <p>{isLogin?.DT?.userWithLogin?.role || "Admin"}</p>
      </div>
      <div className="p">
        <p>Status</p>
        <p>{isLogin?.DT?.userWithLogin?.status || "demo offline"}</p>
      </div>
    </div>
  );
};

export default Overview;
