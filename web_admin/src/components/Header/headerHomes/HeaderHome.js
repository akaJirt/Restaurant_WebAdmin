import React, { useCallback, useState } from "react";
import "./HeaderHome.scss";
import logo from "../../../images/logo.png";
import { MenuOutlined } from "@ant-design/icons";
import NavLinkHeaderHomeF from "../../navigation/navLinkHeaderHome-F/NavLinkHeaderHomeF";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getThemeState } from "../../../store/selector";
import {
  setHideSlider,
  setShowSlider,
} from "../../../store/sliderShow/acttions";
const HeaderHome = (props) => {
  console.log("render HeaderHome");
  const [slider, setSlider] = useState(false);
  const theme = useSelector(getThemeState);
  const dispatch = useDispatch();
  const handleClickOpenMenu = useCallback(() => {
    if (slider) {
      setSlider(false);
      dispatch(setShowSlider());
    } else {
      setSlider(true);
      dispatch(setHideSlider());
    }
  }, [dispatch, slider]);

  return (
    <header className={`header-content ${theme ? "theme" : ""}`}>
      <MenuOutlined className="icon-menu" onClick={handleClickOpenMenu} />
      <div className="logo-text">
        <NavLink to={"/home"} className={"nav-link"}>
          <img src={logo} alt="logo" />
          <span>NiceAdmin</span>
        </NavLink>
      </div>
      {/*---------------- Nav Link Footer------------- */}
      <NavLinkHeaderHomeF />
    </header>
  );
};

export default HeaderHome;
