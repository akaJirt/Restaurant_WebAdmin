import React, { useState } from "react";
import "./HeaderHome.scss";
import logo from "../../../images/logo.png";
import { MenuOutlined } from "@ant-design/icons";
import NavLinkHeaderHomeB from "../../navigation/navLinkHeaderHome-B/NavLinkHeaderHomeB";
import NavLinkHeaderHomeF from "../../navigation/navLinkHeaderHome-F/NavLinkHeaderHomeF";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { getThemeState } from "../../../store/selector";
const HeaderHome = (props) => {
  console.log("render HeaderHome");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const theme = useSelector(getThemeState);
  console.log(theme, "theme");
  const handleClickOpenMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`header-content ${
        isMenuOpen || theme ? "menu-open theme" : ""
      }`}
    >
      <NavLink to={"/home"} className="logo-text">
        <img src={logo} alt="logo" />
        <span>NiceAdmin</span>
        <MenuOutlined className="icon-menu" onClick={handleClickOpenMenu} />
      </NavLink>
      {/*---------------- Nav Link Body------------- */}
      <NavLinkHeaderHomeB />
      {/*---------------- Nav Link Footer------------- */}
      <NavLinkHeaderHomeF />
    </header>
  );
};

export default HeaderHome;
