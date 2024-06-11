import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from "antd";
import SiderMenu from "./components/siderMenu/SiderMenu";
import AppHeader from "./components/appHeader/AppHeader";
import AppContent from "./components/appContent/AppContent";
function App() {
  return (
    <Router>
      <Layout>
        <SiderMenu />
        <Layout>
          <AppHeader />
          <AppContent />
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
