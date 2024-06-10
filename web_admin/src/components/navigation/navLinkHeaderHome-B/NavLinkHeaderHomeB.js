import React from "react";
import { NavLink } from "react-router-dom";
import "./NavLinkHeaderHomeB.scss";
import {
  HomeFilled,
  UserOutlined,
  DropboxSquareFilled,
  StarFilled,
  SettingFilled,
  PieChartFilled,
  TagFilled,
  HddFilled,
  BoxPlotFilled,
} from "@ant-design/icons";
function NavLinkHeaderHomeB({ className }) {
  console.log("render NavLinkHeaderHomeB");
  return (
    <div className={className}>
      <ul className="box-ul">
        <li className="item-li">
          <NavLink end className={"item-nav"} to="/home">
            <HomeFilled className="icon-menu" />
            Home
          </NavLink>
        </li>
        <li className="item-li">
          <NavLink end className={"item-nav"} to="/users">
            <UserOutlined className="icon-menu" />
            Users
          </NavLink>
        </li>
        <li className="item-li">
          <NavLink end className={"item-nav"} to="/reviews">
            <StarFilled className="icon-menu" />
            Reviews
          </NavLink>
        </li>
        <li className="item-li">
          <NavLink end className={"item-nav"} to="/promotions">
            <TagFilled className="icon-menu" />
            Promotions
          </NavLink>
        </li>
        <li className="item-li">
          <NavLink end className={"item-nav"} to="/orders">
            <DropboxSquareFilled className="icon-menu" />
            Orders
          </NavLink>
        </li>
        <li className="item-li">
          <NavLink end className={"item-nav"} to="/categories">
            <SettingFilled className="icon-menu" />
            Categories
          </NavLink>
        </li>
        <li className="item-li">
          <NavLink end className={"item-nav"} to="/tables">
            <BoxPlotFilled className="icon-menu" />
            Tables
          </NavLink>
        </li>
        <li className="item-li">
          <NavLink end className={"item-nav"} to="/menu">
            <HddFilled className="icon-menu" />
            Menu
          </NavLink>
        </li>
        <li className="item-li">
          <NavLink end className={"item-nav"} to="/report">
            <PieChartFilled className="icon-menu" />
            Report
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default NavLinkHeaderHomeB;
