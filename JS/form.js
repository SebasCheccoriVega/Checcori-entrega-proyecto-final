const btnSignup = document.getElementById("boton-registro");
btnSignup.addEventListener("click", signupHandler);

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
const isLogin = !(params.f && params.f === "registrar");

const elemNombreyapellido = document.getElementById("input-nombre");
const elemUsuario = document.getElementById("input-usuario");
const elemEmail = document.getElementById("input-email");
const elemPassword = document.getElementById("input-password");
const elemRepetirPassword = document.getElementById("input-repetir-password");
const botonRegistro = document.getElementById("boton-registro");

if (isLogin) {
  //ocultar campos de registro de usuario
  elemNombreyapellido.style.display = "none";
  elemEmail.style.display = "none";
  elemRepetirPassword.style.display = "none";
  document.getElementById("label-nombre").style.display = "none";
  document.getElementById("label-email").style.display = "none";
  document.getElementById("label-repetir-password").style.display = "none";
  //cambiar boton
  botonRegistro.innerHTML = `INGRESAR`;
  document.getElementById(
    "mensaje-bienvenida"
  ).innerHTML = `¿No tenés cuenta? <a href="./iniciarsesion.html?f=registrar"><b>REGISTRATE</b></a>`;
}

async function signupHandler(event) {
  event.preventDefault();

  if (isLogin) {
    return await ingresarUsuario(elemUsuario.value, elemPassword.value);
  }

  const isValid = validarCargarUsuario(
    elemNombreyapellido,
    elemUsuario,
    elemEmail,
    elemPassword,
    elemRepetirPassword
  );

  if (isValid) {
    return await cargarUsuario(
      elemNombreyapellido.value,
      elemUsuario.value,
      elemEmail.value,
      elemPassword.value
    );
  } else {
    alert("Alguno de los campos no fue completado de manera correcta.");
  }
}

//fetch para ingreso de usuario
async function ingresarUsuario(username, password) {
  const response = await fetch(
    "https://parseapi.back4app.com/login?username=" +
      username +
      "&password=" +
      password,
    {
      method: "GET",
      headers: {
        "X-Parse-Application-Id": "4s8lgIwS6KXzlwY53PmTFZK6GhNHc0ScoX6hWFwR",
        "X-Parse-Javascript-Key": "67Oz9KqI7nMUGXL5WafZM6uRt9vZ68gOLrLtKAfD",
        "X-Parse-Revocable-Session": "1",
      },
    }
  );

  if (response.ok) {
    const body = await response.json();
    sessionStorage.setItem("user-info", JSON.stringify(body));

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Iniciaste sesion de manera exitosa",
      showConfirmButton: false,
      timer: 1500,
    }).then((result) => {
      if (result) {
        window.location.href = "index.html";
      }
    });
  } else {
    alert("Error inesperado, vuelva a intentar en unos momentos");
  }
}

function validarCargarUsuario(
  elemFullname,
  elemUsername,
  elemEmail,
  elemPassword,
  elemRepetirPassword
) {
  return (
    elemFullname.validity.valid &&
    elemUsername.validity.valid &&
    elemEmail.validity.valid &&
    elemPassword.validity.valid &&
    elemPassword.value === elemRepetirPassword.value
  );
}

//fetch para registro de usuario
async function cargarUsuario(fullname, username, email, password) {
  const body = {
    fullname,
    username,
    email,
    password,
  };

  const response = await fetch("https://parseapi.back4app.com/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Parse-Application-Id": "4s8lgIwS6KXzlwY53PmTFZK6GhNHc0ScoX6hWFwR",
      "X-Parse-Javascript-Key": "67Oz9KqI7nMUGXL5WafZM6uRt9vZ68gOLrLtKAfD",
    },
    body: JSON.stringify(body),
  });

  if (response.ok) {
    Swal.fire({
      title: "¡Gracias por unirte!",
      text: `Te registraste exitosamente`,
      confirmButtonColor: "lightseagreen",
    }).then((result) => {
      if (result.value) {
        window.location.href = "index.html";
      }
    });
  } else {
    alert("Error inesperado, vuelva a intentar en unos momentos");
  }
}