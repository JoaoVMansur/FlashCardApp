import { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (collectionName: string) => void;
}

function Modal({ isOpen, onClose, onSubmit }: ModalProps) {
  const [novaColecao, setNovaColecao] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(novaColecao);
    setNovaColecao("");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Adicionar Nova Coleção</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={novaColecao}
            onChange={(e) => setNovaColecao(e.target.value)}
            placeholder="Nome da Coleção"
            required
          />
          <div className="modal-buttons">
            <button type="submit">Adicionar</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
