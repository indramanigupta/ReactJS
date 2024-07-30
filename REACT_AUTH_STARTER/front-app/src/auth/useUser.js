import { useState, useEffect } from "react";
import { useToken } from "./useToken";

export const useUser = () => {
  const [token, setToken] = useToken();

  const getPayloadFromToken = (token) => {
    try {
      console.log(token);
      if (typeof token !== "string") {
        throw new TypeError("Token must be a string");
      }

      const encodedPayload = token.split(".")[1];
      return JSON.parse(atob(encodedPayload));
    } catch (error) {
      console.error("Error decoding and parsing the payload:", error);
      return null;
    }
  };

  const [user, setUser] = useState(() => {
    if (!token) return null;
    return getPayloadFromToken(token);
  });

  useEffect(() => {
    if (!token) {
      setUser(null);
    } else {
      setUser(getPayloadFromToken(token));
    }
  }, [token]);

  return user;
};
