# Feature Specification: Quiz Computacional

**Feature Branch**: Não criada; não há hook de criação de branch configurado.

**Created**: 2026-09-26

**Status**: Draft

**Input**: Desenvolver uma aplicação educacional chamada Quiz Computacional para estudantes praticarem conhecimentos básicos de Computação. Apresentar uma questão por vez, com enunciado, quatro alternativas e apenas uma correta. Permitir selecionar e confirmar uma resposta, receber feedback de acerto ou erro e avançar. Oferecer inicialmente 10 questões, apresentar acertos, erros e percentual ao finalizar e permitir reiniciar. Sem cadastro ou autenticação na primeira versão.

## Clarifications

### Session 2026-09-26

- Q: O estudante poderá voltar às questões anteriores durante o quiz? → A: Permitir voltar para consultar respostas e feedback, sem alterá-los.
- Q: Se o estudante selecionar uma alternativa, voltar a uma questão anterior e depois retornar, a seleção ainda não confirmada deverá ser mantida? → A: Manter a seleção, sem confirmar nem pontuar.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Praticar e receber feedback (Priority: P1)

Como estudante, quero responder a uma questão por vez e saber se acertei após confirmar, para praticar conhecimentos básicos de Computação no meu ritmo.

**Why this priority**: Responder e receber feedback é o benefício educacional central.

**Independent Test**: Iniciar uma tentativa e responder a questões com gabarito conhecido, verificando apresentação, seleção, confirmação, feedback e avanço, sem depender do resultado final.

**Acceptance Scenarios**:

1. **Given** um estudante que acessou a aplicação sem se identificar, **When** inicia o quiz, **Then** vê apenas a primeira questão, seu enunciado e exatamente quatro alternativas, sem indicação prévia da correta.
2. **Given** uma questão sem seleção, **When** tenta confirmar ou avançar, **Then** nenhuma resposta é registrada e ele permanece na questão.
3. **Given** uma alternativa selecionada e ainda não confirmada, **When** seleciona outra, **Then** somente a nova alternativa permanece selecionada.
4. **Given** uma alternativa correta selecionada, **When** confirma, **Then** recebe indicação textual de acerto, a resposta é bloqueada para edição e pode avançar.
5. **Given** uma alternativa incorreta selecionada, **When** confirma, **Then** recebe indicação textual de erro e pode avançar, sem poder alterar a resposta confirmada.
6. **Given** uma resposta já confirmada, **When** repete a confirmação, **Then** a contagem permanece igual e o feedback é preservado.
7. **Given** feedback de uma questão que não é a última, **When** avança, **Then** vê apenas a questão seguinte; se for a primeira visita a ela, não há seleção anterior e uma nova resposta precisa ser confirmada.
8. **Given** uma questão confirmada, **When** não realiza outra ação, **Then** o feedback permanece disponível e não ocorre avanço automático.
9. **Given** que já avançou de uma questão confirmada, **When** volta a ela, **Then** vê a alternativa registrada e seu feedback, sem poder alterar ou contabilizar novamente a resposta.
10. **Given** que está consultando uma questão anterior, **When** avança pelas questões já respondidas, **Then** suas respostas e feedbacks são preservados, sem nova confirmação, até retornar à questão em andamento.
11. **Given** a primeira questão, **When** consulta as ações de navegação, **Then** não pode voltar a uma questão anterior inexistente.
12. **Given** uma alternativa selecionada e não confirmada na questão em andamento, **When** consulta questões anteriores e retorna, **Then** a seleção permanece marcada e editável, sem feedback de correção ou alteração na pontuação, e ainda exige confirmação explícita.
13. **Given** uma questão em andamento sem seleção, **When** consulta questões anteriores e retorna, **Then** ela continua sem seleção e sem feedback.

---

### User Story 2 - Consultar o resultado (Priority: P2)

Como estudante, quero consultar acertos, erros e percentual ao concluir as 10 questões, para conhecer meu desempenho.

**Why this priority**: O resumo permite avaliar o resultado da prática completa.

**Independent Test**: Partir de uma tentativa com nove respostas conhecidas e confirmar a última, verificando o feedback e o resumo com totais previamente calculados.

**Acceptance Scenarios**:

1. **Given** nove respostas confirmadas, **When** confirma a décima, **Then** recebe feedback dessa resposta antes de acessar o resultado.
2. **Given** feedback da décima resposta, **When** solicita prosseguir, **Then** vê acertos, erros e percentual, sem uma décima primeira questão.
3. **Given** uma tentativa concluída com sete acertos, **When** consulta o resultado, **Then** vê 7 acertos, 3 erros e 70% de acertos.
4. **Given** uma tentativa concluída sem acertos ou sem erros, **When** consulta o resultado, **Then** vê respectivamente 0 acertos, 10 erros e 0%, ou 10 acertos, 0 erros e 100%.

---

### User Story 3 - Reiniciar a prática (Priority: P3)

Como estudante, quero reiniciar após consultar o resultado, para praticar novamente desde o início.

**Why this priority**: A repetição permite consolidar o aprendizado sem exigir novo acesso ou identificação.

**Independent Test**: Partir de um resultado concluído, reiniciar e verificar a primeira questão e uma nova contagem independente da tentativa anterior.

**Acceptance Scenarios**:

1. **Given** o resultado de uma tentativa, **When** reinicia, **Then** retorna à primeira das 10 questões com nenhuma alternativa selecionada, sem feedback anterior e com contagens zeradas.
2. **Given** uma tentativa reiniciada, **When** responde novamente às 10 questões, **Then** o resultado considera exclusivamente as novas respostas.

---

### Edge Cases

- Nenhuma alternativa selecionada: impedir confirmação e avanço sem alterar a pontuação.
- Confirmação repetida: registrar uma única resposta por questão.
- Tentativa de alterar resposta confirmada: preservar a resposta e o resultado originais, inclusive ao voltar para consulta.
- Consulta de questões anteriores: manter respostas, feedback e contagens; na primeira questão, não oferecer retorno a uma questão inexistente.
- Seleção pendente ao voltar: preservar a alternativa escolhida na questão em andamento e restaurá-la ao retornar, sem confirmação, feedback de correção ou pontuação. Se não havia seleção, manter a questão sem seleção.
- Questão com menos ou mais de quatro alternativas, sem correta, com múltiplas corretas ou correta inexistente: rejeitar o conteúdo antes de exibi-lo, impedir iniciar uma tentativa incompleta e informar que o quiz está indisponível.
- Ausência das 10 questões válidas: não iniciar um quiz parcial nem produzir resultado enganoso.
- Última questão: manter seu feedback até o estudante solicitar o resultado.
- Todos os acertos ou todos os erros: apresentar corretamente os limites de 100% e 0%.
- Atualização da página ou encerramento da aplicação: a tentativa pode ser descartada; uma nova abertura começa sem respostas anteriores.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: A aplicação DEVE permitir iniciar o quiz sem cadastro, autenticação ou identificação pessoal.
- **FR-002**: Cada tentativa DEVE conter inicialmente exatamente 10 questões de conhecimentos básicos de Computação, exibindo somente uma por vez.
- **FR-003**: Cada questão DEVE apresentar enunciado claro, quatro alternativas distintas e exatamente uma correta entre elas; o gabarito NÃO DEVE ser revelado antes da confirmação.
- **FR-004**: O estudante DEVE selecionar somente uma alternativa e poder substituir essa seleção antes de confirmar. Ao consultar questões anteriores e retornar à questão em andamento, a seleção ainda não confirmada DEVE ser preservada e permanecer editável; essa navegação NÃO DEVE confirmar, pontuar ou revelar feedback de correção para a seleção pendente.
- **FR-005**: A aplicação DEVE exigir seleção e confirmação explícita antes de registrar a resposta; a seleção isolada NÃO DEVE pontuar nem avançar.
- **FR-006**: Após confirmar, a aplicação DEVE informar textualmente acerto ou erro, sem depender exclusivamente de cores, inclusive na última questão.
- **FR-007**: Cada resposta DEVE ser registrada uma única vez e permanecer imutável após a confirmação.
- **FR-008**: Avançar DEVE depender de resposta confirmada e ação explícita do estudante; uma questão apresentada pela primeira vez DEVE iniciar sem seleção ou feedback. O estudante DEVE poder voltar às questões anteriores durante o quiz mesmo sem confirmar a questão em andamento para consultar a resposta registrada e seu feedback, sem alterá-los. Ao percorrer novamente questões confirmadas, NÃO DEVE ser exigida nova confirmação nem ocorrer nova pontuação. A navegação NÃO DEVE permitir pular questões ainda não respondidas.
- **FR-009**: A pontuação DEVE ser automática: cada resposta correta soma um acerto e cada incorreta soma um erro, sem penalidade adicional. O percentual final DEVE ser acertos ÷ 10 × 100.
- **FR-010**: Depois do feedback da décima resposta e da ação de prosseguir, a aplicação DEVE apresentar a quantidade de acertos, a quantidade de erros e o percentual de acertos. Acertos mais erros DEVEM totalizar 10.
- **FR-011**: O resultado DEVE oferecer reinício, retornando à primeira questão e limpando respostas confirmadas, qualquer seleção pendente, feedback, progresso e pontuação anteriores.
- **FR-012**: Antes de iniciar, a aplicação DEVE verificar as 10 questões e rejeitar qualquer questão que viole FR-003. Em caso de conteúdo inválido ou incompleto, DEVE impedir a tentativa e apresentar uma mensagem compreensível de indisponibilidade.
- **FR-013**: As instruções e ações DEVEM ser claras em português, distinguindo enunciado, alternativas, confirmação, feedback, avanço e reinício, para permitir a realização do fluxo sem orientação externa.

### Key Entities *(include if feature involves data)*

- **Questão**: Enunciado sobre Computação básica, quatro alternativas distintas e identificação de uma única alternativa correta.
- **Alternativa**: Opção de resposta pertencente a uma questão; somente uma entre as quatro corresponde ao gabarito.
- **Tentativa de quiz**: Conjunto de 10 questões, questão em exibição, progresso de respostas confirmadas e estado de andamento ou conclusão, sem vínculo obrigatório com identidade pessoal.
- **Seleção pendente**: Alternativa escolhida na questão em andamento, ainda editável e sem efeito na pontuação; preservada durante a consulta de questões anteriores e descartada ao reiniciar.
- **Resposta confirmada**: Alternativa escolhida para uma questão da tentativa e sua classificação como acerto ou erro; não pode ser substituída após confirmação.
- **Resultado**: Totais de acertos e erros e percentual de acertos de uma tentativa concluída.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Em uma tentativa completa, o estudante percorre exatamente 10 questões, cada uma com quatro alternativas e uma correta, recebendo feedback em 10 de 10 confirmações antes de prosseguir.
- **SC-002**: Para cada total possível de acertos entre 0 e 10, o resultado apresenta exatamente esse total, 10 menos esse total como erros e o percentual correspondente, sem divergências.
- **SC-003**: Em todas as verificações de confirmação repetida e avanço sem resposta, nenhuma pontuação duplicada ou questão pulada ocorre. Voltar e avançar por questões confirmadas preserva 100% das respostas, feedbacks e contagens. Ao retornar à questão em andamento, a seleção pendente é preservada em todas as verificações e só afeta a pontuação após confirmação explícita.
- **SC-004**: Em toda verificação de reinício, a primeira questão reaparece sem seleção ou feedback, e nenhuma resposta da tentativa anterior afeta o novo resultado.
- **SC-005**: Um estudante consegue iniciar, responder, consultar o resultado e reiniciar seguindo somente as instruções da aplicação, sem cadastro, autenticação ou assistência; a verificação deve registrar a conclusão de cada etapa.
- **SC-006**: Em todas as verificações de conteúdo inválido descritas em Edge Cases, nenhuma questão inválida é exibida e nenhuma tentativa parcial é iniciada.

## Assumptions

- O público é composto por estudantes iniciantes, e a interface e as questões serão em português.
- As 10 questões são previamente definidas e revisadas quanto à clareza e à correção. A disponibilidade desse conteúdo é uma dependência para iniciar o quiz.
- A primeira versão usa as mesmas questões na mesma ordem ao reiniciar; sorteio, seleção de temas e níveis de dificuldade ficam fora do escopo.
- Todas as questões têm o mesmo peso; não há cronômetro, limite de tentativas ou desconto adicional por erro.
- O reinício obrigatório está disponível no resultado final; reinício durante uma tentativa não é exigido.
- Histórico persistente, retomada após fechamento, ranking, cadastro, autenticação e administração de questões pelo estudante ficam fora do escopo.
- A indicação textual de acerto ou erro é obrigatória; explicação pedagógica ou revelação do gabarito após confirmar são complementos opcionais.
- Os princípios da constituição 1.0.0 se aplicam. Organização, manutenção e justificativa de dependências serão verificadas no planejamento e na revisão, preservando simplicidade.
- O trecho “Tutorial 11.md 2026-09-25 / 5 / 19” foi interpretado como marca de paginação do material de origem, sem requisito funcional.
