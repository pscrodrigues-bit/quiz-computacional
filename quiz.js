(function (root) {
  'use strict';

  const QUESTION_COUNT = 10;
  const QUESTION_FIELDS = new Set(['id', 'topic', 'prompt', 'options', 'answer', 'explanation']);
  const fail = (message) => { throw new Error(message); };
  const nonEmptyText = (value) => typeof value === 'string' && value.trim().length > 0;

  function validateQuestionBank(bank) {
    if (!bank || typeof bank !== 'object' || Array.isArray(bank) || bank.version !== 1 ||
      !Array.isArray(bank.questions) || bank.questions.length !== QUESTION_COUNT) {
      fail('O banco precisa ter versão 1 e exatamente 10 questões.');
    }
    const ids = new Set();
    bank.questions.forEach((question, index) => {
      if (!question || typeof question !== 'object' || Array.isArray(question)) fail(`A questão ${index + 1} é inválida.`);
      Object.keys(question).forEach((field) => {
        if (!QUESTION_FIELDS.has(field)) fail(`A questão ${index + 1} possui o campo desconhecido “${field}”.`);
      });
      if (!nonEmptyText(question.id) || ids.has(question.id)) fail(`A questão ${index + 1} precisa ter um identificador único.`);
      ids.add(question.id);
      if (!nonEmptyText(question.topic) || !nonEmptyText(question.prompt)) fail(`A questão ${index + 1} precisa ter tema e enunciado.`);
      if (!Array.isArray(question.options) || question.options.length !== 4 ||
        question.options.some((option) => !nonEmptyText(option)) ||
        new Set(question.options.map((option) => option.trim())).size !== 4) {
        fail(`A questão ${index + 1} precisa ter quatro alternativas distintas.`);
      }
      if (!Number.isInteger(question.answer) || question.answer < 0 || question.answer > 3) {
        fail(`A questão ${index + 1} precisa ter uma única alternativa correta válida.`);
      }
      if (Object.hasOwn(question, 'explanation') && !nonEmptyText(question.explanation)) {
        fail(`A explicação da questão ${index + 1} precisa ser um texto não vazio.`);
      }
    });
    return bank;
  }

  class Quiz {
    constructor(bank) {
      validateQuestionBank(bank);
      this.questions = bank.questions.map((question) => ({ ...question, options: [...question.options] }));
      this.phase = 'ready'; this.answers = []; this.pendingChoice = null; this.viewIndex = 0;
    }

    start() { this.phase = 'active'; this.answers = []; this.pendingChoice = null; this.viewIndex = 0; }
    restart() { if (this.phase !== 'result') return false; this.start(); return true; }
    get current() { return this.questions[this.viewIndex]; }
    get confirmedCount() { return this.answers.length; }
    get isCurrentConfirmed() { return this.viewIndex < this.answers.length; }
    get currentAnswer() { return this.isCurrentConfirmed ? this.answers[this.viewIndex] : null; }
    get isComplete() { return this.answers.length === this.questions.length; }

    select(choice) {
      if (this.phase !== 'active' || this.viewIndex !== this.answers.length || !Number.isInteger(choice) || choice < 0 || choice > 3) return false;
      this.pendingChoice = choice; return true;
    }
    confirm() {
      if (this.phase !== 'active' || this.viewIndex !== this.answers.length || !Number.isInteger(this.pendingChoice)) return false;
      this.answers.push(this.pendingChoice); this.pendingChoice = null; return true;
    }
    back() { if (this.phase !== 'active' || this.viewIndex === 0) return false; this.viewIndex -= 1; return true; }
    next() {
      if (this.phase !== 'active' || !this.isCurrentConfirmed ||
        (this.isComplete && this.viewIndex === this.questions.length - 1)) return false;
      this.viewIndex += 1; return true;
    }
    showResult() {
      if (this.phase !== 'active' || this.viewIndex !== this.questions.length - 1 || !this.isComplete) return false;
      this.phase = 'result'; return true;
    }
    get result() {
      const correct = this.answers.filter((answer, index) => answer === this.questions[index].answer).length;
      return { correct, incorrect: this.answers.length - correct, percentage: this.answers.length === QUESTION_COUNT ? correct * 10 : 0 };
    }
  }

  const api = { QUESTION_COUNT, Quiz, validateQuestionBank };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.QuizCore = api;
})(globalThis);
