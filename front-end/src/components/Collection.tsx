import Header from "./Header";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../Styles/cardContainer.css";
import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";
import AddCardModal from "./Modals/addCardModal";
import EditCardModal from "./Modals/editCardModal";
import addCard from "../api/addCard";
import fetchCollection from "../api/fetchWords";
import { deleteCard } from "../api/deleteCard";
import EditCard from "../api/editCard";

interface Card {
  ID: number;
  Front: string;
  Verse: string;
  CollectionID: number;
}
interface Collection {
  name: string;
  ID: number;
}

function Collection() {
  const [cards, setCards] = useState<Card[]>([]);
  const [collection, setCollection] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCardID, setEditCardID] = useState(0);
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
      console.log(updatedData.Cards);
      setCards(updatedData.Cards);
    } catch (err) {
      console.error("Erro ao adicionar card:", err);
    }
  };

  const handleEditCard = (cardId: number, front: string, verse: string) => {
    setEditCardID(cardId);
    setNewFront(front);
    setNewVerse(verse);
    setShowEditModal(true);
  };
  const handleSaveEdit = async (card: Card) => {
    if (editCardID !== null) {
      try {
        await EditCard(card);
        const updatedData = await fetchCollection(Number(id));
        setCards(updatedData.Cards);
        setCollection(updatedData.CollectionName);
        setShowEditModal(false);
        setEditCardID(0);
        setNewFront("");
        setNewVerse("");
      } catch (err) {
        console.error("Error updating collection name:", err);
      }
    }
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
      <div className="card-container-wrapper">
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
            <div className="card" key={card.ID}>
              <div className="card-content">
                <span className="card-name">
                  <>
                    <div>{card.Front}</div>
                    <div>{card.Verse}</div>
                  </>
                </span>
              </div>
              <div className="icons-container">
                <FaEdit
                  className="icon edit-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditCard(card.ID, card.Front, card.Verse);
                  }}
                />
                <FaTrash
                  className="icon delete-icon"
                  onClick={() => handleDeleteCard(card.ID)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        {showAddModal && (
          <AddCardModal
            isOpen={showAddModal}
            onClose={() => setShowAddModal(false)}
            onSubmit={handleAddCard}
          />
        )}
      </div>
      <div>
        {showEditModal && (
          <EditCardModal
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            onSubmit={(data) => {
              const card: Card = {
                ID: editCardID,
                Front: data.front,
                Verse: data.verse,
                CollectionID: Number(id),
              };
              handleSaveEdit(card);
            }}
            initialFront={newFront}
            initialVerse={newVerse}
            cardId={editCardID}
          />
        )}
      </div>
    </>
  );
}

export default Collection;
