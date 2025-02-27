import { selectToken } from "api/slice/auth";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "store/hooks";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  // Access token from Redux store
  const token = useAppSelector(selectToken);

  const user = token || window.localStorage.getItem("authToken");

  const location = useLocation(); // To remember where the user was trying to go

  if (!user) {
    return (
      <Navigate to="/login" state={{ redirectTo: location.pathname }} replace />
    );
  }

  // If token exists, render the protected route
  return children;
};

export default ProtectedRoute;
