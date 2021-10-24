export const BASE_URL = 'http://localhost:3001';

const checkStatus = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }
}

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({password, email})
  })
  .then(checkStatus)
}; 

export const login = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({password, email})
  })
  .then(checkStatus)
}; 

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    },
    credentials: 'include',
  })
  .then(checkStatus)
}; 

export const signOut = () => {
  return fetch(`${BASE_URL}/signout`, {
      method: "DELETE",
      credentials: "include",
  })
  .then(checkStatus)
};
