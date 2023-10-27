document.addEventListener('DOMContentLoaded', checkLocalStorageAndAuthenticate);

function checkLocalStorageAndAuthenticate() {
  const token = getFromLocalStorage('token');
  const userId = getFromLocalStorage('userId');
  const email = getFromLocalStorage('email');
  const remember = getFromLocalStorage('lembre_se');

  if (token && remember === 'true') {
    autenticarUsuario(token, email, userId);
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

function login(event) {
  event.preventDefault();

  const receberEmail = document.getElementById('login__email').value;
  const receberSenha = document.getElementById('login__password').value;
  const lembre_se = document.getElementById('remember');

  const url = 'https://api-agendamendo-jb.wesleybrum.repl.co/login';
  const data = {
    email: receberEmail,
    senha: receberSenha
  };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na requisição');
      }
      return response.json();
    })
    .then(result => {
      if (result === "usuario nao encontrado") {
        console.log("Usuário não encontrado");
      } else {
        const token = result.token;
        setInLocalStorage('token', token);
        setInLocalStorage('email', result.payload.email);
        setInLocalStorage('userId', result.payload.userId);

        if (lembre_se.checked) {
          setInLocalStorage('lembre_se', 'true');
        } else {
          setInLocalStorage('lembre_se', null);
        }

        autenticarUsuario(token, result.payload.email, result.payload.userId);
      }
    })
    .catch(handleError);
}

function autenticarUsuario(token, email, userId) {
  const url = 'https://api-agendamendo-jb.wesleybrum.repl.co/auth-auto';

  const data = {
    email,
    userId
  };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) {
        console.log('Erro na requisição');
      }
      return response.json();
    })
    .then(data => {
      console.log("Autenticação bem-sucedida", data);
      window.location = "./adminlte/blank.html";
    })
    .catch(handleError);
}

function handleError(error) {
  console.error(error);
}
