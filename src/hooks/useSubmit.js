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

  const validateFields = () => {
    const { name, email, password, cpassword } = datasForm;

    // Validation pour l'API "/register"
    if (api === "/register") {
      if (!name || name.length < 3) {
        toast.error("Le nom doit contenir au moins 3 caractères.", {
          duration: 5000,
        });
        return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        toast.error("Veuillez entrer une adresse email valide.", {
          duration: 5000,
        });
        return false;
      }
      if (!password || password.length < 6) {
        toast.error("Le mot de passe doit contenir au moins 6 caractères.", {
          duration: 5000,
        });
        return false;
      }
      if (password !== cpassword) {
        toast.error("Les mots de passe ne correspondent pas.", {
          duration: 5000,
        });
        return false;
      }
    }

    // Validation pour l'API "/login"
    if (api === "/login") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        toast.error("Veuillez entrer une adresse email valide.", {
          duration: 5000,
        });
        return false;
      }
      if (!password) {
        toast.error("Le mot de passe est requis.", { duration: 5000 });
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateFields()) return;

    let datas = { ...datasForm };
    if (datas.cpassword) delete datas.cpassword;

    setLoading(true);
    await apiAuth
      .post(api, datas)
      .then((res) => {
        console.log(res.data);

        if (res.status === 201 || res.status === 200) {
          localStorage.setItem("kento", res.data.token);

          toast.success(success_message + ",patientez...", { duration: 5000 });
          setTimeout(() => {
            const redirect_saved = localStorage.getItem("redirect");

            if (redirect_saved) {
              nav(redirect_saved);
              localStorage.removeItem("redirect");
            } else {
              nav(redirect);
            }
          }, 5000);
        }
      })
      .catch((error) => {
        console.log(error);
        const errorMessage =
          error.response?.data?.message || "Une erreur est survenue.";
        toast.error(errorMessage, { duration: 5000 });
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
