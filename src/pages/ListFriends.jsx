import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
          <div className="avatar placeholder">
            <Link
              to={`/user/${id}`}
              className="bg-orange-700 text-sky-100  w-10 h-10 rounded-full flex justify-center items-center"
            >
              <span className="text-xl font-bold">{pseudo[0]}</span>
            </Link>
          </div>
          <div className="flex flex-col gap-1 font-semibold text-sm">
            <p>{pseudo}</p>
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
        <div className="w-full flex flex-col gap-2 pt-5 px-2 overflow-x-hidden">
          {datas?.map((item, i) => (
            <Item
              key={i}
              pseudo={item.name}
              id={item.id}
              avatar={item.avatar}
            />
          ))}
        </div>
      )}
      <Toaster position="top-center" />
    </div>
  );
};

export default ListFriends;
