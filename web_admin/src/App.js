import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorPage from "./pages/error/ErrorPage";
import HeaderHome from "./components/Header/headerHomes/HeaderHome";
import { HeaderStore } from "./components/navigation/navHeaderStore/HeaderStore";
import { useSelector } from "react-redux";
import { getHeaderState } from "./store/selector";
import NavLinkMenu from "./components/navigation/navLinkMenu/NavLinkMenu";
import Login from "./pages/login/Login";
function App() {
  const showHeader = useSelector(getHeaderState);
  return (
    <Router>
      {showHeader === true ? <HeaderHome /> : ""}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<HeaderStore />}>
          <Route path="*" element={<NavLinkMenu />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
