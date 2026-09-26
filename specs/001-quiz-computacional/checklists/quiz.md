# Checklist de qualidade dos requisitos: Quiz Computacional

**Purpose**: Revisão padrão dos requisitos de resposta, pontuação, navegação, reinício e uso no navegador, antes da implementação.
**Created**: 2026-09-26
**Feature**: [spec.md](../spec.md) · [plan.md](../plan.md)

**Note**: Checklist personalizada gerada por `$speckit-checklist`, com foco inferido da especificação, das clarificações e do plano.
**Review Ownership**: Artefato de revisão pertencente ao revisor dos requisitos. Todos os itens são gerados em aberto; marcar `[x]` somente após avaliação do critério documental pelo revisor.
**Marker Semantics**: `[x]` significa que a qualidade do requisito foi revisada e considerada satisfatória; não significa que a implementação foi concluída ou testada.

## Requirement Completeness

- [x] CHK001 Os requisitos especificam exatamente 10 questões, quatro alternativas distintas por questão e uma única correta, incluindo rejeição de conteúdo incompatível? [Completeness, Spec §FR-002, §FR-003, §FR-012]
- [x] CHK002 A distinção entre seleção editável, confirmação definitiva e feedback está completamente documentada? [Completeness, Spec §FR-004–007]
- [x] CHK003 Os requisitos de pontuação definem peso, tratamento de erro, denominador do percentual e momento de apresentação do resultado? [Completeness, Spec §FR-009–010]
- [x] CHK004 O reinício define todos os dados descartados e os dados preservados, incluindo seleção pendente, respostas, pontuação e ordem das questões? [Completeness, Spec §FR-011, §Assumptions]

## Requirement Clarity

- [x] CHK005 A expressão “avançar” distingue prosseguir para uma questão inédita de percorrer novamente uma questão confirmada? [Clarity, Spec §FR-008]
- [x] CHK006 O significado de “resposta” distingue sem ambiguidade seleção pendente de resposta confirmada nos requisitos e entidades? [Clarity, Spec §Key Entities, §FR-004–007]
- [x] CHK007 A regra de voltar sem confirmar e retornar com a seleção ainda editável está explícita, sem sugerir pontuação ou feedback antecipado? [Clarity, Spec §Clarifications, §FR-004, §FR-008]
- [x] CHK008 O significado de “funcionar diretamente no navegador” explicita as condições da abertura local e do acesso estático, inclusive no smartphone? [Clarity, Assumption, Plan §Summary, §Technical Context]

## Requirement Consistency

- [x] CHK009 As regras de consulta e preservação de seleção são consistentes entre clarificações, cenários, requisitos, modelo de dados e contrato de interface? [Consistency, Spec §Clarifications, §User Story 1, §FR-004, §FR-008]
- [x] CHK010 A condição de iniciar sem seleção na primeira visita é compatível com restaurar uma seleção pendente nas visitas seguintes? [Consistency, Spec §FR-004, §FR-008]
- [x] CHK011 A definição de progresso distingue a quantidade de respostas confirmadas da posição da questão consultada em todos os documentos relevantes? [Consistency, Spec §Key Entities, Data Model §Tentativa, UI Contract]
- [x] CHK012 Os limites de reinício somente no resultado e de ausência de retomada após fechamento estão alinhados entre escopo, transições e cenários? [Consistency, Spec §FR-011, §Assumptions, Data Model §Transições]

## Acceptance Criteria Quality

- [x] CHK013 Os critérios de sucesso permitem avaliar objetivamente todos os totais possíveis de acertos, incluindo 0% e 100%, sem depender de decisões adicionais? [Measurability, Spec §SC-002, §User Story 2]
- [x] CHK014 Os critérios de navegação e confirmação repetida definem quais respostas, seleções, feedbacks e contagens devem permanecer inalterados? [Measurability, Spec §SC-003]
- [x] CHK015 O critério de reinício distingue uma nova tentativa independente da simples troca da questão visível? [Measurability, Spec §SC-004, §User Story 3]

## Scenario Coverage

- [x] CHK016 Estão documentados os fluxos alternativos de consulta com e sem seleção pendente na questão em andamento? [Coverage, Spec §User Story 1, cenários 9–13]
- [x] CHK017 O fluxo da décima resposta define feedback, possibilidade de consulta e acesso explícito ao resultado sem encerramento automático? [Coverage, Spec §User Story 2, §FR-006, §FR-008–010]
- [x] CHK018 Os requisitos de carregamento, indisponibilidade e recuperação especificam o que é permitido antes de haver um banco válido? [Coverage, Spec §FR-012, Questions Contract §Carregamento]

## Edge Case Coverage

- [x] CHK019 Estão definidos os limites de navegação na primeira questão, na primeira não respondida e na última confirmada? [Coverage, Spec §FR-008, §User Story 1, Data Model §Transições]
- [x] CHK020 Os requisitos contemplam confirmação sem seleção, confirmação repetida e tentativa de modificar uma resposta já confirmada? [Coverage, Spec §Edge Cases, §FR-005, §FR-007]
- [x] CHK021 Os requisitos de erro abrangem arquivo ausente, conteúdo malformado, banco incompleto, gabarito inválido e cancelamento da seleção de arquivo? [Coverage, Spec §FR-012, Questions Contract §Carregamento]

## Non-Functional Requirements

- [x] CHK022 Os requisitos de responsividade têm limites mensuráveis de largura, tamanho mínimo de controles e ausência de conteúdo inacessível? [Measurability, Spec §FR-013, Plan §Technical Context, UI Contract]
- [x] CHK023 Estão definidos requisitos de teclado, foco e comunicação textual de feedback para os estados de questão, consulta, erro e resultado? [Completeness, Spec §FR-006, §FR-013, UI Contract]
- [x] CHK024 A meta de tempo de resposta identifica interações, condições de medição e ambiente de referência suficientes para uma avaliação reproduzível? [Clarity, Ambiguity, Plan §Technical Context]

## Dependencies & Assumptions

- [x] CHK025 A dependência de um banco previamente revisado tem critérios documentados de clareza do enunciado e unicidade pedagógica da resposta, além da validade estrutural? [Completeness, Assumption, Spec §Assumptions, Constituição §Contexto educacional]
- [x] CHK026 As exclusões de cadastro, autenticação, histórico persistente e serviços de backend estão explícitas e coerentes com o escopo educacional? [Consistency, Spec §FR-001, §Assumptions, Plan §Technical Context]

## Ambiguities & Conflicts

- [x] CHK027 A seleção manual do JSON na abertura direta está reconciliada com o fluxo de início simples e com a ausência de administração de questões pelo estudante? [Clarity, Assumption, Spec §User Story 1, §Assumptions, Plan §Summary]
- [x] CHK028 O suporte declarado a smartphones distingue claramente o acesso estático do suporte variável à abertura de arquivos locais, evitando uma promessa de compatibilidade indefinida? [Clarity, Ambiguity, Plan §Technical Context]

## Notes

- Profundidade: padrão. Público: revisor da especificação e do plano, antes da implementação.
- Avaliar clareza, completude, consistência, mensurabilidade e cobertura documental; esta lista não é um roteiro de testes do aplicativo.
- Itens com Ambiguity ou Assumption sinalizam decisões a revisar; não representam defeitos confirmados.
- Marcar `[x]` somente após revisão; registrar achados junto ao item e manter em aberto os que exigirem esclarecimento ou correção.
- `$speckit-implement` lê o estado desta checklist como critério de entrada e não modifica seus marcadores.
- `checklists/requirements.md` possui ciclo próprio, mantido por `$speckit-specify` e `$speckit-clarify`, e não foi alterado.
- Referências: [modelo](../data-model.md), [interface](../contracts/ui.md), [dados](../contracts/questions.md), [constituição](../../../.specify/memory/constitution.md).
