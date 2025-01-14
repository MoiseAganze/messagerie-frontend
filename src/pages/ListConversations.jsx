import { useEffect, useState } from "react";
import { Navbar2 } from "../components/Nav";
import { formatHourMinute } from "../utils/formatsDate";
import { useFetch } from "../hooks/useFetch";
import { reduceText } from "../utils/reduceText";
import { whoIsFriend } from "../utils/whoIsFriend";
import { useNavigate } from "react-router-dom";
import { api } from "../config/baseApi";

export default function ListConversations({
  loading,
  open,
  setOpen,
  conversations,
  setConversation,
  user_data,
  setFriend,
  set_loading_messages,
  setConversationId,
}) {
  const [selected, setSelected] = useState(null);
  const [loading_click, set_loading_click] = useState(false);
  const handleSelect = (item) => {
    setSelected(item);
  };
  const Message = ({ conversation }) => {
    const nav = useNavigate();
    const handleClick = async () => {
      set_loading_click(true);

      await api
        .get(`/messages/${conversation._id}`)
        .then((res) => {
          setConversation(res.data);
          handleSelect(conversation._id);
          setConversationId(conversation._id);
          setFriend(whoIsFriend(user_data.id, conversation.participants));
          set_loading_messages(false);
          setOpen(false);
          set_loading_click(false);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => set_loading_click(false));
    };
    return (
      <div
        onClick={handleClick}
        className={`
          ${selected == conversation._id && "bg-base-100"} 
          ${"bg-base-100"} w-full flex justify-start gap-1 rounded-3xl py-2 px-3 cursor-pointer transition hover:translate-x-2`}
      >
        <div
          role="button"
          className={`avatar placeholder mr-4 ${1 == 1 && "online"}`}
        >
          <div className="bg-orange-700 text-sky-100  w-12 h-12 rounded-full">
            <span className="text-xl font-bold">
              {whoIsFriend(user_data.id, conversation.participants).name[0]}
            </span>
          </div>
        </div>
        <button className="w-full flex flex-col">
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
        </button>
      </div>
    );
  };
  return (
    <div className="flex flex-col gap-1 mt-3 overflow-x-hidden">
      {loading ? (
        <div className="flex flex-col gap-3 pt-5 overflow-x-hidden">
          {[1, 2, 3, 4].map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="skeleton h-14 w-14 shrink-0 rounded-full"></div>
              <div className="flex flex-col gap-4">
                <div className="skeleton h-4 w-20"></div>
                <div className="skeleton h-4 w-28"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        conversations?.map((item, i) => <Message key={i} conversation={item} />)
      )}
      {loading_click && (
        <div
          className="w-screen h-screen fixed top-0 left-0 bg-base-300 opacity-50 flex justify-center items-center"
          style={{ zIndex: 9999999 }}
        >
          <span className="loading  loading-lg loading-bars text-accent"></span>
        </div>
      )}
    </div>
  );
}
