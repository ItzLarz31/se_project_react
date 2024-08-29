import React, { useContext } from "react";
import CurrentUserContext from "../../utils/contexts/CurrentUserContext";
import "../ItemModal/ItemModal.css";

function ItemModal({ activeModal, card, closeActiveModal, onClick }) {
  const { currentUser } = useContext(CurrentUserContext);

  const isOwner = currentUser && card.owner === currentUser._id;

  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__container modal__container_type_image">
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />

        <div className="modal__footer">
          {isOwner && (
            <button onClick={onClick} className="modal__delete-btn">
              Delete Item
            </button>
          )}
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
