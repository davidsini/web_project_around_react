import React from "react";

export default function Card(props) {
  const { name, link } = props.card;
  const { onCardClick } = props;

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
          className="card__like-button"
        />
      </div>
    </li>
  );
}
