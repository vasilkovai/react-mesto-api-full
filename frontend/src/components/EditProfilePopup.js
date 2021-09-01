import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading}) {
  const [name, setName] = React.useState('');
  const [about, setAbout] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);

  }, [currentUser, isOpen]); 

  function handleChangeName(e) {
    setName(e.target.value)
  }
  
  function handleChangeAbout(e) {
    setAbout(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateUser({
      name: name,
      about: about,
    });
  }

  return (
    <PopupWithForm 
      name="edit_profile" 
      title="Редактировать профиль" 
      isOpen={isOpen} 
      onClose={onClose} 
      onSubmit={handleSubmit}
      isLoading={isLoading ? 'Сохранение...' : 'Сохранить'}
    >
      <input 
        type="text" 
        className="popup__input" 
        name="name" 
        required placeholder="Имя" 
        minLength={2} 
        maxLength={40} 
        id="name-edit" 
        value={name || ''} 
        onChange={handleChangeName}
      />
      <span className="popup__input-error" id="name-edit-error" />
      <input 
        type="text" 
        className="popup__input popup__input_text_about" 
        name="about" 
        required placeholder="О себе" 
        minLength={2} 
        maxLength={200} 
        id="about-edit" 
        value={about || ''} 
        onChange={handleChangeAbout}
      />
      <span className="popup__input-error" id="about-edit-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;