import Header from "../Header/Header.jsx";
import Main from "../components/Main/Main.jsx";
import Footer from "../components/Footer/Footer.jsx";
import { CurrentUserContext } from "../context/CurrentUserContext.js";

useEffect(() => {
  api
    .getUserInfo()
    .then((data) => {
      setCurrentUser(data);
    })
    .catch((error) => console.error(error));
}, []);

const ProfileSection = () => {
  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <main className="page__main-container">
        <Header />
        <Main />
        <Footer />
      </main>
    </CurrentUserContext.Provider>
  );
};

export default ProfileSection;
