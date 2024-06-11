import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import MenuList from "../menuList/MenuList";
import Home from "../../pages/home";
import User from "../../pages/users/User";
import Review from "../../pages/reviews/Review";
import Category from "../../pages/categories/Category";
import Promotion from "../../pages/promotions/Promotion";
import Order from "../../pages/orders/Order";
import Table from "../../pages/tables/Tables";
import Menu from "../../pages/menu/Menu";
import Report from "../../pages/report/Report";
import ErrorPage from "../../pages/error/ErrorPage";
import HeaderHome from "../homeComponents/HeaderHome/HeaderHome";
import "./Navigation.scss";

const Navigation = () => {
  let error = useLocation();
  const path = error.pathname;

  // Danh sách các đường dẫn hợp lệ
  const validPaths = [
    "/home",
    "/users",
    "/reviews",
    "/promotions",
    "/order",
    "/tables",
    "/menu",
    "/report",
    "/categories",
  ];

  // Hàm kiểm tra xem đường dẫn có hợp lệ hay không
  const isValidPath = (path) => {
    return validPaths.includes(path);
  };

  // Kiểm tra nếu đường dẫn không hợp lệ, hiển thị ErrorPage
  if (!isValidPath(path)) {
    // Tùy chỉnh xử lý khi đường dẫn không hợp lệ ở đây
    return <ErrorPage />;
  }
  return (
    <>
      <HeaderHome />
      <div className={`content-nav`}>
        <MenuList />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/users" element={<User />} />
          <Route path="/reviews" element={<Review />} />
          <Route path="/promotions" element={<Promotion />} />
          <Route path="/order" element={<Order />} />
          <Route path="/tables" element={<Table />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/report" element={<Report />} />
          <Route path="/categories" element={<Category />} />
          {/* Route mặc định để bắt các đường dẫn không khớp */}
          <Route element={<ErrorPage />} />
        </Routes>
      </div>
    </>
  );
};

export default Navigation;
