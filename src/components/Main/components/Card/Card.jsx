export default function Card({ card, onCardClick, onCardLike }) {
  const { name, link, isLiked } = card;

  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button--clicked" : ""
  }`;

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleImageClick() {
    onCardClick({
      title: null,
      children: (
        <div className="imagePopUp__container">
          <img src={link} alt={name} />
          <p>{name}</p>
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
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          type="button"
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
        />
      </div>
    </li>
  );
}
