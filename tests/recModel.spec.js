const knex = require('knex');
const knexConfig = require('../knexfile');
const Rec = require('../api/recognition/recModel');
const db = knex(knexConfig.testing);
const request = require('supertest');
const { addRec } = require('../api/recognition/recModel');
