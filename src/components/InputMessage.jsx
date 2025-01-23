import { useState } from "react";
import { whoIsFriend } from "../utils/whoIsFriend";

export default function InputCont({ sendMessage, user_data, id }) {
  const [message, setMessage] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleclick();
    }
  };
  const handleclick = () => {
    if (message != "") {
      sendMessage(user_data.id, id, message);
      setMessage("");
    }
  };
  return (
    <div className="p-3 w-full flex justify-center absolute bottom-10 lg:bottom-10">
      <div className="p-3 w-full lg:w-1/2 bg-base-300 rounded-3xl">
        <textarea
          className="textarea mb-1 w-full rounded-3xl bg-base-300 border-none border-0 text-sm"
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
