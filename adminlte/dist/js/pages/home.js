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
  
  function sair() {
    const token = getFromLocalStorage('token');
    if (token) {
      setInLocalStorage('token', ''); // Remova o token do localStorage
      window.location.href = "../index.html"; // Redirecione para a página de índic
    }
   
  }
  