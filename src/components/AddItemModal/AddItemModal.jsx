import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./AddItemModal.css";

function AddItemModal({ isOpen, title, closeActiveModal, onSubmit }) {
  return (
    <ModalWithForm
      isOpen={isOpen}
      title={title}
      closeActiveModal={closeActiveModal}
      onSubmit={onSubmit}
    >
      <label className="modal__input-label" htmlFor="card-title-input">
        Name
      </label>
      <input
        type="text"
        name="title"
        id="card-title-input"
        placeholder="Name"
        className="modal__input"
        minLength="1"
        maxLength="30"
        required
      />
      <span className="modal__error" id="card-title-input-error"></span>
      <label className="modal__input-label" htmlFor="card-url-input">
        Image
      </label>
      <input
        type="url"
        name="url"
        id="card-url-input"
        placeholder="Image URL"
        className="modal__input"
        required
      />
      <span className="modal__error" id="card-url-input-error"></span>
      <p className="modal__radio-label">Select the weather type:</p>
      <div className="modal__radio-group">
        <label>
          <input type="radio" name="weather" id="weather-hot" value="Hot" />
          Hot
        </label>
        <label>
          <input type="radio" name="weather" id="weather-warm" value="Warm" />
          Warm
        </label>
        <label>
          <input type="radio" name="weather" id="weather-cold" value="Cold" />
          Cold
        </label>
        <button type="submit" className="modal__save modal__save_disabled">
          Add garment
        </button>
      </div>
    </ModalWithForm>
  );
}

export default AddItemModal;
