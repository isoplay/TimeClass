function login(event) {
    event.preventDefault(); // Isso evita a ação padrão do formulário (envio e atualização da página)
  
    const receberEmail = document.getElementById('login__email').value;
    const receberSenha = document.getElementById('login__password').value;
    
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
        if (result == "usuario nao encontrado") {
          console.log("Usuário não encontrado");
        } else {
          console.log("Login bem-sucedido", result);
          window.location = "./adminlte/blank.html";
        }
      })
      .catch(error => {
        // Tratar erros de rede ou outras falhas
        console.error(error);
      });
  }
  