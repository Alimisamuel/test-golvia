import { useState, useEffect, useCallback } from "react";
import { AxiosError, AxiosResponse } from "axios";

interface ApiErrorResponse {
  message: string;
}

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// Modify the useGetApi to accept parameters, but make P optional
export function useGetApi<T, P = undefined>(
  apiCall: (params?: P) => Promise<AxiosResponse<T>>,
  params?: P
): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response: AxiosResponse<T> = await apiCall(params);
      setData(response.data);
    } catch (err) {
      const axiosError = err as AxiosError<ApiErrorResponse>;
      setError(axiosError.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [apiCall, params]); // Re-run fetchData if either apiCall or params change

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
