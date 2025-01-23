import { useEffect, useRef, useState } from "react";
import { socket } from "../socket";
import { formatDateDay, formatHourMinute } from "../utils/formatsDate";
import { TrieMessage } from "../utils/trieMessages";

export default function MessagesCont({ conversation, loading }) {
  const ChatMessage = ({ texte, isUser, date, status }) => {
    return (
      <div className={`chat ${isUser ? "chat-end" : "chat-start"}`}>
        <div className="chat-header">
          <time className="text-xs opacity-50">{formatHourMinute(date)}</time>
        </div>
        <div
          className={`chat-bubble ${
            isUser ? "chat-bubble-success" : "chat-bubble-primary"
          }`}
        >
          {texte}
        </div>
        {/* <div className="chat-footer opacity-50">{status}</div> */}
      </div>
    );
  };
  const boxRef = useRef(null);

  useEffect(() => {
    // Défiler vers le bas lorsque le composant est monté

    boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [conversation]);
  return (
    <div
      ref={boxRef}
      className="w-full h-4/5 lg:h-full overflow-y-auto flex justify-center"
    >
      <div className="w-full lg:w-2/3 flex flex-col gap-2 mb-48 px-4 lg:px-8 pt-10">
        {conversation && conversation.length > 0 ? (
          TrieMessage(conversation).map((msg, index) => (
            <div key={index}>
              <div className="w-full flex justify-center items-center gap-1">
                <div className="h-px w-full bg-base-300"></div>
                <p className="w-full text-center">
                  {msg[0] && formatDateDay(msg[0].createdAt)}
                </p>
                <div className="h-px w-full bg-base-300"></div>
              </div>
              {conversation.map((item, i) => (
                <ChatMessage
                  key={i}
                  texte={item.text}
                  isUser={item.isSender}
                  date={item.createdAt}
                  status={item.status}
                />
              ))}
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center gap-1">
            <div className="h-px w-full bg-base-300"></div>
            <p className="text-center">Debut</p>
            <div className="h-px w-full bg-base-300"></div>
          </div>
        )}

        {/* {conversation.writing && (
            <div className="chat chat-end">
              <div className="chat-bubble animate-pulse">
                ecrit {"  "}
                <span className="text-3xl font-extrabold animate-pulse">
                  ...
                </span>
              </div>
            </div>
          )} */}
      </div>
    </div>
  );
}
