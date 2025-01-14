import { useEffect, useState } from "react";
import { Navbar, Navbar2 } from "../components/Nav";
import ListConversations from "./ListConversations";
import { socket } from "../socket";
import InputCont from "../components/InputMessage";
import MessagesCont from "../components/MessagesCont";
import axios from "axios";
import { useFetch } from "../hooks/useFetch";
import { userData } from "../hooks/userData";
import { useNavigate } from "react-router-dom";
import AddFriend from "../components/AddFriend";
import ListFriendRequests from "./ListFriendRequests";
import ListFriends from "./ListFriends";
import { api } from "../config/baseApi";
export default function Messagerie() {
  const nav = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("kento");
    if (!token) {
      nav("/login");
    }
  }, []);
  const [loading, setLoading] = useState(true);
  const [newConversations, setNewConversations] = useState([]);
  const { user_data } = userData();
  const [conversationSelected, setConversationSelected] = useState(null);
  const [conversationSelectedId, setConversationSelectedId] = useState(null);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  const [friend, setFriend] = useState(null);
  const [loading_messages, set_loading_messages] = useState(true);
  const [side_index, set_side_index] = useState(0);

  useEffect(() => {
    const fetch_datas = async () => {
      await api
        .get("/conversations")
        .then((res) => {
          setNewConversations(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
          nav("/login");
        })
        .finally(() => setLoading(false));
    };
    fetch_datas();
  }, [side_index]);

  useEffect(() => {
    socket.emit("user-connected", user_data.id);

    // Écouter les messages entrants
    socket.on("receive-message", (data) => {
      console.log(data);

      if (data.conversationId === conversationSelectedId) {
        setConversationSelected((conversationSelected) => [
          ...conversationSelected,
          data,
        ]);
        setNewConversations((prevState) => {
          const updatedList = [...prevState]; // Créer une copie superficielle de la liste
          if (updatedList.length > 0) {
            updatedList[0] = {
              ...updatedList[0], // Copier les propriétés de l'élément
              lastMessage: {
                ...updatedList[0].lastMessage,
                createdAt: data.createdAt,
                text: data.text,
              }, // Créer une copie de lastMessage
            };
          }
          return updatedList; // Retourner la nouvelle liste
        });
      }
    });

    // Nettoyage lorsque le composant se démonte
    return () => {
      socket.off("receive-message");
      // socket.disconnect();
    };
  }, [conversationSelected]);

  const sendMessage = (senderId, conversationId, text) => {
    console.log("conv Id: " + conversationId);

    const receiverId = friend._id; // Assurez-vous que `friend` est correctement défini
    console.log("receveur:" + receiverId);

    socket.emit("send-message", {
      senderId,
      conversationId,
      text,
      receiverId,
    });
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <AddFriend />
      <div className="w-full h-full flex relative">
        <div
          className={`absolute -left-72 lg:-left-96 z-40 top-0 lg:static ${
            open ? "translate-x-72 lg:translate-x-96" : "translate-x-0"
          } w-72 lg:w-96 lg:flex justify-center bg-base-300 h-screen transition`}
        >
          <div className="w-full min-height-screen">
            <Navbar2 set_side_index={set_side_index} />
            {side_index == 0 && (
              <ListConversations
                open={open}
                setOpen={setOpen}
                setConversation={setConversationSelected}
                setConversationId={setConversationSelectedId}
                user_data={user_data}
                conversations={newConversations}
                loading={loading}
                setFriend={setFriend}
                set_loading_messages={set_loading_messages}
              />
            )}

            {side_index == 1 && <ListFriends />}
            {side_index == 2 && (
              <ListFriendRequests set_side_index={set_side_index} />
            )}
          </div>
        </div>
        <div className="w-full h-screen flex flex-col">
          <Navbar
            handleOpen={handleOpen}
            online={
              conversationSelected ? conversationSelected.isOnline : false
            }
            titre={conversationSelected ? friend.name : "Messagerie"}
          />
          {conversationSelected ? (
            <MessagesCont
              conversation={conversationSelected}
              loading={loading_messages}
            />
          ) : (
            <div className="w-full  flex flex-col gap-2 mb-48 px-4 lg:px-8 pt-10">
              <div className="w-full h-full flex flex-col gap-8 justify-center items-center text-base font-semibold text-center opacity-60 hover:opacity-100">
                <img src="/wink.png" className="w-28 h-28" alt="" />
                SELECTIONNEZ UNE CONVERSATION POUR COMMENCER A DISCUTER
              </div>
            </div>
          )}
          {conversationSelected && (
            <InputCont
              sendMessage={sendMessage}
              user_data={user_data}
              id={conversationSelectedId}
            />
          )}
        </div>
      </div>
    </div>
  );
}
