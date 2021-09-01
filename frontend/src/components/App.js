import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import DeleteCardPopup from './DeleteCardPopup.js';
import Login from './Login.js';
import Register from './Register.js';
import api from '../utils/api.js';
import * as auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import ProtectedRoute from './ProtectedRoute.js';
import InfoTooltip from './InfoTooltip.js';

function App() {
  const [isEditProfileOpen, setIsEditProfileOpen] = React.useState(false);
  const [isEditAvatarOpen, setIsEditAvatarOpen] = React.useState(false);
  const [isAddPlaceOpen, setIsAddPlaceOpen] = React.useState(false);
  const [isInfoToolOpen, setIsInfoToolOpen] = React.useState(false);
  const [isDeleteCard, setIsDeleteCard] = React.useState(false);
  const [selectedDeleteCard, setSelectedDeleteCard] = React.useState(null);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false)
  const [isRegisterStatus, setIsRegisterStatus] = React.useState(false)
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const history = useHistory(); 

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([user, items]) => {
        setCurrentUser(user.data)
        setCards(items.data.reverse())
      })
      .catch(error => console.log(error));
    }
  }, [loggedIn])

  React.useEffect(() => {
      checkToken()
  }, [])

  function checkToken() {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          setEmail(res.data.email)
          setLoggedIn(true)
        })
        .catch(error => {
          console.error(error)})
    }
  }

  React.useEffect(() => {
    if (loggedIn) {
        history.push('/')
    }
  }, [history, loggedIn])

  function handleEditAvatarClick() {
    setIsEditAvatarOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfileOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlaceOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setIsEditAvatarOpen(false)
    setIsEditProfileOpen(false)
    setIsAddPlaceOpen(false)
    setIsDeleteCard(false)
    setSelectedCard(null)
    setIsInfoToolOpen(false)
  }

  function handleUpdateUser(user) {
    setIsLoading(true)
    api
      .setUserData(user)
      .then((user) => {
        setCurrentUser(user.data)
        closeAllPopups()
      })
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false))
  }

  function handleUpdateAvatar(user) {
    setIsLoading(true)
    api
      .setUserAvatar(user)
      .then((user) => {
        setCurrentUser(user.data)
        closeAllPopups()
      })
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false))
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard.data : c));
      })
      .catch(error => console.log(error))
  }

  function handleConfirmDelete(card) {
    setSelectedDeleteCard(card)
    setIsDeleteCard(true)
  }

  function handleCardDelete() {
    setIsLoading(true)
    api
      .deleteCard(selectedDeleteCard._id)
      .then(() => {
        setCards(cards.filter((item) => item._id !== selectedDeleteCard._id));
        closeAllPopups()
      })
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false))
  }

  function handleAddPlaceSubmit(item) {
    setIsLoading(true)
    api
      .addCard(item)
      .then((newCard) => {
        setCards([newCard.data, ...cards]);
        closeAllPopups()
      })
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false))
  }

  function handleRegister({password, email}) {
    auth
      .register(password, email)
      .then(() => {
        setIsInfoToolOpen(true)
        setIsRegisterStatus(true)
        history.push('/sign-in');})
      .catch(error => {
        console.log(error)
        setIsInfoToolOpen(true)
        setIsRegisterStatus(false)
    })  
  }

  function handleLogin({password, email}) {
    auth
      .login(password, email)
      .then((res) => {
        setEmail(email)
        setLoggedIn(true)
        localStorage.setItem('jwt', res.token)
        history.push('/')
      })
      .catch(error => {
        console.log(error)
        setIsInfoToolOpen(true)
        setIsRegisterStatus(false)
    })
  }
  
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        localStorage.removeItem('jwt')
        setEmail('')
        setLoggedIn(false)
        history.push('/sign-in')
      })
      .catch(error => console.log(error))
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header 
          signOut={handleSignOut}
          email={email}
        />
        <Switch>
          <ProtectedRoute
            exact path="/"
            component={Main}
            loggedIn={loggedIn}  
            onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick} 
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            cards={cards}
            onConfirmDelete={handleConfirmDelete}
          />
          <Route path="/sign-in">
            <Login handleLogin={handleLogin}/>
          </Route>
          <Route path="/sign-up">
            <Register handleRegister={handleRegister}/>
          </Route>
          <Route exact path="/">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>  
        </Switch>

        <Footer />
          
        <EditProfilePopup 
          isOpen={isEditProfileOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <AddPlacePopup 
          isOpen={isAddPlaceOpen} 
          onClose={closeAllPopups} 
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <EditAvatarPopup 
          isOpen={isEditAvatarOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <DeleteCardPopup
          isOpen={isDeleteCard}
          onClose={closeAllPopups}
          isLoading={isLoading}
          onCardDelete={handleCardDelete}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

        <InfoTooltip 
          isOpen={isInfoToolOpen} 
          onClose={closeAllPopups} 
          isRegisterStatus={isRegisterStatus} 
        />

      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;