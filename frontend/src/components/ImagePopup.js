import React from 'react';

function ImagePopup(props) {
  return (
    <div className={`popup popup-img ${props.card && 'popup_opened'}`}>
      <div className="popup-img__container">
        <button type="button" className="popup__close-button" aria-label="Закрыть" onClick={props.onClose} />
        <figure className="popup-img__items">
          <img src={ props.card?.link} alt={ props.card?.name} className="popup-img__image" />
          <figcaption className="popup-img__title" />{props.card && props.card.name}</figure>
      </div>
    </div>
  );
}

export default ImagePopup;