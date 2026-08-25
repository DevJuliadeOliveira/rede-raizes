
function salvarPerfil() {
  const usuario =
    JSON.parse(localStorage.getItem("usuario")) || {};

  usuario.nome =
    document.querySelector("#nome-perfil").value;

  usuario.email =
    document.querySelector("#email-perfil").value;

  usuario.telefone =
    document.querySelector("#telefone-perfil").value;

  localStorage.setItem("usuario", JSON.stringify(usuario));

  window.location.href = "minha-conta.html";
}
