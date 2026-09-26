(function (root) {
  'use strict';

  function parseBank(text) {
    let parsed;
    try { parsed = JSON.parse(text); } catch (_) { throw new Error('O arquivo de questões não contém JSON válido.'); }
    return root.QuizCore.validateQuestionBank(parsed);
  }

  async function loadFromNetwork(url) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    try {
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) throw new Error('Não foi possível encontrar o arquivo de questões.');
      return parseBank(await response.text());
    } catch (error) {
      if (error.name === 'AbortError') throw new Error('O carregamento das questões demorou mais de 10 segundos.');
      throw error instanceof Error ? error : new Error('Não foi possível carregar as questões.');
    } finally { clearTimeout(timeout); }
  }

  async function loadFromFile(file) {
    if (!file) throw new Error('Selecione o arquivo de questões para continuar.');
    return parseBank(await file.text());
  }

  root.QuestionLoader = { loadFromNetwork, loadFromFile };
})(globalThis);
