# Registro de validação

**Data**: 2026-09-26

## Automação

- Comando: `node --test tests/quiz.test.cjs tests/questions.test.cjs`.
- Resultado: 20 testes aprovados.
- Evidências: banco com 10 questões válidas; rejeição de quantidade, alternativas,
  identificadores, gabaritos e versão inválidos; confirmação única; consulta; seleção
  pendente; todos os resultados de 0 a 10 acertos; reinício sem resíduos.

## Verificações pendentes em navegador

- Fluxo de interface pelo seletor de arquivo local.
- Teclado e anúncio do feedback; o foco visível foi confirmado pela regra de estilo.
- Chrome, Firefox, Edge e Safari em desktop; Chrome Android e Safari iOS disponíveis.
- Medição de 20 interações por dispositivo, do evento ao próximo frame, com limite de
  100 ms cada. Registrar navegador, versão, dispositivo, largura e valores observados.

Estas verificações não foram declaradas aprovadas sem execução no ambiente indicado.

## Interface em navegador

- Ambiente: Codex In-app Browser, acesso estático em `http://127.0.0.1:8000`.
- Fluxo aprovado: banco carregado automaticamente; Iniciar apresentou a questão 1;
  Confirmar ficou indisponível até a seleção; confirmação exibiu feedback textual e
  bloqueou os radios; voltar à questão 1 preservou sua resposta e feedback; voltar à
  questão 2 restaurou a seleção pendente, ainda editável e sem pontuação adicional.
- Responsividade: em viewports 320 × 800, 375 × 900, 768 × 900 e 1440 × 900,
  `scrollWidth` e `clientWidth` foram iguais à largura esperada. Em 320 px, os botões
  visíveis tinham 48 px de altura. A folha de estilo contém regra de foco visível.
- Console: nenhum erro registrado após o fluxo de carregamento, confirmação e navegação.
