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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userState.isLoggedIn) {
      console.log(userState);
      navigate("/login", { replace: true });
      return;
    }

    console.log("Validando token");
    axios
      .get(`${baseURL}/validate-token`, { withCredentials: true })
      .then((response) => {
        dispatch(
          setUser({
            userID: response.data.userID,
            userName: response.data.userName,
          })
        );
      })
      .catch(() => {
        navigate("/login", { replace: true });
      });
  }, [userState, dispatch, navigate]);

  return <>{children}</>;
};

export default PrivateRoute;
