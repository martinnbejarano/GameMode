import { useEffect, useState } from "react";
import { axi } from "../utils/axiosInstance";
import { AxiosError } from "axios";

type Data<T> = T | null;
type ErrorType = AxiosError | null;

interface Params<T> {
  data: Data<T>;
  loading: boolean;
  error: ErrorType;
  refetch: () => Promise<void>;
}

export const useFetch = <T>(endpoint: string): Params<T> => {
  const [data, setData] = useState<Data<T>>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axi.get<T>(endpoint);
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return { data, loading, error, refetch: fetchData };
};
