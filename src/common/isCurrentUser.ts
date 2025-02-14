import useAuthDetails from "pages/auth/useAuthDetails";
import { useMemo } from "react";

export default function isCurrentUser(email: string) {
  const { user: currentUser } = useAuthDetails();

  const isCurrent = useMemo(() => currentUser?.email == email, [currentUser, email]);

  return isCurrent;
}
