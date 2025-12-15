import React from "react";
import { useState } from "react";
import Popup from "./components/Popup/Popup.jsx";
import NewCard from "../form/NewCard/NewCard.jsx";
import EditProfile from "../form/EditProfile/EditProfile.jsx";
import EditAvatar from "../form/EditAvatar/EditAvatar.jsx";

import Card from "./components/Card/Card.jsx";

const cards = [
  {
    isLiked: false,
    _id: "5d1f0611d321eb4bdcd707dd",
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
    owner: "5d1f0611d321eb4bdcd707dd",
    createdAt: "2019-07-05T08:10:57.741Z",
  },
  {
    isLiked: false,
    _id: "5d1f064ed321eb4bdcd707de",
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
    owner: "5d1f0611d321eb4bdcd707dd",
    createdAt: "2019-07-05T08:11:58.324Z",
  },
];

export default function Main() {
  const [popup, setPopup] = useState(null);

  const newCardPopup = {
    title: "Nuevo lugar",
    children: <NewCard />,
  };

  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
  };

  const editAvatarPopup = {
    title: "Cambiar foto de perfil",
    children: <EditAvatar />,
  };

  function handleOpenPopup(popupToOpen) {
    setPopup(popupToOpen);
  }

  const handleClosePopup = () => {
    setPopup(null);
  };

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__main-container">
          <div className="profile__data">
            <div className="profile__avatar-wrapper">
              <img
                className="profile__picture"
                src="/public/images/avatar.png"
                alt="Imagen de perfil del usuario"
              />
              <div
                className="profile__avatar-overlay"
                onClick={() => handleOpenPopup(editAvatarPopup)}></div>
            </div>
            <div className="profile__info-w-button">
              <div className="profile__info">
                <h1 className="profile__name">Jacques Cousteau</h1>
                <img
                  src="/public/images/edit-button.svg"
                  className="profile__edit-button"
                  alt="botón de edición"
                  onClick={() => handleOpenPopup(editProfilePopup)}
                />
              </div>
              <p className="profile__occupation">Explorador</p>
            </div>
          </div>

          <button
            aria-label="Add card"
            className="profile__add-button"
            type="button"
            onClick={() => handleOpenPopup(newCardPopup)}
          />
        </div>
      </section>

      <section className="cards">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card key={card._id} card={card} />
          ))}
        </ul>
      </section>
      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}
