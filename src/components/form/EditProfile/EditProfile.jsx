// src/components/form/EditProfile/EditProfile.jsx
import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../../context/CurrentUserContext.js";

export default function EditProfile() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Sincroniza los inputs con los datos del usuario actual cuando se cargan
  useEffect(() => {
    setName(currentUser.name || "");
    setDescription(currentUser.about || "");
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <form
      className="popup__form"
      name="edit-profile-form"
      onSubmit={handleSubmit}>
      <label className="popup__field">
        <input
          className="popup__input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
          required
          minLength="2"
          maxLength="40"
        />
      </label>
      <label className="popup__field">
        <input
          className="popup__input"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Acerca de mí"
          required
          minLength="2"
          maxLength="200"
        />
      </label>
      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}
