let step = 1;

// Inicialização após o carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  renderProto();

  // Atualização automática ao digitar
  document.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('input', updateSummary);
  });
});

// Altera a etapa ativa
function setStep(newStep) {
  step = newStep;
  
  // Atualiza botões superiores
  for (let i = 1; i <= 5; i++) {
    const tab = document.getElementById(`tab-${i}`);
    const box = document.getElementById(`step-${i}`);

    if (i === step) {
      tab.className = "px-3 py-1 text-xs font-semibold rounded-lg bg-white text-indigo-700 shadow";
      box.classList.remove('hidden');
    } else {
      tab.className = "px-3 py-1 text-xs font-semibold rounded-lg text-indigo-100 hover:bg-indigo-500";
      box.classList.add('hidden');
    }
  }

  // Atualiza estado dos botões inferiores
  document.getElementById('btn-back').disabled = (step === 1);
  document.getElementById('btn-next').textContent = (step === 5) ? 'Finalizado' : 'Avançar';

  updateSummary();
}

// Avança ou recua etapas
function changeStep(delta) {
  const target = step + delta;
  if (target >= 1 && target <= 5) {
    setStep(target);
  }
}

// Atualiza o resumo em tempo real
function updateSummary() {
  const p = document.getElementById('p-title').value || 'Pendente...';
  const per = document.getElementById('per-name').value || 'Pendente...';
  const s = document.getElementById('sol-name').value || 'Pendente...';

  document.getElementById('sum-p').textContent = p;
  document.getElementById('sum-per').textContent = per;
  document.getElementById('sum-s').textContent = s;

  document.getElementById('pitch-p').textContent = p;
  document.getElementById('pitch-per').textContent = per;
  document.getElementById('pitch-s').textContent = s;
}

// Renderiza o protótipo simulado
function renderProto() {
  const type = document.getElementById('proto-type').value;
  const preview = document.getElementById('proto-preview');

  if (type === 'dash') {
    preview.innerHTML = `
      <div class="space-y-1">
        <i data-lucide="line-chart" class="w-6 h-6 text-emerald-400 mx-auto"></i>
        <p class="font-semibold text-emerald-400">Previsão: +20% vendas no Sábado</p>
        <p class="text-[10px] text-slate-400">Sugestão: Aumentar estoque de carne em 5kg</p>
      </div>
    `;
  } else {
    preview.innerHTML = `
      <div class="space-y-1">
        <i data-lucide="bot" class="w-6 h-6 text-indigo-400 mx-auto"></i>
        <p class="text-slate-300">"Olá! Recomendamos comprar 12kg de tomates para esta semana."</p>
      </div>
    `;
  }
  lucide.createIcons();
}

// Carrega dados de demonstração
function loadDemo() {
  document.getElementById('p-title').value = "Desperdício de Comida em Restaurantes";
  document.getElementById('p-desc').value = "Dificuldade em prever a quantidade exata de clientes por dia.";
  document.getElementById('per-name').value = "Roberto (Gerente de Restaurante)";
  document.getElementById('per-need').value = "Saber exatamente o quanto comprar de estoque.";
  document.getElementById('sol-name').value = "EstoqueFácil IA";
  document.getElementById('sol-desc').value = "Uma IA que analisa histórico de vendas e clima para indicar as compras certas.";
  updateSummary();
}

// Copia o resumo para a área de transferência
function exportSummary() {
  const text = `PROJETO DE IA:\n\n1. Problema: ${document.getElementById('sum-p').textContent}\n2. Persona: ${document.getElementById('sum-per').textContent}\n3. Solução: ${document.getElementById('sum-s').textContent}`;
  navigator.clipboard.writeText(text);
  alert('Resumo copiado com sucesso!');
}
