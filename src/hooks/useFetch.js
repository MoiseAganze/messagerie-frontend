import { useEffect, useState } from "react";
import { api } from "../config/baseApi";

export const useFetch = (url, nav) => {
  const [datas, setDatas] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchDatas = async () => {
      api
        .get(url)
        .then((res) => {
          setDatas(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
          nav("/login");
        })
        .finally(() => setLoading(false));
    };
    fetchDatas();
  }, []);

  return {
    datas,
    loading,
  };
};
