import Login from "./pages/Login";
import Messagerie from "./pages/Messagerie";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfil";
import AllProfile from "./pages/AllProfil";
import Messages from "./pages/Messages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<Messagerie />}>
          <Route
            path={""}
            element={
              <div className="w-full  flex flex-col gap-2 mb-48 px-4 lg:px-8 pt-10">
                <div className="w-full h-full flex flex-col gap-8 justify-center items-center text-base font-semibold text-center opacity-60 hover:opacity-100">
                  <img src="/wink.png" className="w-28 h-28" alt="" />
                  SELECTIONNEZ UNE CONVERSATION POUR COMMENCER A DISCUTER
                </div>
              </div>
            }
          />
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
