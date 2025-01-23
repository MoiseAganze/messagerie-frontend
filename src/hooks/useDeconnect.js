import { useEffect, useState } from "react";

export default function useDeconnect() {
  const [loading, set_loading] = useState(false);

  const action = () => {
    try {
      set_loading(true);
      localStorage.clear();
    } catch (error) {
      console.log(error);
    } finally {
      set_loading(false);
    }
  };

  return { loading_dec: loading, action };
}
