import React from "react";
import {
  HomeFilled,
  UserOutlined,
  StarFilled,
  TagFilled,
  DropboxSquareFilled,
  BoxPlotFilled,
  SettingFilled,
  ShopFilled,
  ProfileFilled,
} from "@ant-design/icons";
import "./SiderMenu.scss";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getThemeState } from "../../store/selector";
const SiderMenu = () => {
  console.log("render SiderMenu");
  const { Sider } = Layout;
  const location = useLocation();
  const theme = useSelector(getThemeState);
  const items = [
    {
      className: "item-menu",
      key: "/home",
      icon: <HomeFilled className="item-icon" />,
      label: (
        <Link to="/home" className="item-link">
          Home
        </Link>
      ),
    },
    {
      className: "item-menu",
      key: "/users",
      icon: <UserOutlined className="item-icon" />,
      label: (
        <Link to="/users" className="item-link">
          User
        </Link>
      ),
    },
    {
      className: "item-menu",
      key: "/reviews",
      icon: <StarFilled className="item-icon" />,
      label: (
        <Link to="/reviews" className="item-link">
          Reviews
        </Link>
      ),
    },
    {
      className: "item-menu",
      key: "/promotions",
      icon: <TagFilled className="item-icon" />,
      label: (
        <Link to="/promotions" className="item-link">
          Promotions
        </Link>
      ),
    },
    {
      className: "item-menu",
      key: "/order",
      icon: <DropboxSquareFilled className="item-icon" />,
      label: (
        <Link to="/order" className="item-link">
          Order
        </Link>
      ),
    },
    {
      className: "item-menu",
      key: "/tables",
      icon: <BoxPlotFilled className="item-icon" />,
      label: (
        <Link to="/tables" className="item-link">
          Tables
        </Link>
      ),
    },
    {
      className: "item-menu",
      key: "/menu",
      icon: <ShopFilled className="item-icon" />,
      label: (
        <Link to="/menu" className="item-link">
          Menu
        </Link>
      ),
    },
    {
      className: "item-menu",
      key: "/profile",
      icon: <ProfileFilled className="item-icon" />,
      label: (
        <Link to="/profile" className="item-link">
          Profile
        </Link>
      ),
    },
    {
      className: "item-menu",
      key: "/categories",
      icon: <SettingFilled className="item-icon" />,
      label: (
        <Link to="/categories" className="item-link">
          Categories
        </Link>
      ),
    },
  ];
  return (
    <Sider
      className="custom-sider"
      style={{ background: theme ? "#18172b" : "#f9fafc" }}
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <Menu
        className={`menu ${theme ? "theme" : ""}`}
        mode="inline"
        defaultSelectedKeys={location.pathname ? location.pathname : ["/home"]}
        selectedKeys={location.pathname}
        items={items}
      />
    </Sider>
  );
};

export default SiderMenu;
