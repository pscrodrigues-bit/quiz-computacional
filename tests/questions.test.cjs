const { test } = require('node:test');
const assert = require('node:assert/strict');
const { validateQuestionBank } = require('../quiz.js');
const bank = require('../data/questions.json');

const clone = () => structuredClone(bank);
test('arquivo real contém 10 questões válidas', () => assert.doesNotThrow(() => validateQuestionBank(bank)));
test('rejeita quantidade de questões diferente de 10', () => {
  const fewer = clone(); fewer.questions.pop(); assert.throws(() => validateQuestionBank(fewer));
  const more = clone(); more.questions.push(structuredClone(more.questions[0])); assert.throws(() => validateQuestionBank(more));
});
test('rejeita alternativas inválidas e ids repetidos', () => {
  for (const options of [bank.questions[0].options.slice(0, 3), [...bank.questions[0].options, 'Extra'], ['', ...bank.questions[0].options.slice(1)], [bank.questions[0].options[0], bank.questions[0].options[0], ...bank.questions[0].options.slice(2)]]) {
    const invalid = clone(); invalid.questions[0].options = options; assert.throws(() => validateQuestionBank(invalid));
  }
  const invalid = clone(); invalid.questions[1].id = invalid.questions[0].id; assert.throws(() => validateQuestionBank(invalid));
});
test('rejeita gabarito ausente, lista, fora do intervalo e versão desconhecida', () => {
  for (const answer of [undefined, [0], -1, 4, 1.5]) {
    const invalid = clone(); if (answer === undefined) delete invalid.questions[0].answer; else invalid.questions[0].answer = answer; assert.throws(() => validateQuestionBank(invalid));
  }
  const invalid = clone(); invalid.version = 2; assert.throws(() => validateQuestionBank(invalid));
});
