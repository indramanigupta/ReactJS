import { useState, useEffect } from "react";

export const useToken = () => {
  const [token, setTokenInternal] = useState(() => {
    try {
      const storedToken = localStorage.getItem("token");
      return storedToken ? JSON.parse(storedToken) : null;
    } catch (error) {
      console.error("Error accessing Local Storage on init:", error);
      return null;
    }
  });

  const setToken = (newToken) => {
    try {
      const tokenString = JSON.stringify(newToken);
      localStorage.setItem("token", tokenString);
      setTokenInternal(newToken);
    } catch (error) {
      console.error("Error setting token in Local Storage:", error);
    }
  };

  useEffect(() => {
    const syncToken = (event) => {
      if (event.key === "token") {
        try {
          const newToken = event.newValue ? JSON.parse(event.newValue) : null;
          setTokenInternal(newToken);
          console.log(
            `Token synchronized from Local Storage event: ${newToken}`
          );
        } catch (error) {
          console.error("Error parsing token from Local Storage event:", error);
        }
      }
    };

    window.addEventListener("storage", syncToken);

    return () => {
      window.removeEventListener("storage", syncToken);
    };
  }, []);

  return [token, setToken];
};

export default useToken;
