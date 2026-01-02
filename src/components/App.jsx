import { useState, useEffect } from "react";
import Header from "../Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import Popup from "./Main/components/Popup/Popup.jsx"; // Para formularios
import ImagePopup from "./Main/components/Popup/ImagePopup.jsx"; // Para imágenes
import EditProfile from "./form/EditProfile/EditProfile.jsx";
import NewCard from "./form/NewCard/NewCard.jsx";
import EditAvatar from "./form/EditAvatar/EditAvatar.jsx";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export default function App() {
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch(console.error);
  }, []);

  // 1. Estados para controlar la visibilidad de los popups
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  // 2. Controladores de apertura
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleCardClick = (card) => setSelectedCard(card);

  // 3. Función  para cerrar todos los popups
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  };

  // 4. Actualizar usuario y cerrar el popup al tener éxito
  const handleUpdateUser = (data) => {
    api
      .setUserInfo(data)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch(console.error);
  };

  const handleUpdateAvatar = (data) => {
    api
      .setUserAvatar(data)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch(console.error);
  };

  const handleAddPlaceSubmit = (data) => {
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.error);
  };

  const handleCardLike = (card) => {
    // 1. Usamos el encadenamiento opcional (?.) y un valor por defecto ([]) para evitar el error de 'undefined'
    const isLiked = (card.likes || []).some(
      (i) => i === currentUser._id || i?._id === currentUser._id
    );

    // 2. Enviamos el estado ACTUAL (isLiked) a la API para que ella sepa si debe dar LIKE o UNLIKE
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        // 3. Actualizamos el estado global con la tarjeta que nos devuelve el servidor
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => {
        console.error("Error al procesar el like:", error);
      });
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch(console.error);
  };

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        handleAddPlaceSubmit,
      }}>
      <div className="page__content">
        <Header />
        <Main
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onEditAvatarClick={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
        <Footer />

        {/* Popup Editar Perfil */}
        {isEditProfilePopupOpen && (
          <Popup
            title="Editar perfil"
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}>
            <EditProfile />
          </Popup>
        )}

        {/* Popup Nueva Tarjeta */}
        {isAddPlacePopupOpen && (
          <Popup title="Nuevo lugar" onClose={closeAllPopups}>
            <NewCard />
          </Popup>
        )}
        {/* Popup Editar Avatar */}
        {isEditAvatarPopupOpen && (
          <Popup title="Cambiar foto de perfil" onClose={closeAllPopups}>
            <EditAvatar />
          </Popup>
        )}
        {/* App.jsx */}
        {selectedCard && (
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        )}

        {/* Usarás componentes específicos como EditProfile, NewCard, etc. */}
      </div>
    </CurrentUserContext.Provider>
  );
}
