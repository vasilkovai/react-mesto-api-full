import React from 'react';
import { Link } from 'react-router-dom';
import useFormWithValidation from '../hooks/useFormWithValidation';

function Register ({handleRegister}) {
  const { values, errors, isValid, handleChange } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(values);
  }

  return (
    <div className="login">
      <p className="login__welcome">Регистрация</p>
        <form onSubmit={handleSubmit} className="login__form">
          <label className="login__field" htmlFor="email">
            <input 
              className={`login__input ${errors.email ? "login__input_error" : "login__input_valid"}`}
              id="email" 
              name="email" 
              type="email" 
              placeholder="Email"
              onChange={handleChange}
              value={values.email || ''}
              autoComplete="off"
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            />
            <span className={`${errors.email? "login__input-error" : null}`}>{errors.email}</span>
          </label>
          
          <label className="login__field" htmlFor="password">
            <input 
              className={`login__input ${errors.password ? "login__input_error" : "login__input_valid"}`}
              id="password" 
              name="password" 
              type="password" 
              placeholder="Пароль"
              onChange={handleChange}
              value={values.password || ''}
              autoComplete="off"
              required
              minLength="8"
              maxLength="30"
            />
            <span className={`${errors.password ? "login__input-error" : null}`}>{errors.password}</span>
          </label>
          
          <button type="submit" className={`login__submit ${!isValid ? "login__submit_inactive" : null}`}>Зарегистрироваться</button>
        </form>
        <Link to="/sign-in" className="login__sign-in">Уже зарегистрированы? Войти</Link>
    </div>
  )
}

export default Register; 