import { useToken, useUser } from "@/store/authSlice";

export const useAuthentication = () => {
  const user = useUser();
  const token = useToken();
  
  if (!user?.email && !token) {
    return false;
  }

  return true;
};
