import React, { useRef, useEffect } from "react";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: any; id: any }) => void;
  initialName: string;
  collectionId: number;
}

function EditModalCollection({
  isOpen,
  onClose,
  onSubmit,
  initialName,
  collectionId,
}: EditModalProps) {
  const cardFrontRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (cardFrontRef.current) {
      cardFrontRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Edit Collection</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            onSubmit({
              name: formData.get("CollectionName"),
              id: collectionId,
            });
            e.currentTarget.reset();
          }}
        >
          <input
            type="text"
            name="CollectionName"
            placeholder="Collection Name"
            required
            className="modal-input"
            defaultValue={initialName}
          />
          <div className="button-group">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModalCollection;
