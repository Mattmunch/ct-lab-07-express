const mongoose = require('mongoose');
const Attempt = require('./Attempt');

describe('Attempt model', () => {
  it('requires a dateOfAttempt', () => {
    const attempt = new Attempt({
      notes: 'This is a great recipe',
      rating: 3,
      recipeId:'cake123'
    });
    const { errors } = attempt.validateSync();
    expect(errors.dateOfAttempt.message).toEqual('Path `dateOfAttempt` is required.');
  });
})
;
