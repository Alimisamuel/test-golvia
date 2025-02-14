import { useState } from "react";
import { AxiosResponse } from "axios";
import { ConnectionApiResponse } from "api/types";
import { createConnection } from "api";
import useAlert from "components/alert/useAlert";

interface UseCreateConnectionResult {
  createConnectionHandler: (email: string, id: string) => Promise<void>;
  loadingButtonId: string | null;
  error: string | null;
  response: AxiosResponse<ConnectionApiResponse> | null;
}

export const useCreateConnect = (): UseCreateConnectionResult => {
  const handleAlert = useAlert();
  const [loadingButtonId, setLoadingButtonId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<AxiosResponse<ConnectionApiResponse> | null>(null);

  const createConnectionHandler = async (email: string, id: string): Promise<void> => {
    setLoadingButtonId(id);
    setError(null);
    setResponse(null);

    try {
      const res = await createConnection(email);
      setResponse(res);
    } catch (err: any) {
      handleAlert({ message: `${err.response?.data?.message}`, variant: "error" });
      setError(err.response?.data?.message || "An error occurred.");
    } finally {
      setLoadingButtonId(null);
    }
  };

  return { createConnectionHandler, loadingButtonId, error, response };
};
