/* ==========================================================================
   CONFIGURAÇÕES GLOBAIS E UI
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('overlay-fundo');
  const body = document.body;

  // 1. Lógica de Focar Card ao clicar
  const cards = document.querySelectorAll('.converter-card');
  cards.forEach(card => {
    card.addEventListener('click', function (e) {
      // Se clicar em input, botão ou select, não reinicia a animação de foco
      if (e.target.closest('input, select, button, label')) return;

      const section = this.closest('section');
      if (section) focarConversor(section.id);
    });
  });

  // 2. Fechar ao clicar no overlay
  if (overlay) {
    overlay.addEventListener('click', removerFoco);
  }

  // 3. Sincronização de Dark Mode (Desktop e Mobile)
  const temaSalvo = localStorage.getItem('theme') || 'light';
  aplicarTema(temaSalvo);

  document.addEventListener('change', (e) => {
    if (e.target && (e.target.id === 'darkMode' || e.target.id === 'darkModeMobile')) {
      const novoTema = e.target.checked ? 'dark' : 'light';
      aplicarTema(novoTema);
    }
  });
});

/* ==========================================================================
   FUNÇÕES DE INTERFACE (FOCO & TEMA)
   ========================================================================== */

function aplicarTema(tema) {
  const body = document.body;
  const switches = document.querySelectorAll('#darkMode, #darkModeMobile');
  const isDark = tema === 'dark';

  if (isDark) {
    body.classList.add('dark-theme');
  } else {
    body.classList.remove('dark-theme');
  }

  switches.forEach(sw => sw.checked = isDark);
  localStorage.setItem('theme', tema);
}

function focarConversor(id) {
  const overlay = document.getElementById("overlay-fundo");
  const section = document.getElementById(id);
  if (!section) return;

  const card = section.querySelector(".converter-card");
  const preview = document.getElementById(`preview-${id}`);
  const form = document.getElementById(`form-${id}`);

  // Previne scroll e ativa overlay
  document.body.style.overflow = "hidden";
  overlay.style.display = "block";
  setTimeout(() => overlay.style.opacity = "1", 10);

  // Centraliza o card
  card.classList.add("card-focado");

  // Alterna visualização Interna
  if (preview) preview.classList.add("escondido");
  if (form) {
    form.classList.remove("d-none");
    setTimeout(() => form.classList.add("ativo"), 50);
  }
}

function removerFoco() {
  const overlay = document.getElementById("overlay-fundo");
  const cardFocado = document.querySelector(".card-focado");

  if (cardFocado) {
    const section = cardFocado.closest("section");
    const id = section.id;

    overlay.style.opacity = "0";
    cardFocado.style.opacity = "0";
    cardFocado.style.transform = "translate(-50%, -45%) scale(0.95)";

    setTimeout(() => {
      cardFocado.classList.remove("card-focado");
      cardFocado.style.opacity = "";
      cardFocado.style.transform = "";
      overlay.style.display = "none";
      document.body.style.overflow = "";

      const preview = document.getElementById(`preview-${id}`);
      const form = document.getElementById(`form-${id}`);

      if (preview) preview.classList.remove("escondido");
      if (form) {
        form.classList.add("d-none");
        form.classList.remove("ativo");
      }
    }, 300);
  }
}

function fecharMenuEFocar(id) {
  const menuElement = document.getElementById("offcanvasNavbar");
  const menuBS = bootstrap.Offcanvas.getInstance(menuElement);
  if (menuBS) menuBS.hide();
  focarConversor(id);
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
  console.log(
    "[Moedas] DOM totalmente carregado. Iniciando script de conversão...",
  );

  const amountInput = document.getElementById("currency-amount");
  const fromSelect = document.getElementById("currency-from");
  const toSelect = document.getElementById("currency-to");
  const resultSpan = document.getElementById("currency-result");

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
      console.log(
        "[DEBUG] Resultado atualizado na tela:",
        resultSpan.innerText,
      );
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
    if (e.target.id === "currency-from" || e.target.id === "currency-to") {
      convertCurrency();
    }
  });
});

// conversor de medidas
document.addEventListener("DOMContentLoaded", () => {
  const valueInput = document.getElementById("length-value");
  const fromSelect = document.getElementById("length-from");
  const toSelect = document.getElementById("length-to");
  const resultSpan = document.getElementById("length-result");

  if (!valueInput || !fromSelect || !toSelect || !resultSpan) {
    console.error("[Comprimento] Elementos não encontrados");
    return;
  }

  const LENGTH_DECIMALS = {
    mm: 2,
    cm: 2,
    dm: 3,
    m: 4,
    dam: 5,
    hm: 6,
    km: 6,
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
          to: toSelect.value,
        }),
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
      resultTime.innerText = "---";
      return;
    }

    try {
      const response = await fetch("time/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          value: value,
          from: fromTime.value,
          to: toTime.value,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro na conversão");
      }

      const data = await response.json();

      const formatted = Number(data.result).toLocaleString("pt-BR", {
        maximumFractionDigits: 6,
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
});

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
          to: toMass.value,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro na conversão");
      }

      const data = await response.json();

      const formatted = parseFloat(data.result.toFixed(DECIMALS));

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
  const toVel = document.getElementById("vel-to");
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
