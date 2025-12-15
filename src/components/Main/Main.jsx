import React from "React";

function Main() {
  return (
    <section className="profile">
      <div className="profile__main-container">
        <div className="profile__data">
          <img
            className="profile__picture"
            src="./images/avatar.png"
            alt="Imagen de perfil del usuario"
          />
          <div className="profile__info-w-button">
            <div className="profile__info">
              <h1 className="profile__name">Jacques Cousteau</h1>
              <img
                src="../images/edit-button.svg"
                className="profile__edit-button"
                alt="botón de edición"
              />
            </div>
            <p className="profile__occupation">Explorador</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Main;
