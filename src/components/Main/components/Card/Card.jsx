import { useContext } from "react";
import { CurrentUserContext } from "../../../../context/CurrentUserContext";

export default function Card({ card, onCardClick }) {
  const { name, link, likes = [] } = card;

  const { currentUser } = useContext(CurrentUserContext);

  const isLiked = likes.some((user) => user._id === currentUser?._id);

  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_is-active" : ""
  }`;

  function handleImageClick() {
    onCardClick({
      title: null,
      children: (
        <div className="imagePopUp__container">
          <img className="imagePopUp__image" src={link} alt={name} />
          <p className="imagePopUp__title">{name}</p>
        </div>
      ),
    });
  }

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={handleImageClick}
      />
      <button
        aria-label="Delete card"
        className="card__delete-button"
        type="button"
      />
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          aria-label="Like card"
          type="button"
          className={cardLikeButtonClassName}
        />
      </div>
    </li>
  );
}
