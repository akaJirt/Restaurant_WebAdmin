import { Routes, Route } from "react-router-dom";

import React from "react";
import Home from "../../../pages/home";
import User from "../../../pages/users/User";
import Review from "../../../pages/reviews/Review";
import Promotion from "../../../pages/promotions/Promotion";
import Order from "../../../pages/orders/Order";
import Category from "../../../pages/categories/Category";
import Menu from "../../../pages/menu/Menu";
import Report from "../../../pages/report/Report";
import NavLinkHeaderHomeB from "../navLinkHeaderHome-B/NavLinkHeaderHomeB";
import "./NavLinkMenu.scss";
import { useSelector } from "react-redux";
import { getSliderState, getThemeState } from "../../../store/selector";
function NavLinkMenu(props) {
  console.log("render NavLinkMenu");
  const theme = useSelector(getThemeState);
  const slider = useSelector(getSliderState);

  return (
    <div className={`box-menu ${theme ? "theme" : ""}`}>
      <NavLinkHeaderHomeB className={`content-menu ${slider ? "" : "none"}`} />
      <div className={`routes ${slider ? "" : "none"}`}>
        <Routes>
          <Route path="/home" element={<Home />} end />
          <Route path="/users" element={<User />} />
          <Route path="/reviews" element={<Review />} />
          <Route path="/promotions" element={<Promotion />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </div>
    </div>
  );
}

export default NavLinkMenu;
