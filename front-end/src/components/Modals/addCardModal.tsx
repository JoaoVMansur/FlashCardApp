import { useRef, useEffect } from "react";

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

function AddCardModal({ isOpen, onClose, onSubmit }: AddModalProps) {
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
        <h2 className="modal-title">New Card</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            onSubmit({
              front: formData.get("Front"),
              verse: formData.get("Verse"),
            });
            e.currentTarget.reset();
          }}
        >
          <input
            type="text"
            name="Front"
            placeholder="Card Front"
            required
            className="modal-input"
          />
          <input
            type="text"
            name="Verse"
            placeholder="Card Back"
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

export default AddCardModal;
