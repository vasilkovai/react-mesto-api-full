import React from 'react';

function Login({handleLogin}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [formValid, setFormValid] = React.useState(false)

  React.useEffect(() => {
    (emailError || passwordError || email === '' || password === '') 
      ? setFormValid(false) 
      : setFormValid(true);
  }, [emailError, passwordError, email, password])

  function handleChangeEmail(e) {
    setEmail(e.target.value)
    const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if (!regex.test(email)) {
      setEmailError('Пожалуйста, введите корректный email-адрес.') 
      if (!e.target.value) {
        setEmailError('Обязательное поле.')
      }
    } else {
      setEmailError('')
    }
  }

  function handleChangePassword(e) {
    setPassword(e.target.value)
    if (e.target.value.length < 8) {
      setPasswordError('Длина пароля должна быть не менее 8 символов.')
      if (!e.target.value) {
        setPasswordError('Обязательное поле.')
      }
    } else {
      setPasswordError('')
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    handleLogin({
      email: email,
      password: password
    })
  }

  return (
    <div className="login">
      <p className="login__welcome">Вход</p>
        <form onSubmit={handleSubmit} className="login__form">
          <label className="login__field" htmlFor="email">
            <input 
              className={`login__input ${emailError ? "login__input_error" : "login__input_valid"}`}
              id="email" 
              name="email" 
              type="email" 
              placeholder="Email"
              onChange={handleChangeEmail}
              value={email}
              autoComplete="off"
            />
            <span className={`${emailError ? "login__input-error" : null}`}>{emailError}</span>
          </label>

          <label className="login__field" htmlFor="password">
            <input 
              className={`login__input ${passwordError ? "login__input_error" : "login__input_valid"}`}
              id="password" 
              name="password" 
              type="password" 
              placeholder="Пароль"
              onChange={handleChangePassword}
              value={password}
              autoComplete="off"
            />
            <span className={`${passwordError ? "login__input-error" : null}`}>{passwordError}</span>
          </label>
          
          <button type="submit" className={`login__submit ${!formValid ? "login__submit_inactive" : null}`}>Войти</button>
        </form>
    </div>
  )
}

export default Login;