import { useNavigate } from "react-router-dom";
import addCard from "../api/addCard";
import "../Styles/AddCard.css";
import React, { useState } from "react";

interface Card {
  front: string;
  verse: string;
}

function Card() {
  const [front, setFront] = useState("");
  const [verse, setVerse] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const card: Card = {
      front: front,
      verse: verse,
    };
    const data = await addCard(card);
    console.log("DATA");
    console.log(data);
    if (!data) {
      alert("Word Already Added");
    } else {
      alert(`Word Added With Success ${card.front}-${card.verse}`);
      navigate("/Home");
    }
  };

  return (
    <div className="container" id="card">
      <h1 id="addCardTitle">Add New Card</h1>
      <form id="addWordForm" onSubmit={handleSubmit}>
        <input
          type="text"
          id="Front"
          placeholder="Front"
          value={front}
          onChange={(e) => setFront(e.target.value)}
          required
        />
        <input
          type="text"
          id="Verse"
          placeholder="Verse"
          value={verse}
          onChange={(e) => setVerse(e.target.value)}
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
