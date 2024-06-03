import React, { useState } from "react";
import "./HeaderHome.scss";
import logo from "../../../images/logo.png";
import { MenuOutlined } from "@ant-design/icons";
import NavLinkHeaderHomeB from "../../navigation/navLinkHeaderHome-B/NavLinkHeaderHomeB";
import NavLinkHeaderHomeF from "../../navigation/navLinkHeaderHome-F/NavLinkHeaderHomeF";
const HeaderHome = (props) => {
  console.log("render HeaderHome");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClickOpenMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`header-content ${isMenuOpen ? "menu-open" : ""}`}>
      <div className="logo-text">
        <img src={logo} alt="logo" />
        <span>NiceAdmin</span>
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
