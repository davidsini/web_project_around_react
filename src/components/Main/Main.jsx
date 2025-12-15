import React from "react";

function Main() {
  return (
    <section className="profile">
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
        <button className="profile__add-button" type="button">
          <img src="/public/images/add-button.svg" alt="botón agregar" />
        </button>
      </div>
    </section>
  );
}

export default Main;
