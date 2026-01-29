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