require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Attempt = require('../lib/models/Attempt');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates an attempt', () => {
    return request(app)
      .post('/api/v1/attempts')
      .send({
        dateOfAttempt: new Date(),
        notes: 'This is a great recipe',
        rating: 3,
        recipeId:'cake123'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          dateOfAttempt: res.body.dateOfAttempt,
          notes: res.body.notes,
          rating: res.body.rating,
          recipeId:res.body.recipeId,
          __v: 0
        });
      });
  });

  it('gets all recipes', async() => {
    const attempts = await Attempt.create([
      { dateOfAttempt: new Date(), notes: 'This is a great recipe',
        rating: 1,
        recipeId:'cake123', },
      { dateOfAttempt: new Date(), notes: 'This is a great recipe',
        rating: 2,
        recipeId:'cake123', },
      { dateOfAttempt: new Date(), notes: 'This is a great recipe',
        rating: 3,
        recipeId:'cake123', }
    ]);

    return request(app)
      .get('/api/v1/attempts')
      .then(res => {
        attempts.forEach(attempt => {
          expect(res.body).toContainEqual({
            _id: attempt._id.toString(),
            name: attempt.name
          });
        });
      });
  });
  it('gets a specific attempt', async() => {
    const attempt = await Attempt.create({ name: 'cookies',
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

    return request(app)
      .get(`/api/v1/attempts/${attempt._id}`)
      .then(res => {
        expect(res.body).toEqual({
          __v: 0,
          _id: attempt._id.toString(),
          name: 'cookies',
          directions: [
            'preheat oven to 375',
            'mix ingredients',
            'put dough on cookie sheet',
            'bake for 10 minutes'
          ],
          ingredients: [{
            _id: expect.any(String),
            name: 'eggs',
            amount: 4,
            measurement: 'Grade AA eggs'
    
          },
          {
            _id: expect.any(String),
            name: 'flour',
            amount: 10,
            measurement: 'cups'
          }]
        });
      });
  });
  

  it('updates a attempt by id', async() => {
    const attempt = await Attempt.create({
      name: 'cookies',
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

    return request(app)
      .patch(`/api/v1/attempts/${attempt._id}`)
      .send({ name: 'good cookies' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'good cookies',
          directions: [
            'preheat oven to 375',
            'mix ingredients',
            'put dough on cookie sheet',
            'bake for 10 minutes'
          ],
          ingredients: [{
            _id: expect.any(String),
            name: 'eggs',
            amount: 4,
            measurement: 'Grade AA eggs'
    
          },
          {
            _id: expect.any(String),
            name: 'flour',
            amount: 10,
            measurement: 'cups'
          }],
          __v: 0
        });
      });
  });
  it('deletes a attempt', async() => {
    const attempt = await Attempt.create({
      name: 'cookies',
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

    return request(app)
      .delete(`/api/v1/attempts/${attempt.id}`)
      .then(res => {
        expect(res.body).toEqual({
          __v: 0,
          _id: attempt._id.toString(),
          name: 'cookies',
          directions: [
            'preheat oven to 375',
            'mix ingredients',
            'put dough on cookie sheet',
            'bake for 10 minutes'
          ],
          ingredients: [{
            _id: expect.any(String),
            name: 'eggs',
            amount: 4,
            measurement: 'Grade AA eggs'
    
          },
          {
            _id: expect.any(String),
            name: 'flour',
            amount: 10,
            measurement: 'cups'
          }]
        });
      
      });
  });
});
