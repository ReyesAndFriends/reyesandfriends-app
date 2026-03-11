import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const webPlanesUrl = `${API_URL}/web_planes/`;

export interface WebPlanFeature {
  id: number;
  feature_description: string;
}

export interface WebPlanUsage {
  id: number;
  usage_description: string;
}

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
  demo_url: string;
  features: WebPlanFeature[];
  usages: WebPlanUsage[];
  images: WebPlanImage[];
}

export function useGetWebPlanDetail(slug: string) {
  const [data, setData] = useState<WebPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${webPlanesUrl}${slug}`);
      if (res.data && res.data.success && res.data.web_plan) {
        setData(res.data.web_plan);
      } else {
        setError("En este momento no se ha podido cargar los detalles del plan web. Por favor, inténtalo más tarde. ");
      }
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        setError("El plan web solicitado no existe. Por favor, verifique la URL e inténtelo de nuevo.");
      } else {
        setError("En estos momentos no hemos podido cargar los planes web. Por favor, inténtalo más tarde.");
      }
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, retry: fetchData };
}

