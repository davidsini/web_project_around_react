export default function EditProfile() {
  return (
    <form className="popup__form" name="edit-profile-form" noValidate>
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_name"
          id="name-input"
          type="text"
          name="name"
          placeholder="Nombre"
          required
          minLength="2"
          maxLength="40"
        />
        <span className="popup__error" id="name-input-error"></span>
      </label>

      <label className="popup__field">
        <input
          className="popup__input popup__input_type_about"
          id="about-input"
          type="text"
          name="about"
          placeholder="Acerca de mí"
          required
          minLength="2"
          maxLength="200"
        />
        <span className="popup__error" id="about-input-error"></span>
      </label>

      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}
