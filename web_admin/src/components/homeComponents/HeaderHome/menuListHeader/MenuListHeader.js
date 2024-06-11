import React from "react";
import { Menu } from "antd";
import {
  HomeFilled,
  PieChartFilled,
  UserOutlined,
  DropboxSquareFilled,
  StarFilled,
  SettingFilled,
  TagFilled,
  HddFilled,
  BoxPlotFilled,
} from "@ant-design/icons";
import { Layout } from "antd";
import "./MenuListHeader.scss";
import { Link, useLocation } from "react-router-dom";

const MenuListHeader = ({ collapsed, className, className2, className3 }) => {
  const { Sider } = Layout;
  const location = useLocation();

  const items = [
    {
      className: "box-item",
      key: "/home",
      icon: <HomeFilled className="item-icon" />,
      label: (
        <Link to="/home" className="item-link">
          Home
        </Link>
      ),
    },
    {
      className: "box-item",

      key: "/users",
      icon: <UserOutlined />,
      label: (
        <Link to="/users" className="item-link">
          Users
        </Link>
      ),
    },
    {
      className: "box-item",

      key: "/reviews",
      icon: <StarFilled />,
      label: (
        <Link to="/reviews" className="item-link">
          Reviews
        </Link>
      ),
    },
    {
      className: "box-item",

      key: "/promotions",
      icon: <TagFilled />,
      label: (
        <Link to="/promotions" className="item-link">
          Promotions
        </Link>
      ),
    },
    {
      className: "box-item",

      key: "/order",
      icon: <DropboxSquareFilled />,
      label: (
        <Link to="/order" className="item-link">
          Order
        </Link>
      ),
    },
    {
      className: "box-item",

      key: "/tables",
      icon: <BoxPlotFilled />,
      label: (
        <Link to="/tables" className="item-link">
          Tables
        </Link>
      ),
    },
    {
      className: "box-item",

      key: "/menu",
      icon: <HddFilled />,
      label: (
        <Link to="/menu" className="item-link">
          Menu
        </Link>
      ),
    },
    {
      className: "box-item",

      key: "/report",
      icon: <PieChartFilled />,
      label: (
        <Link to="/report" className="item-link">
          Report
        </Link>
      ),
    },
    {
      className: "box-item",

      key: "/categories",
      icon: <SettingFilled />,
      label: (
        <Link to="/categories" className="item-link">
          Categories
        </Link>
      ),
    },
  ];
  return (
    <Layout className={className}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className={className2}
      >
        <Menu
          className={className3}
          defaultSelectedKeys={location.pathname ? location.pathname : "/home"}
          selectedKeys={[location.pathname]}
          mode="inline"
          items={items}
        />
      </Sider>
    </Layout>
  );
};

export default MenuListHeader;
