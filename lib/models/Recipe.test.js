const mongoose = require('mongoose');
const Recipe = require('./Recipe');

describe('Recipe model', () => {
  it('has a required name', () => {
    const recipe = new Recipe();
    const { errors } = recipe.validateSync();

    expect(errors.name.message).toEqual('Path `name` is required.');
  });

  it('has a name, directions, and ingredients', () => {
    const recipe = new Recipe({
      name: 'Cookies',
      directions: [
        'preheat oven to 375',
        'mix ingredients',
        'put dough on cookie sheet',
        'bake for 10 minutes'
      ],
      ingredients: [{
        name: 'eggs',
        amount: 4,
        measurement: 'Grade AA eggs'

      },
      {
        name: 'flour',
        amount: 10,
        measurement: 'cups'
      }]
    });

    expect(recipe.toJSON()).toEqual({
      _id: expect.any(Object),
      name: 'Cookies',
      directions: [
        'preheat oven to 375',
        'mix ingredients',
        'put dough on cookie sheet',
        'bake for 10 minutes'
      ],
      ingredients: [{
        _id: expect.any(Object),
        name: 'eggs',
        amount: 4,
        measurement: 'Grade AA eggs'
    
      },
      {
        _id: expect.any(Object),
        name: 'flour',
        amount: 10,
        measurement: 'cups'
      }]
    });
  });
});
