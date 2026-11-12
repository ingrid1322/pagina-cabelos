// =========================================
// CALCULADORA DE ORÇAMENTO E WHATSAPP
// =========================================

// 1. Captura dos elementos do HTML
const selectTextura = document.getElementById('textura');
const selectComprimento = document.getElementById('comprimento');
const selectQuantidade = document.getElementById('quantidade');
const displayValorTotal = document.getElementById('valor-total');
const btnWhatsapp = document.getElementById('btn-whatsapp');

// Número de telefone fictício para demonstração (formato: DDI + DDD + Número)
const numeroWhatsApp = '5511999999999';

// 2. Função que calcula o preço e monta o link do WhatsApp
function atualizarOrcamento() {
    // Pega os valores selecionados
    const texturaEscolhida = selectTextura.value;
    
    const opcaoComprimento = selectComprimento.options[selectComprimento.selectedIndex];
    const comprimentoEscolhido = opcaoComprimento.value;
    const precoBase100g = Number(opcaoComprimento.getAttribute('data-preco'));

    const opcaoQuantidade = selectQuantidade.options[selectQuantidade.selectedIndex];
    const multiplicadorPeso = Number(opcaoQuantidade.value);
    const labelQuantidade = opcaoQuantidade.getAttribute('data-label');

    // Calcula o total
    const valorFinal = precoBase100g * multiplicadorPeso;

    // Formata o número para moeda brasileira (R$ 0.000,00)
    const valorFormatado = valorFinal.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    // Atualiza o texto na tela
    displayValorTotal.textContent = valorFormatado;

    // Monta a mensagem personalizada para o WhatsApp
    const mensagem = `Olá! Fiz uma simulação no site e gostaria de encomendar:\n\n` +
                     `• *Textura:* ${texturaEscolhida}\n` +
                     `• *Comprimento:* ${comprimentoEscolhido}\n` +
                     `• *Quantidade:* ${labelQuantidade}\n` +
                     `• *Valor Estimado:* ${valorFormatado}\n\n` +
                     `Poderia confirmar a disponibilidade em estoque?`;

    // Codifica o texto para URL e atualiza o botão
    const linkWhatsApp = `https://wa.me{numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    btnWhatsapp.href = linkWhatsApp;
}

// 3. Adiciona os eventos de mudança nos selects
selectTextura.addEventListener('change', atualizarOrcamento);
selectComprimento.addEventListener('change', atualizarOrcamento);
selectQuantidade.addEventListener('change', atualizarOrcamento);

// 4. Executa uma vez ao carregar a página para iniciar com os valores padrão
atualizarOrcamento();