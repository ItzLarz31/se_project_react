import React, { useContext } from "react";
import CurrentUserContext from "../../utils/contexts/CurrentUserContext";

import "../ItemCard/ItemCard.css";
import heartEmpty from "../../assets/images/like-default.png";
import heartFull from "../../assets/images/like-liked.png";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike(item);
  };

  const isLiked =
    Array.isArray(item.likes) &&
    currentUser &&
    item.likes.some((id) => id === currentUser._id);

  return (
    <div className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
      <button type="button" className="card__like-button" onClick={handleLike}>
        <img
          src={isLiked ? heartFull : heartEmpty}
          className={"card__like-image"}
          alt="Heart icon"
        />
      </button>
    </div>
  );
}

export default ItemCard;
