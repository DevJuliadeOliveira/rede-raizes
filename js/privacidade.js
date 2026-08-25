function salvarConsentimentos() {
  const ofertas =
    document.querySelector("#alternar-ofertas").checked;

  localStorage.setItem("ofertas", ofertas);

  alert("Preferências salvas.");
}

// simula exclusão
function pedirExclusao() {
  alert("Solicitação de exclusão registrada. Esta é uma simulação.");
}
