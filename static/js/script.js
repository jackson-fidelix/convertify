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

// Conversor de moedas com logs extras
document.addEventListener("DOMContentLoaded", () => {
    console.log("[Moedas] DOM totalmente carregado. Iniciando script de conversão...");

    const amountInput = document.getElementById("currency-amount");
    const fromSelect  = document.getElementById("currency-from");
    const toSelect    = document.getElementById("currency-to");
    const resultSpan  = document.getElementById("currency-result");

    if (!amountInput || !fromSelect || !toSelect || !resultSpan) {
        console.error("[Moedas] ERRO: Um ou mais elementos não encontrados");
        return;
    }

    async function convertCurrency() {
        console.log("[TESTE] convertCurrency ENTROU");        

        console.log("[DEBUG] Valor atual do input:", amountInput.value);

        const value = parseFloat(amountInput.value);

        if (isNaN(value) || value <= 0) {
            console.log("[Moedas] Valor inválido ou vazio → resetando resultado");
            resultSpan.innerText = "--";
            return;
        }

        try {
            console.log("[DEBUG] Enviando fetch para /api/currency/convert");
            const response = await fetch("/api/currency/convert", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: value,
                    from: fromSelect.value,
                    to: toSelect.value,
                }),
            });

            console.log("[DEBUG] Resposta recebida, status:", response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.log("[DEBUG] Erro na resposta:", errorText);
                throw new Error(`Erro HTTP ${response.status}: ${errorText}`);
            }

            const data = await response.json();

            resultSpan.innerText = `${data.result.toFixed(2)} ${toSelect.value}`;
            console.log("[DEBUG] Resultado atualizado na tela:", resultSpan.innerText);

        } catch (error) {
            console.error("[Moedas] Erro na conversão:", error);
            resultSpan.innerText = "Erro na conversão";
        }
    }
    document.addEventListener("input", (e) => {
        if (e.target.id === "currency-amount") {
        console.log("[DEBUG] input detectado via delegation");
        convertCurrency();
        }
    });

    document.addEventListener("change", (e) => {
        if (
            e.target.id === "currency-from" ||
            e.target.id === "currency-to"
        ) {
        convertCurrency();
        }
    });
});

// conversor de medidas
document.addEventListener("DOMContentLoaded", ()=> {
    const valueInput = document.getElementById("length-value");
    const fromSelect = document.getElementById("length-from");
    const toSelect   = document.getElementById("length-to");
    const resultSpan = document.getElementById("length-result");
    
    if (!valueInput || !fromSelect || !toSelect || !resultSpan) {
      console.error("[Comprimento] Elementos não encontrados")
      return;
    }

    const LENGTH_DECIMALS = {
      mm: 2,
      cm: 2,
      dm: 3,
      m: 4,
      dam: 5,
      hm: 6,
      km: 6
  };

    async function convertLength() {
      const value = parseFloat(valueInput.value);
      
      if (isNaN(value) || value <= 0) {
        resultSpan.innerText = "---";
        return;
      }

      try {
        const response = await fetch("/length/convert", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                value: value,
                from: fromSelect.value,
                to: toSelect.value
            })
        });

        if (!response.ok) {
          throw new Error("Erro na conversão");
        }

        const data = await response.json();
        const decimals = LENGTH_DECIMALS[toSelect.value] ?? 4;
        const formatted = Number(data.result.toFixed(decimals)).toString();

        resultSpan.innerText = `${formatted} ${toSelect.value}`;

      } catch (error) {
          console.error("[Comprimento] Erro:", error);
          resultSpan.innerText = "Erro";
      }
    }

    valueInput.addEventListener("input", convertLength);
    fromSelect.addEventListener("change", convertLength);
    toSelect.addEventListener("change", convertLength);
});

// conversor de tempo
document.addEventListener("DOMContentLoaded", () => {
  const valueTime = document.getElementById("time-value");
  const fromTime = document.getElementById("time-from");
  const toTime = document.getElementById("time-to");
  const resultTime = document.getElementById("time-result");

  if (!valueTime || !fromTime || !toTime || !resultTime) {
    console.error("[TEMPO] Elementos não encontrados!");
    return;
  }

  async function convertTime() {
    const value = parseFloat(valueTime.value);

    if (isNaN(value) || value <= 0) {
      resultTime.innerText = "---"
      return;
    }

    try {
      const response = await fetch("time/convert", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          value: value,
          from: fromTime.value,
          to: toTime.value
        })
      });

      if (!response.ok) {
        throw new Error("Erro na conversão");
      }

      const data = await response.json();

      const formatted = Number(data.result).toLocaleString("pt-BR", {
        maximumFractionDigits: 6
      });

      resultTime.innerText = `${formatted} ${toTime.value}`;

    } catch (error) {
      console.error("[TEMPO] Erro:", error);
      resultTime.innerText = "Alguém tropeçou nos cabos :(";
    }
  }

  valueTime.addEventListener("input", convertTime);
  fromTime.addEventListener("change", convertTime);
  toTime.addEventListener("change", convertTime);
})

// conversor de massa
document.addEventListener("DOMContentLoaded", () => {
  const valueMass = document.getElementById("mass-value");
  const fromMass = document.getElementById("mass-from");
  const toMass = document.getElementById("mass-to");
  const resultMass = document.getElementById("mass-result");

  const DECIMALS = 4;

  async function convertMass() {
        const value = parseFloat(valueMass.value);

        if (isNaN(value)) {
            resultMass.innerText = "---";
            return;
        }

        try {
            const response = await fetch("/mass/convert", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    value: value,
                    from: fromMass.value,
                    to: toMass.value
                })
            });

            if (!response.ok) {
                throw new Error("Erro na conversão");
            }

            const data = await response.json();

            const formatted = parseFloat(
                data.result.toFixed(DECIMALS)
            );

            resultMass.innerText = `${formatted} ${toMass.value}`;
            
        } catch (error) {
            console.error("[Massa] Erro:", error);
            resultMass.innerText = "Alguém tropeçou nos cabos :(";
        }
    }

    valueMass.addEventListener("input", convertMass);
    fromMass.addEventListener("change", convertMass);
    toMass.addEventListener("change", convertMass);
});

// conversor de velocidade
document.addEventListener("DOMContentLoaded", () => {
    const valueVel = document.getElementById("vel-value");
    const fromVel = document.getElementById("vel-from");
    const toVel   = document.getElementById("vel-to");
    const resultVel = document.getElementById("vel-result");

    console.log("[DEBUG] valueVel encontrado?", !!valueVel);
    console.log("[DEBUG] fromVel encontrado?", !!fromVel);
    console.log("[DEBUG] toVel encontrado?", !!toVel);
    console.log("[DEBUG] resultSpan encontrado?", !!resultVel);

    if (!valueVel || !fromVel || !toVel || !resultVel) return;


    async function convertVelocity() {
        const value = parseFloat(valueVel.value);

        if (isNaN(value) || value <= 0) {
            resultVel.innerText = "--";
            return;
        }

        try {
            const response = await fetch("/velocity/convert", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    value: value,
                    from: fromVel.value,
                    to: toVel.value
                })
            });

            if (!response.ok) throw new Error("Erro na conversão");

            const data = await response.json();

            resultVel.innerText = `${data.result} ${toVel.value}`;
        } catch (err) {
            console.error("[Velocidade] Erro:", err);
            resultVel.innerText = "Erro";
        }
    }

    valueVel.addEventListener("input", convertVelocity);
    fromVel.addEventListener("change", convertVelocity);
    toVel.addEventListener("change", convertVelocity);
});
