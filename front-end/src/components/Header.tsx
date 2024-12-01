import { useState } from "react";
import logo from "../assets/card-file-box-svgrepo-com.svg";
import "../Styles/Header.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Redux/store/userStore";
import { logout } from "../Redux/user/userSlice";
import { logoutCall } from "../api/logout";

function Header() {
  const [showLogout, setShowLogout] = useState(false);
  const dispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.User);

  const logoutUser = async () => {
    const result = await logoutCall();
    if (result.success) {
      dispatch(logout());
    } else {
      console.error(result.error);
    }
  };

  return (
    <nav className="navbar navbar-expand navbar-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/home">
          <img src={logo} alt="Logo" id="Logo" />
        </a>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-link" aria-current="page" href="/Home">
              Home
            </a>
            <a className="nav-link" href="/profile">
              Profile
            </a>
          </div>
          <div
            className="navbar-nav ms-auto"
            id="userName-header"
            onMouseEnter={() => setShowLogout(true)}
            onMouseLeave={() => {
              setTimeout(() => setShowLogout(false), 200);
            }}
          >
            Welcome, {userState.userName}!
            {showLogout && (
              <div
                className="logout-popup"
                onClick={(e) => {
                  e.stopPropagation();
                  logoutUser();
                }}
              >
                Logout
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
