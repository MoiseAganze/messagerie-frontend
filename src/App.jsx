import Login from "./pages/Login";
import Messagerie from "./pages/Messagerie";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<Messagerie />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
