import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../utils/contexts/CurrentUserContext";

import "./EditProfileModal.css";

function EditProfileModal({
  isOpen,
  title,
  closeActiveModal,
  onSubmit,
  isLoading,
}) {
  const { currentUser } = React.useContext(CurrentUserContext);

  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
  });

  const [isFormComplete, setIsFormComplete] = useState(false);

  useEffect(() => {
    if (currentUser && isOpen) {
      setFormData({
        name: currentUser.name,
        avatar: currentUser.avatar,
      });
    }
  }, [currentUser, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, resetForm);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      avatar: "",
    });
  };

  useEffect(() => {
    const { name, avatar } = formData;
    setIsFormComplete(name && avatar);
  }, [formData]);

  return (
    <ModalWithForm
      isOpen={isOpen}
      title={title}
      closeActiveModal={closeActiveModal}
      onSubmit={handleSubmit}
    >
      <label className="modal__input-label" htmlFor="edit-name-input">
        Name
      </label>
      <input
        type="text"
        name="name"
        id="edit-name-input"
        placeholder="Name"
        className="modal__input"
        required
        value={formData.name}
        onChange={handleChange}
      />
      <span className="modal__error" id="card-title-input-error"></span>
      <label className="modal__input-label" htmlFor="edit-avatar-input">
        Avatar
      </label>
      <input
        type="url"
        name="avatar"
        id="edit-avatar-input"
        placeholder="Avatar URL"
        className="modal__input modal__input_last"
        required
        value={formData.avatar}
        onChange={handleChange}
      />
      <span className="modal__error" id="card-avatar-input-error"></span>
      <div className="modal__buttons">
        <button
          type="submit"
          className={isFormComplete ? "modal__save" : "modal__save_disabled"}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </ModalWithForm>
  );
}

export default EditProfileModal;
