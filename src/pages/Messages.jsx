import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Nav";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import MessagesCont from "../components/MessagesCont";
import InputCont from "../components/InputMessage";
import { userData } from "../hooks/userData";
import { api } from "../config/baseApi";
import { useSocket } from "../utils/socketContext";

const Messages = () => {
  const { id, friendid } = useParams();
  const user_data = userData();
  const nav = useNavigate();
  const location = useLocation();
  const socket = useSocket();
  const sendMessage = (senderId, conversationId, text) => {
    console.log("conv Id: " + conversationId);

    const receiverId = friendid; // Assurez-vous que `friend` est correctement défini
    console.log("receveur:" + receiverId);

    socket.emit("send-message", {
      senderId,
      conversationId,
      text,
      receiverId,
    });
  };
  const [datas, setDatas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, seterror] = useState(null);
  useEffect(() => {
    const fetchDatas = async () => {
      setLoading(true);
      await api
        .get(`/messages/${id}`)
        .then((res) => {
          setDatas(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
          seterror(err);

          localStorage.setItem("redirect", location.pathname);

          nav("/login");
        })
        .finally(() => setLoading(false));
    };
    fetchDatas();
  }, [id]);
  useEffect(() => {
    // Écouter les messages entrants
    socket.on("receive-message", (data) => {
      console.log(data);

      setDatas((prevState) => [...prevState, data]);
    });

    // Nettoyage lorsque le composant se démonte
    return () => {
      socket.off("receive-message");
      // socket.disconnect();
    };
  }, [datas]);
  return (
    <div className="w-full h-screen flex flex-col relative">
      {loading ? (
        <div
          className="w-screen h-screen fixed top-0 left-0 bg-base-300 opacity-50 flex justify-center items-center"
          style={{ zIndex: 9999999 }}
        >
          <span className="loading  loading-lg loading-bars text-accent"></span>
        </div>
      ) : (
        <MessagesCont conversation={datas} loading={loading} />
      )}

      {datas && (
        <InputCont sendMessage={sendMessage} user_data={user_data} id={id} />
      )}
    </div>
  );
};

export default Messages;
