import { useEffect, useState } from "react";
import { api } from "../config/baseApi";
import { useLocation } from "react-router-dom";

export const useFetch = (url, nav, redirect = true) => {
  const [datas, setDatas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, seterror] = useState(null);
  const location = useLocation();
  useEffect(() => {
    const fetchDatas = async () => {
      await api
        .get(url)
        .then((res) => {
          setDatas(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(location.pathname);
          seterror(err);
          if (redirect) {
            localStorage.setItem("redirect", location.pathname);
            nav("/login");
          }
        })
        .finally(() => setLoading(false));
    };
    fetchDatas();
  }, []);

  return {
    datas,
    loading,
    error,
  };
};
