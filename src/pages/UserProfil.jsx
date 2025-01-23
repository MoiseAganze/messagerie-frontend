import React, { act, useState } from "react";
import { userData } from "../hooks/userData";
import { useFetch } from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const user_data = userData();
  const nav = useNavigate();
  const { datas, loading } = useFetch("/friends", nav);
  const [loading_dec, set_loading] = useState(false);

  const deconnect = () => {
    try {
      set_loading(true);
      localStorage.clear();
      nav("/login");
    } catch (error) {
      console.log(error);
    } finally {
      set_loading(false);
    }
  };
  const [copied, setCopied] = useState(false);

  // Vérifie si c'est un mobile
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  };

  // Génère l'URL du profil
  const profileUrl = `${window.location.origin}/user/${user_data?.id}`;

  const handleShare = () => {
    if (isMobile() && navigator.share) {
      // Partage natif sur mobile
      navigator.share({
        title: `Profil de ${user_data?.name}`,
        url: profileUrl,
      });
    } else {
      // Ouvre le modal pour desktop
      document.getElementById("my_modal_share").showModal();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="w-full h-screen dark:bg-gray-700 bg-gray-200 pt-12">
      <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg relative">
        {/* Bouton de partage (modifié) */}
        <button
          className="btn btn-ghost btn-circle absolute right-4 top-1 p-1"
          onClick={handleShare}
        >
          <img src="/share.png" className="w-10 h-10" alt="Partager" />
        </button>

        {/* Modal de partage (modifié) */}
        <dialog id="my_modal_share" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Partager le profil</h3>
            <div className="py-4">
              <div className="flex flex-col gap-4">
                <p>Lien du profil :</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={profileUrl}
                    className="input input-bordered flex-1"
                  />
                  <button onClick={copyToClipboard} className="btn btn-primary">
                    {copied ? "Copié !" : "Copier"}
                  </button>
                </div>
              </div>
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Fermer</button>
              </form>
            </div>
          </div>
        </dialog>
        <div className="border-b px-4 pb-6">
          <div className="text-center my-4">
            <div className="avatar placeholder">
              <div className="bg-orange-700 text-sky-100  w-20 h-20 rounded-full flex justify-center items-center ring">
                <span className="text-xl font-bold">{user_data?.name[0]}</span>
              </div>
            </div>
            <div className="py-2">
              <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">
                {user_data?.name}
              </h3>
              <div className="inline-flex text-gray-700 dark:text-gray-300 items-center">
                <svg
                  className="h-5 w-5 text-gray-400 dark:text-gray-600 mr-1"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path
                    className=""
                    d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                  />
                </svg>
                Kinshasa
              </div>
            </div>
          </div>
          <div className="flex gap-2 px-2">
            <button className="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2">
              Modifier
            </button>
            <button
              onClick={() => document.getElementById("my_modal_1").showModal()}
              className="cursor-pointer flex-1 rounded-full bg-red-600 dark:bg-red-800 text-white dark:text-white antialiased font-bold hover:bg-red-800 dark:hover:bg-red-900 px-4 py-2"
            >
              Se deconnecter
            </button>
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Attends!</h3>
                <p className="py-4">Vous voulez vraiment vous deconnecter ?</p>
                <div className="modal-action">
                  <button
                    className="btn btn-error"
                    disabled={loading_dec}
                    onClick={deconnect}
                  >
                    je confirme
                  </button>

                  <form method="dialog">
                    <button disabled={loading_dec} className="btn">
                      fermer
                    </button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
        <div className="px-4 py-4">
          <div className="flex gap-2 items-center text-gray-800 dark:text-gray-300 mb-4">
            <svg
              className="h-6 w-6 text-gray-600 dark:text-gray-400"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                className=""
                d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z"
              />
            </svg>
            <span>
              <strong className="text-black dark:text-white">
                {datas && datas.length}
              </strong>{" "}
              amis
            </span>
          </div>
          <div className="flex">
            <div className="flex justify-end mr-2">
              {datas && (
                <>
                  {/* Affiche max 5 avatars */}
                  {(datas.length > 5 ? datas.slice(0, 5) : datas).map(
                    (item, i) => (
                      <div key={i} className="avatar placeholder">
                        <div className="bg-orange-700 text-sky-100 w-8 h-8 rounded-full flex justify-center items-center ring">
                          <span className="text-xl font-bold">
                            {item.name[0]}
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </>
              )}

              {/* Affiche le nombre restant seulement si nécessaire */}
              {datas && datas.length > 5 ? (
                <span className="flex items-center justify-center bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-white font-semibold border-2 border-gray-200 dark:border-gray-700 rounded-full h-8 w-8">
                  +{datas.length - 5}
                </span>
              ) : (
                <span className="flex items-center justify-center bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-white font-semibold border-2 border-gray-200 dark:border-gray-700 rounded-full h-8 w-8">
                  ...
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <button className="btn btn-error btn-xs absolute bottom-2 left-2">
        Supprimer le compte
      </button>
    </div>
  );
};

export default UserProfile;
