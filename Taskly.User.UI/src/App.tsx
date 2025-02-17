import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { LoginPage } from "./Components/Pages/Login/LoginPage";
import { MainPage } from "./Components/Pages/Main/MainPage";
import { RegistrationPage } from "./Components/Pages/Registration/RegistrationPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegistrationPage />}></Route>
        <Route path="/" element={<MainPage />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
