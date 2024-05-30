import "../ModalWithForm/ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  closeActiveModal,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__container">
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close"
        ></button>
        <h2 className="modal__heading">{title}</h2>
        <form className="modal__form">
          {children}
          <button
            type="submit"
            className="modal__save modal__save_disabled"
            disabled
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
