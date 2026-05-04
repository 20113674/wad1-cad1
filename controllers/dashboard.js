'use strict';

import logger from '../utils/logger.js';
import phoneStore from '../models/phone-store.js';
import accounts from './accounts.js';

const dashboard = {
    createView(request, response) {
        logger.info('Dashboard page loading!');

        const loggedInUser = accounts.getCurrentUser(request);
        if (!loggedInUser) return response.redirect('/');

        const viewData = {
            title: 'Phones Dashboard',
            fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
            playlists: phoneStore.getAllPlaylists(),
        };

        response.render('dashboard', viewData);
    },
};

export default dashboard;