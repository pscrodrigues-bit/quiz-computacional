'use strict';

const app = document.querySelector('#app');
let quiz = null;
const isLocalFile = window.location.protocol === 'file:';

function focusHeading() { const heading = app.querySelector('h1'); if (heading) heading.focus(); }
function button(text, className) { const element = document.createElement('button'); element.type = 'button'; element.className = className || ''; element.textContent = text; return element; }
function messageState(title, text, retryText) {
  app.replaceChildren();
  const section = document.createElement('section'); section.className = 'intro';
  const heading = document.createElement('h1'); heading.tabIndex = -1; heading.textContent = title;
  const paragraph = document.createElement('p'); paragraph.textContent = text;
  section.append(heading, paragraph);
  if (isLocalFile) {
    const input = document.createElement('input'); input.type = 'file'; input.accept = '.json,application/json'; input.className = 'file-input';
    input.addEventListener('change', () => { if (input.files[0]) loadSelectedFile(input.files[0]); });
    section.append(input);
  }
  if (retryText) { const retry = button(retryText); retry.addEventListener('click', loadInitialBank); section.append(retry); }
  app.append(section); focusHeading();
}
function renderWelcome() {
  app.replaceChildren();
  const section = document.createElement('section'); section.className = 'intro';
  section.innerHTML = '<span class="eyebrow">SEU PRÓXIMO DESAFIO</span><h1 tabindex="-1">Pequenas questões.<br><em>Grandes descobertas.</em></h1><p>Explore os fundamentos da Computação e descubra o quanto você já sabe.</p><div class="facts"><span><strong>10</strong> questões</span><span><strong>4</strong> alternativas</span><span><strong>Seu ritmo</strong> sem cronômetro</span></div><p class="hint">Escolha uma alternativa, confirme e aprenda com o feedback.</p>';
  const start = button('Iniciar quiz →'); start.id = 'start'; start.addEventListener('click', () => { quiz.start(); renderQuestion(); });
  section.insertBefore(start, section.querySelector('.hint')); app.append(section); focusHeading();
}
function renderQuestion() {
  const question = quiz.current; const confirmed = quiz.isCurrentConfirmed; const selected = confirmed ? quiz.currentAnswer : quiz.pendingChoice;
  app.replaceChildren();
  const section = document.createElement('section'); section.className = 'quiz';
  const progressLabel = document.createElement('div'); progressLabel.className = 'progress-label';
  progressLabel.innerHTML = `<span>Questão ${quiz.viewIndex + 1} de ${quiz.questions.length}</span><span>${quiz.confirmedCount} concluídas</span>`;
  const progress = document.createElement('progress'); progress.value = quiz.confirmedCount; progress.max = quiz.questions.length; progress.setAttribute('aria-label', 'Questões confirmadas');
  const card = document.createElement('article'); card.className = 'card';
  const topic = document.createElement('span'); topic.className = 'eyebrow'; topic.textContent = question.topic;
  const heading = document.createElement('h1'); heading.id = 'question'; heading.tabIndex = -1; heading.textContent = question.prompt;
  const instruction = document.createElement('p'); instruction.className = 'instruction'; instruction.textContent = confirmed ? 'Esta resposta já foi confirmada.' : 'Selecione uma alternativa e confirme sua resposta.';
  const form = document.createElement('form'); const fieldset = document.createElement('fieldset'); fieldset.setAttribute('aria-labelledby', 'question');
  const legend = document.createElement('legend'); legend.className = 'sr-only'; legend.textContent = 'Alternativas'; fieldset.append(legend);
  question.options.forEach((option, index) => {
    const label = document.createElement('label'); label.className = 'option';
    const input = document.createElement('input'); input.type = 'radio'; input.name = 'answer'; input.value = index; input.checked = selected === index; input.disabled = confirmed;
    input.addEventListener('change', () => { quiz.select(index); confirm.disabled = false; });
    const letter = document.createElement('span'); letter.className = 'letter'; letter.textContent = 'ABCD'[index];
    const text = document.createElement('span'); text.textContent = option; label.append(input, letter, text); fieldset.append(label);
  });
  const feedback = document.createElement('div'); feedback.className = 'feedback'; feedback.setAttribute('role', 'status'); feedback.setAttribute('aria-live', 'polite');
  if (confirmed) {
    const correct = quiz.currentAnswer === question.answer; feedback.classList.add(correct ? 'success' : 'error');
    const title = document.createElement('strong'); title.textContent = correct ? '✓ Resposta correta!' : 'Resposta incorreta. Vamos aprender!';
    const explanation = document.createElement('p'); explanation.textContent = `${correct ? '' : `Alternativa correta: ${'ABCD'[question.answer]}. ${question.options[question.answer]}. `}${question.explanation || ''}`;
    feedback.append(title, explanation); fieldset.children[question.answer + 1].classList.add('correct');
    if (!correct) fieldset.children[quiz.currentAnswer + 1].classList.add('incorrect');
  }
  const actions = document.createElement('div'); actions.className = 'actions';
  const back = button('← Voltar', 'secondary'); back.disabled = quiz.viewIndex === 0; back.addEventListener('click', () => { if (quiz.back()) renderQuestion(); });
  const confirm = button('Confirmar resposta'); confirm.type = 'submit'; confirm.disabled = confirmed || !Number.isInteger(selected);
  confirm.addEventListener('click', (event) => { event.preventDefault(); if (quiz.confirm()) renderQuestion(); });
  const nextText = quiz.isComplete && quiz.viewIndex === quiz.questions.length - 1 ? 'Ver resultado →' : 'Próxima questão →';
  const next = button(nextText); next.hidden = !confirmed;
  next.addEventListener('click', () => {
    if (quiz.isComplete && quiz.viewIndex === quiz.questions.length - 1) { if (quiz.showResult()) renderResult(); }
    else if (quiz.next()) renderQuestion();
  });
  actions.append(back); if (!confirmed) actions.append(confirm); actions.append(next);
  form.append(fieldset, feedback, actions); card.append(topic, heading, instruction, form); section.append(progressLabel, progress, card); app.append(section); focusHeading();
}
function renderResult() {
  const result = quiz.result; app.replaceChildren();
  const section = document.createElement('section'); section.className = 'intro result';
  section.innerHTML = '<span class="eyebrow">PRÁTICA CONCLUÍDA</span><h1 tabindex="-1">Mais um passo<br><em>no seu aprendizado.</em></h1><p>Você respondeu às 10 questões. Confira seu resultado:</p>';
  const scores = document.createElement('div'); scores.className = 'scores';
  [['Acertos', result.correct], ['Erros', result.incorrect], ['de acertos', `${result.percentage}%`]].forEach(([label, value]) => {
    const item = document.createElement('div'); const number = document.createElement('strong'); number.textContent = value; const name = document.createElement('span'); name.textContent = label; item.append(number, name); scores.append(item);
  });
  const restart = button('Reiniciar quiz ↻'); restart.addEventListener('click', () => { if (quiz.restart()) renderQuestion(); });
  section.append(scores, restart); app.append(section); focusHeading();
}
function useBank(bank) { quiz = new QuizCore.Quiz(bank); renderWelcome(); }
async function loadSelectedFile(file) { try { useBank(await QuestionLoader.loadFromFile(file)); } catch (error) { messageState('Quiz indisponível', error.message); } }
async function loadInitialBank() {
  if (isLocalFile) { messageState('Selecione as questões', 'Para abrir o quiz diretamente, escolha o arquivo data/questions.json desta pasta.'); return; }
  messageState('Carregando questões', 'Aguarde um instante.');
  try { useBank(await QuestionLoader.loadFromNetwork('./data/questions.json')); } catch (error) { messageState('Quiz indisponível', error.message, 'Tentar novamente'); }
}
loadInitialBank();
