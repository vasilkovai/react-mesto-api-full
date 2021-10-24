import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import useFormWithValidation from '../hooks/useFormWithValidation';

function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading}) {
  const { values, errors, isValid, handleChange, resetForm, setValues } = useFormWithValidation();

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setValues({
      name: currentUser.name,
      about: currentUser.about,
    })
  }, [setValues, currentUser, isOpen]); 

  React.useEffect(() => {
    resetForm({ 
      name: currentUser.name, 
      about: currentUser.about,
    });
  }, [resetForm, currentUser, isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values);
  }

  return (
    <PopupWithForm 
      name="edit_profile" 
      title="Редактировать профиль" 
      isOpen={isOpen} 
      onClose={onClose} 
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__field">
      <input 
        type="text" 
        className={`popup__input ${errors.name ? "popup__input_error" : "popup__input_valid"}`}
        name="name" 
        required placeholder="Имя" 
        minLength={2} 
        maxLength={40} 
        id="name-edit" 
        value={values.name || ''} 
        onChange={handleChange}
      />
      <span className={`${errors.name ? "popup__input-error" : null}`}>{errors.name}</span>
      </fieldset>

      <fieldset className="popup__field">
      <input 
        type="text" 
        className={`popup__input ${errors.about ? "popup__input_error" : "popup__input_valid"}`}
        name="about" 
        required placeholder="О себе" 
        minLength={2} 
        maxLength={200} 
        id="about-edit" 
        value={values.about || ''} 
        onChange={handleChange}
      />
      <span className={`${errors.about ? "popup__input-error" : null}`}>{errors.about}</span>
      </fieldset>
      <button 
        type="submit" 
        className={`popup__save-button ${!isValid ? "popup__save-button_inactive" : null}`}>
          {isLoading ? 'Сохранение...' : 'Сохранить'}
      </button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;