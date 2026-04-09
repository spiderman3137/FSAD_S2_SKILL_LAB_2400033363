import { Navigate, Outlet, useLocation } from "react-router-dom";
import { hasStoredUser } from "../utils/session";

function ProtectedRoute() {
  const location = useLocation();

  if (!hasStoredUser()) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;

