import React, { useEffect, useState } from "react";
import { Navbar, Navbar2 } from "../components/Nav";
import ListConversations from "./ListConversations";
import { userData } from "../hooks/userData";
import {
  useNavigate,
  UNSAFE_NavigationContext as NavigationContext,
  Outlet,
} from "react-router-dom";
import AddFriend from "../components/AddFriend";
import ListFriendRequests from "./ListFriendRequests";
import ListFriends from "./ListFriends";
import { useSocket } from "../utils/socketContext";

export default function Messagerie() {
  const nav = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("kento");
    if (!token) {
      nav("/login");
    }
  }, []);
  const user_data = userData();
  const [side_index, set_side_index] = useState(0);
  const socket = useSocket();
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
    console.log("User data:", user_data); // Vérifiez si les données sont correctes
    if (user_data?.id) {
      socket.emit("user-connected", user_data.id);
    } else {
      console.warn("User ID manquant, socket.emit non envoyé.");
    }

    // Nettoyage lors du démontage
    return () => {
      socket.disconnect();
    };
  }, [user_data]); // Dépendance à `user_data`

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <AddFriend user_data={user_data} />
      <div className="w-full h-full flex relative">
        <div
          className={`absolute -left-72 lg:-left-96 z-40 top-0 lg:static ${
            open ? "translate-x-72 lg:translate-x-0" : "translate-x-0"
          } w-72 lg:w-96 lg:flex justify-center bg-base-300 h-screen transition`}
        >
          <div className="w-full min-height-screen">
            <Navbar2 set_side_index={set_side_index} />
            {side_index == 0 && <ListConversations handleOpen={handleOpen} />}
            {side_index == 1 && <ListFriends />}
            {side_index == 2 && (
              <ListFriendRequests set_side_index={set_side_index} />
            )}
          </div>
        </div>
        <div className="w-full flex flex-col justify-start items-center">
          <Navbar
            handleOpen={handleOpen}
            titre={"ZapChat"}
            user_data={user_data}
          />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
