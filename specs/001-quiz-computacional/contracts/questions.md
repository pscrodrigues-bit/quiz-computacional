# Contrato do arquivo de questões

**Local**: `data/questions.json`, UTF-8, JSON estrito. **Versão**: 1.

Formato ilustrativo de uma questão (o arquivo real deve conter exatamente 10):

```json
{
  "version": 1,
  "questions": [
    {
      "id": "q01",
      "topic": "Hardware",
      "prompt": "Qual componente executa instruções?",
      "options": ["Monitor", "Processador", "Teclado", "Impressora"],
      "answer": 1,
      "explanation": "O processador executa as instruções dos programas."
    }
  ]
}
```

Aplicar todas as regras de [data-model.md](../data-model.md) após qualquer leitura.
Não aceitar um array de gabaritos como `answer`, nem múltiplas marcações de correção.

## Carregamento

- HTTP/HTTPS: solicitar `./data/questions.json` na mesma origem; verificar resposta
  bem-sucedida antes de interpretar JSON. Cancelar tentativa de leitura após 10 segundos
  e oferecer tentar novamente. Não avançar com dados parciais.
- `file://`: oferecer seletor nativo com extensão `.json`; ler somente o arquivo
  explicitamente selecionado pelo usuário com `File.text()` e `JSON.parse()`.
- Cancelar o seletor mantém o estado anterior. Arquivo inválido mantém Iniciar indisponível.
- Erro de rede, timeout, arquivo ausente, JSON malformado ou banco inválido produz mensagem
  textual e opção de repetir a leitura/seleção. Nenhum desses casos cria uma tentativa.
- Após carregar e validar, manter o banco na memória. Reinício não faz nova leitura.
- Não usar `eval`, JSONP, cópia do banco em JavaScript ou flags para desabilitar segurança.
- O gabarito é acessível no arquivo do cliente; esta é uma ferramenta de prática,
  sem promessa de proteção contra inspeção ou avaliação supervisionada.
