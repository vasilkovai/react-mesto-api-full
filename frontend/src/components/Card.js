import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function Card({ card, onCardClick, onCardLike, onConfirmDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  function handleCardClick() {
    onCardClick(card);
  }  

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onConfirmDelete(card)
  }

  const isOwn = card.owner === currentUser._id;

  const cardDeleteButtonClassName = (
    `card__delete ${isOwn ? '' : 'card__delete_hidden'}`
  );

  const isLiked = card.likes.some(i => i === currentUser._id);

  const cardLikeButtonClassName = (
    `card__like ${isLiked ? 'card__like_active' : 'card__like'}`
  );

  return (
    <div className="card">
      <div className="card__items">
        <div onClick={handleCardClick} className="card__image" style={{ backgroundImage: `url(${card.link})` }}></div>
        <button onClick={handleDeleteClick} type="button" className={cardDeleteButtonClassName} aria-label="Удалить" />
      </div>
      <div className="card__description">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button onClick={handleLikeClick} type="button" className={cardLikeButtonClassName} aria-label="Лайк" />
          <span className="card__likes">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;