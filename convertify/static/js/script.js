// Função de expansão (Global para ser acessada pelo onclick)
function toggleCard(cardElement) {
  const expandable = cardElement.querySelector(".card-expandable");
  const isOpen = cardElement.classList.contains("open");

  // Fecha todos os outros primeiro
  document.querySelectorAll(".premium-card").forEach((card) => {
    card.classList.remove("open");
    card.querySelector(".card-expandable").classList.remove("active");
  });

  // Abre o atual se ele não estava aberto
  if (!isOpen) {
    cardElement.classList.add("open");
    expandable.classList.add("active");
  }
}

function focarConversor(id) {
  const overlay = document.getElementById("overlay-fundo");

  const card = document.getElementById(id).querySelector(".card");

  const containerPrincipal = document.querySelector(".row.g-4"); // Ajuste para a classe do seu container de cards

  // 1. Apaga os outros cards

  if (containerPrincipal) {
    containerPrincipal.classList.add("dashboard-focado");
  }

  // 2. Mostra o overlay e foca o card

  overlay.style.display = "block";

  setTimeout(() => (overlay.style.opacity = "1"), 5);

  card.classList.add("card-focado");

  // 3. Troca o conteúdo para o formulário

  document.getElementById(`preview-${id}`).classList.add("escondido");

  document.getElementById(`form-${id}`).classList.remove("d-none");

  setTimeout(
    () => document.getElementById(`form-${id}`).classList.add("ativo"),
    10,
  );
}

function removerFoco() {
  const overlay = document.getElementById("overlay-fundo");

  const cardFocado = document.querySelector(".card-focado");

  if (cardFocado) {
    const id = cardFocado.closest("section").id;

    // 1. Inicia o efeito visual de "cair" e sumir

    overlay.style.opacity = "0";

    cardFocado.style.transform = "translate(-50%, -40%)"; // Desliza um pouco para baixo ou cima

    cardFocado.style.opacity = "0";

    // 2. Remove a classe principal após iniciar a transição

    // Não removemos o card-focado ainda para não perder o posicionamento fixed

    setTimeout(() => {
      // 3. Agora sim limpamos tudo

      cardFocado.classList.remove("card-focado");

      cardFocado.style.transform = ""; // Reseta transform inline

      cardFocado.style.opacity = ""; // Reseta opacity inline
      overlay.style.display = "none";
      document.getElementById(`preview-${id}`).classList.remove("escondido");

      document.getElementById(`form-${id}`).classList.add("d-none");

      document.getElementById(`form-${id}`).classList.remove("ativo");
    }, 600); // Tempo exato da transição do CSS
  }
}

//_____________________ Final do frontend_____________________//

document.addEventListener("DOMContentLoaded", () => {
  // Dark Mode Sync (Desktop e Mobile)
  const switches = ["darkMode", "darkModeMobile"];

  switches.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("change", () => {
        document.body.classList.toggle("dark-theme");
        // Sincroniza o outro switch
        const other = switches.find((s) => s !== id);
        const otherEl = document.getElementById(other);
        if (otherEl) otherEl.checked = el.checked;
      });
    }
  });
});

function switchTab(element, tabName) {
  // Remove 'active' de todos
  document.querySelectorAll(".tab-item").forEach((item) => {
    item.classList.remove("active");
  });

  // Adiciona no clicado
  element.classList.add("active");

  // Aqui você pode adicionar a lógica para filtrar os cards ou abrir o histórico
  console.log("Mudando para a aba: " + tabName);
}

document.addEventListener("DOMContentLoaded", () => {
  console.log(
    "[Moedas] DOM totalmente carregado. Iniciando script de conversão...",
  );
  const amountInput = document.getElementById("currency-amount");
  const fromSelect = document.getElementById("currency-from");
  const toSelect = document.getElementById("currency-to");
  const resultSpan = document.getElementById("currency-result");

  // Verificação para depuração
  if (!amountInput)
    console.error("[Moedas] ERRO: #currency-amount não encontrado");
  if (!fromSelect)
    console.error("[Moedas] ERRO: #currency-from não encontrado");
  if (!toSelect) console.error("[Moedas] ERRO: #currency-to não encontrado");
  if (!resultSpan)
    console.error("[Moedas] ERRO: #currency-result não encontrado");

  if (!amountInput || !fromSelect || !toSelect || !resultSpan) {
    console.warn(
      "[Moedas] Um ou mais elementos essenciais não foram encontrados. Script parado.",
    );
    console.log(
      "Dica: Verifique se está na view correta (mobile ou desktop) e se os IDs batem exatamente.",
    );
    return;
  }

  console.log("[Moedas] Todos os elementos encontrados com sucesso!");

  async function convertCurrency() {
    console.log("[Moedas] Função convertCurrency chamada");

    const value = parseFloat(amountInput.value);

    if (isNaN(value) || value <= 0) {
      resultSpan.innerText = "--";
      console.log("[Moedas] Valor inválido ou vazio → resetando resultado");
      return;
    }

    console.log(
      `[Moedas] Convertendo ${value} de ${fromSelect.value} para ${toSelect.value}`,
    );

    try {
      const response = await fetch("/api/currency/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: value,
          from: fromSelect.value,
          to: toSelect.value,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP ${response.status}`);
      }

      const data = await response.json();
      console.log("[Moedas] Resposta da API:", data);

      resultSpan.innerText = ` ${data.result.toFixed(2)} ${toSelect.value}`;
    } catch (error) {
      console.error("[Moedas] Erro na conversão:", error);
      resultSpan.innerText = "Erro na conversão";
    }
  }
  // Eventos
  amountInput.addEventListener("input", () => {
    console.log("[Moedas] Evento: input no valor");
    convertCurrency();
  });

  fromSelect.addEventListener("change", () => {
    console.log("[Moedas] Evento: mudança na moeda de origem");
    convertCurrency();
  });

  toSelect.addEventListener("change", () => {
    console.log("[Moedas] Evento: mudança na moeda de destino");
    convertCurrency();
  });
  convertCurrency();
});
