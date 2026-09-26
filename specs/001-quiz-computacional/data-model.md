# Modelo de dados

## Banco de questões

Objeto com `version: 1` e `questions`: lista ordenada com exatamente 10 questões.
É carregado e validado por inteiro antes de disponibilizar Iniciar. Não há importação
parcial nem alteração do banco durante uma tentativa. As questões são tratadas como
imutáveis; reiniciar preserva sua ordem.

## Questão

| Campo | Tipo | Regra |
|---|---|---|
| id | string | Não vazia e única no banco |
| topic | string | Não vazia |
| prompt | string | Enunciado não vazio |
| options | string[4] | Quatro textos não vazios e distintos após trim |
| answer | integer | Um único índice 0, 1, 2 ou 3; não aceitar coerção, listas ou flags extras de correção |
| explanation | string opcional | Quando presente, não vazia; exibida somente após confirmar |

Rejeitar versão desconhecida, campos obrigatórios ausentes, tipos incorretos e nomes
de campos desconhecidos. O conteúdo textual entra na interface com `textContent`,
sem interpretar HTML. A validação estrutural não substitui revisão pedagógica do gabarito.

## Tentativa

- `phase`: ready, active ou result; loading/error pertencem ao carregamento da interface.
- `viewIndex`: inteiro de 0 a 9 durante active; identifica somente a questão visível.
- `answers`: prefixo contínuo de índices confirmados, de comprimento 0 a 10. Posição i corresponde à questão i.
- `pendingChoice`: null ou índice 0 a 3 da primeira questão ainda não confirmada (posição answers.length). Consultas anteriores não o alteram.
- `questions`: banco validado usado nesta tentativa.

Não há respostas fora de ordem. O índice de consulta nunca ultrapassa a primeira
questão não respondida, limitada a 9. Quando answers.length = 10, todas as questões
são consultáveis antes de abrir o resultado e pendingChoice é null.

## Resultado derivado

`correct` é a quantidade de respostas iguais ao gabarito da questão correspondente.
`incorrect = answers.length - correct`. Resultado final somente com 10 confirmações:
`percentage = correct / 10 * 100`; valores inteiros de 0 a 100 em passos de 10.
Não incrementar contadores no render nem ao navegar; calcular a partir das respostas.

## Transições

| Ação | Pré-condição | Efeito |
|---|---|---|
| Iniciar | Banco válido, phase ready | active, viewIndex 0, answers vazio, pendingChoice null |
| Selecionar | active, viewIndex = answers.length | Atualiza pendingChoice; não pontua |
| Confirmar | Questão em andamento e pendingChoice válido | Anexa resposta uma vez, limpa pendência, mantém índice para feedback |
| Confirmar novamente | Questão já respondida | Nenhum efeito |
| Voltar | active e viewIndex > 0 | Decrementa índice; preserva respostas e pendência |
| Avançar | active, questão visível confirmada, viewIndex < 9 | Incrementa índice, sem confirmar ou limpar pendência |
| Ver resultado | active, viewIndex 9, 10 respostas | phase result, pontuação derivada |
| Reiniciar | phase result | active, índice 0, respostas vazias, pendência null; banco preservado |

Na consulta, apresentar resposta e feedback armazenados/derivados e bloquear edição.
Ao retornar à questão em andamento, restaurar pendingChoice e manter confirmação
obrigatória. Recarregar a página descarta a tentativa e repete o carregamento do banco.
