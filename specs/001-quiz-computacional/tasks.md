# Tasks: Quiz Computacional

**Input**: Documentos em `specs/001-quiz-computacional/`.
**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/](contracts/), [quickstart.md](quickstart.md).
**Organization**: Incrementos por história, preservando o código existente e adaptando-o ao desenho aprovado.
**Tests**: Não se impõe TDD. Como a constituição exige evidência objetiva, as tarefas incluem testes Node para regras e dados e roteiro manual para integração, acessibilidade e responsividade. A suíte final prevista é `node --test tests/quiz.test.cjs tests/questions.test.cjs`.

## Format: `[ID] [P?] [Story] Description`

Todos os itens começam abertos. `[P]` indica trabalhos em arquivos distintos que podem
ocorrer juntos quando as dependências indicadas estiverem concluídas. `[US1]`, `[US2]`
e `[US3]` correspondem às histórias da especificação. Caminhos são relativos à raiz
`quiz-computacional/` que contém `index.html` e `.specify/`.

A checklist personalizada `checklists/quiz.md` possui 28 critérios de qualidade de
requisitos revisados pelo revisor. Seus marcadores são independentes da conclusão das
tarefas de implementação e não representam aprovação do código.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Preparar adaptação incremental sem adicionar framework, build ou backend.

- [X] T001 Registrar o estado inicial de `index.html`, `styles.css`, `app.js`, `quiz.js` e `tests/quiz.test.cjs`, executando a suíte existente e descrevendo lacunas do plano em `specs/001-quiz-computacional/validation.md`; distinguir verificações realizadas de pendentes.
- [X] T002 Documentar em `README.md` a separação apresentação/dados/domínio e os modos previstos de execução: abertura local com seleção de JSON e HTTP/HTTPS estático com leitura automática, sem requisito de Node para jogar.

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Fonte única de dados, validação e leitura compartilhadas. Concluir antes das histórias.

- [X] T003 Criar `data/questions.json` a partir das 10 questões existentes, com `version: 1` e `questions`: “lista ordenada com exatamente 10 questões”; atribuir IDs e revisar enunciados/gabaritos, registrando a revisão pedagógica em `specs/001-quiz-computacional/validation.md` (FR-002–003).
- [X] T004 Implementar em `quiz.js` validação integral: `id` string “Não vazia e única no banco”, `topic` string “Não vazia”, `prompt` string “Enunciado não vazio”, `options` string[4] “Quatro textos não vazios e distintos após trim”, `answer` inteiro “Um único índice 0, 1, 2 ou 3; não aceitar coerção, listas ou flags extras de correção”, `explanation` string opcional “Quando presente, não vazia; exibida somente após confirmar”; rejeitar versão desconhecida, campos ausentes/desconhecidos e tipos incorretos (FR-012; depende de T003).
- [X] T005 Remover de `quiz.js` a cópia embutida das questões e o banco padrão implícito do construtor, exigindo banco validado; ampliar `tests/quiz.test.cjs` para entrada explícita, os 11 totais de acertos, confirmação única, consulta, seleção pendente e reinício (depende de T004).
- [X] T006 Implementar em `question-loader.js` leitura automática do JSON relativo em HTTP/HTTPS, checagem da resposta e timeout de 10 segundos, e leitura de arquivo explicitamente escolhido em abertura local; ambos passam pela mesma validação, sem fallback duplicado, eval ou redução de segurança (depende de T004).
- [X] T007 Criar `tests/questions.test.cjs` para o arquivo real e variantes com 9/11 questões, 3/5 alternativas, opções vazias/duplicadas, IDs repetidos, gabarito ausente/lista/inválido, versão desconhecida e JSON malformado; executar a suíte e registrar condições e resultados em `specs/001-quiz-computacional/validation.md`; nenhum banco parcial pode iniciar uma tentativa (FR-012, SC-006; depende de T005–T006).

**Checkpoint**: Banco único validado e carregador prontos; revisão das regras de conteúdo registrada.

## Phase 3: User Story 1 - Praticar e receber feedback (Priority: P1) — MVP

**Goal**: Responder, confirmar, receber feedback e consultar questões anteriores sem perder a seleção pendente.
**Independent Test**: Com banco válido, responder à primeira questão, selecionar a segunda sem confirmar, voltar e retornar: primeira resposta/feedback imutáveis, segunda seleção editável e nenhuma contagem duplicada. Repetir sem seleção pendente e com resposta incorreta, sem depender da tela de resultado.

- [X] T008 [US1] Separar em `quiz.js` os estados: `phase` “ready, active ou result”; `viewIndex` “inteiro de 0 a 9 durante active”; `answers` “prefixo contínuo de índices confirmados, de comprimento 0 a 10”; `pendingChoice` “null ou índice 0 a 3 da primeira questão ainda não confirmada (posição answers.length)”; manter banco imutável e exportação compatível com navegador e testes.
- [X] T009 [US1] Implementar em `quiz.js` iniciar, selecionar, confirmar, voltar e avançar conforme `data-model.md`: confirmação única, nenhuma resposta fora de ordem, sem avanço além da primeira não respondida, retorno não altera pendência; ao confirmar, limpar pendência e manter questão para feedback (FR-004–008; depende de T008).
- [X] T010 [P] [US1] Preparar em `index.html` estrutura HTML5 em português, viewport, região principal e aviso sem JavaScript; carregar `quiz.js`, `question-loader.js` e `app.js` como scripts clássicos defer nessa ordem, sem dependências externas (após fase 2; paralelo a T008–T009).
- [X] T011 [US1] Integrar em `app.js` os estados de carregamento, seleção local, erro recuperável e pronto: Iniciar indisponível sem banco válido, cancelamento do seletor preserva estado, falhas permitem nova tentativa e nenhuma tentativa nasce parcialmente (FR-001, FR-012; depende de T009–T010).
- [X] T012 [US1] Adaptar em `app.js` apresentação de uma questão com quatro radios, seleção única e confirmação explícita; renderizar dados com textContent, feedback textual após confirmar, bloqueio de edição e explicação opcional somente após confirmação (FR-002–007; depende de T011).
- [X] T013 [US1] Integrar em `app.js` Voltar e Próxima questão: reconstruir resposta/feedback em consulta, restaurar seleção pendente editável, impedir salto de questão e retorno antes da primeira, calcular progresso pelas respostas confirmadas e manter feedback da última até ação explícita (FR-008, SC-003; depende de T012).
- [X] T014 [US1] Aplicar em `app.js` rótulos, agrupamento de alternativas, anúncio de feedback e foco no título após mudança de questão, preservando teclado e evitando indicação exclusivamente por cor (FR-013; depende de T013).
- [ ] T015 [US1] Executar cenários 1–13 da história 1 nos modos local e estático disponíveis, incluindo repetição de confirmação e consulta com/sem pendência; registrar ambiente e evidências em `specs/001-quiz-computacional/validation.md` (SC-001, SC-003, SC-006; depende de T014).

**Checkpoint**: Prática e consulta demonstráveis sem resultado final; na décima questão, manter feedback sem antecipar encerramento.

## Phase 4: User Story 2 - Consultar o resultado (Priority: P2)

**Goal**: Apresentar totais e percentual após as 10 confirmações e ação explícita.
**Independent Test**: Partir de nove respostas conhecidas, confirmar a décima, conferir seu feedback e então o resultado; avaliar todos os totais de 0 a 10 acertos.

- [X] T016 [US2] Adaptar em `quiz.js` resultado derivado: correct compara cada resposta ao gabarito, “incorrect = answers.length - correct”, “percentage = correct / 10 * 100”; resultado final somente com 10 confirmações, sem contadores alterados por renderização/consulta (FR-009–010).
- [X] T017 [US2] Implementar em `quiz.js` a transição para result somente com phase active, viewIndex 9 e 10 respostas; manter consulta possível antes da ação Ver resultado e rejeitar transição prematura (depende de T016).
- [X] T018 [US2] Conectar em `app.js` Ver resultado após o feedback da décima questão e exibir acertos, erros e percentual com foco no título, sem décima primeira questão (depende de T017).
- [X] T019 [US2] Executar em `tests/quiz.test.cjs` os 11 totais possíveis, incluindo 7/3/70%, 0/10/0% e 10/0/100%, e registrar a verificação de imutabilidade após consulta em `specs/001-quiz-computacional/validation.md` (SC-002; depende de T018).

**Checkpoint**: Resultado acessível apenas após o último feedback, com soma de acertos e erros igual a 10.

## Phase 5: User Story 3 - Reiniciar a prática (Priority: P3)

**Goal**: Criar uma tentativa limpa usando o mesmo banco validado, sem nova leitura.
**Independent Test**: A partir de um resultado, reiniciar: questão 1 sem seleção/feedback, contagens zeradas e mesma ordem; concluir outra tentativa com resultado diferente sem acumulação.

- [X] T020 [US3] Implementar em `quiz.js` reinício a partir de result: phase active, índice 0, answers vazio, pendingChoice null e banco preservado; limpar todo o estado da tentativa sem persistência (FR-011).
- [X] T021 [US3] Conectar em `app.js` Reiniciar quiz no resultado, apresentar primeira questão sem seleção ou feedback anterior, restaurar foco e progresso e não solicitar novamente o JSON (depende de T020).
- [X] T022 [US3] Executar os cenários de reinício em `tests/quiz.test.cjs` e verificar duas tentativas consecutivas com resultados distintos, ausência de dados residuais e reaproveitamento do banco; registrar evidências em `specs/001-quiz-computacional/validation.md` (SC-004; depende de T021).

**Checkpoint**: Fluxo integral concluído com reinício independente.

## Phase 6: Polish & Cross-Cutting Concerns

- [X] T023 [P] Ajustar `styles.css` para todos os estados previstos, de 320 a 1440 px sem rolagem horizontal, controles de pelo menos 44 × 44 px, texto quebrável, foco visível e distinção textual de feedback; não adicionar framework (após T022; paralelo a T024).
- [X] T024 [P] Atualizar `README.md` e `specs/001-quiz-computacional/quickstart.md` com os comandos reais da suíte `node --test tests/quiz.test.cjs tests/questions.test.cjs`, seleção local do JSON, acesso estático em smartphone, descarte ao recarregar, ausência de backend/autenticação e método de medição de desempenho; não anunciar compatibilidade ainda não verificada (após T022; paralelo a T023).
- [ ] T025 Executar `node --test tests/quiz.test.cjs tests/questions.test.cjs` e o roteiro de `specs/001-quiz-computacional/quickstart.md`, incluindo falhas/repetição de leitura, teclado, foco, larguras 320/375/768/1440, smartphone e 20 interações por dispositivo medidas do evento ao próximo frame, cada uma em até 100 ms; registrar versões, resultados e limitações em `specs/001-quiz-computacional/validation.md` sem considerar plataformas não verificadas aprovadas (depende de T023–T024).
- [ ] T026 Registrar em `specs/001-quiz-computacional/validation.md` a revisão final dos oito princípios, dos FR-001–013 e SC-001–006; manter falhas e bloqueios pendentes até resolução (depende de T025).

## Dependencies & Execution Order

```text
Setup T001 → T002
  → Base T003 → T004 → T005/T006 → T007
  → US1 (T008 → T009 em paralelo com T010) → T011 → T012 → T013 → T014 → T015
  → US2 T016 → T017 → T018 → T019
  → US3 T020 → T021 → T022
  → T023/T024 → T025 → T026
```

T006 depende de T004; não altera o arquivo de T005, mas a fase só termina após ambos.
US2 depende das transições de US1; US3 depende do estado result de US2. As verificações
independentes podem preparar estados conhecidos sem repetir manualmente toda a história
anterior. Não editar `quiz.js` ou `app.js` simultaneamente entre histórias.

## Parallel Examples

### US1

Após a base, T010 (`index.html`) pode ocorrer junto de T008–T009 (`quiz.js`). T011
aguarda ambos. Renderização e navegação em `app.js` permanecem sequenciais.

### US2

T016–T019 seguem sequência por dependência entre domínio e apresentação. Não há par
independente justificado nesta história; não atribuir `[P]` artificialmente.

### US3

T020–T022 seguem sequência: reinício no domínio, ligação na interface e verificação.
Não há paralelismo interno seguro. Após US3, T023 (`styles.css`) e T024 (`README.md`)
são independentes e podem ocorrer juntos.

## Implementation Strategy

1. Preparar e concluir base com banco único e leitura validada.
2. Entregar US1 como MVP de prática com feedback e consulta, preservando a pendência.
3. Acrescentar resultado (US2), depois reinício (US3), verificando cada incremento.
4. Finalizar responsividade e evidências. O produto solicitado completo exige todas
   as histórias e verificações; o MVP é somente um marco intermediário.

## Traceability

| Requisitos | Tarefas principais |
|---|---|
| FR-001 | T010–T011 |
| FR-002–003, FR-012 | T003–T007, T011–T012 |
| FR-004–005, FR-007–008 | T008–T009, T012–T015 |
| FR-006 | T012–T015, T018 |
| FR-009–010 | T016–T019 |
| FR-011 | T020–T022 |
| FR-013 | T010, T014–T015, T023, T025 |
| SC-001, SC-003, SC-006 | T007, T015, T025 |
| SC-002 | T019 |
| SC-004 | T022 |
| SC-005 | T025–T026 |

## Notes

- Este arquivo planeja trabalho; nenhum item aberto significa implementação aprovada.
- Reutilizar o código existente e corrigir diferenças do plano; não recriar o projeto.
- Registros de verificação devem conter condições, ação, esperado e observado, como
  exige a constituição. Corrigir falhas antes de marcar a tarefa correspondente concluída.
- A revisão da checklist personalizada permanece com o revisor; não transformar seus
  itens em aprovações automáticas ao concluir tarefas de código.
- Não realizar publicação, exposição de rede ou contorno de bloqueios de ferramentas
  como efeito implícito destas tarefas.
