import React from "react";

function Header() {
  return (
    <header className="header">
      <img
        src="./images/logo.svg"
        alt="logo con inscripción 'around the U.S.'"
        className="header__logo"
      />
      <hr className="header__line" />
    </header>
  );
}

export default Header;
