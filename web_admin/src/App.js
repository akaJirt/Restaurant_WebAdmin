import "./App.scss";
import { Layout } from "antd";
import SiderMenu from "./components/siderMenu/SiderMenu";
import AppHeader from "./components/appHeader/AppHeader";
import AppContent from "./components/appContent/AppContent";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAccessTokenState } from "./store/selector";

function App() {
  const location = useLocation();
  const accessToken = useSelector(getAccessTokenState);

  const path = [
    "/",
    "/users",
    "/reviews",
    "/promotions",
    "/order",
    "/tables",
    "/menu",
    "/report",
    "/categories",
    "/profile",
  ];
  let checkPath = path.includes(location.pathname);
  return (
    <Layout>
      {checkPath && accessToken ? <SiderMenu /> : ""}
      <Layout>
        {checkPath && accessToken ? <AppHeader /> : ""}
        <AppContent />
      </Layout>
    </Layout>
  );
}

export default App;
