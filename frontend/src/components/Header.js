import React from 'react';
import headerLogo from '../images/logo.svg'
import { Route, Link } from 'react-router-dom';

function Header({signOut, email}) {

  return (
    <header className="header">
      <img className="header__logo" alt="Место" src={headerLogo} />
      <Route path="/sign-up">
        <Link className="header__auth" to="/sign-in">Войти</Link>
      </Route>
      <Route path="/sign-in">
        <Link className="header__auth" to="/sign-up">Регистрация</Link>
      </Route>
      <Route exact path="/" >
        <div className="header__info">
          <p className="header__auth">{email}</p>
          <button className="header__auth" onClick={signOut}>Выход</button>
        </div>
      </Route>
    </header>
  );
}

export default Header;