const { test } = require('node:test');
const assert = require('node:assert/strict');
const { Quiz, validateQuestionBank } = require('../quiz.js');
const bank = require('../data/questions.json');

test('banco válido inicia uma tentativa somente após start', () => {
  validateQuestionBank(bank);
  const quiz = new Quiz(bank);
  assert.equal(quiz.phase, 'ready');
  assert.equal(quiz.confirm(), false);
  quiz.start();
  assert.equal(quiz.phase, 'active');
  assert.equal(quiz.viewIndex, 0);
});

test('seleção pendente não pontua, pode mudar e confirmação é única', () => {
  const quiz = new Quiz(bank); quiz.start();
  assert.equal(quiz.select(0), true); assert.equal(quiz.result.correct, 0);
  assert.equal(quiz.select(quiz.current.answer), true); assert.equal(quiz.confirm(), true);
  assert.equal(quiz.confirm(), false); assert.equal(quiz.answers.length, 1);
  assert.equal(quiz.currentAnswer, quiz.current.answer);
});

test('consulta preserva resposta confirmada e seleção pendente', () => {
  const quiz = new Quiz(bank); quiz.start();
  quiz.select(bank.questions[0].answer); quiz.confirm();
  assert.equal(quiz.next(), true); assert.equal(quiz.viewIndex, 1);
  quiz.select(2); assert.equal(quiz.pendingChoice, 2);
  assert.equal(quiz.back(), true); assert.equal(quiz.currentAnswer, bank.questions[0].answer);
  assert.equal(quiz.select(1), false); assert.equal(quiz.next(), true);
  assert.equal(quiz.pendingChoice, 2); assert.equal(quiz.confirm(), true);
});

test('não permite voltar antes da primeira, pular pendência ou ver resultado cedo', () => {
  const quiz = new Quiz(bank); quiz.start();
  assert.equal(quiz.back(), false); assert.equal(quiz.next(), false); assert.equal(quiz.showResult(), false);
  quiz.select(0); quiz.confirm(); assert.equal(quiz.next(), true);
  assert.equal(quiz.next(), false); assert.equal(quiz.viewIndex, 1);
});

for (let correctCount = 0; correctCount <= 10; correctCount += 1) {
  test(`calcula resultado para ${correctCount} acertos`, () => {
    const quiz = new Quiz(bank); quiz.start();
    bank.questions.forEach((question, index) => {
      quiz.select(index < correctCount ? question.answer : (question.answer + 1) % 4);
      assert.equal(quiz.confirm(), true);
      if (index < 9) assert.equal(quiz.next(), true);
    });
    assert.equal(quiz.showResult(), true);
    assert.deepEqual(quiz.result, { correct: correctCount, incorrect: 10 - correctCount, percentage: correctCount * 10 });
  });
}

test('reinício limpa respostas e preserva banco validado', () => {
  const quiz = new Quiz(bank); quiz.start();
  bank.questions.forEach((question, index) => { quiz.select(question.answer); quiz.confirm(); if (index < 9) quiz.next(); });
  quiz.showResult(); assert.equal(quiz.restart(), true);
  assert.equal(quiz.phase, 'active'); assert.equal(quiz.viewIndex, 0); assert.equal(quiz.answers.length, 0);
  assert.equal(quiz.pendingChoice, null); assert.equal(quiz.questions[0].id, bank.questions[0].id);
});
