import { redirect } from "react-router-dom";

const RequiredAuth = async () => {
  const isLoggedIn = localStorage.getItem("loggedin");
  if (!isLoggedIn) {
    throw redirect("/login?message=you must login first");
  }
  return isLoggedIn;
};

export default RequiredAuth;
