import { useRef, useEffect } from "react";

interface EditCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { front: string; verse: string; id: number }) => void;
  initialFront: string;
  initialVerse: string;
  cardId: number;
}

function EditCardModal({
  isOpen,
  onClose,
  onSubmit,
  initialFront,
  initialVerse,
  cardId,
}: EditCardModalProps) {
  const frontRef = useRef<HTMLInputElement | null>(null);
  const verseRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (frontRef.current) {
      frontRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Edit Card</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            onSubmit({
              front: formData.get("CardFront") as string,
              verse: formData.get("CardVerse") as string,
              id: cardId,
            });
            e.currentTarget.reset();
          }}
        >
          <input
            type="text"
            name="CardFront"
            placeholder="Card Front"
            required
            className="modal-input"
            defaultValue={initialFront}
            ref={frontRef}
          />
          <input
            type="text"
            name="CardVerse"
            placeholder="Card Verse"
            required
            className="modal-input"
            defaultValue={initialVerse}
            ref={verseRef}
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

export default EditCardModal;
