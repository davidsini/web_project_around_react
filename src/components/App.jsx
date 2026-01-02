import { useState, useEffect } from "react";
import Header from "../Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import { CurrentUserContext } from "../context/CurrentUserContext.js";
import api from "../utils/api.js";

const App = () => {
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        console.log("Datos recibidos de cards: (prueba)", data);
        setCards(data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    api
      .getUserInfo()
      .then((data) => setCurrentUser(data))
      .catch((error) => console.error(error));
  }, []);

  function handleCardLike(card) {
    const likes = card.likes || [];
    const isLiked = likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => console.error(error));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch(console.error);
  }

  const handleUpdateUser = (data) => {
    api
      .setUserInfo(data)
      .then((newData) => {
        setCurrentUser(newData);
      })
      .catch(console.error);
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, handleUpdateUser }}>
      <div className="page__content">
        <Header />
        {/* PASAMOS LAS PROPS A MAIN */}
        <Main
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
