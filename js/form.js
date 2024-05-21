const form = document.getElementById("contactForm");
const nome = document.getElementById("name");
const email = document.getElementById("emailAddress");
const assunto = document.getElementById("subject");
const mensagem = document.getElementById("message");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();
});
email.addEventListener("blur", () => {
  checkInputsBlur();
});
nome.addEventListener("blur", () => {
  checkInputsBlur();
});
assunto.addEventListener("blur", () => {
  checkInputsBlur();
});
mensagem.addEventListener("blur", () => {
  checkInputsBlur();
});

function checkInputsBlur() {
  const usernameValue = nome.value;
  const emailValue = email.value;
  const assuntoValue = assunto.value;
  const mensagemValue = mensagem.value;

  if (usernameValue === "") {
  } else {
    const formItem = nome.parentElement;
    formItem.className = "form-cont";
  }
  if (emailValue === "") {
  } else if (!checkEmail(emailValue)) {
  } else {
    const formItem = email.parentElement;
    formItem.className = "form-cont";
  }
  if (assuntoValue === "") {
  } else {
    const formItem = assunto.parentElement;
    formItem.className = "form-cont";
  }
  if (mensagemValue === "") {
  } else if (mensagemValue.length < 10) {
  } else {
    const formItem = mensagem.parentElement;
    formItem.className = "form-cont";
  }
}
function checkInputs() {
  const usernameValue = nome.value;
  const emailValue = email.value;
  const assuntoValue = assunto.value;
  const mensagemValue = mensagem.value;

  if (usernameValue === "") {
    setErrorFor(nome, "O nome de usuário é obrigatório.");
  } else {
    setSuccessFor(nome);
  }
  if (emailValue === "") {
    setErrorFor(email, "O email é obrigatório.");
  } else if (!checkEmail(emailValue)) {
    setErrorFor(email, "Por favor, insira um email válido.");
  } else {
    setSuccessFor(email);
  }
  if (assuntoValue === "") {
    setErrorFor(assunto, " O assunto é obrigatório.");
  } else {
    setSuccessFor(assunto);
  }
  if (mensagemValue === "") {
    setErrorFor(mensagem, " A mensagem é obrigatória.");
  } else if (mensagemValue.length < 10) {
    setErrorFor(mensagem, "Sua mensagem precisa ter mais de 10 caracteres");
  } else {
    setSuccessFor(mensagem);
  }
  const formControls = form.querySelectorAll(".form-cont");

  const formIsValid = [...formControls].every((formControl) => {
    return formControl.className === "form-cont success";
  });

  if (formIsValid) {
    alert("Mensagem enviada com sucesso!!");
    // Limpa o campo
    limpaCampo();
  }
}
window.onload = limpaCampo;
function limpaCampo() {
  nome.parentElement.querySelector("input").value = "";
  email.parentElement.querySelector("input").value = "";
  assunto.parentElement.querySelector("input").value = "";
  mensagem.parentElement.querySelector("textarea").value = "";
}
function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  // Adiciona a mensagem de erro
  small.innerText = message;

  // Adiciona a classe de erro
  formControl.className = "form-cont error";
}

function setSuccessFor(input) {
  const formControl = input.parentElement;

  // Adicionar a classe de sucesso
  formControl.className = "form-cont success";
}

function checkEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}
