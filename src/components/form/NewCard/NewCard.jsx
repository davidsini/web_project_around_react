// src/components/form/NewCard/NewCard.jsx
import { useState, useContext } from "react";
import { CurrentUserContext } from "../../../context/CurrentUserContext.js";

export default function NewCard() {
  const { handleAddPlaceSubmit } = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    handleAddPlaceSubmit({ name, link });
    setName("");
    setLink("");
  }

  return (
    <form className="popup__form" onSubmit={handleSubmit}>
      <label className="popup__field">
        <input
          className="popup__input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Título"
          required
        />
      </label>
      <label className="popup__field">
        <input
          className="popup__input"
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Enlace a la imagen"
          required
        />
      </label>
      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}
