import { useState } from "react";
import Header from "../components/Header";
import WordsConainer from "../components/WordsContainer";
import { useLocation } from "react-router-dom";
function Home() {
  const location = useLocation();

  const userName = location.state.userName;

  return (
    <div>
      <Header userName={userName}></Header>
      <WordsConainer></WordsConainer>
    </div>
  );
}

export default Home;
