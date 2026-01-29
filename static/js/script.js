// Função de expansão (Global para ser acessada pelo onclick)
function toggleCard(cardElement) {
    const expandable = cardElement.querySelector('.card-expandable');
    const isOpen = cardElement.classList.contains('open');

    // Fecha todos os outros primeiro
    document.querySelectorAll('.premium-card').forEach(card => {
        card.classList.remove('open');
        card.querySelector('.card-expandable').classList.remove('active');
    });

    // Abre o atual se ele não estava aberto
    if (!isOpen) {
        cardElement.classList.add('open');
        expandable.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Dark Mode Sync (Desktop e Mobile)
    const switches = ['darkMode', 'darkModeMobile'];
    
    switches.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('change', () => {
                document.body.classList.toggle('dark-theme');
                // Sincroniza o outro switch
                const other = switches.find(s => s !== id);
                const otherEl = document.getElementById(other);
                if (otherEl) otherEl.checked = el.checked;
            });
        }
    });
});

function switchTab(element, tabName) {
    // Remove 'active' de todos
    document.querySelectorAll('.tab-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Adiciona no clicado
    element.classList.add('active');
    
    // Aqui você pode adicionar a lógica para filtrar os cards ou abrir o histórico
    console.log("Mudando para a aba: " + tabName);
}

function alternarCard(id, estado) {
    const preview = document.getElementById(`preview-${id}`);
    const formulario = document.getElementById(`form-${id}`);

    if (estado === 'form') {
        preview.classList.add('d-none'); // Esconde a imagem
        formulario.classList.remove('d-none'); // Mostra o conversor
    } else {
        preview.classList.remove('d-none'); // Mostra a imagem
        formulario.classList.add('d-none'); // Esconde o conversor
    }
}

// EFEITO DA SIDEBAR

function focarConversor(id) {
    const overlay = document.getElementById('overlay-fundo');
    const card = document.getElementById(id).querySelector('.card');
    const containerPrincipal = document.querySelector('.row.g-4'); 

    // 1. Esconde o fundo suavemente
    if (containerPrincipal) containerPrincipal.classList.add('dashboard-focado');

    // 2. Mostra o overlay
    overlay.style.display = 'block';
    setTimeout(() => overlay.style.opacity = '1', 10);
    
    // 3. Foca o card
    card.classList.add('card-focado');

    // 4. Troca o conteúdo
    document.getElementById(`preview-${id}`).classList.add('escondido');
    document.getElementById(`form-${id}`).classList.remove('d-none');
}

function removerFoco() {
    const overlay = document.getElementById('overlay-fundo');
    const cardFocado = document.querySelector('.card-focado');
    const containerPrincipal = document.querySelector('.row.g-4');

    if (cardFocado) {
        const id = cardFocado.closest('section').id;
        
        // 1. Inicia animação de saída (Slide para baixo e fade)
        overlay.style.opacity = '0';
        cardFocado.style.transform = 'translate(-50%, -40%)'; 
        cardFocado.style.opacity = '0';
        
        // 2. Faz o fundo voltar
        if (containerPrincipal) containerPrincipal.classList.remove('dashboard-focado');
        
        setTimeout(() => {
            // 3. Limpeza final após a animação
            cardFocado.classList.remove('card-focado');
            cardFocado.style.transform = ''; 
            cardFocado.style.opacity = ''; 
            
            overlay.style.display = 'none';
            document.getElementById(`preview-${id}`).classList.remove('escondido');
            document.getElementById(`form-${id}`).classList.add('d-none');
        }, 600); // Tempo batendo com o CSS
    }
}







