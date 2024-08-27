import React from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard.jsx";

function ClothesSection({
  handleCardClick,
  clothingItems,
  handleAddClick,
  onCardLike,
}) {
  return (
    <section className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">Your items</p>
        <button
          onClick={handleAddClick}
          type="button"
          className="clothes-section__add-button"
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__cards-list">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              onCardLike={onCardLike}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default ClothesSection;
