import React from "react";
import { useState } from "react";
import Popup from "./Popup";

export default function Main() {
  const [popup, setPopup] = useState(null);

  const newCardPopup = { title: "Nuevo lugar", children: <NewCard /> };

  function handleOpenPopup(popup) {
    setPopup(popup);
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
            <div className="profile__avatar-overlay"></div>
          </div>
          <div className="profile__info-w-button">
            <div className="profile__info">
              <h1 className="profile__name">Jacques Cousteau</h1>
              <img
                src="/public/images/edit-button.svg"
                className="profile__edit-button"
                alt="botón de edición"
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
