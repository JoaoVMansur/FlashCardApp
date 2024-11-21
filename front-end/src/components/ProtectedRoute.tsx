import axios from "axios";
import { useEffect, useState, ReactNode } from "react";
import { baseURL } from "../Globals";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Redux/store/userStore";
import { setUser } from "../Redux/user/userSlice";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const userState = useSelector((state: RootState) => state.User);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userState.isLoggedIn) {
      console.log(userState);
      navigate("/login", { replace: true });
      return;
    }

    axios
      .get(`${baseURL}/validate-token`, { withCredentials: true })
      .catch(() => {
        navigate("/login", { replace: true });
      });
  }, [userState, navigate]);

  return <>{children}</>;
};

export default PrivateRoute;
