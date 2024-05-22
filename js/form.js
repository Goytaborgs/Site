const form = document.getElementById("contactForm");
const nome = document.getElementById("name");
const email = document.getElementById("emailAddress");
const assunto = document.getElementById("subject");
const mensagem = document.getElementById("message");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  envioDeForm();
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
  } else {
    setSuccessFor(nome);
  }
  if (emailValue === "") {
  } else {
    setSuccessFor(email);
  }
  if (assuntoValue === "") {
  } else {
    setSuccessFor(assunto);
  }
  if (mensagemValue === "") {
  } else {
    setSuccessFor(mensagem);
  }
  const formControls = form.querySelectorAll(".form-cont");

  const formIsValid = [...formControls].every((formControl) => {
    return formControl.className === "form-cont success";
  });

  if (formIsValid) {
    //alert("Mensagem enviada com sucesso!!");
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: "Mensagem enviada com sucesso!!",
    });
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

function setSuccessFor(input) {
  const formControl = input.parentElement;

  // Adicionar a classe de sucesso
  formControl.className = "form-cont success";
}


function envioDeForm(){
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        });
}