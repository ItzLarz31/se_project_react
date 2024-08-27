import React from "react";
import "./Profile.css";
import userPic from "../../assets/images/user-pic.svg";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  handleCardClick,
  clothingItems,
  handleAddClick,
  handleProfileEditClick,
  handleSignOut,
  onCardLike,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          handleProfileEditClick={handleProfileEditClick}
          handleSignOut={handleSignOut}
        />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          handleCardClick={handleCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
