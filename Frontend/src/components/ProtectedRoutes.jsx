import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "recruiter") {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  return isAuthenticated && user?.role === "recruiter" ? <>{children}</> : null;
};

export default ProtectedRoutes;
