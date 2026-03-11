import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const webPlanesUrl = `${API_URL}/web_planes`;

export interface WebPlanImage {
  id: number;
  image_url: string;
}

export interface WebPlan {
  id: number;
  name: string;
  slug: string;
  description: string;
  price_clp: number;
  images: WebPlanImage[];
}

export function useGetWebPlanes() {
  const [data, setData] = useState<WebPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(webPlanesUrl);
      if (res.data && res.data.success && Array.isArray(res.data.web_plans) && res.data.web_plans.length > 0) {
        setData(res.data.web_plans[0]);
      } else {
        setError("En estos momentos no hay planes web disponibles. Por favor, inténtalo más tarde.");
      }
    } catch (err: any) {
      setError("En estos momentos no hemos podido cargar los planes web. Por favor, inténtalo más tarde.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, retry: fetchData };
}

