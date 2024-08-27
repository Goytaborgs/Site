document.addEventListener("DOMContentLoaded", () => {
  // Função para mostrar o formulário escolhido e esconder os outros
  window.showForm = function (formId) {
    const forms = document.querySelectorAll(".form-container");
    forms.forEach((form) => form.classList.remove("active"));
    document.getElementById(formId).classList.add("active");
  };

  // Requisição de Login
  document.getElementById("loginForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const loginButton = event.target.querySelector('button[type="submit"]');
    loginButton.disabled = true; // Desabilita o botão de login

    const loginData = {
      login: document.getElementById("login").value,
      password: document.getElementById("password").value,
    };

    fetch("https://site-backend-ayjt.onrender.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("isCapitao", data.isCapitao);
          updateMenu(data.isCapitao);
          document.getElementById("mensagem").innerHTML =
            '<div class="alert alert-success">Login realizado com sucesso!</div>';
        } else {
          document.getElementById("mensagem").innerHTML =
            '<div class="alert alert-danger">Falha no login.</div>';
        }
      })
      .catch((error) => {
        document.getElementById("mensagem").innerHTML =
          '<div class="alert alert-danger">Erro ao conectar com o servidor.</div>';
      })
      .finally(() => {
        loginButton.disabled = false; // Reabilita o botão de login
      });
  });

  // Requisição de Registro
  document
    .getElementById("registerUserForm")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const registerButton = event.target.querySelector(
        'button[type="submit"]'
      );
      registerButton.disabled = true; // Desabilita o botão de registro

      const userData = {
        nome: document.getElementById("username").value,
        login: document.getElementById("userLogin").value,
        password: document.getElementById("userPassword").value,
        cpf: document.getElementById("cpf").value,
        telefone: document.getElementById("telefone").value,
      };

      fetch("https://site-backend-ayjt.onrender.com/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("isCapitao", false);
            updateMenu(false);
            document.getElementById("mensagem").innerHTML =
              '<div class="alert alert-success">Usuário registrado com sucesso!</div>';
            $(".cadastro").removeClass("off");
            $(this).addClass("active");
          } else {
            document.getElementById("mensagem").innerHTML =
              '<div class="alert alert-danger">Falha no registro.</div>';
          }
        })
        .catch((error) => {
          document.getElementById("mensagem").innerHTML =
            '<div class="alert alert-danger">Erro ao registrar usuário.</div>';
        })
        .finally(() => {
          registerButton.disabled = false; // Reabilita o botão de registro
        });
    });

  function updateMenu(isCapitao) {
    const menuNav = document.querySelector(".menu_home");
    if (menuNav) {
      // Remove todos os itens do menu exceto os originais
      const originalItems = menuNav.querySelectorAll(
        'li:not([data-generated="true"])'
      );
      menuNav.innerHTML = "";
      originalItems.forEach((item) => menuNav.appendChild(item));

      let itemsToAdd = "";

      if (isCapitao) {
        if (!menuNav.querySelector('a[href="minha_equipe.html"]')) {
          itemsToAdd +=
            '<li data-generated="true"><a href="minha_equipe.html">Minha equipe</a></li>';
        }
      } else {
        if (!menuNav.querySelector('a[href="cadastrar_equipe.html"]')) {
          itemsToAdd +=
            '<li data-generated="true"><a href="cadastrar_equipe.html">Cadastrar Equipe</a></li>';
        }
        // Usar um link estilizado como botão de logout
        if (!menuNav.querySelector('#sairbutton')) {
          itemsToAdd +=
            '<li data-generated="true" id="sairbutton"><a href="#" class="logout-link">Sair</a></li>';
          $(".closed").removeClass("active");
          $(".closed").addClass("off");
        }
      }

      if (itemsToAdd) {
        menuNav.insertAdjacentHTML("beforeend", itemsToAdd);
      }
      const loginItem = menuNav.querySelector('li a[href="cadastro.html"]');
      if (loginItem) {
          loginItem.parentElement.remove(); // Remove o item de login
      }
      // Salva a estrutura inteira da div.menu_home no localStorage
      const savedMenuItems = menuNav.outerHTML;
      localStorage.setItem("savedMenuItems", savedMenuItems);
    }
  }

  // Função para limpar o localStorage e redirecionar para a página de login
  function logout() {
    localStorage.clear(); // Limpa o localStorage inteiro
    window.location.href = "index.html"; // Redireciona para a página inicial ou de login
  }

  // Delegação de eventos para capturar o clique no link "Sair"
  document.body.addEventListener("click", (event) => {
    if (event.target && event.target.classList.contains("logout-link")) {
      event.preventDefault(); // Evita comportamento padrão do link
      logout(); // Chama a função de logout
    }
  });

  // Verifica se o usuário já está logado e atualiza o menu
  if (localStorage.getItem("token")) {
    const isCapitao = localStorage.getItem("isCapitao") === "true";
    setTimeout(() => {
      updateMenu(isCapitao);
    }, 100); // Aguarda a injeção do nav
  }

  // Carrega o menu salvo no localStorage
  const savedMenuItems = localStorage.getItem("savedMenuItems");
  if (savedMenuItems) {
    const menuContainer = document.querySelector(".menu_home").parentElement;
    menuContainer.innerHTML = savedMenuItems;

    // Reassocia o evento de clique após carregar os itens salvos
    document.body.addEventListener("click", (event) => {
      if (event.target && event.target.classList.contains("logout-link")) {
        event.preventDefault(); // Evita comportamento padrão
        logout(); // Chama a função de logout
      }
    });
  }
});
