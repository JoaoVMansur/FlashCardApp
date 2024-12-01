import Header from "./Header";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../Styles/collectionsContainer.css";
import {
  FaArrowCircleLeft,
  FaArrowLeft,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import AddModal from "./Modals/addCollectionModal";
import addCard from "../api/addCard";
import fetchCollection from "../api/fetchWords";
import { deleteCard } from "../api/deleteCard";

interface Card {
  ID: number;
  Front: string;
  Verse: string;
}
interface Collection {
  name: string;
  ID: number;
}

function Collection() {
  const [cards, setCards] = useState<Card[]>([]);
  const [collection, setCollection] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editCardID, setEditCardID] = useState<number | null>(null);
  const [newFront, setNewFront] = useState<string>("");
  const [newVerse, setNewVerse] = useState<string>("");
  const { id } = useParams();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await fetchCollection(Number(id));
        console.log(data);
        setCards(data.Cards);
        setCollection(data.CollectionName);
      } catch (err) {
        console.error("Erro ao buscar cards:", err);
      }
    };

    fetchCards();
  }, [id]);

  const handleAddCard = async (data: { front: string; verse: string }) => {
    try {
      const newCard = {
        front: data.front,
        verse: data.verse,
        collectionId: Number(id),
      };
      await addCard(newCard);
      const updatedData = await fetchCollection(Number(id));
      setCards(updatedData.Cards);
    } catch (err) {
      console.error("Erro ao adicionar card:", err);
    }
  };

  const handleEditCard = (cardId: number, front: string, verse: string) => {
    setEditCardID(cardId);
    setNewFront(front);
    setNewVerse(verse);
  };

  const handleDeleteCard = async (cardId: number) => {
    try {
      await deleteCard(cardId);
      const updatedData = await fetchCollection(Number(id));
      setCards(updatedData.Cards);
    } catch (err) {
      console.error("Erro ao deletar card:", err);
    }
  };

  return (
    <>
      <Header />
      <div className="collections-container-wrapper">
        <h1 className="collections-title">
          <Link to="/" style={{ color: "inherit" }}>
            <FaArrowLeft style={{ color: "inherit" }} />
          </Link>
          {collection}
        </h1>
        <div className="collections-container">
          <div
            className="collection add-collection"
            onClick={() => setShowAddModal(true)}
          >
            <div className="add-icon-border">
              <span className="add-icon">+</span>
            </div>
          </div>

          {cards.map((card) => (
            <div className="collection" key={card.ID}>
              <div className="card-content">
                <span className="collection-name">
                  {editCardID === card.ID ? (
                    <>
                      <input
                        type="text"
                        value={newFront}
                        onChange={(e) => setNewFront(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <input
                        type="text"
                        value={newVerse}
                        onChange={(e) => setNewVerse(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </>
                  ) : (
                    <>
                      <div>{card.Front}</div>
                      <div>{card.Verse}</div>
                    </>
                  )}
                </span>
                <div className="icons-container">
                  <FaEdit
                    className="icon edit-icon"
                    onClick={() =>
                      handleEditCard(card.ID, card.Front, card.Verse)
                    }
                  />
                  <FaTrash
                    className="icon delete-icon"
                    onClick={() => handleDeleteCard(card.ID)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddCard}
      />
    </>
  );
}

export default Collection;
