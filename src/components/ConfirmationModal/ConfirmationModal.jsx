import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function ConfirmationModal({ isOpen, closeActiveModal, onSubmit, isLoading }) {
  return (
    <ModalWithForm closeActiveModal={closeActiveModal} isOpen={isOpen}>
      <p className="modal__text">
        Are you sure you want to delete this item?
        <br />
        This action is irreversible.
      </p>

      <button
        onClick={onSubmit}
        type="submit"
        className="modal__confirm-delete-btn"
      >
        {isLoading ? "Deleting..." : "Yes, delete item"}
      </button>
      <button
        onClick={closeActiveModal}
        type="button"
        className="modal__cancel-btn"
      >
        Cancel
      </button>
    </ModalWithForm>
  );
}

export default ConfirmationModal;
