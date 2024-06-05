import React from "react";
import { NavLink } from "react-router-dom";
function NavLinkHeaderHomeB(props) {
  console.log("render NavLinkHeaderHomeB");
  return (
    <div className="box-2">
      <ul className="box-ul">
        <li className="item-li">
          <NavLink end className={"item-nav"} to="home">
            Home
          </NavLink>
        </li>
        <li className="item-li">
          <NavLink end className={"item-nav"} to="quanLiBan">
            Quản Lí Bàn
          </NavLink>
        </li>
        <li className="item-li">
          <NavLink end className={"item-nav"} to="quanLiMenu">
            Quản Lí Menu
          </NavLink>
        </li>
        <li className="item-li">
          <NavLink end className={"item-nav"} to="quanLiUsers">
            Quản Lí Users
          </NavLink>
        </li>

        <li className="item-li">
          <NavLink end className={"item-nav"} to="quanLiDatBanOnline">
            Quản Lí Đặt Bàn Online
          </NavLink>
        </li>
      </ul>
      <ul className="box-ul">
        <li className="item-li">
          <NavLink end className={"item-nav"} to="quanLiThongKe">
            Quản Lí Thống Kê Và Báo Cáo
          </NavLink>
        </li>
        <li className="item-li">
          <NavLink end className={"item-nav"} to="quanLiKhuyenMai">
            Quản Lí Khuyến Mãi Và Thông Báo
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default React.memo(NavLinkHeaderHomeB);
