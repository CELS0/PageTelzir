import { useAuth } from "../context/auth";
import { AppAuth } from "./auth.routes";
import { AppRoutes } from "./app.routes";

export function Routes() {
  const { signed } = useAuth();
  
  return signed ? <AppRoutes /> : <AppAuth />
}
