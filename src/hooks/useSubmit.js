import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { apiAuth } from "../config/baseApi";

export default function useSubmit(
  structure,
  api,
  success_message,
  nav,
  redirect
) {
  const [loading, setLoading] = useState(false);
  const [datasForm, setDatasForm] = useState(structure);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setDatasForm({
      ...datasForm,
      [name]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    var datas = datasForm;
    if (datas.cpassword) delete datas.cpassword;
    setLoading(true);
    await apiAuth
      .post(api, datas)
      .then((res) => {
        console.log(res.data);

        if (res.status == 201 || res.status == 200) {
          localStorage.setItem("kento", res.data.token);
          toast.success(success_message, { duration: 2000 });
          setTimeout(() => {
            nav(redirect);
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message, { duration: 5000 });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    handleSubmit,
    loading,
    handleChange,
    datasForm,
  };
}
