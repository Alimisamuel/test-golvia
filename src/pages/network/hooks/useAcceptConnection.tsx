import { useState } from "react";
import { AxiosResponse } from "axios";
import { ConnectionApiResponse } from "models/network";
import { acceptConnection } from "api/network";
import useAlert from "components/alert/useAlert";

interface UseCreateConnectionResult {
  acceptConnectionHandler: (email: string, id: string) => Promise<void>;
  loadingButtonId: string | null;
  error: string | null;
  response: AxiosResponse<ConnectionApiResponse> | null;
}

export const useAcceptConnection = (): UseCreateConnectionResult => {
  const handleAlert = useAlert();
  const [loadingButtonId, setLoadingButtonId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<AxiosResponse<ConnectionApiResponse> | null>(null);

  const acceptConnectionHandler = async (email: string, id: string): Promise<void> => {
    setLoadingButtonId(id);
    setError(null);
    setResponse(null);

    try {
      const res = await acceptConnection(email);
      setResponse(res);
    } catch (err: any) {
      handleAlert({ message: `${err.response?.data?.message}`, variant: "error" });
      setError(err.response?.data?.message || "An error occurred.");
    } finally {
      setLoadingButtonId(null);
    }
  };

  return { acceptConnectionHandler, loadingButtonId, error, response };
};
