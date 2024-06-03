import React, { useState } from "react";
import messages from "../../../images/messages-1.jpg";
import {
  CaretDownOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setHideHeader } from "../../../store/headerShow/actions";

const NavLinkHeaderHomeF = (props) => {
  console.log("render NavLinkHeaderHomeF");
  const dispatch = useDispatch();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleClickUser = () => {
    setIsProfileOpen(!isProfileOpen);
  };
  const handleClickProfile = () => {
    dispatch(setHideHeader());
  };
  return (
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
            <NavLink to={"/profile"} className={"nav-con"} end>
              <UserOutlined className="icon-con" /> My Profile
            </NavLink>
          </li>
          <li className="li-con li-sign-out">
            <LogoutOutlined className="icon-con" />
            Sign out
          </li>
        </ul>
      </div>
    </div>
  );
};

export default React.memo(NavLinkHeaderHomeF);
