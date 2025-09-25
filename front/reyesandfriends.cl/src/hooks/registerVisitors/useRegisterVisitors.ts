import axios from "axios";
import { useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;
const VISITOR_KEY = "visitor_registered_date";

export const useRegisterVisitors = () => {
  const registerVisitor = async () => {
    try {
      const today = new Date().toDateString();
      const lastRegistered = sessionStorage.getItem(VISITOR_KEY);

      if (lastRegistered === today) {
        return; // Visit already registered today
      }

      await axios.post(`${API_URL}/visitors/register`);
      sessionStorage.setItem(VISITOR_KEY, today);
    } catch (error) {
      // Error handling
      console.warn("Error registrando visitante:", error);
    }
  };

  useEffect(() => {
    registerVisitor();
  }, []);

  return { registerVisitor };
};