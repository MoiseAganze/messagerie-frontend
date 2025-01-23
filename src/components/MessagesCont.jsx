import { useEffect, useRef } from "react";
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
        <div className="chat-footer">
          <div className="text-xs opacity-50">{isUser && "✓✓"}</div>
        </div>
      </div>
    );
  };

  const boxRef = useRef(null);

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTo({
        top: boxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [conversation]);

  return (
    <div
      ref={boxRef}
      className="w-full h-full overflow-y-auto" // Modifié ici
    >
      <div className="w-full h-auto flex flex-col justify-end gap-2 px-4 lg:px-8 pt-10 mb-20 lg:mb-52">
        {conversation && conversation.length > 0 ? (
          TrieMessage(conversation).map((msgGroup, index) => (
            <div key={index}>
              {/* Affichage de la date */}
              <div className="w-full flex justify-center items-center gap-1">
                <div className="h-px w-full bg-base-300"></div>
                <p className="w-full text-center">
                  {msgGroup[0] && formatDateDay(msgGroup[0].createdAt)}
                </p>
                <div className="h-px w-full bg-base-300"></div>
              </div>

              {/* Messages associés à cette date */}
              {msgGroup.map((item, i) => (
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
            <p className="text-center">Début</p>
            <div className="h-px w-full bg-base-300"></div>
          </div>
        )}
      </div>
    </div>
  );
}
