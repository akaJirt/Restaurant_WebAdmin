import React from "react";
import { NavLink } from "react-router-dom";
function NavLinkHeaderHomeB(props) {
  console.log("render NavLinkHeaderHomeB");

  return (
    <div className="box-2">
      <ul className="box-ul">
        <li className="item-li">
          <NavLink
            end
            className={"item-nav"}
            to="home"
            style={({ isActive }) => ({
              color: isActive ? "#4154f1" : "",
              backgroundColor: isActive ? "#f6f9ff" : "",
              textShadow: isActive ? "2px 2px 4px rgba(0, 0, 0, 0.5)" : "",
            })}
          >
            Home
          </NavLink>
        </li>
        <li className="item-li">
          <NavLink
            end
            className={"item-nav"}
            to="quanLiBan"
            style={({ isActive }) => ({
              color: isActive ? "#4154f1" : "",
              backgroundColor: isActive ? "#f6f9ff" : "",
              textShadow: isActive ? "2px 2px 4px rgba(0, 0, 0, 0.5)" : "",
            })}
          >
            Quản Lí Bàn
          </NavLink>
        </li>
        <li className="item-li">
          <NavLink
            end
            className={"item-nav"}
            to="quanLiMenu"
            style={({ isActive }) => ({
              color: isActive ? "#4154f1" : "",
              backgroundColor: isActive ? "#f6f9ff" : "",
              textShadow: isActive ? "2px 2px 4px rgba(0, 0, 0, 0.5)" : "",
            })}
          >
            Quản Lí Menu
          </NavLink>
        </li>
        <li className="item-li">
          <NavLink
            end
            className={"item-nav"}
            to="quanLiUsers"
            style={({ isActive }) => ({
              color: isActive ? "#4154f1" : "",
              backgroundColor: isActive ? "#f6f9ff" : "",
              textShadow: isActive ? "2px 2px 4px rgba(0, 0, 0, 0.5)" : "",
            })}
          >
            Quản Lí Users
          </NavLink>
        </li>

        <li className="item-li">
          <NavLink
            end
            className={"item-nav"}
            to="quanLiDatBanOnline"
            style={({ isActive }) => ({
              color: isActive ? "#4154f1" : "",
              backgroundColor: isActive ? "#f6f9ff" : "",
              textShadow: isActive ? "2px 2px 4px rgba(0, 0, 0, 0.5)" : "",
            })}
          >
            Quản Lí Đặt Bàn Online
          </NavLink>
        </li>
      </ul>
      <ul className="box-ul">
        <li className="item-li">
          <NavLink
            end
            className={"item-nav"}
            to="quanLiThongKe"
            style={({ isActive }) => ({
              color: isActive ? "#4154f1" : "",
              backgroundColor: isActive ? "#f6f9ff" : "",
              textShadow: isActive ? "2px 2px 4px rgba(0, 0, 0, 0.5)" : "",
            })}
          >
            Quản Lí Thống Kê Và Báo Cáo
          </NavLink>
        </li>
        <li className="item-li">
          <NavLink
            end
            className={"item-nav"}
            to="quanLiKhuyenMai"
            style={({ isActive }) => ({
              color: isActive ? "#4154f1" : "",
              backgroundColor: isActive ? "#f6f9ff" : "",
              textShadow: isActive ? "2px 2px 4px rgba(0, 0, 0, 0.5)" : "",
            })}
          >
            Quản Lí Khuyến Mãi Và Thông Báo
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default React.memo(NavLinkHeaderHomeB);
