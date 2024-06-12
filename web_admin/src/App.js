import "./App.scss";
import { Layout } from "antd";
import SiderMenu from "./components/siderMenu/SiderMenu";
import AppHeader from "./components/appHeader/AppHeader";
import AppContent from "./components/appContent/AppContent";
import { useLocation } from "react-router-dom";
function App() {
  const location = useLocation();
  const path = [
    "/home",
    "/users",
    "/reviews",
    "/promotions",
    "/order",
    "/tables",
    "/menu",
    "/report",
    "/categories",
    "/Profile",
    "/logout",
  ];
  let checkPath = path.includes(location.pathname);
  return (
    <Layout>
      {checkPath ? <SiderMenu /> : ""}
      <Layout>
        {checkPath ? <AppHeader /> : ""}
        <AppContent />
      </Layout>
    </Layout>
  );
}

export default App;
