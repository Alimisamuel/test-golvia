import { useSnackbar, VariantType } from "notistack";

// Define a type for the parameters
type HandleAlertParams = {
  message: string;
  variant: VariantType; // VariantType comes from notistack (success, error, info, etc.)
};

const useAlert = () => {
  const { enqueueSnackbar } = useSnackbar();

  // Reusable function to trigger alerts
  const handleAlert = ({ message, variant }: HandleAlertParams) => {
    enqueueSnackbar(message, { variant });
  };

  return handleAlert;
};

export default useAlert;
