import React from "react";
import { useState } from "react";
import Popup from "./components/Popup/Popup.jsx";
import NewCard from "../form/NewCard/NewCard.jsx";
import EditProfile from "../form/EditProfile/EditProfile.jsx";
import EditAvatar from "../form/EditAvatar/EditAvatar.jsx";

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
    <main className="profile">
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

      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}
