import { useContext } from "react";
import { CurrentUserContext } from "../../../../context/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const { currentUser } = useContext(CurrentUserContext);

  // 1. Extraemos los datos con valores por defecto para evitar el error de 'undefined'
  // Si card.likes no existe, usamos un array vacío []
  const { name, link, owner = {}, likes = [], _id } = card;

  // 2. Verificamos si somos los dueños (usando encadenamiento opcional ?. por seguridad)
  const isOwn = owner._id === currentUser._id;

  const cardDeleteButtonClassName = `card__delete-button ${
    isOwn ? "card__delete-button_visible" : "card__delete-button_hidden"
  }`;

  // 3. Verificamos si le dimos like (aquí es donde fallaba el .some)
  const isLiked = likes.some((user) => user._id === currentUser._id);

  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_is-active" : ""
  }`;

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleImageClick() {
    onCardClick({ name, link });
  }

  return (
    <li className="card">
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
        type="button"
        aria-label="Eliminar"
      />
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={handleImageClick}
      />
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <div className="card__like-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          {/* Mostramos la cantidad de likes reales */}
          <span className="card__like-count">{likes.length}</span>
        </div>
      </div>
    </li>
  );
}
