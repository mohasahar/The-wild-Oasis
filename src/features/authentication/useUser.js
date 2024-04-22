import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

// دائما ما ندير الجلسة باستخدام ريأكت كويري
export function useUser() {
  //getting the current user and store it in a cache
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
}
