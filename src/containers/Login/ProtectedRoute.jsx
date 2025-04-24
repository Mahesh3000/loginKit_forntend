import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(null); // null = loading, true/false = decided

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);

      // clean up URL (remove token param)
      const newPath = location.pathname; // e.g., "/dashboard"
      navigate(newPath, { replace: true });

      setIsAuth(true);
    } else {
      const hasToken = !!localStorage.getItem("token");
      setIsAuth(hasToken);
    }
  }, [location, navigate]);

  // Show loading screen briefly while processing token
  if (isAuth === null) return <div>Loading...</div>;

  if (!isAuth) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
