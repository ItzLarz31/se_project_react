import React, { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./AddItemModal.css";

function AddItemModal({
  isOpen,
  title,
  closeActiveModal,
  onSubmit,
  isLoading,
}) {
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    weather: "",
  });

  const [isFormComplete, setIsFormComplete] = useState(false);

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
      title: "",
      url: "",
      weather: "",
    });
  };

  useEffect(() => {
    const { title, url, weather } = formData;
    setIsFormComplete(title && url && weather);
  }, [formData]);

  return (
    <ModalWithForm
      isOpen={isOpen}
      title={title}
      closeActiveModal={closeActiveModal}
      onSubmit={handleSubmit}
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
        value={formData.title}
        onChange={handleChange}
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
        value={formData.url}
        onChange={handleChange}
      />
      <span className="modal__error" id="card-url-input-error"></span>
      <p className="modal__radio-label">Select the weather type:</p>
      <div className="modal__radio-group">
        <label>
          <input
            type="radio"
            name="weather"
            id="weather-hot"
            value="hot"
            checked={formData.weather === "hot"}
            onChange={handleChange}
          />
          Hot
        </label>
        <label>
          <input
            type="radio"
            name="weather"
            id="weather-warm"
            value="warm"
            checked={formData.weather === "warm"}
            onChange={handleChange}
          />
          Warm
        </label>
        <label>
          <input
            type="radio"
            name="weather"
            id="weather-cold"
            value="cold"
            checked={formData.weather === "cold"}
            onChange={handleChange}
          />
          Cold
        </label>
        <button
          type="submit"
          className={`modal__save ${
            isFormComplete ? "modal__save_active" : "modal__save_disabled"
          }`}
        >
          {isLoading ? "Saving..." : "Add Garment"}
        </button>
      </div>
    </ModalWithForm>
  );
}

export default AddItemModal;
