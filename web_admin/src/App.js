import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/navigation/Naviagtion";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Navigation />} />
      </Routes>
    </Router>
  );
}

export default App;
