function mostrarProdutos(categoria) {
  const area = document.querySelector("#produtos");

  if (!area) {
    return;
  }

  area.innerHTML = "";

  produtos.forEach(function(produto) {
    if (produto.categoria !== categoria) {
      return;
    }

    let imagem = "../imagens/hamburguer.jpg";

    if (produto.categoria === "Bebidas") {
      imagem = "../imagens/suco.jpg";
    }

    const cartao = document.createElement("article");
    cartao.className = "cartao-produto";

    cartao.innerHTML = `
      <img
        class="imagem-produto"
        src="${imagem}"
        alt="${produto.nome}">

      <h3>${produto.nome}</h3>

      <p class="texto-secundario">${produto.descricao}</p>

      <div class="informacoes-produto">
        <strong class="preco">${formatarPreco(produto.preco)}</strong>

        <button
          class="botao pequeno"
          onclick="adicionarCarrinho(${produto.id})">
          Adicionar
        </button>
      </div>
    `;

    area.appendChild(cartao);
  });
}