import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { api } from "../config/baseApi";
import toast, { Toaster } from "react-hot-toast";

const ListFriends = () => {
  const nav = useNavigate();

  const { datas, loading } = useFetch("/friends", nav);

  const Item = ({ pseudo, avatar, id }) => {
    return (
      <div className="flex justify-between items-center gap-3 border-b border-base-100 p-1">
        <div className="flex gap-2 justify-center items-center">
          <div className="avatar">
            <div className="w-14 rounded-full">
              <img src={`/${avatar}`} />
            </div>
          </div>
          <div className="flex flex-col gap-1 font-semibold text-sm">
            <p>{pseudo}</p>
          </div>
        </div>
        <button className="btn btn-circle btn-ghost">
          <img src="/mess.png" className="w-6 h-6" alt="" />
        </button>
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
        <div className="w-full flex flex-col gap-2 pt-5 overflow-x-hidden">
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

export default ListFriends;
