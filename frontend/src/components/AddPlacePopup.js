import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import useFormWithValidation from '../hooks/useFormWithValidation';

function AddPlacePopup({isOpen, onClose, onAddPlace, isLoading}) {
  const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation();
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(values);
  };

  React.useEffect(() => { 
    resetForm();
  }, [resetForm, isOpen]);

  return (
    <PopupWithForm 
      name="add_card" 
      title="Новое место" 
      isOpen={isOpen} 
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__field">
      <input 
        type="text" 
        className={`popup__input ${errors.name ? "popup__input_error" : "popup__input_valid"}`}
        name="name" 
        required 
        placeholder="Название" 
        minLength={2} 
        maxLength={30} 
        id="card-name" 
        onChange={handleChange}
        value={values.name || ''}
      />
      <span className={`${errors.name ? "popup__input-error" : null}`}>{errors.name}</span>
      </fieldset>

      <fieldset className="popup__field">
      <input 
        type="url" 
        className={`popup__input ${errors.link ? "popup__input_error" : "popup__input_valid"}`}
        name="link" 
        required 
        placeholder="Ссылка на картинку" 
        id="card-link" 
        onChange={handleChange}
        value={values.link || ''}
      />
      <span className={`${errors.link ? "popup__input-error" : null}`}>{errors.link}</span>
      </fieldset>
      <button 
        type="submit" 
        className={`popup__save-button ${!isValid ? "popup__save-button_inactive" : null}`}>
          {isLoading ? 'Сохранение...' : 'Создать'}
      </button>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
