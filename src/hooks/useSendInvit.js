import toast from "react-hot-toast";
import { api } from "../config/baseApi";

export const send_invit_request = async (id, setLoading) => {
  setLoading(true);
  await api
    .post(`/send-invitation/${id}`)
    .then((res) => {
      if (res.status == 200) {
        toast.success("invitation envoyé avec succès", { duration: 2000 });
      }
    })
    .catch((error) => {
      console.error(error);
      toast.error(error.response.data.message, { duration: 6000 });
    })
    .finally(() => setLoading(false));
};
