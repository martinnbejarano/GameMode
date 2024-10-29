import { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:3000/api";
type Data<T> = T | null;
type ErrorType = Error | null;

interface Params<T> {
  data: Data<T>;
  loading: boolean;
  error: ErrorType;
}

export const useFetch = <T>(endpoint: string): Params<T> => {
  const [data, setData] = useState<Data<T>>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType>(null);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
          signal: controller.signal,
          credentials: "include", // Para manejar cookies si usas autenticación
        });

        if (!response.ok) {
          throw new Error("Error en la petición");
        }

        const jsonData: T = await response.json();

        setData(jsonData);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [endpoint]);

  return { data, loading, error };
};
