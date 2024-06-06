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
  console.log(isMenuOpen, "isMenuOpen");
  const theme = useSelector(getThemeState);
  const handleClickOpenMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`header-content ${theme ? "theme" : ""} ${
        isMenuOpen ? "menu-open" : ""
      }`}
    >
      <div className="logo-text">
        <NavLink to={"/home"} className={"nav-link"}>
          <img src={logo} alt="logo" />
          <span>NiceAdmin</span>
        </NavLink>
        <MenuOutlined className="icon-menu" onClick={handleClickOpenMenu} />
      </div>
      {/*---------------- Nav Link Body------------- */}
      <NavLinkHeaderHomeB />
      {/*---------------- Nav Link Footer------------- */}
      <NavLinkHeaderHomeF />
    </header>
  );
};

export default HeaderHome;
