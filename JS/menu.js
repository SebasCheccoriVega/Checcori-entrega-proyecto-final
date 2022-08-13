async function cerrarSesion() {
    sessionStorage.clear();
    window.location.href = "index.html";
  }
  
  const userInfoString = sessionStorage.getItem("user-info");
  const userInfo = userInfoString ? JSON.parse(userInfoString) : undefined;
  
  //condiciones para display de menu
  if (userInfo) {
    const botonLogin = document.getElementById("boton-login");
    const botonSignup = document.getElementById("boton-signup");
    const saludo = document.getElementById("saludo");
  
    if (botonLogin) {
      botonLogin.style.display = "none";
    }
  
    if (botonSignup) {
      botonSignup.style.display = "none";
    }
  
    if (saludo) {
      saludo.innerHTML = `Hola ${userInfo.username}`;
    }
  } else {
    const menu = document.getElementById("menu");
  
    if (menu) {
      menu.style.display = "none";
    }
  }
  
  const buttonLogout = document.getElementById("boton-logout");
  buttonLogout.addEventListener("click", cerrarSesion);
  