import React from "react";
import { Layout } from "antd";
import Home from "../../pages/home";
import User from "../../pages/users/User";
import Review from "../../pages/reviews/Review";
import Promotion from "../../pages/promotions/Promotion";
import Order from "../../pages/orders/Order";
import Tables from "../../pages/tables/Tables";
import Login from "../../pages/login/Login";
import Menu from "../../pages/menu/Menu";
import Report from "../../pages/report/Report";
import Category from "../../pages/categories/Category";
import ErrorPage from "../../pages/error/ErrorPage";
import { Routes, Route } from "react-router-dom";
import { NavPrivate, NavPublic } from "../navigation/Navigation";
const AppContent = () => {
  console.log("render App Content");
  const { Content } = Layout;

  return (
    <Content
      style={{
        margin: "0",
      }}
    >
      <div
        style={{
          minHeight: 360,
          background: "#f6f9ff",
          borderRadius: "#f6f9ff",
        }}
      >
        <Routes>
          <Route element={<NavPublic />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<NavPrivate />}>
            <Route path="/home" element={<Home />} />
            <Route path="/users" element={<User />} />
            <Route path="/reviews" element={<Review />} />
            <Route path="/promotions" element={<Promotion />} />
            <Route path="/order" element={<Order />} />
            <Route path="/tables" element={<Tables />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/report" element={<Report />} />
            <Route path="/categories" element={<Category />} />
            {/* Route mặc định để bắt các đường dẫn không khớp */}
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </div>
    </Content>
  );
};

export default AppContent;
