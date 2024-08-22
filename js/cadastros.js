document.addEventListener('DOMContentLoaded', () => {
    // Função para mostrar o formulário escolhido e esconder os outros
    window.showForm = function(formId) {
        const forms = document.querySelectorAll('.form-container');
        forms.forEach(form => form.classList.remove('active'));
        document.getElementById(formId).classList.add('active');
    };

    // Requisição de Login
    document.getElementById('loginForm').addEventListener('submit', (event) => {
        event.preventDefault();

        const loginData = {
            login: document.getElementById('login').value,
            password: document.getElementById('password').value
        };

        fetch('http://localhost:8083/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('isCapitao', data.isCapitao);
                updateMenu(data.isCapitao);
                document.getElementById('mensagem').innerHTML = '<div class="alert alert-success">Login realizado com sucesso!</div>';
            } else {
                document.getElementById('mensagem').innerHTML = '<div class="alert alert-danger">Falha no login.</div>';
            }
        })
        .catch(error => {
            document.getElementById('mensagem').innerHTML = '<div class="alert alert-danger">Erro ao conectar com o servidor.</div>';
        });
    });

    // Requisição de Registro
    document.getElementById('registerUserForm').addEventListener('submit', (event) => {
        event.preventDefault();

        const userData = {
            nome: document.getElementById('username').value,
            login: document.getElementById('userLogin').value,
            password: document.getElementById('userPassword').value,
            cpf: document.getElementById('cpf').value,
            telefone: document.getElementById('telefone').value
        };

        fetch('http://localhost:8083/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('isCapitao', false); 
                updateMenu(false);
                document.getElementById('mensagem').innerHTML = '<div class="alert alert-success">Usuário registrado com sucesso!</div>';
            } else {
                document.getElementById('mensagem').innerHTML = '<div class="alert alert-danger">Falha no registro.</div>';
            }
        })
        .catch(error => {
            document.getElementById('mensagem').innerHTML = '<div class="alert alert-danger">Erro ao registrar usuário.</div>';
        });
    });

    function updateMenu(isCapitao) {
        const menuNav = document.querySelector('.menu_home');
        if (menuNav) {
            // Remove todos os itens do menu exceto os originais
            const originalItems = menuNav.querySelectorAll('li:not([data-generated="true"])');
            menuNav.innerHTML = '';
            originalItems.forEach(item => menuNav.appendChild(item));

            let itemsToAdd = '';

            if (isCapitao) {
                if (!menuNav.querySelector('a[href="cadastro_membro.html"]')) {
                    itemsToAdd += '<li data-generated="true"><a href="cadastro_membro.html">Cadastrar Membro</a></li>';
                }
                if (!menuNav.querySelector('a[href="cadastrar_robo.html"]')) {
                    itemsToAdd += '<li data-generated="true"><a href="cadastrar_robo.html">Cadastrar Robô</a></li>';
                }
            } else {
                if (!menuNav.querySelector('a[href="cadastrar_equipe.html"]')) {
                    itemsToAdd += '<li data-generated="true"><a href="cadastrar_equipe.html">Cadastrar Equipe</a></li>';
                }
            }

            if (itemsToAdd) {
                menuNav.insertAdjacentHTML('beforeend', itemsToAdd);
            }

            // Salva a estrutura inteira da div.menu_home no localStorage
            const savedMenuItems = menuNav.outerHTML;
            localStorage.setItem('savedMenuItems', savedMenuItems);
        }
    }

    // Verifica se o usuário já está logado e atualiza o menu
    if (localStorage.getItem('token')) {
        const isCapitao = localStorage.getItem('isCapitao') === 'true';
        setTimeout(() => {
            updateMenu(isCapitao);
        }, 100); // Aguarda a injeção do nav
    }

    // Carrega o menu salvo no localStorage
    const savedMenuItems = localStorage.getItem('savedMenuItems');
    if (savedMenuItems) {
        const menuContainer = document.querySelector('.menu_home').parentElement;
        menuContainer.innerHTML = savedMenuItems;
    }
});
