function escolherPagamento(tipo) {
  const botoes =
    document.querySelectorAll(".opcao-pagamento");

  botoes.forEach(function(botao) {
    botao.classList.remove("selecionado");
  });

  const botaoSelecionado =
    document.querySelector('[data-pagamento="' + tipo + '"]');

  if (botaoSelecionado) {
    botaoSelecionado.classList.add("selecionado");
  }

  const campos =
    document.querySelector("#campos-pagamento");

  if (!campos) {
    return;
  }

  if (tipo === "pix") {
    campos.innerHTML = `
      <div class="cartao">
        <h3>Pagamento via PIX</h3>
        <div class="imagem-produto">QR Code</div>
        <p>Pagamento simulado para o protótipo.</p>
      </div>
    `;
  } else {
    campos.innerHTML = `
      <div class="formulario">
        <div class="campo">
          <label>Número do cartão</label>
          <input placeholder="0000 0000 0000 0000">
        </div>

        <div class="grade grade-2">
          <div class="campo">
            <label>Validade</label>
            <input placeholder="MM/AA">
          </div>

          <div class="campo">
            <label>CVV</label>
            <input placeholder="123">
          </div>
        </div>

        <div class="campo">
          <label>Nome no cartão</label>
          <input placeholder="JOÃO SILVA">
        </div>
      </div>
    `;
  }
}


function confirmarPagamento() {
  const totais = calcularTotais();

  if (pegarCarrinho().length === 0 || totais.total <= 0) {
    alert("Não há itens válidos para pagamento.");
    return;
  }

  localStorage.setItem("ultimoTotalPago", totais.total);
  localStorage.setItem("ultimoDesconto", totais.desconto);
  localStorage.setItem("compraAguardandoConfirmacao", "sim");

  window.location.href = "pagamento-aprovado.html";
}
