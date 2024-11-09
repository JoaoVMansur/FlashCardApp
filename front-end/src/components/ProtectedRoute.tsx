import axios from "axios";
import { useEffect, useState, ReactNode } from "react";
import { baseURL } from "../Globals";
import { useNavigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode; // Declare children as a ReactNode type
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${baseURL}/validate-token`, { withCredentials: true })
      .then(() => {
        setIsAuthenticated(true);
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    navigate("/login", { replace: true });
    return null; // No children will be rendered if not authenticated
  }

  return <>{children}</>; // Render the children if authenticated
};

export default PrivateRoute;
