import { useState } from "react";
import Header from "../components/Header";
import CardsContainer from "../components/CardsContainer";
import { useLocation } from "react-router-dom";
function Home() {
  const location = useLocation();

  const userName = location.state ? location.state.userName : "Joao";
  return (
    <div>
      <Header userName={userName}></Header>
      <CardsContainer></CardsContainer>
    </div>
  );
}

export default Home;
