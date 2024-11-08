import React, { useEffect, useState } from "react";
import featchWords from "../api/fetchWords";
import "../Styles/cardContainer.css";

interface Card {
  ID: number;
  Front: string;
  Verse: string;
}

const CardsContainer: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await featchWords();
        setCards(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching words:", error);
      }
    };
    fetchData();
  }, []);
  cards.map((card) => {
    console.log("ESTA SAO AS CARTAS");
    console.log(card);
  });
  return (
    <div id="cardsContainer">
      {cards.map((card) => (
        <div key={card.ID} className="card">
          {card.Front} - {card.Verse}
        </div>
      ))}
    </div>
  );
};

export default CardsContainer;
