import React from "react";
import { useState, useEffect, useContext } from "react";
import Popup from "./Popup.jsx";
import NewCard from "../form/NewCard/NewCard.jsx";
import EditProfile from "../form/EditProfile/EditProfile.jsx";
import EditAvatar from "../form/EditAvatar/EditAvatar.jsx";
import Card from "./components/Card/Card.jsx";
import api from "../../utils/api.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

export default function Main({
  cards,
  onCardLike,
  onCardDelete,
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCardClick,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <section className="content">
      <section className="profile">
        <div className="profile__main-container">
          <div className="profile__data">
            <div className="profile__avatar-wrapper">
              <img
                className="profile__picture"
                src={currentUser.avatar}
                alt="Perfil"
              />
              <div
                className="profile__avatar-overlay"
                onClick={onEditAvatarClick}></div>
            </div>
            <div className="profile__info-w-button">
              <div className="profile__info">
                <h1 className="profile__name">{currentUser.name}</h1>
                <img
                  src="/images/edit-button.svg"
                  className="profile__edit-button"
                  onClick={onEditProfileClick}
                />
              </div>
              <p className="profile__occupation">{currentUser.about}</p>
            </div>
          </div>
          <button className="profile__add-button" onClick={onAddPlaceClick} />
        </div>
      </section>

      <section className="cards">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </section>
  );
}
