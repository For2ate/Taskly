import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { LoginPage } from "./Components/Pages/Login/LoginPage";
import { RegistrationPage } from "./Components/Pages/Registration/RegistrationPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegistrationPage />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
