import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({isOpen, onClose, onAddPlace, isLoading}) {
  const [cardName, setCardName] = React.useState('');
  const [cardLink, setCardLink] = React.useState('');


  React.useEffect(() => {
    setCardName('');
    setCardLink('');
  }, [isOpen]); 

  function handleChangeCardName(e) {
    setCardName(e.target.value)
  }
  
  function handleChangeCardLink(e) {
    setCardLink(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    onAddPlace({
      name: cardName,
      link: cardLink,
    });
  }

  return (
    <PopupWithForm 
      name="add_card" 
      title="Новое место" 
      isOpen={isOpen} 
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading ? 'Сохранение...' : 'Создать'}
    >
      <input 
        type="text" 
        className="popup__input popup__input_card_name" 
        name="name" 
        required 
        placeholder="Название" 
        minLength={2} 
        maxLength={30} 
        id="card-name" 
        onChange={handleChangeCardName}
        value={cardName}
      />
      <span className="popup__input-error" id="card-name-error" />
      <input 
        type="url" 
        className="popup__input popup__input_card_link" 
        name="link" 
        required 
        placeholder="Ссылка на картинку" 
        id="card-link" 
        onChange={handleChangeCardLink}
        value={cardLink}
      />
      <span className="popup__input-error" id="card-link-error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
