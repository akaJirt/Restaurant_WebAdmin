import React, { useCallback, useEffect } from "react";
import { Layout, FloatButton } from "antd";
import { CaretUpOutlined } from "@ant-design/icons";
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
import Profile from "../../pages/profiles/Profile";
import { useDispatch, useSelector } from "react-redux";
import { getScrollState } from "../../store/selector";
import { hideScrollTop, showScrollTop } from "../../store/scrollTop/actions";
const AppContent = () => {
  console.log("render App Content");
  const dispatch = useDispatch();
  const scroll = useSelector(getScrollState);
  const { Content } = Layout;
  const handleScroll = useCallback(() => {
    if (window.scrollY > 200) {
      dispatch(showScrollTop());
    } else {
      dispatch(hideScrollTop());
    }
  }, [dispatch]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const handleClickScroll = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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
            <Route path="/profile" element={<Profile />} />
            <Route path="/categories" element={<Category />} />
            {/* Route mặc định để bắt các đường dẫn không khớp */}
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </div>
      {scroll && (
        <FloatButton
          onClick={handleClickScroll}
          icon={<CaretUpOutlined />}
          type="primary"
        />
      )}
    </Content>
  );
};

export default React.memo(AppContent);
