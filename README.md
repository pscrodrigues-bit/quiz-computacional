# Quiz Computacional

Aplicação educacional em português com 10 questões de Computação, sem cadastro,
autenticação, backend ou dependências externas.

## Executar

Para abrir diretamente, abra `index.html` em um navegador desktop e selecione o
arquivo `data/questions.json` quando solicitado. A seleção fica somente no navegador
e não é enviada a lugar algum.

Para carregar as questões automaticamente, sirva esta pasta como site estático:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Depois, abra `http://localhost:8000`. Em smartphone, use hospedagem estática HTTPS
acessível ao aparelho; `localhost` do computador não é o do telefone.

## Organização

- `index.html` e `styles.css`: apresentação responsiva.
- `app.js`: estados da interface e eventos do estudante.
- `quiz.js`: validação, regras, navegação e pontuação, sem acesso ao DOM ou à rede.
- `question-loader.js`: leitura e validação do JSON, por HTTP/HTTPS ou arquivo local.
- `data/questions.json`: fonte única das 10 questões.

Cada questão tem quatro alternativas e um único gabarito. A resposta só pontua após
confirmação. É possível consultar questões anteriores, sem modificar respostas já
confirmadas; uma seleção pendente é preservada ao retornar. O resultado mostra
acertos, erros e percentual. Reiniciar limpa a tentativa e reutiliza o banco já lido.
Atualizar a página descarta a tentativa.

## Verificação

Execute:

```sh
node --test tests/quiz.test.cjs tests/questions.test.cjs
```

Os testes cobrem o banco real, dados inválidos, confirmação única, consulta, seleção
pendente, os 11 totais possíveis de acertos e reinício.

O roteiro completo de interface, acessibilidade, responsividade e desempenho está em
[quickstart.md](specs/001-quiz-computacional/quickstart.md). Após o banco carregar,
o tempo de cada seleção, confirmação, avanço ou retorno deve ser medido do início do
evento até a atualização no próximo frame; 20 interações consecutivas devem ficar em
até 100 ms cada.

# quiz-computacional
