# Implementation Plan: Quiz Computacional

**Branch**: `main` (branch Git real; o resolvedor identifica a feature como `001-quiz-computacional`) | **Date**: 2026-09-26 | **Spec**: [spec.md](spec.md)

**Input**: Especificação em `specs/001-quiz-computacional/spec.md` e restrições técnicas fornecidas pelo usuário.

## Summary

Adaptar a aplicação existente para HTML5, CSS3 e JavaScript puro, sem frameworks,
backend, banco de dados ou autenticação. As 10 questões serão mantidas exclusivamente
em `data/questions.json`. Separar apresentação, carregamento de dados e lógica do quiz.
Permitir consulta às questões anteriores sem editar respostas confirmadas, preservar
seleções pendentes e calcular o resultado apenas a partir de confirmações únicas.

O aplicativo executará integralmente no navegador. Em HTTP/HTTPS estático, carregar
o JSON relativo automaticamente. Na abertura direta de `index.html`, disponibilizar
seleção explícita do arquivo JSON local pela API de arquivos do navegador. Não exigir
alteração nas configurações de segurança. O modo local não usa servidor; um servidor
estático é apenas alternativa de distribuição e teste, sem lógica de backend.

## Technical Context

**Language/Version**: HTML5, CSS3, JavaScript ECMAScript 2020 ou posterior, scripts clássicos com `defer`.

**Primary Dependencies**: Nenhuma dependência de produção; DOM, Fetch e File APIs nativas.

**Storage**: `data/questions.json` como fonte única das questões; tentativa somente em memória, sem localStorage ou banco.

**Testing**: `node:test` e `node:assert/strict` para regras e dados; roteiro manual em navegadores para integração, acessibilidade e responsividade. Node é ferramenta de desenvolvimento, não requisito para jogar.

**Target Platform**: Navegadores estáveis Chrome, Firefox, Edge e Safari em desktop; Chrome Android e Safari iOS via site estático. Modo `file://` em desktop com seleção de arquivo; abertura local em smartphones depende do suporte do sistema a páginas locais e será verificada separadamente.

**Project Type**: Aplicação web estática, sem build obrigatório.

**Performance Goals**: Após o banco estar carregado, medir no navegador o intervalo entre o início do evento de seleção, confirmação, avanço ou retorno e a conclusão da atualização visível da interface no próximo frame de animação. Cada uma das 20 interações consecutivas por dispositivo de teste DEVE concluir em até 100 ms; registrar navegador, versão, dispositivo, largura da tela e os 20 valores. Não depender de rede durante uma tentativa carregada.

**Constraints**: Sem framework, CDN, backend, banco, autenticação ou ferramentas de build obrigatórias. Layout sem rolagem horizontal de 320 a 1440 px; controles de toque com pelo menos 44 × 44 px; navegação integral por teclado.

**Scale/Scope**: Uma tentativa local por página, exatamente 10 questões, quatro alternativas por questão, uma correta, mesma ordem em cada reinício.

## Constitution Check

Gates avaliados antes da pesquisa e novamente após o desenho. Todos passam no plano;
isso não declara a implementação existente aprovada.

| Princípio | Evidência prevista | Pré / pós-desenho |
|---|---|---|
| I. Interface adequada | Português, controles nativos, feedback textual, teclado e revisão desktop/mobile | Passa / Passa |
| II. Código organizado | Apresentação em app.js/styles.css/index.html; dados em JSON/loader; regras em quiz.js | Passa / Passa |
| III. Quatro alternativas | Validação de cada questão antes de iniciar, testes de 3 e 5 opções | Passa / Passa |
| IV. Uma correta | Índice inteiro único entre 0 e 3; rejeitar ausente, lista e referência inválida | Passa / Passa |
| V. Feedback | Estado confirmado mantém feedback inclusive na décima questão e em consulta | Passa / Passa |
| VI. Pontuação automática | Resultado derivado das respostas confirmadas, não do índice visual | Passa / Passa |
| VII. Simplicidade | APIs nativas, sem dependências de produção, JSON único | Passa / Passa |
| VIII. Verificabilidade | Testes de domínio e cenários manuais rastreados a FR/SC | Passa / Passa |

## Project Structure

### Documentation (this feature)

```text
specs/001-quiz-computacional/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── questions.md
│   └── ui.md
└── checklists/requirements.md
```

`tasks.md` será produzido posteriormente por `$speckit-tasks`.

### Source Code (repository root)

```text
index.html                 # Estrutura semântica e scripts defer
styles.css                 # Apresentação responsiva
app.js                     # Renderização e eventos, sem cálculo de pontuação
quiz.js                    # Validação, transições e resultados, sem DOM/rede
question-loader.js         # Leitura JSON via Fetch ou arquivo selecionado
data/questions.json       # Única fonte das 10 questões
tests/quiz.test.cjs        # Domínio, transições e pontuação
tests/questions.test.cjs   # Banco real e entradas inválidas
README.md                  # Execução e testes
```

**Structure Decision**: Manter arquivos existentes na raiz para minimizar movimentações;
adicionar apenas dados e carregador. Scripts clássicos preservam execução local sem
importações de módulos bloqueadas em `file://`. Exportação condicional para testes Node
pode manter o padrão atual. Os nomes de caminhos no desenho são relativos ao projeto.

### Adaptação do estado atual

- Extrair as 10 questões de `quiz.js` para o JSON; eliminar o banco embutido, sem cópia fallback.
- Remover o construtor com questões implícitas; criar a tentativa somente após ler e validar todo o banco.
- Ampliar validação para exigir exatamente 10 questões e apresentar falha compreensível na interface.
- Separar índice de exibição, respostas confirmadas e seleção pendente. `answers.length` pode representar progresso, mas não a questão em exibição.
- Adicionar voltar; renderizar confirmação antiga a partir do estado, em vez de depender apenas do evento de envio.
- Progresso deve usar respostas confirmadas, não o índice visual. Preservar rascunho ao voltar e retornar.
- Reiniciar reutiliza o banco validado e limpa toda a tentativa; não requer selecionar o arquivo novamente.
- Ampliar `tests/quiz.test.cjs` para todos os 11 totais de acertos e cenários de consulta/rascunho e criar `tests/questions.test.cjs` para o banco real e variantes inválidas.
- Atualizar README sobre os dois modos de carregamento e registrar validações visuais reais.

## Complexity Tracking

Nenhuma violação constitucional ou dependência adicional precisa de exceção.
O único caminho alternativo de leitura atende à restrição de executar diretamente
no navegador sem duplicar dados e sem enfraquecer a segurança do navegador.
