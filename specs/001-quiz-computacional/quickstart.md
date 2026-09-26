# Guia de execução e validação

Este guia descreve a implementação planejada. Os novos caminhos e comportamentos
só estarão disponíveis após `$speckit-tasks` e a implementação; não são evidência de testes executados.

## Pré-requisitos

Navegador com JavaScript habilitado e os arquivos do projeto. Para testes automatizados,
Node.js com `node:test`; para servir arquivos no desenvolvimento, Python 3 opcional.
Não há instalação de pacotes, build, backend ou banco de dados.

## Abrir diretamente

1. Abrir `index.html` em navegador desktop.
2. Selecionar o arquivo distribuído `data/questions.json` quando solicitado.
3. Verificar que Iniciar só é habilitado depois da validação completa.
4. Jogar e reiniciar sem escolher o arquivo novamente. Nenhum arquivo é enviado a terceiros.

## Acesso estático (desktop e smartphone)

Na raiz do projeto, executar opcionalmente:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Abrir `http://localhost:8000` no desktop: o banco deve carregar automaticamente.
Para smartphone, usar a mesma pasta em hospedagem estática HTTPS acessível ao dispositivo;
localhost do computador não é acessível como localhost do telefone. Publicação e exposição
na rede não fazem parte deste comando de planejamento. Não presumir suporte a páginas
`file://` em todos os smartphones.

## Testes automatizados previstos

```sh
node --test tests/quiz.test.cjs tests/questions.test.cjs
```

Cobrir o arquivo real e variantes inválidas: 9/11 questões, 3/5 alternativas, opções
vazias/duplicadas, ids repetidos, gabarito ausente/lista/fora do intervalo, versão inválida.
Cobrir os 11 resultados de 0 a 10 acertos, confirmação repetida, seleção sem confirmação,
retorno na primeira questão, consulta de respostas, preservação de pendência, resultado
somente após a décima confirmação e reinício sem dados residuais.

## Cenários de interface

1. Iniciar sem login; verificar uma questão com quatro opções (FR-001–003).
2. Sem escolher, tentar confirmar/avançar: nada é registrado. Trocar seleção antes de
   confirmar: somente uma fica marcada (FR-004–005).
3. Confirmar acerto e erro; conferir feedback, edição bloqueada e impossibilidade de
   duplicar pontuação. Repetir na décima questão (FR-006–007).
4. Responder à primeira, selecionar sem confirmar a segunda, voltar e retornar:
   resposta/feedback da primeira intactos; seleção da segunda preservada e editável,
   sem feedback ou ponto novo. Repetir sem seleção pendente (FR-004, FR-008, SC-003).
5. Completar com 7 acertos: ver 7, 3, 70%; testar também os extremos. Navegar para trás
   antes do resultado e conferir progresso e contagens inalterados (FR-009–010).
6. Reiniciar: questão 1, nenhuma seleção, nenhum feedback e zero respostas. Completar
   outra tentativa e conferir independência dos totais (FR-011).
7. Testar arquivo malformado, cancelamento do seletor e banco inválido. Em cópia de teste,
   renomear temporariamente o JSON para simular ausência; restaurá-lo e tentar novamente.
   Verificar erro compreensível e ausência de quiz parcial (FR-012).
8. Verificar teclado, foco e anúncio do feedback; executar fluxo sem orientação externa
   com estudante/revisor e registrar resultado (FR-013, SC-005).
9. Verificar larguras 320, 375, 768 e 1440 px e toque em smartphone real: sem conteúdo
   cortado, alternativas e ações acessíveis. Registrar Chrome/Firefox/Edge/Safari desktop
   e Chrome Android/Safari iOS disponíveis; versões não verificadas ficam pendentes.
10. Após o banco estar carregado, para cada seleção, confirmação, avanço e retorno,
    medir do início do evento até a atualização visível no próximo frame de animação.
    Registrar os 20 valores consecutivos, navegador/versão, dispositivo e largura; cada
    valor deve ser de no máximo 100 ms. Recarregar descarta a tentativa conforme especificação.

Registrar data, navegador/versão, dispositivo, modo de carregamento, resultado esperado,
observado e falhas. Bloqueio de ferramenta de automação não equivale a aprovação visual.
Contratos: [dados](contracts/questions.md), [interface](contracts/ui.md) e
[modelo](data-model.md). Não contornar políticas do navegador para executar a verificação.
