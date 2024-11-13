import Header from "../components/Header";
import CardsContainer from "../components/CardsContainer";
import { RootState } from "../Redux/store/userStore";
import { useSelector } from "react-redux";
function Home() {
  return (
    <div>
      <Header></Header>
      <CardsContainer></CardsContainer>
    </div>
  );
}

export default Home;
