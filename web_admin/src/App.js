import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/users";
import RegisterForm from "./components/quanLiUsers/RegisterForm";
import ErrorPage from "./pages/error/ErrorPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} /> */}
        <Route path="/" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
