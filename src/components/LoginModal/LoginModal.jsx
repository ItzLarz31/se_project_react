import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

import "./LoginModal.css";

function LoginModal({
  isOpen,
  title,
  closeActiveModal,
  onSubmit,
  isLoading,
  handleRegisterClick,
}) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    });
  };

  useEffect(() => {
    const { email, password } = formData;
    setIsFormComplete(email && password);
  }, [formData]);

  return (
    <ModalWithForm
      isOpen={isOpen}
      title={title}
      closeActiveModal={closeActiveModal}
      onSubmit={handleSubmit}
    >
      <label className="modal__input-label" htmlFor="login-email-input">
        Email
      </label>
      <input
        type="email"
        name="email"
        id="login-email-input"
        placeholder="Email"
        className="modal__input"
        required
        value={formData.email}
        onChange={handleChange}
      />
      <span className="modal__error" id="card-title-input-error"></span>
      <label className="modal__input-label" htmlFor="login-password-input">
        Password
      </label>
      <input
        type="password"
        name="password"
        id="login-password-input"
        placeholder="Password"
        className="modal__input modal__input_last"
        required
        value={formData.password}
        onChange={handleChange}
      />
      <span className="modal__error" id="card-password-input-error"></span>
      <div className="modal__buttons">
        <button
          type="submit"
          className={`modal__login ${
            isFormComplete ? "modal__login_active" : "modal__login_disabled"
          }`}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <button
          type="button"
          onClick={handleRegisterClick}
          className="modal__register"
        >
          or Register
        </button>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
