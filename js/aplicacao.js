const unidades = [

  { id: 1, nome: "Centro — Fortaleza/CE", distancia: "0,8 km", aberta: true },

  { id: 2, nome: "Aldeota — Fortaleza/CE", distancia: "2,1 km", aberta: true },

  { id: 3, nome: "Meireles — Fortaleza/CE", distancia: "3,4 km", aberta: true },

  { id: 4, nome: "Mossoró/RN", distancia: "240 km", aberta: true }

];


const produtos = [

  {
    id: 1,
    nome: "X-Nordestino",
    descricao: "Carne de sol, queijo coalho e cebola.",
    preco: 24.90,
    categoria: "Lanches"
  },

  {
    id: 2,
    nome: "Baião Burger",
    descricao: "Carne, feijão verde, queijo e coentro.",
    preco: 27.50,
    categoria: "Lanches"
  },

  {
    id: 3,
    nome: "Cangaço Duplo",
    descricao: "Carne assada, muçarela e pimenta.",
    preco: 32.00,
    categoria: "Lanches"
  },

  {
    id: 4,
    nome: "Combo Família",
    descricao: "Combo para compartilhar.",
    preco: 89.90,
    categoria: "Combos"
  },

  {
    id: 5,
    nome: "Suco de Caju",
    descricao: "Caju natural, 400 ml.",
    preco: 8.00,
    categoria: "Bebidas"
  }

];


// Login

function usuarioEstaLogado() {

  return localStorage.getItem("usuario") !== null;

}

function exigirLogin(pagina) {

  if (!usuarioEstaLogado()) {

    localStorage.setItem(
      "paginaDepoisDoLogin",
      pagina
    );

    window.location.href = "login.html";

    return false;
  }

  return true;

}

function entrar() {

  const usuario = {

    nome: "João Silva",

    email: "joao@email.com",

    telefone: "(85) 99999-0000"

  };

  localStorage.setItem(
    "usuario",
    JSON.stringify(usuario)
  );

  const pagina =
    localStorage.getItem("paginaDepoisDoLogin");

  if (pagina) {

    localStorage.removeItem(
      "paginaDepoisDoLogin"
    );

    window.location.href = pagina;

  } else {

    window.location.href = "unidades.html";

  }

}

function cadastrar() {

  const aceitouPrivacidade =
    document.querySelector(
      "#consentimento-privacidade"
    ).checked;

  const mensagem =
    document.querySelector(
      "#erro-cadastro"
    );

  if (!aceitouPrivacidade) {

    mensagem.innerHTML =
      '<div class="aviso erro">Você precisa aceitar a Política de Privacidade.</div>';

    return false;
  }

  const usuario = {

    nome:
      document.querySelector(
        "#nome-cadastro"
      ).value,

    email:
      document.querySelector(
        "#email-cadastro"
      ).value,

    telefone:
      document.querySelector(
        "#telefone-cadastro"
      ).value

  };

  localStorage.setItem(
    "usuario",
    JSON.stringify(usuario)
  );

  const aceitouOfertas =
    document.querySelector(
      "#consentimento-ofertas"
    ).checked;

  localStorage.setItem(
    "ofertas",
    aceitouOfertas
  );

  const pagina =
    localStorage.getItem(
      "paginaDepoisDoLogin"
    );

  if (pagina) {

    localStorage.removeItem(
      "paginaDepoisDoLogin"
    );

    window.location.href = pagina;

  } else {

    window.location.href = "unidades.html";

  }

  return false;

}

function fazerLogout() {

  localStorage.removeItem("usuario");

  localStorage.removeItem("unidade");

  window.location.href = "login.html";

}


// Unidade

function salvarUnidade(unidade) {

  localStorage.setItem(
    "unidade",
    JSON.stringify(unidade)
  );

}

function pegarUnidade() {

  return JSON.parse(
    localStorage.getItem("unidade")
  );

}

function exigirUnidade(pagina) {

  if (!pegarUnidade()) {

    localStorage.setItem(
      "paginaDepoisDaUnidade",
      pagina
    );

    window.location.href = "unidades.html";

    return false;
  }

  return true;

}

function nomeDaUnidade() {

  const unidade = pegarUnidade();

  if (unidade) {

    return unidade.nome;

  }

  return "Nenhuma unidade selecionada";

}


// Carrinho

function salvarCarrinho(carrinho) {

  localStorage.setItem(
    "carrinho",
    JSON.stringify(carrinho)
  );

  atualizarQuantidadeCarrinho();

}

function pegarCarrinho() {

  try {

    return JSON.parse(
      localStorage.getItem("carrinho")
    ) || [];

  } catch (erro) {

    localStorage.removeItem("carrinho");

    return [];

  }

}

function quantidadeDoCarrinho() {

  return pegarCarrinho().reduce(
    function(total, item) {

      return total +
        Number(item.quantidade || 0);

    },
    0
  );

}

function atualizarQuantidadeCarrinho() {

  const quantidade =
    quantidadeDoCarrinho();

  document
    .querySelectorAll(".quantidade-carrinho")
    .forEach(function(elemento) {

      elemento.textContent =
        quantidade;

    });

}

function limparCarrinho() {

  localStorage.removeItem("carrinho");

  atualizarQuantidadeCarrinho();

}

function adicionarCarrinho(id) {

  const produto =
    produtos.find(function(item) {

      return item.id === id;

    });

  if (!produto) {

    return;

  }

  const carrinho =
    pegarCarrinho();

  const item =
    carrinho.find(function(item) {

      return item.id === id;

    });

  if (item) {

    item.quantidade += 1;

  } else {

    carrinho.push({

      id: produto.id,

      nome: produto.nome,

      descricao: produto.descricao,

      preco: produto.preco,

      quantidade: 1

    });

  }

  salvarCarrinho(carrinho);

}

function mudarQuantidade(id, valor) {

  const carrinho =
    pegarCarrinho();

  const item =
    carrinho.find(function(item) {

      return item.id === id;

    });

  if (!item) {

    return;

  }

  item.quantidade += valor;

  if (item.quantidade <= 0) {

    const novoCarrinho =
      carrinho.filter(function(item) {

        return item.id !== id;

      });

    salvarCarrinho(novoCarrinho);

  } else {

    salvarCarrinho(carrinho);

  }

  location.reload();

}

function removerDoCarrinho(id) {

  const carrinho =
    pegarCarrinho();

  const novoCarrinho =
    carrinho.filter(function(item) {

      return item.id !== id;

    });

  salvarCarrinho(novoCarrinho);

  location.reload();

}


// Cupons

function aplicarCupom(codigo) {

  const codigoNormalizado =
    codigo.trim().toUpperCase();


  // Cupom promocional de 10%

  if (codigoNormalizado === "RAIZES10") {

    if (
      localStorage.getItem("cupomRaizes10")
      === "usado"
    ) {

      return false;

    }

    localStorage.setItem(
      "cupom",
      "RAIZES10"
    );

    return true;

  }


  // Cupom de fidelidade de R$ 10

  if (codigoNormalizado === "FIDELIDADE10") {

    if (
      localStorage.getItem("cupomFidelidade")
      !== "resgatado"
    ) {

      return false;

    }

    localStorage.setItem(
      "cupom",
      "FIDELIDADE10"
    );

    return true;

  }

  return false;

}

function pegarDesconto() {

  const cupom =
    localStorage.getItem("cupom");

  const carrinho =
    pegarCarrinho();

  let subtotal = 0;

  carrinho.forEach(function(item) {

    subtotal +=
      item.preco * item.quantidade;

  });

  if (cupom === "RAIZES10") {

    return subtotal * 0.10;

  }

  if (cupom === "FIDELIDADE10") {

    return Math.min(10, subtotal);

  }

  return 0;

}

function removerCupom() {

  localStorage.removeItem("cupom");

}

function calcularTotais() {

  const carrinho =
    pegarCarrinho();

  let subtotal = 0;

  carrinho.forEach(function(item) {

    subtotal +=
      item.preco * item.quantidade;

  });

  const desconto =
    Math.min(
      pegarDesconto(),
      subtotal
    );

  const total =
    subtotal - desconto;

  return {

    subtotal: subtotal,

    desconto: desconto,

    total: total

  };

}


// Fidelidade

function pegarPontos() {

  return Number(
    localStorage.getItem("pontos")
  ) || 0;

}

function salvarPontos(pontos) {

  localStorage.setItem(
    "pontos",
    pontos
  );

}

function adicionarPontos(pontos) {

  salvarPontos(
    pegarPontos() + pontos
  );

}

function resgatarCupomFidelidade() {

  const pontos = pegarPontos();

  if (pontos < 500) {

    alert(
      "Você precisa de 500 pontos para resgatar o cupom."
    );

    return;
  }

  if (
    localStorage.getItem("cupomFidelidade")
    === "resgatado"
  ) {

    alert(
      "O cupom já foi resgatado."
    );

    return;
  }

  // Subtrai 500 pontos pelo resgate do cupom
  salvarPontos(pontos - 500);

  /*
    Marca o cupom como resgatado.
    O cupom não é aplicado automaticamente.
  */

  localStorage.setItem(
    "cupomFidelidade",
    "resgatado"
  );

  alert(
    "Cupom de R$ 10 resgatado!"
  );

  location.reload();
}

function ganharPontosDaCompra(total) {

  const pontos =
    Math.floor(total);

  adicionarPontos(pontos);

  return pontos;

}





function formatarPreco(preco) {

  return preco.toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL"
    }
  );

}




document.addEventListener(
  "DOMContentLoaded",
  function() {

    atualizarQuantidadeCarrinho();

    const usuario =
      JSON.parse(
        localStorage.getItem("usuario")
      ) || null;

    document
      .querySelectorAll(".nome-usuario")
      .forEach(function(elemento) {

        elemento.textContent =
          usuario
            ? usuario.nome
            : "Entrar";

      });

  }
);