import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { api } from "../config/baseApi";
import toast, { Toaster } from "react-hot-toast";

const ListFriendRequests = ({ set_side_index }) => {
  const nav = useNavigate();
  const [loading_req, set_loading_req] = useState(false);
  const { datas, loading } = useFetch("/friends-requests", nav);
  const accept_invit = async (id) => {
    set_loading_req(true);
    await api
      .post(`/accept-invit/${id}`)
      .then((res) => {
        if (res.status == 200) {
          toast.success("invitation acceptée");
          set_side_index(0);
        }
      })
      .catch(() => {
        toast.error("une erreur est survenue");
      })
      .finally(() => set_loading_req(false));
  };
  const reject_invit = async (id) => {
    set_loading_req(true);
    await api
      .post(`/reject-invit/${id}`)
      .then((res) => {
        if (res.status == 200) {
          toast.success("invitation rejetée");
          set_side_index(0);
        }
      })
      .catch(() => {
        toast.error("une erreur est survenue");
      })
      .finally(() => set_loading_req(false));
  };

  const Item = ({ pseudo, avatar, id }) => {
    return (
      <div className="flex justify-between items-center gap-3">
        <div className="avatar">
          <div className="w-14 rounded-full">
            <img src={`/${avatar}`} />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p>{pseudo}</p>
          <div className="flex gap-2">
            <button
              disabled={loading_req}
              onClick={() => accept_invit(id)}
              className="btn btn-info btn-xs"
            >
              accepter
            </button>
            <button
              disabled={loading_req}
              onClick={() => reject_invit(id)}
              className="btn btn-error btn-xs"
            >
              refuser
            </button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div
      className={`min-h-96 flex ${
        loading ? "items-center" : "items-start"
      } justify-center`}
    >
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
        <div className="flex flex-col gap-2 pt-5 overflow-x-hidden">
          {datas?.map((item, i) => (
            <Item
              key={i}
              pseudo={item.sender.name}
              id={item.sender._id}
              avatar={item.sender.avatar}
            />
          ))}
        </div>
      )}
      <Toaster position="top-center" />
    </div>
  );
};

export default ListFriendRequests;
