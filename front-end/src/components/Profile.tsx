import { useEffect, useState } from "react";
import "../Styles/Profile.css";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store/userStore";
import fetchCollections from "../api/fetchCollections";
import updateUser from "../api/updateUser";
import { setUser } from "../Redux/user/userSlice";
import { UseDispatch } from "react-redux";
interface Stats {
  Colecao: number;
  Cartao: number;
}
interface User {
  ID: number;
  UserName?: string;
  Email?: string;
  PassWord?: string;
}

const Profile = () => {
  const userState = useSelector((state: RootState) => state.User);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState(userState.userName);
  const [email, setEmail] = useState(userState.email);
  const [stats, setStats] = useState<Stats>({ Colecao: 0, Cartao: 0 });
  useEffect(() => {
    fetchCollections().then((res) => {
      let cardCount = 0;
      res.collections.forEach((collection: any) => {
        cardCount += collection.Cards.length;
      });
      setStats({ Colecao: res.collections.length, Cartao: cardCount });
    });
  }, []);

  const handleSaveChanges = () => {
    const user: User = {
      ID: userState.userID,
      UserName: userName,
      Email: userState.email !== email ? email : "",
    };
    updateUser(user).then((res) => {
      if (res.status === 200) {
        alert("Changes saved");
        dispatch(
          setUser({
            userName: userName,
            email: email,
            userID: userState.userID,
          })
        );
      }
    });
  };

  return (
    <div>
      <Header />
      <div className="profile-container">
        <div className="profile-header">
          <h1 className="profile-name">{userName}</h1>
        </div>

        <div className="profile-details">
          <div className="contact-info">
            <div className="info-item">
              <span className="info-label">Email:</span>
              <input
                type="email"
                className="info-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="info-item">
              <span className="info-label">User Name:</span>
              <input
                type="text"
                className="info-input"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-value">{stats.Colecao}</span>
            <span className="stat-label">Coleções</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{stats.Cartao}</span>
            <span className="stat-label">Cartões</span>
          </div>
        </div>

        <div className="save-changes-container">
          <button className="save-changes-btn" onClick={handleSaveChanges}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
