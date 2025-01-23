import { useState } from "react";
import { whoIsFriend } from "../utils/whoIsFriend";

export default function InputCont({ sendMessage, user_data, id }) {
  const [message, setMessage] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleclick();
    }
  };
  const handleclick = () => {
    const trimmedMessage = message.trim();

    if (trimmedMessage !== "") {
      sendMessage(user_data.id, id, trimmedMessage);
      setMessage("");
    }
  };
  return (
    <div className="p-3 w-full flex justify-center absolute bottom-16">
      <div className="p-3 w-full lg:w-1/2 bg-base-300 rounded-3xl">
        <textarea
          className="textarea mb-1 w-full rounded-sm bg-base-300 border-none focus:outline-none focus:ring-0 active:outline-none text-sm"
          rows="2"
          placeholder="votre message......"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={handleKeyDown}
        />

        <div className="w-full flex justify-between items-center">
          <button className="btn btn-circle">
            <img src="/paperclip.png" className="w-5 h-5" alt="" />
          </button>
          {id && (
            <button
              type="button"
              onClick={handleclick}
              className="btn btn-circle"
            >
              <img src="/send.png" className="w-5 h-5" alt="" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
