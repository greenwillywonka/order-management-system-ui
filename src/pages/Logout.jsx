import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../AuthContext";

const Logout = () => {
  const navigate = useNavigate();
  const { setIsAuth } = useAuth();

  useEffect(() => {
    const url = `${import.meta.env.VITE_API_URL}/logout/`;
    const access_token = localStorage.getItem("access_token");

    const logoutUser = async () => {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });
      const statusCode = response.status;

      if (statusCode === 200) {
        localStorage.clear();
        setIsAuth(false);
        return navigate(`/login`);
      } else {
        console.log("PROBLEM LOGGING OUT");
      }
    };
    logoutUser();
  }, [setIsAuth, navigate]);
};

export default Logout;