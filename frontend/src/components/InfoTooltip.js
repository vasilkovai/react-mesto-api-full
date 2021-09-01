import React from 'react';
import success from '../images/success.svg'
import fail from '../images/fail.svg'

function InfoTooltip(props) {
  return (
    <div className={`popup popup_status ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-button" aria-label="Закрыть" onClick={props.onClose} />
        <img className="popup__img" src={props.isRegisterStatus ? success : fail} alt="Статус регистрации"/>
        <h2 className="popup__status">
          {props.isRegisterStatus ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;