import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function DeleteCardPopup({ card, isOpen, onClose, isLoading, onCardDelete}) {
  function handleSubmit(e) {
    e.preventDefault()
    onCardDelete(card)
  } 

  return (
    <PopupWithForm 
      name="confirm" 
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      isLoading={isLoading ? 'Удаление...' : 'Да'}
      onSubmit={handleSubmit}
    >
    </PopupWithForm>
  );
}

export default DeleteCardPopup;
