import "../Styles/collectionsContainer.css";
import "../Styles/addModal.css";
import fetchCollections from "../api/fetchCollections";
import { useEffect, useState } from "react";
import AddModal from "./addModal";
import addCollection from "../api/addCollection";
import { FaEdit, FaTrash } from "react-icons/fa"; // FontAwesome Icons for edit and delete
import { useNavigate } from "react-router-dom";

interface Collection {
  ID: number;
  CollectionName: string;
}

function CollectionsContainer() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editCollectionID, setEditCollectionID] = useState<number | null>(null);
  const [newName, setNewName] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const getCollections = async () => {
      try {
        const data = await fetchCollections();
        setCollections(data.collections);
      } catch (err) {
        console.error("Error fetching collections:", err);
      }
    };

    getCollections();
  }, []);

  const handleAddCollection = async (data: { name: string }) => {
    try {
      await addCollection({ CollectionName: data.name });
      const updatedData = await fetchCollections();
      setCollections(updatedData.collections);
      setShowAddModal(false);
    } catch (err) {
      console.error("Error adding collection:", err);
    }
  };

  const handleEditCollection = (id: number, currentName: string) => {
    setEditCollectionID(id);
    setNewName(currentName);
  };

  const handleDeleteCollection = async (id: number) => {
    try {
      // Implement the delete logic here (API call to delete collection)
      console.log("Deleting collection with ID:", id);
      const updatedData = await fetchCollections();
      setCollections(updatedData.collections);
    } catch (err) {
      console.error("Error deleting collection:", err);
    }
  };

  const handleSaveEdit = async () => {
    if (editCollectionID !== null) {
      try {
        // Implement API call to save the edited collection name
        console.log(
          `Saving new name: ${newName} for collection ID: ${editCollectionID}`
        );
        const updatedData = await fetchCollections();
        setCollections(updatedData.collections);
        setEditCollectionID(null); // Reset edit state
        setNewName("");
      } catch (err) {
        console.error("Error updating collection name:", err);
      }
    }
  };

  const handleCollectionClick = (id: number) => {
    navigate(`/collection/${id}`);
  };

  return (
    <div className="collections-container-wrapper">
      <h1 className="collections-title">Your Collections</h1>
      <div className="collections-container">
        <div
          className="collection add-collection"
          onClick={() => setShowAddModal(!showAddModal)}
        >
          <div className="add-icon-border">
            <span className="add-icon">+</span>
          </div>
        </div>

        {collections.map((collection) => (
          <div
            className="collection"
            key={collection.ID}
            onClick={() => handleCollectionClick(collection.ID)}
          >
            <span className="collection-name">
              {editCollectionID === collection.ID ? (
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => {
                    e.stopPropagation();
                    setNewName(e.target.value);
                  }}
                  autoFocus
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                collection.CollectionName
              )}
            </span>
            <div
              className="icons-container"
              onClick={(e) => e.stopPropagation()}
            >
              {editCollectionID === collection.ID ? (
                <button onClick={handleSaveEdit}>Save</button>
              ) : (
                <>
                  <FaEdit
                    className="icon edit-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditCollection(
                        collection.ID,
                        collection.CollectionName
                      );
                    }}
                  />
                  <FaTrash
                    className="icon delete-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCollection(collection.ID);
                    }}
                  />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      {showAddModal && (
        <AddModal
          isOpen={showAddModal}
          collection={true}
          card={false}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddCollection}
        />
      )}
    </div>
  );
}

export default CollectionsContainer;
