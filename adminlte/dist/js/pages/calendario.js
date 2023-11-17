document.addEventListener('DOMContentLoaded', checkLocalStorageAndAuthenticate);

async function checkLocalStorageAndAuthenticate() {
  const token = getFromLocalStorage('token');
  const userId = getFromLocalStorage('userId');
  const email = getFromLocalStorage('email');
  const remember = getFromLocalStorage('lembre_se');

  if (token) {
    try {
      await autenticarUsuario(token, email, userId);
    } catch (error) {
      handleError(error);
    }
  }
  else{
    window.location.href = "../../index.html";
  }
}

function getFromLocalStorage(key) {
  return localStorage.getItem(key);
}

function setInLocalStorage(key, value) {
  if (value) {
    localStorage.setItem(key, value);
  } else {
    localStorage.removeItem(key);
  }
}

async function autenticarUsuario(token, email, userId) {
  const url = 'https://wesley-brum-api-time-class-jb.onrender.com/auth-auto';

  const data = {
    email,
    userId
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('Erro na requisição');
  }

  const responseData = await response.json();
  console.log("Autenticação bem-sucedida", responseData);
  window.location.href = "./adminlte/blank.html";
}

function handleError(error) {
  console.error(error);
}
