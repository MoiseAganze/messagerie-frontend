import { useEffect, useState } from "react";
import { Navbar2 } from "../components/Nav";
import { formatHourMinute } from "../utils/formatsDate";
import { useFetch } from "../hooks/useFetch";
import { reduceText } from "../utils/reduceText";
import { whoIsFriend } from "../utils/whoIsFriend";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../config/baseApi";
import { userData } from "../hooks/userData";
import { useSocket } from "../utils/socketContext";

export default function ListConversationsParent({ taille, handleOpen }) {
  const nav = useNavigate();
  const user_data = userData();
  const socket = useSocket();
  const [datas, setDatas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, seterror] = useState(null);
  const fetchDatas = async () => {
    await api
      .get(`/conversations`)
      .then((res) => {
        setDatas(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        seterror(err);

        nav("/login");
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    fetchDatas();
  }, []);
  useEffect(() => {
    socket.on("refresh-conv", (data) => {
      fetchDatas();
    });

    // Nettoyage lorsque le composant se démonte
    return () => {
      socket.off("refresh-conv");
      // socket.disconnect();
    };
  }, [datas]);
  const Message = ({ conversation }) => {
    return (
      <div
        onClick={handleOpen}
        className={`
          ${"bg-base-100"} 
          ${"bg-base-100"} w-full flex justify-start gap-1 rounded-3xl py-2 px-3 cursor-pointer transition hover:translate-x-2 hover:bg-base-300`}
      >
        <Link
          role="button"
          className={`avatar placeholder mr-4 ${
            whoIsFriend(user_data.id, conversation.participants).status
          }`}
          to={`/user/${
            whoIsFriend(user_data.id, conversation.participants)._id
          }`}
        >
          <div className="bg-orange-700 text-sky-100  w-12 h-12 rounded-full">
            <span className="text-xl font-bold">
              {whoIsFriend(user_data.id, conversation.participants).name[0]}
            </span>
          </div>
        </Link>
        <Link
          to={`/conversation/${conversation._id}/${
            whoIsFriend(user_data.id, conversation.participants)._id
          }`}
          className="w-full flex flex-col"
        >
          <div className="w-full flex justify-between">
            <p className="text-base font-bold">
              {whoIsFriend(user_data.id, conversation.participants).name}
            </p>
            {conversation.lastMessage && (
              <p
                className={`text-sm ${
                  conversation.status == "vu" ? "" : "text-accent font-bold"
                }`}
              >
                {formatHourMinute(conversation.lastMessage.createdAt)}
              </p>
            )}
          </div>
          {conversation.lastMessage &&
            (1 == 0 ? (
              <p className="text-accent animate-pulse">
                ecrit {"  "}
                <span className="text-3xl font-extrabold animate-pulse">
                  ...
                </span>
              </p>
            ) : (
              <p>{reduceText(conversation.lastMessage.text, 20)}</p>
            ))}
        </Link>
      </div>
    );
  };
  return (
    <div
      className={`w-full flex flex-col gap-1 mt-3 overflow-x-hidden ${
        taille == "petit" ? "px-3" : "px-2"
      }`}
    >
      {loading ? (
        <div className="flex flex-col gap-3 pt-5 overflow-x-hidden">
          {[1, 2, 3, 4].map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <div
                className={`skeleton ${
                  taille == "petit" ? " w-14 h-14 " : " w-12 h-12 "
                } shrink-0 rounded-full`}
              ></div>
              <div className="flex flex-col gap-4">
                <div
                  className={`skeleton h-4 ${
                    taille == "petit" ? "w-16" : "w-20"
                  }`}
                ></div>
                <div
                  className={`skeleton h-4 ${
                    taille == "petit" ? "w-20" : "w-36"
                  }`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        datas?.map((item, i) => <Message key={i} conversation={item} />)
      )}
    </div>
  );
}
