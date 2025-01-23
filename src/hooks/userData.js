import { useEffect, useState } from "react";
import { parseJwt } from "../utils/parseJwt";

export const userData = () => {
  const token = localStorage.getItem("kento");
  if (token) {
    const userdata = parseJwt(token);
    console.log(userdata);

    return userdata;
  }
  return null;
};
