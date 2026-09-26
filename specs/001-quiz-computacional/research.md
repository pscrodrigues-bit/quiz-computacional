# Pesquisa e decisões técnicas

## 1. JSON local e execução no navegador

**Decisão**: Uma única fonte em `data/questions.json`. Em HTTP/HTTPS estático, usar
Fetch, verificar `response.ok`, interpretar e validar. Em `file://`, solicitar seleção
explícita do mesmo JSON e ler com `File.text()`; não tentar buscar automaticamente um
arquivo vizinho nem reduzir proteções do navegador.

**Justificativa**: Origens de arquivos locais podem ser opacas e requisições Fetch
entre arquivos locais estão sujeitas às regras de origem. O seletor dá acesso somente
ao arquivo escolhido e mantém a execução sem backend.

**Alternativas consideradas**: exigir servidor para toda execução contrariaria a
abertura direta; embutir uma segunda cópia das questões criaria divergências; JSONP,
`eval` e alterações de segurança não são necessários. Escolher o JSON uma vez é o
custo explícito do modo de abertura direta. Smartphone usa preferencialmente site
estático, pois abertura de páginas locais varia por sistema.

Fontes: [MDN — CORS request not HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS/Errors/CORSRequestNotHttp),
[MDN — File API](https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications),
[MDN — Blob.text](https://developer.mozilla.org/en-US/docs/Web/API/Blob/text),
[MDN — Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).

## 2. Separação sem framework ou build

**Decisão**: Scripts clássicos com defer e responsabilidades explícitas: apresentação,
carregamento e domínio. Reutilizar o padrão de exportação condicional existente para
executar testes no Node sem exigir Node no navegador.

**Justificativa**: Resolve o escopo com APIs nativas e mantém abertura local.

**Alternativas consideradas**: módulos ES no navegador exigiriam atenção adicional às
restrições de CORS em `file://`; framework ou empacotador acrescentariam dependências
sem necessidade neste escopo.

Fonte: [MDN — JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).

## 3. Navegação e pontuação

**Decisão**: Separar índice visual, prefixo de respostas confirmadas e seleção pendente.
Derivar pontuação das respostas e preservar o banco em memória no reinício.

**Justificativa**: As decisões B e A registradas na especificação exigem voltar sem
alterar respostas e retornar com a seleção ainda editável. O índice visual não mede
progresso quando existe consulta.

**Alternativas consideradas**: armazenar seleção apenas no DOM a perderia ao renderizar;
incrementar pontuação durante navegação permitiria duplicação; persistência permanente
está fora do escopo. Fonte: esclarecimentos e FR-004, FR-007–011 da especificação.

## 4. Validação e segurança de conteúdo

**Decisão**: Validar banco completo antes de iniciar; aceitar apenas versão 1, 10 questões,
IDs únicos, quatro opções distintas e um índice de resposta inteiro 0–3. Renderizar dados
como texto. Retorno vazio ou inválido gera erro recuperável, não tentativa parcial.

**Justificativa**: Atende à constituição e mantém os mesmos critérios nos dois modos de
carregamento. Um índice único é suficiente para representar um único gabarito.

**Alternativas consideradas**: flags por alternativa permitem múltiplas corretas;
validação só na renderização falharia após o estudante já começar. Não é preciso biblioteca
de esquema para este formato pequeno. Fonte: princípios III/IV e FR-012.

## 5. Responsividade e verificação

**Decisão**: Manter HTML semântico, CSS responsivo, controles nativos e testes de domínio
sem pacotes adicionais. Complementar com testes de interface em desktop/smartphone,
teclado, foco, leitura de arquivo e estados de falha.

**Justificativa**: Os testes existentes não cobrem navegação de volta nem comprovam
layout ou integração de leitura. A verificação manual objetiva é admitida pela constituição.

**Alternativas consideradas**: introduzir ferramenta de testes de navegador agora não
é necessário; screenshots isolados não verificam fluxo. Novas dependências exigiriam
justificativa específica. Fonte: princípios I, VII e VIII.

## Conclusão

Decisões técnicas resolvidas para a fase de desenho. Sem pendências de esclarecimento.
A pesquisa e os contratos representam comportamento a implementar e validar, não
resultados de testes executados. A seleção local é uma decisão técnica documentada
para compatibilizar JSON externo e abertura direta.
