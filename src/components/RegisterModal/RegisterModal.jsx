import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

import "./RegisterModal.css";

function RegisterModal({
  isOpen,
  title,
  closeActiveModal,
  onSubmit,
  isLoading,
  handleLoginClick,
}) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
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
      email: "",
      password: "",
      name: "",
      avatar: "",
    });
  };

  useEffect(() => {
    const { email, password, name, avatar } = formData;
    setIsFormComplete(email && password && name && avatar);
  }, [formData]);

  return (
    <ModalWithForm
      isOpen={isOpen}
      title={title}
      closeActiveModal={closeActiveModal}
      onSubmit={handleSubmit}
    >
      <label className="modal__input-label" htmlFor="register-email-input">
        Email
      </label>
      <input
        type="email"
        name="email"
        id="register-email-input"
        placeholder="Email"
        className="modal__input"
        required
        value={formData.email}
        onChange={handleChange}
      />
      <span className="modal__error" id="card-title-input-error"></span>
      <label className="modal__input-label" htmlFor="register-password-input">
        Password
      </label>
      <input
        type="password"
        name="password"
        id="register-password-input"
        placeholder="Password"
        className="modal__input"
        required
        value={formData.password}
        onChange={handleChange}
      />
      <span className="modal__error" id="card-password-input-error"></span>
      <label className="modal__input-label" htmlFor="register-name-input">
        Name
      </label>
      <input
        type="text"
        name="name"
        id="register-name-input"
        placeholder="Name"
        className="modal__input"
        required
        value={formData.name}
        onChange={handleChange}
      />
      <span className="modal__error" id="card-name-input-error"></span>
      <label className="modal__input-label" htmlFor="register-avatar-input">
        Avatar URL
      </label>
      <input
        type="url"
        name="avatar"
        id="register-avatar-input"
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
          className={`modal__login ${
            isFormComplete ? "modal__login_active" : "modal__login_disabled"
          }`}
        >
          {isLoading ? "Logging in..." : "Next"}
        </button>
        <button
          type="button"
          onClick={handleLoginClick}
          className="modal__register"
        >
          or Log in
        </button>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
