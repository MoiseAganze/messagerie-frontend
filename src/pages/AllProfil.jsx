import React, { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { Link, useNavigate, useParams } from "react-router-dom";
import { send_invit_request } from "../hooks/useSendInvit";
import { Toaster } from "react-hot-toast";

const AllProfile = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const { loading, datas, error } = useFetch(`/user/${id}`, nav, true);
  const [loading_req, set_loading_req] = useState(false);

  return (
    <div className="w-full h-screen dark:bg-gray-700 bg-gray-200 pt-12 px-2">
      {loading ? (
        <div className="min-w-20 h-20 flex justify-center items-center">
          <span className="loading loading-ball bg-info loading-lg"></span>
        </div>
      ) : (
        <>
          {error ? (
            <div className="mx-auto card bg-base-100 w-96 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-error">Oups</h2>
                <p className="text-error">Une erreur est survenue</p>
              </div>
            </div>
          ) : (
            <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
              <div className="px-4 pb-6">
                <div className="text-center my-4">
                  <div className="avatar placeholder mr-4">
                    <div className="bg-orange-700 text-sky-100  w-20 h-20 rounded-full">
                      <span className="text-3xl font-extrabold">
                        {datas.data.name[0]}
                      </span>
                    </div>
                  </div>
                  {/* <img
                    className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
                    src="https://randomuser.me/api/portraits/women/21.jpg"
                    alt=""
                  /> */}
                  <div className="py-2">
                    <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">
                      {datas.data.name}
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
                  <button
                    disabled={datas.is_user_friend ? true : loading_req}
                    onClick={() =>
                      send_invit_request(datas.data._id, set_loading_req)
                    }
                    className={`text-center flex-1 rounded-full ${
                      !datas.is_user_friend
                        ? "bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900"
                        : "border-2 border-gray-400 dark:border-gray-700 font-semibold text-black dark:text-white"
                    } px-4 py-2`}
                  >
                    {datas.is_user_friend ? (
                      "Ami(e)"
                    ) : (
                      <>
                        {loading_req ? (
                          <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                          "Inviter"
                        )}
                      </>
                    )}
                  </button>

                  <Link
                    to={`/conversation/${datas?.data?.id_conv}/${id}`}
                    disabled={!datas.is_user_friend}
                    className={`text-center flex-1 rounded-full ${
                      datas.is_user_friend
                        ? "bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900"
                        : "border-2 border-gray-400 dark:border-gray-700 font-semibold text-black dark:text-white"
                    } px-4 py-2`}
                  >
                    Message
                  </Link>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      <Toaster position="top-center" />
    </div>
  );
};

export default AllProfile;
