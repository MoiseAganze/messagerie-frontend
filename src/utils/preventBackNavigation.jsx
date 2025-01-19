import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PreventBackNavigation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ""; // Obligatoire pour certains navigateurs.
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return null;
};

export default PreventBackNavigation;
