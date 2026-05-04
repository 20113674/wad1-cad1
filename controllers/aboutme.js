'use strict';

import express from 'express';
const router = express.Router();

import accounts from './controllers/accounts.js';
import start from './controllers/start.js';
import dashboard from './controllers/dashboard.js';
import about from './controllers/about.js';
import aboutme from './controllers/aboutme.js';
import category from './controllers/category.js';

// Auth routes
router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

// App routes
router.get('/start', start.createView);
router.get('/dashboard', dashboard.createView);
router.get('/about', about.createView);
router.get('/aboutme', aboutme.createView);
router.get('/playlist/:id', category.createView);

router.get('/error', (req, res) => res.status(404).end('Page not found.'));

export default router;