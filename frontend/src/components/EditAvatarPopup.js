import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading}) {
  const avatarRef = React.useRef('');

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  React.useEffect(() => { 
    avatarRef.current.value = ''
  }, [isOpen]) 

  return (
    <PopupWithForm 
      name="avatar" 
      title="Обновить аватар" 
      isOpen={isOpen} 
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading ? 'Сохранение...' : 'Сохранить'}
    >
      <input 
        type="url" 
        className="popup__input" 
        name="avatar" 
        required placeholder="Ссылка на новый аватар" 
        id="avatar-link" 
        ref={avatarRef}
      />
      <span className="popup__input-error" id="avatar-link-error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
