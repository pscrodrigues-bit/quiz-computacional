# Contrato de interface

Uma questão por tela em português. Todos os estados devem permitir leitura em desktop
e smartphone, sem rolagem horizontal entre 320 e 1440 px.

| Estado | Conteúdo e ações |
|---|---|
| Carregamento | Mensagem de carregamento, Iniciar indisponível |
| Seleção local | Orientação “Selecione o arquivo de questões”, seletor de arquivo |
| Erro | Quiz indisponível, motivo compreensível e tentar novamente/selecionar outro arquivo |
| Pronto | Nome, 10 questões, instruções e Iniciar |
| Questão sem confirmação | Enunciado, quatro radios no mesmo grupo, Confirmar só com seleção; Voltar se índice > 0 |
| Questão confirmada/consulta | Resposta bloqueada, feedback textual, Voltar se aplicável e Próxima questão |
| Décima confirmada | Mesmo feedback, Voltar e Ver resultado; não encerrar automaticamente |
| Resultado | Acertos, erros, percentual e Reiniciar quiz |

Na questão em andamento, Próxima questão fica indisponível até confirmar. Em consulta,
avançar não exige confirmar novamente. Voltar não requer confirmar a questão em andamento.
A seleção pendente sobrevive à consulta e volta marcada e editável. Se não havia seleção,
retorna sem alternativa marcada. Navegação não modifica o resultado.

Usar label, fieldset/legend, botões e radios nativos; Tab, setas e Enter devem funcionar.
Anunciar feedback em região de status, preservar foco visível e levar foco ao título
na troca de questão ou resultado. Não comunicar correção apenas por cores. Alvos de
toque mínimos de 44 × 44 px, textos quebráveis e layout em coluna nas telas estreitas.
Renderizar enunciados e alternativas como texto. Nunca revelar a correta na questão
pendente, incluindo ao retornar da consulta. Indicador de progresso conta respostas
confirmadas e não diminui ao voltar. A interface não oferece edição de questões.
