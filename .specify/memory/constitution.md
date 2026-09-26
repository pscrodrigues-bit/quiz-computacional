<!--
Sync Impact Report — material temporário de revisão; remover antes do commit.
Versão: modelo sem versão ratificada → 1.0.0 (adoção inicial).
Princípios: cinco espaços genéricos substituídos pelos oito princípios obrigatórios:
I. Interface adequada a estudantes; II. Código organizado e legível;
III. Exatamente quatro alternativas; IV. Uma única alternativa correta;
V. Feedback após cada resposta; VI. Pontuação automática;
VII. Simplicidade e dependências necessárias; VIII. Funcionalidades verificáveis.
Seções adicionadas: Contexto educacional; Fluxo de desenvolvimento e qualidade;
regras de governança.
Seções removidas: nenhuma seção substantiva; apenas instruções do modelo.
Pendências e placeholders adiados: nenhum.
Templates e comandos dependentes permanecem inalterados e leem a constituição em execução.
-->

# Quiz Computacional Constitution

## Core Principles

### I. Interface adequada a estudantes

A interface DEVE ser simples e adequada a estudantes, com instruções em linguagem
clara, ações com rótulos explícitos e distinção visual entre enunciado, alternativas
e feedback. O estudante DEVE conseguir responder e consultar o resultado seguindo
as instruções da própria interface, sem orientação externa. A revisão do fluxo
DEVE conferir esses critérios para preservar a compreensão da atividade.

### II. Código organizado e legível

O código DEVE usar nomes descritivos, organização consistente e responsabilidades
delimitadas para apresentação, questões e pontuação. Regras de negócio NÃO DEVEM
ser duplicadas. A revisão DEVE verificar se cada regra possui um local identificável
para alteração, favorecendo a legibilidade e a manutenção sem abstrações desnecessárias.

### III. Exatamente quatro alternativas

Cada questão DEVE possuir exatamente quatro alternativas. A validação dos dados
DEVE rejeitar questões com qualquer outra quantidade antes de apresentá-las ao
estudante. A verificação DEVE contemplar uma questão válida e quantidades inferiores
e superiores a quatro, garantindo uniformidade no formato do quiz.

### IV. Uma única alternativa correta

Cada questão DEVE possuir exatamente uma alternativa correta, pertencente às suas
quatro alternativas. Questões sem resposta correta, com múltiplas respostas corretas
ou com referência a uma alternativa inexistente DEVEM ser rejeitadas antes da exibição.
O julgamento da resposta DEVE usar essa única definição de correção.

### V. Feedback após cada resposta

A aplicação DEVE fornecer feedback após cada resposta confirmada, indicando
explicitamente acerto ou erro antes de prosseguir para a questão seguinte ou encerrar
o quiz. O feedback NÃO DEVE depender exclusivamente de cores. A verificação DEVE
incluir respostas corretas e incorretas, inclusive na última questão, para assegurar
que o estudante compreenda o resultado de cada resposta.

### VI. Pontuação automática

A pontuação DEVE ser calculada e atualizada automaticamente a partir das respostas
confirmadas, sem exigir cálculo ou ajuste manual pelo estudante. A regra de pontuação
DEVE ser documentada na especificação e produzir o mesmo resultado para a mesma
sequência de respostas. Cada resposta confirmada DEVE ser contabilizada uma única vez.
A verificação DEVE comparar resultados esperados para acertos, erros e respostas
mistas, incluindo repetição da ação de confirmação.

### VII. Simplicidade e dependências necessárias

O projeto DEVE priorizar a solução mais simples que satisfaça os requisitos aprovados.
Cada nova dependência DEVE ter uma necessidade concreta registrada na alteração,
com justificativa de por que os recursos existentes não são suficientes.
Dependências sem uso e abstrações para necessidades apenas hipotéticas NÃO DEVEM
ser introduzidas. A revisão DEVE conferir essas justificativas para limitar o custo
de manutenção e a complexidade do projeto.

### VIII. Funcionalidades verificáveis

Cada funcionalidade DEVE possuir testes ou critérios objetivos de aceitação,
com condições iniciais, ações e resultados esperados explícitos. Verificações
manuais são permitidas quando reproduzíveis e acompanhadas do resultado observado.
Uma funcionalidade NÃO DEVE ser considerada concluída sem evidência de atendimento
aos critérios definidos e aos princípios aplicáveis desta constituição.

## Contexto educacional

O Quiz Computacional é uma aplicação educacional voltada a estudantes. As decisões
de produto DEVEM preservar a clareza do aprendizado e a compreensão dos resultados.
O conteúdo das questões DEVE ser coerente com o enunciado e permitir distinguir
uma única resposta correta, evitando ambiguidades pedagógicas.

Todas as formas de cadastro ou carregamento de questões DEVEM respeitar as mesmas
regras de quatro alternativas e uma resposta correta. Questões inválidas NÃO DEVEM
participar de um quiz nem afetar a pontuação do estudante.

## Fluxo de desenvolvimento e qualidade

As especificações DEVEM definir o comportamento esperado e seus critérios de aceitação.
Os planos DEVEM identificar os princípios aplicáveis e justificar dependências propostas.
As tarefas DEVEM incluir a verificação necessária para demonstrar os resultados esperados.

Antes de concluir uma alteração, a revisão DEVE verificar a clareza da interface,
a organização do código e os critérios funcionais afetados. Alterações no fluxo do quiz
DEVEM verificar a integridade das questões, o feedback e a pontuação automática.
Os resultados das verificações DEVEM ser registrados junto à alteração. Falhas nesses
critérios DEVEM ser corrigidas antes de considerar o trabalho concluído.

## Governance

Esta constituição rege as especificações, os planos, as tarefas e as revisões do projeto.
Em caso de conflito, os artefatos dependentes DEVEM ser ajustados para cumprir seus
princípios. Nenhuma alteração pode dispensar silenciosamente um princípio obrigatório.

Emendas DEVEM registrar a motivação, o texto proposto, os impactos nos artefatos e
as adaptações necessárias. A aprovação do responsável pelo projeto DEVE preceder
a adoção de mudanças nos princípios. A data de ratificação original DEVE ser preservada,
e a data da última emenda DEVE refletir cada atualização aprovada.

O versionamento DEVE seguir MAJOR.MINOR.PATCH: MAJOR para remoções ou redefinições
incompatíveis de princípios ou governança; MINOR para novos princípios, seções ou
ampliações materiais; PATCH para esclarecimentos sem mudança de significado.
Toda revisão DEVE conferir a conformidade com esta constituição e registrar as
evidências de verificação pertinentes.

**Version**: 1.0.0 | **Ratified**: 2026-09-25 | **Last Amended**: 2026-09-25
