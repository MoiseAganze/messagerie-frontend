import React, { useEffect, useState } from "react";
import { api } from "../config/baseApi";
import { Toaster, toast } from "react-hot-toast";
import { userData } from "../hooks/userData";
import { send_invit_request } from "../hooks/useSendInvit";
const AddFriend = ({ user_data }) => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [link_copied, set_link_copied] = useState(false);

  const handleCopy = async () => {
    try {
      // Copier le texte dans le presse-papier
      await navigator.clipboard.writeText(user_data.id);

      // Met à jour l'état pour indiquer que le lien a été copié
      set_link_copied(true);
    } catch (error) {
      console.error("Échec de la copie dans le presse-papier :", error);
    }
  };
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputValue(text); // Mettre à jour la valeur de l'input avec le texte collé
    } catch (error) {
      console.error("Impossible de coller le texte :", error);
    }
  };
  return (
    <dialog id="my_modal_1" className="modal w-screen md:w-auto">
      <div className="modal-box w-full">
        <div className="flex flex-col gap-3">
          <label className="label -mb-2">
            <span className="label-text">PARTAGER VOTRE IDENTIFIANT</span>
          </label>
          <button className="btn btn-success flex" onClick={handleCopy}>
            {link_copied ? "lien copié" : "copier mon lien d'invitation"}
            <img src="/copy.png" className="w-10 h-10" alt="" />
          </button>
          <div className="form-control gap-1">
            <label className="label">
              <span className="label-text">IDENTIFIANT</span>
            </label>
            <div className="w-full flex items-center gap-2">
              <input
                type="text"
                name="id"
                placeholder="id de l'utilisateur"
                className="input input-bordered border-accent w-full"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={handlePaste}
                  className="btn btn-ghost btn-square"
                >
                  <img src="/paste.png" className="w-10 h-10" alt="" />
                </button>
              </div>
            </div>
            <button
              onClick={() => send_invit_request(inputValue, setLoading)}
              disabled={loading}
              className="btn bg-warning text-base-100 hover:text-warning flex justify-between max-w-80"
            >
              ENVOYER L'INVITATION{" "}
              {loading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                <img src="/send.png" className="w-10 h-10" alt="" />
              )}
            </button>
          </div>
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-outline btn-sm btn-error">fermer</button>
          </form>
        </div>
      </div>
      <Toaster position="top-center" />
    </dialog>
  );
};

export default AddFriend;
