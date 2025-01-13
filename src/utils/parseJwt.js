export const parseJwt = (token) => {
  try {
    if (token) {
      return JSON.parse(atob(token.split(".")[1]));
    }
  } catch (e) {
    console.log("Erreur lors du décodage du token", e);
    return null;
  }
};
