import "../Styles/collectionsContainer.css";
import "../Styles/addModal.css";
import fetchCollections from "../api/fetchCollections";
import { useEffect, useState } from "react";
import addCollection from "../api/addCollection";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import deleteCollection from "../api/deleteColletion";
import AddModalCollection from "./Modals/addCollectionModal";
import EditModalCollection from "./Modals/editCollectionModal";
import EditCollectionName from "../api/editCollection";

interface Collection {
  ID: number;
  CollectionName: string;
}

function CollectionsContainer() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCollectionID, setEditCollectionID] = useState<number>(0);
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
    setShowEditModal(true);
  };

  const handleDeleteCollection = async (id: number) => {
    try {
      await deleteCollection(id);
      const updatedData = await fetchCollections();
      setCollections(updatedData.collections);
    } catch (err) {
      console.error("Error deleting collection:", err);
    }
  };

  const handleSaveEdit = async (collection: Collection) => {
    if (editCollectionID !== null) {
      try {
        await EditCollectionName(collection);
        const updatedData = await fetchCollections();
        setCollections(updatedData.collections);
        setShowEditModal(false);
        setEditCollectionID(0);
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
            <span className="collection-name">{collection.CollectionName}</span>
            <div
              className="icons-container"
              onClick={(e) => e.stopPropagation()}
            >
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
            </div>
          </div>
        ))}
      </div>

      <div>
        {showAddModal && (
          <AddModalCollection
            isOpen={showAddModal}
            onClose={() => setShowAddModal(false)}
            onSubmit={handleAddCollection}
          />
        )}
      </div>

      <div>
        {showEditModal && (
          <EditModalCollection
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            onSubmit={(data) => {
              const collection: Collection = {
                ID: editCollectionID,
                CollectionName: data.name,
              };
              handleSaveEdit(collection);
            }}
            initialName={newName}
            collectionId={editCollectionID}
          />
        )}
      </div>
    </div>
  );
}

export default CollectionsContainer;
