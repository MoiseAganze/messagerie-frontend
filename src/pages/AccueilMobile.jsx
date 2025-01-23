import React from "react";
import ListConversationsParent from "../components/ListConversationsParent";

const AccueilMobile = () => {
  return (
    <div className="w-full">
      <div className="w-full  flex-col gap-2 mb-48 px-4 lg:px-8 pt-10 hidden lg:flex">
        <div className="w-full h-full flex flex-col gap-8 justify-center items-center text-base font-semibold text-center opacity-60 hover:opacity-100">
          <img src="/wink.png" className="w-28 h-28" alt="" />
          SELECTIONNEZ UNE CONVERSATION POUR COMMENCER A DISCUTER
        </div>
      </div>
      <div className="lg:hidden w-full h-full">
        <ListConversationsParent taille={"grand"} />
      </div>
    </div>
  );
};

export default AccueilMobile;
