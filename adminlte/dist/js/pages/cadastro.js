function togglePasswordVisibility() {
    var passwordField = document.getElementById("password");
    var passwordIcon = document.getElementById("passwordIcon");
  
    if (passwordField.type === "password") {
      passwordField.type = "text";
      passwordIcon.classList.remove("fa-eye");
      passwordIcon.classList.add("fa-eye-slash");
    } else {
      passwordField.type = "password";
      passwordIcon.classList.remove("fa-eye-slash");
      passwordIcon.classList.add("fa-eye");
    }
  }
  
  function validateAndSubmit() {
    const fullname = document.getElementById("fullname").value;
    const password = document.getElementById("password").value;
  
    if (!fullname || !password) {
      console.log("Preencha todos os campos antes de solicitar.");
    } else {
      enviarCadastro(fullname, password); // Passando fullname e password como argumentos
    }
  }
  
  function enviarCadastro(name, senha) {
    const email = document.getElementById("email").value;
  
    if (!name || !email || !senha) {
      console.log("Por favor, preencha todos os campos.");
      return; // Não envie a solicitação se algum campo estiver vazio
    }
  
    const url = 'https://api-agendamendo-jb.wesleybrum.repl.co/cadastro';
    const data = {
      email: email
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
        if (!result.email) {
          console.log("Email não enviado.");
          console.log(result)
        } else {
          localStorage.setItem('cadastro_name', name);
          localStorage.setItem('cadastro_senha', senha);
          localStorage.setItem('cadastro_email', email);
          window.location.href = "./validar.html"
        }
      })
      .catch(handleError);
  }
  