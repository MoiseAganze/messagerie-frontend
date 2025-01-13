import { useEffect, useState } from "react";
import { parseJwt } from "../utils/parseJwt";

export const userData = () => {
  const token = localStorage.getItem("kento");
  if (token) {
    const userdata = parseJwt(token);

    return {
      user_data: userdata,
    };
  }
  return { user_data: {} };
};
