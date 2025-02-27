import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { PATHS } from "Routes/path";

// Define the return type of the hook
type UseNavigateWithHashReturn = {
  sendUserToNextPage: (email: string, name: string) => void;
  hashEmail: (email: string) => void;
};

const useNavigateWithHash = (): UseNavigateWithHashReturn => {
  const SECRET_KEY = "S9fj@8vGZz2E&xLpWkq!Nr7uTbX%JwYm";

  // Hash the email
  const hashEmail = (email: string): string => {
 const encrypted = CryptoJS.AES.encrypt(email, SECRET_KEY).toString();
    return encrypted.replace(/\//g, "_").replace(/\+/g, "-"); 
  };

  const navigate = useNavigate();

  // Function to hash the email and navigate to the next page
  const sendUserToNextPage = (email: string, name: string): void => {
    const hashedEmail = hashEmail(email);
    navigate(`${PATHS.OTHER_USER_PROFILE}/${name}/${hashedEmail}`);
  };

  return { sendUserToNextPage, hashEmail };
};

export default useNavigateWithHash;
