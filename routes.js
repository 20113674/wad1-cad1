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

// Dashboard add/delete category
router.post('/dashboard/addplaylist', dashboard.addPlaylist);
router.get('/dashboard/deleteplaylist/:id', dashboard.deletePlaylist);

// Phone add/edit/delete
router.post('/playlist/:id/addphone', category.addPhone);
router.get('/playlist/:id/deletephone/:phoneid', category.deletePhone);
router.post('/playlist/:id/updatephone/:phoneid', category.updatePhone);

router.get('/error', (req, res) => res.status(404).end('Page not found.'));

export default router;