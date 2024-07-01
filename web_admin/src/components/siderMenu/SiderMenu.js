import React, { useMemo } from "react";
import {
  HomeFilled,
  UserOutlined,
  StarFilled,
  TagFilled,
  DropboxSquareFilled,
  BoxPlotFilled,
  SettingFilled,
  ShopFilled,
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

  const items = useMemo(
    () => [
      {
        className: "item-menu",
        key: "/",
        icon: <HomeFilled className="item-icon" />,
        label: (
          <Link to="/" className="item-link">
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
            Quản lý người dùng
          </Link>
        ),
      },
      {
        className: "item-menu",
        key: "/reviews",
        icon: <StarFilled className="item-icon" />,
        label: (
          <Link to="/reviews" className="item-link">
            Quản lý đánh giá
          </Link>
        ),
      },
      {
        className: "item-menu",
        key: "/promotions",
        icon: <TagFilled className="item-icon" />,
        label: (
          <Link to="/promotions" className="item-link">
            Quản lý khuyến mãi
          </Link>
        ),
      },
      {
        className: "item-menu",
        key: "/order",
        icon: <DropboxSquareFilled className="item-icon" />,
        label: (
          <Link to="/order" className="item-link">
            Quản lý đơn hàng
          </Link>
        ),
      },
      {
        className: "item-menu",
        key: "/tables",
        icon: <BoxPlotFilled className="item-icon" />,
        label: (
          <Link to="/tables" className="item-link">
            Quản lý bàn
          </Link>
        ),
      },
      {
        className: "item-menu",
        key: "/menu",
        icon: <ShopFilled className="item-icon" />,
        label: (
          <Link to="/menu" className="item-link">
            Quản lý thực đơn
          </Link>
        ),
      },
      {
        className: "item-menu",
        key: "/categories",
        icon: <SettingFilled className="item-icon" />,
        label: (
          <Link to="/categories" className="item-link">
            Quản lý danh mục
          </Link>
        ),
      },
    ],
    []
  );

  return (
    <Sider
      className="custom-sider"
      style={{ background: theme ? "#18172b" : "#f9fafc" }}
      breakpoint="lg"
      collapsedWidth="0"
      width={200}
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
        defaultSelectedKeys={[location.pathname]}
        selectedKeys={[location.pathname]}
        items={items}
      />
    </Sider>
  );
};

export default React.memo(SiderMenu);
