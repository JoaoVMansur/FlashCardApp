import { useNavigate } from "react-router-dom";
import addCard from "../api/addCard";
import "../Styles/AddCard.css";
import React, { useState } from "react";

interface Word {
  KoreanWord: string;
  PortugueseWord: string;
}

function Card() {
  const [koreanWord, setKoreanWord] = useState("");
  const [portugueseWord, setPortugueseWord] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newWord: Word = {
      KoreanWord: koreanWord,
      PortugueseWord: portugueseWord,
    };
    const data = await addCard(newWord);
    if (!data) {
      alert("Word Already Added");
    } else {
      alert(
        `Word Added With Success ${newWord.KoreanWord}-${newWord.PortugueseWord}`
      );
      navigate("/Home");
    }
  };

  return (
    <div className="container" id="card">
      <h1 id="addCardTitle">Add a New Word</h1>
      <form id="addWordForm" onSubmit={handleSubmit}>
        <input
          type="text"
          id="korean"
          placeholder="Korean"
          value={koreanWord}
          onChange={(e) => setKoreanWord(e.target.value)}
          required
        />
        <input
          type="text"
          id="portuguese"
          placeholder="Portuguese"
          value={portugueseWord}
          onChange={(e) => setPortugueseWord(e.target.value)}
          required
        />
        <button type="submit" className="addCardButton">
          Add Word
        </button>
      </form>
    </div>
  );
}

export default Card;
