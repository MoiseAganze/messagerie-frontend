import { useEffect, useState } from "react";
import { api } from "../config/baseApi";

export const useFetch = (url, nav, redirect = true) => {
  const [datas, setDatas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, seterror] = useState(null);
  useEffect(() => {
    const fetchDatas = async () => {
      await api
        .get(url)
        .then((res) => {
          setDatas(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
          seterror(err);
          if (redirect) {
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
