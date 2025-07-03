import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const useGetContactCategories = () => {
    const [categories, setCategories] = useState<{ name: string; slug: string }[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchCategories = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${API_URL}/contact/categories`);
            setCategories(response.data);
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                setError("No se encontraron categorías de contacto.");
            } else {
                setError("El servicio de contacto no está disponible en este momento.");
            }
            setCategories([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return { categories, error, loading, refetch: fetchCategories };
};
