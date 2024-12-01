import React, { useRef, useEffect } from "react";

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

// Inside AddModal.tsx
function AddModalCollection({ isOpen, onClose, onSubmit }: AddModalProps) {
  // Create a ref for the CardFront input field
  const cardFrontRef = useRef<HTMLInputElement | null>(null);

  // Focus on the CardFront input after submitting the form
  useEffect(() => {
    if (cardFrontRef.current) {
      cardFrontRef.current.focus();
    }
  }, [isOpen]); // Focus whenever the modal opens

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">New Collection</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            onSubmit({ name: formData.get("CollectionName") });
            e.currentTarget.reset();
          }}
        >
          <input
            type="text"
            name="CollectionName"
            placeholder="Collection Name"
            required
            className="modal-input"
          />
          <div className="button-group">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddModalCollection;
