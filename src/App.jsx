import Login from "./pages/Login";
import Messagerie from "./pages/Messagerie";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfil";
import AllProfile from "./pages/AllProfil";
import Messages from "./pages/Messages";
import ListConversations from "./pages/ListConversations";
import AccueilMobile from "./pages/AccueilMobile";
import Test from "./Test";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route path={"/"} element={<Messagerie />}>
          <Route path={""} element={<AccueilMobile />} />
          <Route path={"conversation/:id/:friendid"} element={<Messages />} />
        </Route>
        <Route path={"/login"} element={<Login />} />
        <Route path={"/profil"} element={<UserProfile />} />
        <Route path={"/user/:id"} element={<AllProfile />} />
        <Route path={"/register"} element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
