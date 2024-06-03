import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/users";
import RegisterForm from "./components/quanLiUsers/RegisterForm";
import ErrorPage from "./pages/error/ErrorPage";
import Home from "./pages/home";
import QuanLiBan from "./pages/quanLiBan";
import QuanLiUser from "./pages/quanLiUsers";
import QuanLiMenu from "./pages/quanLiMenu";
import QuanLiDatBanOnline from "./pages/quanLiDatBanOnline";
import QuanLiThongKeVaBaoCao from "./pages/quanLiThongKeVaBaoCao";
import QuanLiKhuyenMaiVaThongBao from "./pages/quanLiKhuyenMaiVaThongBao";
import HeaderHome from "./components/Header/headerHomes/HeaderHome";
import { HeaderStore } from "./components/navigation/navHeaderStore/HeaderStore";
import Profile from "./pages/quanLiProfile/Profile";
import { useSelector } from "react-redux";
import { getHeaderState } from "./store/selector";
function App() {
  const showHeader = useSelector(getHeaderState);
  return (
    <Router>
      {showHeader === true ? <HeaderHome /> : ""}
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<RegisterForm />} />
        {/*----------------- HEADER HOME ------------------- */}
        <Route element={<HeaderStore />}>
          <Route path="home" element={<Home />} end />
          <Route path="quan-li-ban" element={<QuanLiBan />} />
          <Route path="quan-li-users" element={<QuanLiUser />} />
          <Route path="quan-li-menu" element={<QuanLiMenu />} />
          <Route
            path="quan-li-dat-ban-online"
            element={<QuanLiDatBanOnline />}
          />
          <Route path="quan-li-thong-ke" element={<QuanLiThongKeVaBaoCao />} />
          <Route path="quan-li-km" element={<QuanLiKhuyenMaiVaThongBao />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
