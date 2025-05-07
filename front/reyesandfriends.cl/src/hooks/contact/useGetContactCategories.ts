import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const useGetContactCategories = () => {
    const [categories, setCategories] = useState<{ name: string; slug: string }[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${API_URL}/contact/categories`);
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
                setCategories([]);
            }
        };
        fetchCategories();
    }, []);

    return categories;
};
