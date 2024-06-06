import React, { useState } from "react";
import messages from "../../../images/messages-1.jpg";
import {
  CaretDownOutlined,
  UserOutlined,
  LogoutOutlined,
  SunOutlined,
  MoonOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setHideHeader } from "../../../store/headerShow/actions";
import { getThemeState } from "../../../store/selector";
import "./NavLinkHeaderHomeF.scss";
import { setHideTheme, setShowTheme } from "../../../store/theme/actions";
const NavLinkHeaderHomeF = (props) => {
  console.log("render NavLinkHeaderHomeF");
  const dispatch = useDispatch();
  const theme = useSelector(getThemeState);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleClickUser = () => {
    setIsProfileOpen(!isProfileOpen);
  };
  const handleClickProfile = () => {
    dispatch(setHideHeader());
  };

  const handleClickSun = () => {
    dispatch(setShowTheme());
  };
  const handleClickMoon = () => {
    dispatch(setHideTheme());
  };
  return (
    <div className={"content-box3"}>
      {theme ? (
        <MoonOutlined className="icon-moon" onClick={handleClickMoon} />
      ) : (
        <SunOutlined className="icon-sun" onClick={handleClickSun} />
      )}
      <div
        className={`box-3 ${isProfileOpen ? "profile-open" : ""}`}
        onClick={handleClickUser}
      >
        <div className="img">
          <img src={messages} alt="user" />
        </div>
        <span>
          Phùng Lộc <CaretDownOutlined className="icon-care" />
        </span>
        <div className="menu-con">
          <ul className="ul-con">
            <li className="li-con text-center">Phùng Lộc</li>
            <li className="li-con" onClick={handleClickProfile}>
              <Link to={"/profile"} className={"nav-con"} end>
                <UserOutlined className="icon-con" /> My Profile
              </Link>
            </li>
            <li className="li-con li-sign-out">
              <LogoutOutlined className="icon-con" />
              Sign out
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default React.memo(NavLinkHeaderHomeF);
