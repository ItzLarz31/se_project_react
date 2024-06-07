import "../ModalWithForm/ModalWithForm.css";

function ModalWithForm({
  children,
  // buttonText,
  title,
  isOpen,
  closeActiveModal,
  onSubmit,
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
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
