import axios from "axios";
import { useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;
const VISITOR_KEY = "visitor_registered_date";

interface VisitorData {
  ipAddress: string;
  country: string;
}

export const useRegisterVisitors = () => {
  const getVisitorInfo = async (): Promise<{ ip: string; country: string }> => {
    const services = [
      'https://ipapi.co/json/',
      'https://ip-api.com/json/',
      'https://api.ipgeolocation.io/ipgeo?apiKey=free'
    ];

    for (const service of services) {
      try {
        const response = await axios.get(service, { timeout: 10000 });
        const data = response.data;
        
        const ip = data.ip || data.query;
        const country = data.country_name || data.country || data.country_code;
        
        if (ip && country) {
          return { ip, country };
        }
      } catch (error) {
        console.warn(`Error con servicio ${service}:`, error);
        continue;
      }
    }
    
    throw new Error('No se pudo obtener la información del visitante');
  };

  const registerVisitor = async () => {
    try {
      const today = new Date().toDateString();
      const lastRegistered = sessionStorage.getItem(VISITOR_KEY);

      if (lastRegistered === today) {
        return; // Visit already registered today
      }

      // Get visitor info (IP and country in one call)
      const { ip, country } = await getVisitorInfo();

      // Prepare data
      const visitorData: VisitorData = {
        ipAddress: ip,
        country,
      };

      await axios.post(`${API_URL}/visitors/register`, visitorData);
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