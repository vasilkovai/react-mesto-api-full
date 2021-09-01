import React from 'react';
import Card from './Card.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function Main({
  cards, 
  onEditAvatar, 
  onEditProfile, 
  onAddPlace, 
  onCardLike, 
  onConfirmDelete, 
  onCardClick}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div onClick={onEditAvatar} style={{ backgroundImage: `url(${currentUser.avatar})`}} className="profile__avatar"></div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button onClick={onEditProfile} type="button" className="profile__edit-button" aria-label="Редактирование профиля" />
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button onClick={onAddPlace} type="button" className="profile__add-button" aria-label="Добавление карточки" />
      </section>
      <section className="cards">
        {cards.map((card) => (
          <Card 
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onConfirmDelete={onConfirmDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;