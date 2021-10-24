import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import useFormWithValidation from '../hooks/useFormWithValidation';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading}) {
  const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(values);
  }

  React.useEffect(() => { 
    resetForm();
  }, [resetForm, isOpen]);

  return (
    <PopupWithForm 
      name="avatar" 
      title="Обновить аватар" 
      isOpen={isOpen} 
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__field">
      <input 
        type="url" 
        className={`popup__input ${errors.avatar ? "popup__input_error" : "popup__input_valid"}`}
        name="avatar" 
        required 
        placeholder="Ссылка на новый аватар" 
        id="avatar-link" 
        value={values.avatar || ''}
        onChange={handleChange}
      />
      <span className={`${errors.avatar ? "popup__input-error" : null}`}>{errors.avatar}</span>
      </fieldset>
      <button 
        type="submit" 
        className={`popup__save-button ${!isValid ? "popup__save-button_inactive" : null}`}>
          {isLoading ? 'Сохранение...' : 'Сохранить'}
      </button>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
