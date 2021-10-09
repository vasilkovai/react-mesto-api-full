import React from 'react';
import headerLogo from '../images/logo.svg'
import { Route, Link } from 'react-router-dom'
import {CgMenu} from 'react-icons/cg'
import {CgClose} from 'react-icons/cg'

function Header({signOut, email}) {

  const [open, setOpen] = React.useState(false);

  const hamburgerOpen = <CgMenu className="header__burger" onClick={() => setOpen(true)}/>
  const hamburgerClose = <CgClose className="header__burger" onClick={() => setOpen(false)}/>

  return (
    <header className="header">
      <img className={`header__logo ${open ? 'header__logo_active' : ''}`} alt="Место" src={headerLogo}/>
      <Route path="/sign-up">
        <Link className="header__auth" to="/sign-in">Войти</Link>
      </Route>
      <Route path="/sign-in">
        <Link className="header__auth" to="/sign-up">Регистрация</Link>
      </Route>
      <Route exact path="/" >
        {open ? hamburgerClose : hamburgerOpen}
        <div className={`header__info ${open ? 'header__info_active' : ''}`}>
          <p className="header__auth">{email}</p>
          <button className="header__signout" onClick={signOut}>Выход</button>
        </div>
      </Route>
    </header>
  );
}

export default Header;