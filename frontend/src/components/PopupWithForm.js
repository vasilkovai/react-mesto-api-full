import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-button" aria-label="Закрыть" onClick={props.onClose}/>
        <h2 className="popup__title">{props.title}</h2>
        <form onSubmit={props.onSubmit} className={`popup__form popup__form_${props.name}`}>
          <label className="popup__field">{props.children}</label>
          <button type="submit" className="popup__save-button">{props.isLoading}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;