'use strict';

import logger from '../utils/logger.js';
import userStore from '../models/user-store.js';
import { v4 as uuidv4 } from 'uuid';

const accounts = {

    index(request, response) {
        response.render('index', { title: 'Phone Tracker – Welcome' });
    },

    login(request, response) {
        response.render('login', { title: 'Login' });
    },

    signup(request, response) {
        response.render('signup', { title: 'Sign Up' });
    },

    logout(request, response) {
        response.cookie('phonetracker', '');
        response.redirect('/');
    },

    async register(request, response) {
        const user = request.body;
        user.id = uuidv4();

        if (!user.password || user.password.length < 5) {
            return response.render('signup', {
                title: 'Sign Up',
                error: 'Password must be at least 5 characters.',
            });
        }

        await userStore.addUser(user);
        logger.info('Registered: ' + user.email);
        response.cookie('phonetracker', user.email);
        response.redirect('/start');
    },

    authenticate(request, response) {
        const user = userStore.getUserByEmail(request.body.email);
        if (user && user.password === request.body.password) {
            response.cookie('phonetracker', user.email);
            logger.info('Login: ' + user.email);
            response.redirect('/start');
        } else {
            response.render('login', {
                title: 'Login',
                error: 'Invalid email or password.',
            });
        }
    },

    getCurrentUser(request) {
        const email = request.cookies.phonetracker;
        return userStore.getUserByEmail(email);
    },
};

export default accounts;